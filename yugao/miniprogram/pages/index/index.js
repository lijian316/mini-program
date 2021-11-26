const app = getApp();
const db = wx.cloud.database({
  env: 'xianyuinfo-byqz9'
});

Page({
  data: {
    dateStr: '', //当前日期
    activeName: '', //当前展开项
    showInput: false, //展示输入框
    inputTxt: '', //当前输入文本
    checkIndex: 0, //当前索引主播
    configList: [], //主播列表
    todayList: [], //今日预告
    searchList: [], //搜索结果
    tagList: [], //分类标签
    todayTagList: [], //今日标签
    searchStr: '',
  },

  onShow() {
    this.data.checkIndex = 0;
    this.onConfig();
  },

  // 获取配置（主播 分类标签）
  onLoad: function () {
    this.data.todayList = [];
    this.data.todayTagList = [];
    wx.showLoading({
      title: '刷新中,请稍等',
    })
    var that = this;
    var date = new Date();
    var y = String(date.getFullYear());
    var m = date.getMonth() + 1 >= 10 ? String(date.getMonth() + 1) : "0" + String(date.getMonth() + 1);
    var d = date.getDate() >= 10 ? String(date.getDate()) : "0" + String(date.getDate());
    var dateStr = y + "-" + m + "-" + d;
    wx.cloud.callFunction({
      name: 'config',
      data: {},
      success: res => {
        console.log("get config list :", res.result.list);
        app.globalData.openid = res.result.openid;
        app.globalData.tagList = res.result.tag;
        app.globalData.userList = res.result.list;
        that.setData({
          configList: res.result.list,
          dateStr: dateStr,
          tagList: res.result.tag,
        })
        that.onConfig();
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  // 获取每个主播的配置
  onConfig() {
    var that = this;
    var today = Number(that.data.dateStr.replace("-", "").replace("-", ""));
    if (this.data.checkIndex < this.data.configList.length) {
      console.log("check:", this.data.configList[this.data.checkIndex]);
      db.collection('a-db').where({
        name: String(this.data.configList[this.data.checkIndex])
      }).get({
        success(res) {
          if (res.data.length > 0) {
            var len = res.data[0].list.length > 3 ? 3 : res.data[0].list.length;
            var list = res.data[0].list;
            var index = that.hasInToday(res.data[0].name);
            var obj = {};
            if (index == -1) {
              obj.platform = res.data[0].platform ? " · " + res.data[0].platform : "";
              obj.name = res.data[0].name;
              obj.day_tm = '';
              obj.start_tm = '';
              obj.des = '';
              obj.list = [];
              obj.act = false;
              obj.picNum = 0;
              that.data.todayList.push(obj);
            } else {
              obj = that.data.todayList[index];
            }
            for (var i = 0; i < len; i++) {
              if (Number(list[i][1]) == today) {
                // 今日预告
                obj.day_tm = " · " + list[i][1];
                obj.start_tm = " · " + list[i][2];
                obj.des = list[i][3] == 0 ? "" : " · " + list[i][3];
                obj.list = list[i].slice(4);
                obj.act = true;
                if (list[i][list[i].length - 1].indexOf("num:") != -1) {
                  obj.picNum = Number(list[i][list[i].length - 1].replace("num:", ""));
                  obj.list.pop();
                }
                that.data.todayList[index] = obj;
              }
            }
          }
          that.setData({
            todayList: that.data.todayList,
          })
          that.data.checkIndex += 1;
          that.onConfig();
        },
        fail(err) {}
      })
    } else {
      that.data.todayList.sort((a, b) => {
        return a.start_tm <= b.start_tm ? 1 : -1
      })
      that.setData({
        todayList: that.data.todayList,
      })
      app.globalData.todayList = this.data.todayList;
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      that.onTobuy();
      that.onTag();
    }
  },

  // 今日预告中的索引
  hasInToday(name) {
    for (var i = 0; i < this.data.todayList.length; i++) {
      if (name == this.data.todayList[i].name) {
        return i;
      }
    }
    return -1;
  },

  // 切换侦听
  onChange(e) {
    this.setData({
      activeName: e.detail,
    });
  },

  // 输入侦听
  onInputChange(e) {
    if (e.detail == "") {
      this.setData({
        searchList: []
      })
    }
  },

  // 搜索侦听
  onSearch(e) {
    this.data.searchList = [];
    if (e.detail != "") {
      if (e.detail == "debug1") {
        wx.navigateTo({
          url: '../tool/tool'
        })
        return;
      }
      if (e.detail == "debug2") {
        wx.navigateTo({
          url: '../tool2/tool2'
        })
        return;
      }
      console.log("search：", e.detail);
      this.setData({
        searchStr: e.detail
      })
      wx.pageScrollTo({
        scrollTop: 0
      })
      for (var i = 0; i < this.data.todayList.length; i++) {
        for (var j = 0; j < this.data.todayList[i].list.length; j++) {
          if (this.data.todayList[i].list[j].indexOf(e.detail) != -1) {
            this.data.searchList.push(this.data.todayList[i].name + " ： " + this.data.todayList[i].list[j]);
          }
        }
      }
      if (this.data.searchList.length == 0) {
        wx.showToast({
          title: '很抱歉，未能在今日直播中找到结果',
          icon: 'none',
          duration: 3000
        })
      }
      this.setData({
        searchList: this.data.searchList
      })
    }
  },

  // 退出搜索
  onBack() {
    this.setData({
      searchList: [],
      searchStr: '',
    })
  },

  // 查看图文
  onPic(e) {
    var data = this.data.todayList[e.currentTarget.dataset.index];
    data.day_tm = data.day_tm.replace(" · ", "");
    var list = [];
    for (var i = 1; i <= data.picNum; i++) {
      var path = "cloud://xianyuinfo-byqz9.7869-xianyuinfo-byqz9-1301827009/" + data.name + "/" + data.day_tm.substr(4, 4) + "_" + i + '.jpg';
      list.push(path);
    }
    wx.previewImage({
      current: '',
      urls: list
    })
  },

  // 添加主播 
  onNoListTap(e) {
    this.setData({
      showInput: true,
    })
  },

  // 输入侦听
  onInputChange(e) {
    this.data.inputTxt = e.detail;
    if (this.data.inputTxt == '') {
      this.onBack();
    }
  },

  // 输入确认
  onInputConfirm() {
    var that = this;
    this.setData({
      showInput: false,
    })
    wx.showToast({
      title: '成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
    db.collection('feedback-db').add({
      data: {
        name: that.data.inputTxt
      }
    })
  },

  onShareAppMessage: function (res) {
    console.log("用户点击了按钮开始分享", res)
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.setData({
      dateStr: '',
      activeName: '',
      showInput: false,
      inputTxt: '',
      checkIndex: 0,
      configList: [],
      todayList: [],
      searchList: [],
      todayTagList: [],
      tagList: [],
    })
    this.onLoad();
  },

  // 点击某个标签
  onTodayTagListTap(e) {
    this.onSearch({
      detail: this.data.todayTagList[e.currentTarget.dataset.index]
    });
  },

  // 标签 
  onTag() {
    for (var k = 0; k < this.data.tagList.length; k++) {
      for (var i = 0; i < this.data.todayList.length; i++) {
        for (var j = 0; j < this.data.todayList[i].list.length; j++) {
          if (this.data.todayList[i].list[j].indexOf(this.data.tagList[k]) != -1) {
            if (this.data.todayTagList.indexOf(this.data.tagList[k]) == -1) {
              this.data.todayTagList.push(this.data.tagList[k]);
            }
          }
        }
      }
    }
    this.setData({
      todayTagList: this.data.todayTagList
    })
  },

  // 待购清单状态
  onTobuy() {
    db.collection('p-db').where({
      userID: app.globalData.openid
    }).get({
      success: function (res) {
        if (res.data.length > 0) {
          var list = res.data[0].list;
          if (list.length > 1) {
            var hasFind = false;
            for (var k = 0; k < list.length - 1; k++) {
              for (var i = 0; i < app.globalData.todayList.length; i++) {
                for (var j = 0; j < app.globalData.todayList[i].list.length; j++) {
                  if (app.globalData.todayList[i].list[j].indexOf(list[k]) != -1) {
                    hasFind = true;
                    wx.setTabBarBadge({
                      index: 1,
                      text: '....'
                    })
                    return;
                  }
                }
              }
            }
          }
        }
      },
    })
  },


})
const app = getApp();
const db = wx.cloud.database({
  env: 'xianyuinfo-byqz9'
});

Page({
  data: {
    toBuyList: ["点击添加"],
    showInput: false,
    inputTxt: '',
    itemClassArr: [],
    showResult: false,
    searchList: [],
    isRemove: false,
  },

  onShow: function () {
    this.setData({
      showInput: false,
      searchList: [],
      showResult: false
    });
    this.onSearch();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onLoad: function (options) {
    var that = this;
    db.collection('p-db').where({
      userID: app.globalData.openid
    }).get({
      success: function (res) {
        if (res.data.length > 0) {
          for (var i = 0; i < res.data[0].list.length; i++) {
            that.data.itemClassArr.push("toBuy-item");
          }
          that.setData({
            toBuyList: res.data[0].list,
            itemClassArr: that.data.itemClassArr
          })
          that.onSearch();
        } else {
          db.collection('p-db').add({
            data: {
              userID: app.globalData.openid,
              list: ["点击添加"]
            },
            success: function (res) {
              that.setData({
                toBuyList: ["点击添加"]
              })
            }
          })
        }
      },
    })
  },

  onHandle(e) {
    if (this.data.isRemove) {
      this.data.isRemove = false;
      return;
    }
    if (e.currentTarget.dataset.index == this.data.toBuyList.length - 1) {
      this.setData({
        showInput: true
      });
    } else if (this.data.itemClassArr[e.currentTarget.dataset.index].indexOf('teal') >= 0) {
      this.onShowResult(e.currentTarget.dataset.index);
    }
  },

  onRemove: function (e) {
    this.data.isRemove = true;
    this.data.toBuyList.splice(e.currentTarget.dataset.index, 1);
    this.data.itemClassArr.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      toBuyList: this.data.toBuyList,
      itemClassArr: this.data.itemClassArr
    });
    db.collection('p-db').where({
      userID: app.globalData.openid
    }).update({
      data: {
        list: this.data.toBuyList
      }
    })
  },

  onInputChange: function (e) {
    this.data.inputTxt = e.detail;
  },

  onInputConfirm: function (e) {
    if (this.data.inputTxt != "") {
      this.data.toBuyList.unshift(this.data.inputTxt);
      this.data.itemClassArr.unshift("toBuy-item");
      this.onSearch();
      this.setData({
        showInput: false,
        toBuyList: this.data.toBuyList
      });
      db.collection('p-db').where({
        userID: app.globalData.openid
      }).update({
        data: {
          list: this.data.toBuyList
        }
      })
    }
  },

  onSearch(e) {
    if (this.data.toBuyList.length > 1) {
      var hasFind = false;
      for (var k = 0; k < this.data.toBuyList.length - 1; k++) {
        for (var i = 0; i < app.globalData.todayList.length; i++) {
          for (var j = 0; j < app.globalData.todayList[i].list.length; j++) {
            if (app.globalData.todayList[i].list[j].indexOf(this.data.toBuyList[k]) != -1) {
              this.data.itemClassArr[k] = "toBuy-item-teal";
              hasFind = true;
            }
          }
        }
        this.setData({
          itemClassArr: this.data.itemClassArr
        })
      }
      if (hasFind) {
        wx.setTabBarBadge({
          index: 1,
          text: '....'
        })
      } else {
        wx.removeTabBarBadge({
          index: 1
        })
      }
    }
  },

  onSearchDetail(e) {
    var temp = [];
    for (var i = 0; i < app.globalData.todayList.length; i++) {
      for (var j = 0; j < app.globalData.todayList[i].list.length; j++) {
        if (app.globalData.todayList[i].list[j].indexOf(e) != -1) {
          temp.push(i + "-" + j);
        }
      }
    }
    return temp;
  },

  onShowResult(e) {
    var keywords = this.data.toBuyList[e];
    this.data.searchList = [];
    for (var i = 0; i < app.globalData.todayList.length; i++) {
      for (var j = 0; j < app.globalData.todayList[i].list.length; j++) {
        if (app.globalData.todayList[i].list[j].indexOf(keywords) != -1) {
          this.data.searchList.push(app.globalData.todayList[i].name + " : " + app.globalData.todayList[i].list[j]);
        }
      }
    }
    if (this.data.searchList.length > 0) {
      this.setData({
        showResult: true,
        searchList: this.data.searchList
      })
    }
  },

  onHideResult() {
    this.setData({
      showResult: false
    })
  },

  onPullDownRefresh: function () {
    this.onShow();
  },

})
const app = getApp();
const db = wx.cloud.database({
  env: 'xianyuinfo-byqz9'
});

Page({

  data: {
    list: [],
    tempFilePaths: [],
    inputContent: "",
    pname: "",
    pcode: "",
    ptype: "",
    pzhubo: "",
    picPath: "选择图片（只要一张）"
  },

  onLoad: function (options) {
    var that = this;
    db.collection('code-db').where({
      '_id': '28ee4e3e60a229ac198313a2466f151b'
    }).get({
      success: function (res) {
        that.setData({
          list: res.data[0].list
        })
      },
    })
  },

  // 上架
  onUp(e) {
    console.log(e.target.dataset.index);
    var inde = e.target.dataset.index;
    db.collection('code-db').where({
      '_id': '28ee4e3e60a229ac198313a2466f151b',
      'list.name': this.data.list[inde].name
    }).update({
      data: {
        'list.$.isAct': true
      }
    })
    this.data.list[inde].isAct = true;
    this.setData({
      list: this.data.list
    })
  },

  // 下架
  onDown(e) {
    console.log(e.target.dataset.index);
    var inde = e.target.dataset.index;
    db.collection('code-db').where({
      '_id': '28ee4e3e60a229ac198313a2466f151b',
      'list.name': this.data.list[inde].name
    }).update({
      data: {
        'list.$.isAct': false
      }
    })
    this.data.list[inde].isAct = false;
    this.setData({
      list: this.data.list
    })
  },

  // 全部下架
  onDownAll() {
    for (var i = 0; i < this.data.list.length; i++) {
      this.onDown({
        target: {
          dataset: {
            index: i
          }
        }
      })
    }
  },

  // 选择宣传图
  onSelect() {
    var that = this;
    this.data.tempFilePaths = [];
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          that.data.tempFilePaths.push(res.tempFilePaths[i]);
        }
        that.setData({
          picPath: "已选：" + that.data.tempFilePaths[0]
        })
        console.log("select :", that.data.tempFilePaths);
      }
    })
  },

  pnameInput(e) {
    this.data.pname = e.detail
  },

  ptypeInput(e) {
    this.data.ptype = e.detail
  },

  pzhuboInput(e) {
    this.data.pzhubo = e.detail
  },

  pcodeInput(e) {
    this.data.pcode = e.detail;
    // 类别
    for (var i = 0; i < app.globalData.tagList.length; i++) {
      if (e.detail.indexOf(app.globalData.tagList[i]) != -1) {
        this.data.ptype = app.globalData.tagList[i];
        break;
      }
    }
    // 主播
    for (i = 0; i < app.globalData.userList.length; i++) {
      if (e.detail.indexOf(app.globalData.userList[i]) != -1) {
        this.data.pzhubo = app.globalData.userList[i];
        break;
      }
    }
    // 产品名字
    var str = e.detail.substring(e.detail.indexOf("【") + 1, e.detail.indexOf("】"));
    if (str != "") {
      str.replace('【', '');
      str.replace('】', '');
      this.data.pname = str;
    }
    this.setData({
      pname: this.data.pname,
      ptype: this.data.ptype,
      pzhubo: this.data.pzhubo,
    })
  },

  onCommit() {
    if (this.data.pname == "" || this.data.ptype == "" || this.data.pzhubo == "" || this.data.pcode == "" || this.data.tempFilePaths.length == 0) {
      wx.showToast({
        title: '表单不全',
        icon: 'none',
        duration: 1000,
        mask: true
      })
      return;
    }
    console.log(this.data.pname);
    console.log(this.data.pcode);
    console.log(this.data.ptype);
    console.log(this.data.pzhubo);
    var obj = {
      name: this.data.pname,
      code: this.data.pcode,
      isAct: false,
      zhubo: this.data.pzhubo.split(','),
      type: this.data.ptype
    }
    // 上传图片
    wx.cloud.uploadFile({
      cloudPath: "_code/" + this.data.pname + '.jpg',
      filePath: this.data.tempFilePaths[0],
    })
    // 提交数据库
    var that = this;
    db.collection('code-db').where({
      '_id': '28ee4e3e60a229ac198313a2466f151b'
    }).update({
      data: {
        list: db.command.unshift([obj])
      },
      success: function (res) {
        wx.showToast({
          title: '奥利给',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        that.data.list.unshift(obj);
        that.setData({
          list: that.data.list,
          pname: '',
          ptype: '',
          pzhubo: '',
          pcode: '',
          tempFilePaths: []
        })
      }
    })
  },


})
const app = getApp();
const db = wx.cloud.database({
  env: 'xianyuinfo-byqz9'
});


Page({

  data: {
    mainActiveIndex: 0,
    items: [],
    curList: [],
  },

  onLoad() {
    this.data.items = [];
    for (var i = 0; i < app.globalData.tagList.length; i++) {
      this.data.items.push({
        text: app.globalData.tagList[i],
        list: []
      })
    }
    this.data.items.push({
      text: "其他",
      list: []
    })
    this.setData({
      items: this.data.items
    })
    this.update();
  },

  update: function (options) {
    var that = this;
    this.data.mainActiveIndex = 0;
    this.data.curList = [];
    db.collection('code-db').where({
      '_id': '28ee4e3e60a229ac198313a2466f151b'
    }).get({
      success: function (res) {
        for (var i = 0; i < res.data[0].list.length; i++) {
          var index = app.globalData.tagList.indexOf(res.data[0].list[i]["type"]);
          if (index == -1) {
            that.data.items[that.data.items.length - 1].list.push(res.data[0].list[i]);
          } else {
            that.data.items[index].list.push(res.data[0].list[i]);
          }
        }
        that.setData({
          mainActiveIndex: that.data.mainActiveIndex,
          curList: that.data.items[that.data.mainActiveIndex].list,
        })
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },
    })
  },

  onClickNav(e) {
    var index = e.detail.index;
    this.setData({
      mainActiveIndex: index,
      curList: this.data.items[index].list,
    })
  },

  onCopy(e) {
    var that = this;
    var codeStr = this.data.unList[e.target.dataset.index]["code"];
    wx.setClipboardData({
      data: codeStr
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.onLoad();
  },

})
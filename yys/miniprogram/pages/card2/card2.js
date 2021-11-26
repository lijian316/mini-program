const app = getApp();
const db = wx.cloud.database({
  env: 'yys-7gws87sn973c67e2'
})

Page({
  data: {
    searching: false,
    hasResult: false,
    searchResult: [],
    resultShow: false,
    searchIndex: 0,
    listData: [{
        "code": "A",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "2",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "3",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "4",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "5",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "6",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "7",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "8",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "9",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "10",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "J",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "Q",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      },
      {
        "code": "K",
        "meihua": "",
        "heitao": "",
        "fangkuai": "",
        "hongtao": ""
      }
    ]
  },

  onLoad: function (options) {
    console.log("card2 : ", app.globalData.userObj.card2);
    var temp = this.data.listData;
    for (var i = 0; i < app.globalData.userObj.card2.give.length; i++) {
      var row = app.globalData.userObj.card2.give[i].split(",")[0];
      var col = app.globalData.userObj.card2.give[i].split(",")[1];
      switch (col) {
        case "0":
          temp[row].meihua = "可提供";
          break;
        case "1":
          temp[row].heitao = "可提供";
          break;
        case "2":
          temp[row].fangkuai = "可提供";
          break;
        case "3":
          temp[row].hongtao = "可提供";
          break;
      }
    }
    for (var i = 0; i < app.globalData.userObj.card2.need.length; i++) {
      var row = app.globalData.userObj.card2.need[i].split(",")[0];
      var col = app.globalData.userObj.card2.need[i].split(",")[1];
      switch (col) {
        case "0":
          temp[row].meihua = "我需要";
          break;
        case "1":
          temp[row].heitao = "我需要";
          break;
        case "2":
          temp[row].fangkuai = "我需要";
          break;
        case "3":
          temp[row].hongtao = "我需要";
          break;
      }
    }
    this.setData({
      listData: temp
    })
  },

  onTouch: function (e) {
    var row = e.currentTarget.dataset['row'];
    var col = e.currentTarget.dataset['col'];
    var temp = this.data.listData;
    switch (e.currentTarget.dataset['col']) {
      case "0":
        if (temp[row].meihua == "") {
          temp[row].meihua = "我需要";
        } else if (temp[row].meihua == "我需要") {
          temp[row].meihua = "可提供"
        } else if (temp[row].meihua == "可提供")
          temp[row].meihua = "";
        break;
      case "1":
        if (temp[row].heitao == "") {
          temp[row].heitao = "我需要";
        } else if (temp[row].heitao == "我需要") {
          temp[row].heitao = "可提供"
        } else if (temp[row].heitao == "可提供")
          temp[row].heitao = "";
        break;
      case "2":
        if (temp[row].fangkuai == "") {
          temp[row].fangkuai = "我需要";
        } else if (temp[row].fangkuai == "我需要") {
          temp[row].fangkuai = "可提供"
        } else if (temp[row].fangkuai == "可提供")
          temp[row].fangkuai = "";
        break;
      case "3":
        if (temp[row].hongtao == "") {
          temp[row].hongtao = "我需要";
        } else if (temp[row].hongtao == "我需要") {
          temp[row].hongtao = "可提供"
        } else if (temp[row].hongtao == "可提供")
          temp[row].hongtao = "";
        break;
    }
    this.setData({
      listData: temp
    })
  },

  onSubmit: function () {
    var that = this;
    app.globalData.userObj.card2.give = [];
    app.globalData.userObj.card2.need = [];
    for (var i = 0; i < this.data.listData.length; i++) {
      if (this.data.listData[i].meihua == "我需要") {
        app.globalData.userObj.card2.need.push(i + "," + "0");
      } else if (this.data.listData[i].meihua == "可提供") {
        app.globalData.userObj.card2.give.push(i + "," + "0");
      }
      if (this.data.listData[i].heitao == "我需要") {
        app.globalData.userObj.card2.need.push(i + "," + "1");
      } else if (this.data.listData[i].heitao == "可提供") {
        app.globalData.userObj.card2.give.push(i + "," + "1");
      }
      if (this.data.listData[i].fangkuai == "我需要") {
        app.globalData.userObj.card2.need.push(i + "," + "2");
      } else if (this.data.listData[i].fangkuai == "可提供") {
        app.globalData.userObj.card2.give.push(i + "," + "2");
      }
      if (this.data.listData[i].hongtao == "我需要") {
        app.globalData.userObj.card2.need.push(i + "," + "3");
      } else if (this.data.listData[i].hongtao == "可提供") {
        app.globalData.userObj.card2.give.push(i + "," + "3");
      }
    }
    wx.cloud.callFunction({
      name: 'updateCard2Option',
      data: {
        id: String(app.globalData.openid),
        data: app.globalData.userObj.card2
      }
    })
    this.setData({
      searchIndex: 0,
      searchResult: [],
      hasResult: false,
      searching: true
    })
    this.onSearch();
  },

  onSearch: function () {
    if (this.data.searchIndex >= app.globalData.userObj.card2.need.length) {
      this.setData({
        searching: false,
        resultShow: true,
        hasResult: this.data.searchResult.length > 0 ? true : false
      })
      return;
    }
    var that = this;
    var finder = app.globalData.userObj.card2.need[this.data.searchIndex];
    console.log("card2开始匹配", finder);
    var tempList = this.data.searchResult;
    db.collection('yys').where({
      'card2.give': String(finder)
    }).get({
      success: res => {
        console.log(res.data);
        for (var k = 0; k < res.data.length; k++) {
          for (var j = 0; j < res.data[k].card2.need.length; j++) {
            if (app.globalData.userObj.card2.give.indexOf(res.data[k].card2.need[j]) >= 0) {
              var obj = {
                "need": finder,
                "give": res.data[k].card2.need[j],
                "name": res.data[k].nickname
              }
              tempList.push(obj);
              console.log(obj);
            }
          }
        }
        that.setData({
          searchIndex: this.data.searchIndex += 1,
          searchResult: tempList
        })
        that.onSearch();
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  onClose: function () {
    this.setData({
      resultShow: false
    })
  },

  onCopy: function (e) {
    var str = e.currentTarget.dataset['name'];
    wx.setClipboardData({
      data: str,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }

})
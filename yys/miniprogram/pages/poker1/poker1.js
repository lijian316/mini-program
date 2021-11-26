const app = getApp();
const db = wx.cloud.database({
  env: 'yys-7gws87sn973c67e2'
})

Page({
  data: {
    list: [{
        id: 1,
        type: "梅花",
        name: "梅花A",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card1.png?sign=1366ac4b0ed64c6ed0290749b9831653&t=1606789537"
      },
      {
        id: 2,
        type: "梅花",
        name: "梅花2",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card2.png?sign=9e1e33b0719920035bf0cd076fb091cb&t=1606790537"
      },
      {
        id: 3,
        type: "梅花",
        name: "梅花3",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card3.png?sign=2223148ef805e930464a45730fa77efd&t=1606790549"
      },
      {
        id: 4,
        type: "梅花",
        name: "梅花4",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card4.png?sign=67b53cb38fb606db26aee4a493c8d5ea&t=1606790559"
      },
      {
        id: 5,
        type: "梅花",
        name: "梅花5",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card5.png?sign=c5fc4a06afa421b84d130726c3fa919b&t=1606790568"
      },
      {
        id: 6,
        type: "梅花",
        name: "梅花6",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card6.png?sign=d2e94ae4fd465d41450f4b86bcd08667&t=1606790577"
      },
      {
        id: 7,
        type: "梅花",
        name: "梅花7",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card7.png?sign=d88de41db93d8b492234b78f4046b70b&t=1606790593"
      },
      {
        id: 8,
        type: "梅花",
        name: "梅花8",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card8.png?sign=dcd9cebc7215317ba81da208a8c3f30d&t=1606790608"
      },
      {
        id: 9,
        type: "梅花",
        name: "梅花9",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card9.png?sign=b1a320c24e67fbb4f9d2f03bb8cbab24&t=1606790617"
      },
      {
        id: 10,
        type: "梅花",
        name: "梅花10",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card10.png?sign=cb57ce2f59fbb3c2e38ba38901d548a4&t=1606790625"
      },
      {
        id: 11,
        type: "梅花",
        name: "梅花J",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card11.png?sign=4a79affa382306b8cc8d6dec623ffe4a&t=1606790635"
      },
      {
        id: 12,
        type: "梅花",
        name: "梅花Q",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card12.png?sign=545f40402c25c62a566af085b11190d8&t=1606790644"
      },
      {
        id: 13,
        type: "梅花",
        name: "梅花K",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card13.png?sign=d18f2e183d99e69da82f3b927b26b81c&t=1606790661"
      },
      {
        id: 14,
        type: "黑桃",
        name: "黑桃A",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card14.png?sign=67c874f48396eb9ad8eaf5999608d8c5&t=1606792292"
      },
      {
        id: 15,
        type: "黑桃",
        name: "黑桃2",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card15.png?sign=58064c835c2a0b742cfa3f53e85a93d8&t=1606792300"
      },
      {
        id: 16,
        type: "黑桃",
        name: "黑桃3",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card16.png?sign=c711e734685037682d1643393fffa28d&t=1606792310"
      },
      {
        id: 17,
        type: "黑桃",
        name: "黑桃4",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card17.png?sign=1f30ecd28199518cfa216cebdb20ce34&t=1606792320"
      },
      {
        id: 18,
        type: "黑桃",
        name: "黑桃5",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card18.png?sign=ef8d998fb1ee396880403208fe5407bd&t=1606792329"
      },
      {
        id: 19,
        type: "黑桃",
        name: "黑桃6",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card19.png?sign=0ba383904340afc2ad1ba13a67c946ea&t=1606792340"
      },
      {
        id: 20,
        type: "黑桃",
        name: "黑桃7",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card20.png?sign=5d0e95f7286ab79c2dafbe538ce3a1a8&t=1606792349"
      },
      {
        id: 21,
        type: "黑桃",
        name: "黑桃8",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card21.png?sign=d6fa1d2e7f7b590810d113e398fc0b6a&t=1606792358"
      },
      {
        id: 22,
        type: "黑桃",
        name: "黑桃9",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card22.png?sign=3ce70abe0cbf38904313f674d80b0ed2&t=1606792366"
      },
      {
        id: 23,
        type: "黑桃",
        name: "黑桃10",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card23.png?sign=979a875ab25111a59b80c3d228c7c625&t=1606792379"
      },
      {
        id: 24,
        type: "黑桃",
        name: "黑桃J",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card24.png?sign=28b17637f2f2c3cb32ca3d0ce62359e2&t=1606792388"
      },
      {
        id: 25,
        type: "黑桃",
        name: "黑桃Q",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card25.png?sign=39f0e16487a7483642953d0154856469&t=1606792396"
      },
      {
        id: 26,
        type: "黑桃",
        name: "黑桃K",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card26.png?sign=88576c4b4c7144c13e4c62900ecf817e&t=1606792405"
      },
      {
        id: 27,
        type: "方块",
        name: "方块A",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card27.png?sign=fbc4691f0e1b62e386e745ce02089fc8&t=1606792414"
      },
      {
        id: 28,
        type: "方块",
        name: "方块2",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card28.png?sign=d41f1702a9deaa039604745299292af7&t=1606792422"
      },
      {
        id: 29,
        type: "方块",
        name: "方块3",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card29.png?sign=5aa211a876ef9a9e73af1688948e1fd9&t=1606792430"
      },
      {
        id: 30,
        type: "方块",
        name: "方块4",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card30.png?sign=35a340fe20ecd259bdcfacc12c1c9525&t=1606792442"
      },
      {
        id: 31,
        type: "方块",
        name: "方块5",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card31.png?sign=6d4d2197835eb29a78eb1a960b439994&t=1606792452"
      },
      {
        id: 32,
        type: "方块",
        name: "方块6",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card32.png?sign=5d12cc714699cef5c1598dc406347192&t=1606792461"
      },
      {
        id: 33,
        type: "方块",
        name: "方块7",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card33.png?sign=d805363dcb30dd7a5085bd573b6c351c&t=1606792468"
      },
      {
        id: 34,
        type: "方块",
        name: "方块8",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card34.png?sign=e8e85f80374723c99c66669c87c226b1&t=1606792478"
      },
      {
        id: 35,
        type: "方块",
        name: "方块9",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card35.png?sign=f649df94b9371cb8face9a74a7843095&t=1606792487"
      },
      {
        id: 36,
        type: "方块",
        name: "方块10",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card36.png?sign=08b2efd6fed84413a1cf85f97480e7d1&t=1606792495"
      },
      {
        id: 37,
        type: "方块",
        name: "方块J",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card37.png?sign=735952594ad9dd92e22e0ae618eb5ad2&t=1606792503"
      },
      {
        id: 38,
        type: "方块",
        name: "方块Q",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card38.png?sign=bc79984c5e3f632cc3d709a14204561a&t=1606792511"
      },
      {
        id: 39,
        type: "方块",
        name: "方块K",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card39.png?sign=68fbb49897d2e5e67f23bdf7a7cc24fc&t=1606792521"
      },
      {
        id: 40,
        type: "红桃",
        name: "红桃A",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card40.png?sign=c2c0d225061410292b5faa991f43bca0&t=1606792529"
      },
      {
        id: 41,
        type: "红桃",
        name: "红桃2",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card41.png?sign=0128033cb20f6e5304a38f24c926fe59&t=1606792536"
      },
      {
        id: 42,
        type: "红桃",
        name: "红桃3",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card42.png?sign=78b7c3235c7d2a4b0a4bc3d96e039b45&t=1606792545"
      },
      {
        id: 43,
        type: "红桃",
        name: "红桃4",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card43.png?sign=987949c81f1e366feb1863e1876c849a&t=1606792554"
      },
      {
        id: 44,
        type: "红桃",
        name: "红桃5",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card44.png?sign=1933d9b060e7d5d107ff2ff7a76a1345&t=1606792566"
      },
      {
        id: 45,
        type: "红桃",
        name: "红桃6",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card45.png?sign=87bd538001cefceaa74939fb13bfd638&t=1606792574"
      },
      {
        id: 46,
        type: "红桃",
        name: "红桃7",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card46.png?sign=c0291f3f9a91a64f4c77ef30680cfe84&t=1606792582"
      },
      {
        id: 47,
        type: "红桃",
        name: "红桃8",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card47.png?sign=741f76c43d3821dea2ac9efd26ab8040&t=1606792593"
      },
      {
        id: 48,
        type: "红桃",
        name: "红桃9",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card48.png?sign=45f1d5729d5af7b85171480aa6ded8e2&t=1606792602"
      },
      {
        id: 49,
        type: "红桃",
        name: "红桃10",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card49.png?sign=7c7d18c22e1eb85f9deb2fa23570de67&t=1606792611"
      },
      {
        id: 50,
        type: "红桃",
        name: "红桃J",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card50.png?sign=2a3c0238c2bd9eb9c01d1fbab5c9d11e&t=1606792620"
      },
      {
        id: 51,
        type: "红桃",
        name: "红桃Q",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card51.png?sign=c0336ca8657f5bca2f4de823cc7ebc73&t=1606792628"
      },
      {
        id: 52,
        type: "红桃",
        name: "红桃K",
        url: "https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/card/card52.png?sign=4a075e16612dfb149b1429584e942fba&t=1606792635"
      }
    ],
    giveList: [],
    needList: [],
    needShow: false,
    giveShow: false,
    searchIndex: 0,
    searchResult: [],
    searching: false,
    resultShow: false,
    hasResult: false,
    showSet: false,
    contact: ""
  },

  onLoad: function (options) {
    console.log("card1 : ", app.globalData.userObj.card1);
    this.init();
  },

  init: function () {
    var tempGiveArr = [];
    var tempNeedArr = [];
    var tempList = this.data.list;
    for (var i = 0; i < tempList.length; i++) {
      tempList[i].needSelect = false;
      tempList[i].giveSelect = false;
      if (app.globalData.userObj.card1.give.indexOf(tempList[i].id) != -1) {
        tempList[i].giveSelect = true;
        tempGiveArr.push(tempList[i]);
      }
      if (app.globalData.userObj.card1.need.indexOf(tempList[i].id) != -1) {
        tempList[i].needSelect = true;
        tempNeedArr.push(tempList[i]);
      }
    }
    this.setData({
      giveList: tempGiveArr,
      needList: tempNeedArr,
      list: tempList
    })
    console.log("初始化卡牌1列表完成：", this.data.giveList, this.data.needList, this.data.list);
  },

  onEditor: function (e) {
    if (e.currentTarget.dataset.type == 0) {
      this.setData({
        needShow: true
      })
    } else {
      this.setData({
        giveShow: true
      })
    }
  },

  onChange: function (e) {
    var index = e.currentTarget.dataset.index;
    var tempList = this.data.list;
    var tempGiveArr = this.data.giveList;
    var tempNeedArr = this.data.needList;
    if (this.data.needShow) {
      if (tempList[index].needSelect) {
        tempList[index].needSelect = false;
        var tt = tempNeedArr.findIndex(o => o.id == tempList[index].id);
        if (tt != -1) {
          tempNeedArr.splice(tt, 1);
        }
      } else {
        tempList[index].needSelect = true;
        tempNeedArr.push(tempList[index]);
      }
    } else if (this.data.giveShow) {
      if (tempList[index].giveSelect) {
        tempList[index].giveSelect = false;
        var tt = tempGiveArr.findIndex(o => o.id == tempList[index].id);
        if (tt != -1) {
          tempGiveArr.splice(tt, 1);
        }
      } else {
        tempList[index].giveSelect = true;
        tempGiveArr.push(tempList[index]);
      }
    }
    this.setData({
      giveList: tempGiveArr,
      needList: tempNeedArr,
      list: tempList
    })
  },

  onSubmit: function () {
    if (app.globalData.userObj.nickname == "") {
      this.onSetShow();
      return;
    }
    var that = this;
    app.globalData.userObj.card1.give = [];
    for (var i = 0; i < this.data.giveList.length; i++) {
      app.globalData.userObj.card1.give.push(this.data.giveList[i].id);
    }
    app.globalData.userObj.card1.need = [];
    for (var j = 0; j < this.data.needList.length; j++) {
      app.globalData.userObj.card1.need.push(this.data.needList[j].id);
    }
    // 保存
    wx.cloud.callFunction({
      name: 'updateCard1Option',
      data: {
        id: String(app.globalData.openid),
        data: app.globalData.userObj.card1
      }
    })
    // 搜索
    this.setData({
      searchIndex: 0,
      searchResult: [],
      searching: true
    });
    this.onSearch();
  },

  onSearch: function () {
    if (this.data.searchIndex >= app.globalData.userObj.card1.need.length) {
      this.setData({
        searching: false,
        resultShow: true,
        hasResult: this.data.searchResult.length > 0 ? true : false
      })
      return;
    }
    var that = this;
    var finder = app.globalData.userObj.card1.need[this.data.searchIndex];
    console.log("card1开始匹配", finder);
    var tempList = this.data.searchResult;
    db.collection('yys').where({
      'card1.give': Number(finder)
    }).get({
      success: res => {
        console.log(res.data);
        for (var k = 0; k < res.data.length; k++) {
          if (res.data[k]._openid == app.globalData.openid) {
            continue;
          }
          for (var j = 0; j < res.data[k].card1.need.length; j++) {
            if (app.globalData.userObj.card1.give.indexOf(res.data[k].card1.need[j]) >= 0) {
              var obj = {
                "need": that.getNameByID(finder),
                "give": that.getNameByID(res.data[k].card1.need[j]),
                "name": res.data[k].nickname
              }
              tempList.push(obj);
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

  getNameByID: function (id) {
    for (var i = 0; i < this.data.list.length; i++) {
      if (id == this.data.list[i].id) {
        return this.data.list[i].name;
      }
    }
    return ""
  },

  onClose: function () {
    this.setData({
      needShow: false,
      giveShow: false,
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
  },

  clickImg: function () {
    wx.previewImage({
      current: 'https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/ygwpoker.png?sign=0c58ece582d3816d673edbfeca4e7d02&t=1606794766', // 当前显示图片的http链接
      urls: ['https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/ygwpoker.png?sign=0c58ece582d3816d673edbfeca4e7d02&t=1606794766'] // 需要预览的图片http链接列表
    })
  },

  onSetShow() {
    this.setData({
      showSet: true
    });
  },

  onSetClose() {
    this.setData({
      showSet: false
    });
  },

  onSetChange(e) {
    this.setData({
      contact: e.detail
    })
  },

  onSetSave() {
    if (this.data.contact != "" && this.data.contact != app.globalData.userObj.nickname) {
      app.globalData.userObj.nickname = this.data.contact;
      this.onSubmit();
      wx.cloud.callFunction({
        name: 'updateNameOption',
        data: {
          id: String(app.globalData.openid),
          nickname: app.globalData.userObj.nickname
        },
        success: res => {
          console.log(res);
        },
        fail: err => {
          console.log(err);
        },
      })
    }
  },

  onShareAppMessage: function (options) {
    var shareObj = {
      title: "来和我匹配一下妖怪屋卡牌吧",
      path: '/pages/index/index',
      imgUrl: 'https://7979-yys-7gws87sn973c67e2-1304054899.tcb.qcloud.la/shareImg.png?sign=9642004a7f754320b67ebca786130c7f&t=1607046570'
    }
    return shareObj;
  },

})
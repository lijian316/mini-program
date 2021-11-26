var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    //是否允许登记
    notOpen: true,
    //是否在时间限制内
    isInTime: true,
    //拒绝登记理由
    reason: "---",
    //步骤
    steps: [{
        desc: '登记'
      },
      {
        desc: '后续'
      },
      {
        desc: '物流'
      }
    ],
    customItem: "请选择",
    //物流
    tang_steps: [],
    tang_active: 0,
    //登记卡
    emsNum: "",
    active: 0,
    menCode: '',
    myCode: '',
    name: '',
    eat: "-",
    region: ['请选择', '请选择', '请选择'],
    address: "",
    tel: '',
    time: "0",
    emsMoneyArr: {},
    emsMoney: 0,
    menMoney: 0
  },

  ask: function () {
    wx.navigateTo({
      url: '../callback/callback?iconType=1&str='
    })
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    var that = this;
    this.setData({
      menCode: options.menCode,
      myCode: options.myCode,
      name: options.name,
    });
    wx.cloud.callFunction({
      name: "getOpen",
      complete: res => {
        console.log(res);
        that.setData({
          notOpen: res.result.notOpen,
          info: res.result.info,
          reason: res.result.notOpen ? "登记未开启" : "",
          menMoney: res.result.menMoney,
          emsMoneyArr: res.result.emsMoney
        })
        that.checkDB();
      }
    })
  },

  bindEmsChange: function (e) {
    this.setData({
      emsNum: e.detail
    })
  },

  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
    if (this.data.emsMoneyArr[this.data.region[0]]) {
      this.setData({
        emsMoney: this.data.emsMoneyArr[this.data.region[0]]
      })
    }
  },

  bindAddressChange: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  bindTelChange: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  checkDB: function () {
    console.log("checkDB");
    const db = wx.cloud.database({
      env: 'tang-ypcnq'
    })
    var that = this;
    db.collection('tangdb').where({
        myCode: Number(this.data.myCode),
        menCode: Number(this.data.menCode),
        name: String(this.data.name),
      })
      .get({
        success: function (res) {
          if (res.data.length > 0) {
            console.log("get db success");
            var curTime = that.formatTime();
            //初始化数据
            var active = 0;
            var address = "";
            var eat = "";
            var emsNum = "";
            var region = that.data.region;
            var tel = "";
            var time = 0;
            var emsMoney = 0;
            //激活界面
            if (res.data[0].active) {
              if (res.data[0].active >= 2) {
                active = 1;
              } else {
                active = res.data[0].active;
              }
            }
            //省市区
            if (res.data[0].region) {
              region = res.data[0].region;
              if (region[0] == "") {
                region[0] = "请选择"
              }
              if (region[1] == "") {
                region[1] = "请选择"
              }
              if (region[2] == "") {
                region[2] = "请选择"
              }
            }
            //详细地址
            if (res.data[0].address) {
              if (res.data[0].address == "undefined") {
                address = "";
              } else if (res.data[0].address.indexOf("/") != -1) {
                var addressArr = res.data[0].address.split("/");
                if (addressArr.length == 4 && !res.data[0].region) {
                  region[0] = addressArr[0];
                  region[1] = addressArr[1];
                  region[2] = addressArr[2];
                }
                address = addressArr[addressArr.length - 1];
              } else {
                address = res.data[0].address;
              }
            }
            console.log("address：", region[0], region[1], region[2], address);
            //组合
            if (res.data[0].eat) {
              eat = res.data[0].eat;
            }
            console.log("eat：", eat);
            //快递
            if (res.data[0].emsNum) {
              if (res.data[0].emsNum == "undefined") {
                emsNum = "";
              } else {
                emsNum = res.data[0].emsNum;
              }
            }
            console.log("emsNum：", emsNum);
            //电话
            if (res.data[0].tel) {
              tel = res.data[0].tel;
            }
            console.log("tel：", tel);
            //最后登记时间
            if (res.data[0].time) {
              time = res.data[0].time;
            }
            console.log("time：", time);
            //地址去重
            if (address.indexOf(that.data.region[0]) >= 0) {
              address = address.replace(String(that.data.region[0]), "");
            }
            if (address.indexOf(that.data.region[1]) >= 0) {
              address = address.replace(String(that.data.region[1]), "");
            }
            if (address.indexOf(that.data.region[2]) >= 0) {
              address = address.replace(String(that.data.region[2]), "");
            }
            console.log("that.data.emsMoneyArr", that.data.emsMoneyArr);
            if (that.data.emsMoneyArr[region[0]]) {
              emsMoney = that.data.emsMoneyArr[region[0]];
            }
            console.log("emsMoney：", emsMoney);
            that.setData({
              address: address,
              region: region,
              eat: eat,
              tel: tel,
              active: active,
              time: String(time),
              emsNum: emsNum,
              emsMoney: emsMoney
            })
            //检查是否符合登记时间限制
            console.log("get db success", that.data.notOpen);
            if (!that.data.notOpen) {
              var curTime = Date.parse(new Date());
              var year = String(time).substring(0, 4);
              var month = String(time).substring(4, 6);
              var days = String(time).substring(6, 8);
              var lasttime = Date.parse(year + "-" + month + "-" + days);
              var day = parseInt((curTime - lasttime) / (1000 * 60 * 60 * 24));
              console.log(day);
              if (day < 15) {
                that.setData({
                  notOpen: true,
                  reason: "系统检测您距离上次登记不足15天"
                })
                that.setData({
                  active: 1
                })
              } else if (active != 0) {
                that.setData({
                  active: 0
                })
              }
            }
          }
          wx.hideLoading();
        },
        fail: function (err) {
          wx.showToast({
            title: '抱歉，发送了未知的错误 on info：' + err + "，您可以截图反馈给客服",
            icon: 'none',
            duration: 3000
          })
        }
      })
  },

  // ============步骤1 登记流程============
  commit: function () {
    var that = this;
    if (this.data.notOpen) {
      wx.showToast({
        title: "登记未开启",
        icon: 'none',
        duration: 3000
      })
      return;
    }
    if (this.data.address == "" || this.data.tel == "") {
      wx.showToast({
        title: '表单中有未填项目，请填写完整',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    //地址去重
    var address = this.data.address;
    if (address.indexOf(that.data.region[0]) >= 0) {
      address = address.replace(String(that.data.region[0]), "");
    }
    if (address.indexOf(that.data.region[1]) >= 0) {
      address = address.replace(String(that.data.region[1]), "");
    }
    if (address.indexOf(that.data.region[2]) >= 0) {
      address = address.replace(String(that.data.region[2]), "");
    }
    var shen = this.data.region[0];
    var shi = this.data.region[1];
    var qu = this.data.region[2];
    // 'xx省', 'xx市', 'xx区/县(请点击选择)'
    if (shen == "请选择" || shi == "请选择" || qu == "请选择" || shen == "" || shi == "" || qu == "") {
      wx.showToast({
        title: '地址栏省市区未选择完整',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    wx.showModal({
      title: '',
      content: "您填写的地址是：" + shen + shi + qu + String(this.data.address) + " , 请确保您填写的地址包含省市区及详细住址",
      cancelText: "重填",
      confirmText: "继续提交",
      success: function (sm) {
        if (sm.confirm) {
          that.setData({
            address: address,
            region: [shen, shi, qu]
          })
          that.checkOk();
        }
      }
    })
  },
  checkOk() {
    var that = this;
    this.setData({
      notOpen: true
    })
    wx.cloud.callFunction({
      name: 'updateOption',
      data: {
        region: this.data.region,
        address: String(this.data.address),
        menCode: Number(this.data.menCode),
        myCode: Number(this.data.myCode),
        name: String(this.data.name),
        eat: String(this.data.eat),
        tel: Number(this.data.tel),
        time: this.formatTime(),
        active: 1,
        emsNum: String(this.data.emsNum)
      },
      complete: res => {
        this.pushData();
      }
    })
  },
  pushData() {
    const db = wx.cloud.database({
      env: 'tang-ypcnq'
    })
    var that = this;
    db.collection('temp').add({
      data: {
        myCode: Number(this.data.myCode),
        menCode: Number(this.data.menCode),
        name: String(this.data.name),
        tel: Number(this.data.tel),
        address: this.data.region[0] + this.data.region[1] + this.data.region[2] + String(this.data.address),
        eat: String(this.data.eat),
        time: String(this.formatTime()),
      },
      success: function (res) {
        that.setData({
          active: 1,
          time: String(that.formatTime())
        })
      }
    })
  },

  // ============步骤2 联系客服流程============
  contect: function () {
    this.setData({
      active: 2
    })
    this.showEms();
  },

  // ============步骤3 物流配送流程============
  // http://sandboxapi.kdniao.com:8080/kdniaosandbox/gateway/exterfaceInvoke.json 测试地址
  // http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx 正式地址
  showEms: function () {
    var that = this;
    if (this.data.emsNum == "") {
      wx.showToast({
        title: '请输入运单编号，如有疑问请咨询客服',
        icon: 'none',
        duration: 5000
      })
      return;
    }
    var logistics = ["SF", this.data.emsNum];
    var RequestData = "{'OrderCode':'','ShipperCode':'" + logistics[0] + "','LogisticCode':'" + logistics[1] + "'}";
    var RequestDatautf = encodeURI(RequestData);
    var DataSign = encodeURI(util.Base64((util.md5(RequestData + '45b64065-c97f-49bf-94a0-24e1d9e912eb'))));
    if (logistics != null) {
      wx.request({
        url: 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
        data: {
          'RequestData': RequestDatautf,
          'EBusinessID': '1625984',
          'RequestType': '1002',
          'DataSign': DataSign,
          'DataType': '2',
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var itemes = [{
            text: "暂无轨迹信息",
            desc: "--"
          }]
          if (res.data.Traces.length > 0) {
            itemes = [];
            for (var i = res.data.Traces.length - 1; i >= 0; i--) {
              var obj = {
                text: res.data.Traces[i]["AcceptStation"],
                desc: res.data.Traces[i]["AcceptTime"]
              }
              itemes.push(obj);
            }
          }
          that.setData({
            tang_steps: itemes
          })
        },
        fail: function (res) {
          var itemes = [{
            text: "物流信息请求出错，请稍后再试",
            desc: "--"
          }]
          that.setData({
            tang_steps: itemes
          })
        }
      })
    }
  },
  emsCheck: function () {
    this.showEms();
    var that = this;
    wx.cloud.callFunction({
      name: 'updateEMS',
      data: {
        myCode: Number(this.data.myCode),
        name: String(this.data.name),
        emsNum: String(this.data.emsNum)
      }
    })
  },
  ems: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '物品贵重，请确认本人亲自签收后，点击已收件！',
      success: function (sm) {
        if (sm.confirm) {
          that.comfire()
        }
      }
    })
  },
  comfire: function () {
    var that = this;
    that.setData({
      active: 0
    })
  },

  formatTime: function () {
    var date = new Date();
    var year = String(date.getFullYear());
    var month = String(date.getMonth() + 1)[1] ? String(date.getMonth() + 1) : '0' + String(date.getMonth() + 1);
    var day = String(date.getDate())[1] ? String(date.getDate()) : '0' + String(date.getDate());
    return year + month + day;
  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },

  copy: function () {
    if (that.data.emsNum == "") {
      wx.showToast({
        title: '你没有运单号，请咨询',
        icon: 'none',
        duration: 5000
      })
      return;
    }
    var that = this;
    wx.setClipboardData({
      data: "SF" + that.data.emsNum,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 5000
        })
      }
    })
  }
})
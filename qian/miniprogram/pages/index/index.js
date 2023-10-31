const app = getApp()
const dbMgr = require('../../dbManager');

Page({
  data: {
    assets: [],
    debt: [],
    income: [],
    pay: [],
    showAddAssets: false,
    showAddDebt: false,
    showAddIncome: false,
    showAddPay: false,
    progress: 0,
    passive_income: 0,
    income_num: 0,
    pay_num: 0,
    payFullDay: "",
    payDay: "1"
  },

  onLoad(options) {
    dbMgr.init("maindb");
    wx.cloud.callFunction({
      name: 'getOpen',
    }).then((e) => {
      app.globalData.openid = e.result.openid;
      console.log("获取ID成功：", app.globalData.openid);
      this.updateList();
    })
  },

  payFullDay: function (e) {
    var day = Number(e.detail.value) + 1;
    var curY = this.data.payFullDay.split(".")[0];
    var curM = this.data.payFullDay.split(".")[1];
    var newD = curY + "." + curM + "." + day;
    dbMgr.updatePayDay(newD).then(e => {
      this.data.payFullDay = newD;
      this.setData({
        payFullDay: this.data.payFullDay,
        payDay: day
      })
    });
  },

  updateList: function () {
    dbMgr.get(app.globalData.openid).then(e => {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      if (e.data.length == 0) {
        var data = {
          assets: [],
          debt: [],
          income: [{
            "name": "其他收入",
            "value": 0
          }],
          pay: [{
            "name": "其他支出",
            "value": 0
          }],
          payFullDay: year + "." + month + ".1"
        }
        dbMgr.add(data)
      } else {
        this.setData({
          assets: e.data[0].assets,
          debt: e.data[0].debt,
          income: e.data[0].income,
          pay: e.data[0].pay,
          income_num: e.data[0].income[0].value,
          pay_num: e.data[0].pay[0].value,
          payFullDay: e.data[0].payFullDay,
          payDay: e.data[0].payFullDay.split(".")[2],
        })
        // 账单日到期
        var payY = this.data.payFullDay.split(".")[0];
        var payM = this.data.payFullDay.split(".")[1];
        var payD = this.data.payFullDay.split(".")[2];
        console.log("today:", year + "." + month + "." + day);
        console.log("payday:", this.data.payFullDay);

        var a = new Date(year + '-' + month + "-" + day);
        var b = new Date('2020-06-23')

        if (year > payY || month > payM  ) {
          if (year > payY) {
            payY = year;
          }
          console.log("更新日期");
          dbMgr.updatePayDay(payY + "." + month)
        }
        // 资产产生的收入统计
        for (var i = 0; i < this.data.assets.length; i++) {
          if (this.data.assets[i].value != 0) {
            var data = {
              name: this.data.assets[i].name + "资产产生的收入",
              value: Number(this.data.assets[i].value)
            }
            this.data.income.push(data);
            this.data.income_num += data.value;
            this.data.passive_income += data.value;
          }
        }
        // 负债产生的支出统计
        for (var i = 0; i < this.data.debt.length; i++) {
          if (this.data.debt[i].value != 0) {
            var data = {
              name: this.data.debt[i].name + "负债产生的支出",
              value: Number(this.data.debt[i].value)
            }
            this.data.pay.push(data);
            this.data.pay_num += data.value;
          }
        }
        if (this.data.passive_income > this.data.pay_num) {
          var each = this.data.pay_num / 100;
          var pre = each * this.data.passive_income;
          this.data.progress = pre;
        }
        this.setData({
          income: this.data.income,
          pay: this.data.pay,
          income_num: this.data.income_num,
          pay_num: this.data.pay_num,
          passive_income: this.data.passive_income,
          progress: this.data.progress,
        })
        console.log("获取用户数据成功：");
        console.log(this.data.assets);
        console.log(this.data.debt);
        console.log(this.data.income);
        console.log(this.data.pay);
        console.log("income_num:", this.data.income_num);
        console.log("pay_num:", this.data.pay_num);
        console.log("passive_income:", this.data.passive_income);
      }
    })
  },

  removeAssets: function (e) {
    var that = this;
    wx.showModal({
      title: '',
      content: '确定删除名为“' + that.data.assets[e.currentTarget.dataset.index].name + '”的资产吗？',
      success(res) {
        if (res.confirm) {
          var item = that.data.assets.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            assets: that.data.assets
          })
          dbMgr.removeAssets(that.data.assets).then(e => {
            that.updateList();
          })
        }
      }
    })
  },

  addAssets: function () {
    this.setData({
      showAddAssets: !this.data.showAddAssets,
      showAddDebt: false,
      showAddIncome: false,
      showAddPay: false,
    })
  },

  addAssetsComfirm: function (data) {
    if (data.detail.value.name != "" && data.detail.value.value != "") {
      console.log("新增一项资产：", data.detail.value);
      var data = {
        name: data.detail.value.name,
        cost: Number(data.detail.value.cost),
        value: Number(data.detail.value.value)
      }
      dbMgr.addAssets(data).then(e => {
        this.updateList();
      });
    }
    this.setData({
      showAddAssets: false,
      showAddDebt: false,
      showAddIncome: false,
      showAddPay: false,
    })
  },

  removeDebt: function (e) {
    var that = this;
    wx.showModal({
      title: '',
      content: '确定删除名为“' + that.data.debt[e.currentTarget.dataset.index].name + '”的负债吗？',
      success(res) {
        if (res.confirm) {
          var item = that.data.debt.splice(e.currentTarget.dataset.index, 1);
          that.setData({
            debt: that.data.debt
          })
          dbMgr.removeDebt(that.data.debt).then(e => {
            that.updateList();
          })
        }
      }
    })
  },

  addDebt: function () {
    this.setData({
      showAddDebt: !this.data.showAddDebt,
      showAddAssets: false,
      showAddIncome: false,
      showAddPay: false,
    })
  },

  addDebtComfirm: function (data) {
    if (data.detail.value.name != "" && data.detail.value.value != "") {
      console.log("新增一项负债：", data.detail.value);
      var data = {
        name: data.detail.value.name,
        cost: Number(data.detail.value.cost),
        value: Number(data.detail.value.value)
      }
      dbMgr.addDebt(data).then(e => {
        this.updateList();
      });
    }
    this.setData({
      showAddAssets: false,
      showAddDebt: false,
      showAddIncome: false,
      showAddPay: false,
    })
  },

  addIncome: function () {
    this.setData({
      showAddIncome: !this.data.showAddIncome,
      showAddAssets: false,
      showAddDebt: false,
      showAddPay: false,
    })
  },

  addIncomeComfirm: function (data) {
    if (data.detail.value.value != "") {
      dbMgr.updateIncome(data.detail.value.value).then(e => {
        this.updateList();
      });
    }
    this.setData({
      showAddAssets: false,
      showAddDebt: false,
      showAddIncome: false,
      showAddPay: false,
    })
  },

  addPay: function () {
    this.setData({
      showAddPay: !this.data.showAddPay,
      showAddIncome: false,
      showAddAssets: false,
      showAddDebt: false,
    })
  },

  addPayComfirm: function (data) {
    if (data.detail.value.value != "") {
      dbMgr.updatePay(data.detail.value.value).then(e => {
        this.updateList();
      });
    }
    this.setData({
      showAddAssets: false,
      showAddDebt: false,
      showAddIncome: false,
      showAddPay: false,
    })
  },

})
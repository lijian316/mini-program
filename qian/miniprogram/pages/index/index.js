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

    updateList: function () {
        dbMgr.get(app.globalData.openid).then(e => {
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
                    }]
                }
                dbMgr.add(data)
            } else {
                this.setData({
                    assets: e.data[0].assets,
                    debt: e.data[0].debt,
                    income: e.data[0].income,
                    pay: e.data[0].pay,
                })
                console.log("获取用户数据成功：");
                console.log(this.data.assets);
                console.log(this.data.debt);
                console.log(this.data.income);
                console.log(this.data.pay);
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
                    dbMgr.removeAssets(that.data.assets)
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
                    dbMgr.removeDebt(that.data.debt)
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
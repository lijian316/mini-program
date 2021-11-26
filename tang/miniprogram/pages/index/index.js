const app = getApp()

Page({
  data: {
    menCode: '',
    myCode: '',
    name: ''
  },

  bindMenCodeInput: function(e) {
    this.setData({
      menCode: e.detail.value
    });
  },

  bindMyCodeInput: function(e) {
    this.setData({
      myCode: e.detail.value
    });
  },

  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    });
  },

  getCurDate: function() {
    var date = new Date();
    var year = String(date.getFullYear())
    var month = String(date.getMonth() + 1)[1] ? String(date.getMonth() + 1) : '0' + String(date.getMonth() + 1);
    var day = String(date.getDate())[1] ? String(date.getDate()) : '0' + String(date.getDate());
    return year + month + day;
  },

  login: function() {
    if (this.data.myCode == "" || this.data.menCode == "" || this.data.name == "") {
      wx.showToast({
        title: '表单中有未填项目，请填写完整',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    this.checkDB();
  },

  ask: function() {
    wx.navigateTo({
      url: '../callback/callback?iconType=1&str='
    })
  },

  checkDB: function() {
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
        success: function(res) {
          if (res.data.length > 0) {
            wx.navigateTo({
              url: '../info/info?menCode=' + res.data[0].menCode + '&myCode=' + res.data[0].myCode + '&name=' + res.data[0].name
            })
          } else {
            wx.navigateTo({
              url: '../callback/callback?iconType=warn&str=系统未找到您的登记卡信息'
            })
          }
        },
        fail: function(err) {
          wx.showToast({
            title: '抱歉，发送了未知的错误 on index：' + err + "，您可以截图反馈给客服",
            icon: 'none',
            duration: 3000
          })
        }
      })
  },
})
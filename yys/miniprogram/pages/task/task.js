const app = getApp();
const db = wx.cloud.database({
  env: 'yys-7gws87sn973c67e2'
})

Page({

  data: {
    taskes: [],
  },

  onLoad: function (options) {
    var that = this;
    db.collection('yys').where({
      '_id': "allTask"
    }).get({
      success: res => {
        console.log(res.data);
        that.setData({
          taskes: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  
})
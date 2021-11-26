Page({
  data: {
    info: '',
    iconType: 'warn',
    iconDes: "操作失败",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.str == "[object Object]") {
      options.str = "";
    }
    this.setData({
      info: options.str || "",
      iconType: options.iconType,
      iconDes: options.iconType == 'warn' ? "操作失败" : ""
    })
  },

  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  }
})
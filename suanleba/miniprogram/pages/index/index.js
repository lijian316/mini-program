// const app = getApp()

Page({
  data: {
    scrollable: false,
    title: "男朋友手刀逃跑，我要不要原谅他dsfdsfasdfasfsdfa",
    list: [{
        title: "有一颗按钮按下可以回到10年前，你会按吗？",
        img: "../../images/t1.png"
      },
      {
        title: "男朋友手刀逃跑，我要不要原谅他？",
        img: "../../images/t2.png"
      },
      {
        title: "45546456",
        img: "../../images/t1.png"
      }
    ]
  },

  onLoad: function (options) {
    var that = this;
    // 标题是否显示完整，没有显示完整则滚动显示
    // wx.createSelectorQuery().select("#card-content").boundingClientRect(function (rect) {
    //   if (rect.width < that.data.title.length * 14) {
    //     that.setData({
    //       scrollable: true
    //     })
    //   }
    // }).exec();
  },


});
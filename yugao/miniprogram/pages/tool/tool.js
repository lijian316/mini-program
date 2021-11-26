const app = getApp();
const db = wx.cloud.database({
  env: 'xianyuinfo-byqz9'
});

Page({
  data: {
    tempFilePaths: [],
  },

  onLoad: function (options) {},

  onPullDownRefresh: function () {
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onSelect() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          that.data.tempFilePaths.push(res.tempFilePaths[i]);
        }
        console.log("select :", that.data.tempFilePaths);
      }
    })
  },

  bindFormSubmit: function (e) {
    var that = this;
    // 整理文本
    var arr = e.detail.value.textarea.split("\n");
    var tempList = [];
    for (var i = 0; i < arr.length; i++) {
      arr[i].replace(" ", "");
      if (arr[i] != "") {
        tempList.push(arr[i]);
      }
    }
    console.log(tempList);
    // 上传图片
    if (tempList.length > 0) {
      var name = tempList[0];
      var date = tempList[1] || '';
      var time = tempList[2] || '';
      if (this.data.tempFilePaths.length > 0) {
        tempList.push("num:" + this.data.tempFilePaths.length);
        for (var i = 0; i < this.data.tempFilePaths.length; i++) {
          wx.cloud.uploadFile({
            cloudPath: name + "/" + date.substr(4, 4) + "_" + (i + 1) + '.jpg',
            filePath: this.data.tempFilePaths[i],
            success: res => {
              console.log(res.fileID);
            },
            fail: err => {
              console.log(err);
            }
          })
        }
      }
      // 提交数据
      if (tempList.length > 4) {
        db.collection('a-db').where({
          name: name
        }).get({
          success(res) {
            console.log(res);
            if (res.data.length == 0) {
              db.collection('a-db').add({
                data: {
                  name: name,
                  list: [tempList]
                }
              })
            } else {
              db.collection('a-db').where({
                name: name
              }).update({
                data: {
                  list: db.command.unshift([tempList])
                }
              })
            }
          }
        })
      }
    }
  },
})





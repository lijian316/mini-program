// pages/tool/tool.js
Page({

  data: {
    result: [""]
  },
  // 运单批量导入
  chooseFile: function () {
    let that = this;
    wx.chooseMessageFile({
      type: 'file',
      success(res) {
        let name = res.tempFiles[0].name;
        let path = res.tempFiles[0].path;
        that.uploadFile(name, path);
      }
    })
  },
  uploadFile: function (name, path) {
    console.log(name, path);
    let that = this;
    var info = that.data.result;
    console.log(info);
    info.push("正在上传 : " + name);
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: path,
      success(res) {
        info.push("上传成功 : " + res.fileID);
        info.push("正在解析 : " + res.fileID);
        that.setData({
          result: info
        })
        that.pharseFile(res.fileID);
      },
      fail(err) {
        that.setData({
          result: that.data.result.push("上传失败" + String(err))
        })
      }
    })
  },
  pharseFile: function (id) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        fileID: id
      },
      complete: res => {
        console.log(res);
        this.updateEMS(res.result);
      }
    })
  },
  async updateEMS(tasks) {
    var that = this;
    var info = that.data.result;
    var returnNum = 0;
    for (var i = 0; i < tasks.length; i++) {
      // console.log(tasks[i]);
      if (tasks[i].myCode) {
        await wx.cloud.callFunction({
          name: 'updateEMS',
          data: {
            myCode: Number(tasks[i].myCode),
            name: String(tasks[i].name),
            emsNum: String(tasks[i].emsNum),
            index: i
          },
          success: res => {
            returnNum += 1;
            info.push("进度:" + returnNum + "/" + tasks.length);
            if (returnNum == tasks.length) {
              info.push("录入完成");
            }
            if (res.result.done) {} else {
              info.push("myCode:" + res.result.myCode + ",name:" + res.result.name + ",录入失败");
            }
            that.setData({
              result: info
            })
          },
        })
      } else {
        returnNum += 1;
      }
    }
  }

})
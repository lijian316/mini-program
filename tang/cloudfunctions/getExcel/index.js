const cloud = require('wx-server-sdk')
cloud.init()
var xlsx = require('node-xlsx');
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const res = await cloud.downloadFile({
    fileID: String(event.fileID),
  })
  const buffer = res.fileContent;
  const tasks = [];
  var sheets = xlsx.parse(buffer);
  sheets.forEach(function(sheet) {
    for (var rowId in sheet['data']) {
      var row = sheet['data'][rowId];
      if (rowId >= 0 && row) {
        var obj = {
          myCode: Number(row[0]),
          emsNum: String(row[1]),
          name: String(row[2])
        }
        tasks.push(obj);
      }
    }
  })
  return tasks;
}
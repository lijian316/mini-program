// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  var obj = {
    name: event.name,
    myCode: event.myCode,
    esmNum: event.emsNum,
    done: false,
    index: event.index
  };
  await db.collection('tangdb')
    .where({
      myCode: Number(event.myCode),
      name: String(event.name),
    })
    .update({
      data: {
        emsNum: String(event.emsNum)
      }
    }).then(res => {
      if (res.errMsg == "collection.update:ok") {
        obj.done = true;
      }
    })

  return obj;
}
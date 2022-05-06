// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'tang-ypcnq'
})
const db = cloud.database({
  env: 'tang-ypcnq'
})

// 云函数入口函数
exports.main = async (event, context) => {
  // return event;
  return db.collection('tangdb').where({
      myCode: Number(event.myCode),
      menCode: Number(event.menCode),
      name: String(event.name),
    })
    .update({
      data: {
        address: String(event.address) || "",
        tel: Number(event.tel),
        time: String(event.time) || "",
        active: Number(event.active) || 0,
        emsNum: String(event.emsNum) || "",
        region: event.region || ["广东省", "深圳市", "南山区"],
        weight: String(event.weight) || "0"
      }
    })
}
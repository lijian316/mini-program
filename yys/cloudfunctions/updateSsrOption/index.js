// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database({
  env: 'yys-7gws87sn973c67e2'
})

// 云函数入口函数
exports.main = async (event, context) => {
  // return event;
  return db.collection('yys').where({
      "_openid": String(event.id)
    })
    .update({
      data: {
        ssr: event.data
      }
    })
}
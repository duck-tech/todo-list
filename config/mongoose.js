const mongoose = require('mongoose')
// 如果在 Heroku 環境則使用 process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/todo-list')
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list')
const schema = mongoose.Schema
const todoSchema = new schema ({
  name: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Todo',todoSchema)


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


app.get('/',(req,res) => {
  res.send('success')
})

app.listen(3000, () => {
  console.log(`Express is running on http://localhost:3000`)
})
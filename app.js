const express = require('express')
const app = express()
// setting template engine
const exphbs = require('express-handlebars')
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars') // 啟用樣版引擎

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list')

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
  res.render('index')
})

app.listen(3000, () => {
  console.log(`Express is running on http://localhost:3000`)
})
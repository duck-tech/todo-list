const express = require('express')
const app = express()
// setting template engine
const exphbs = require('express-handlebars')
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars') // 啟用樣版引擎
// 載入Todo model 
const Todo = require('./models/todo')
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
  Todo.find() // 從資料庫找資料：取出Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index',{todos})) // 將資料傳給index樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.listen(3000, () => {
  console.log(`Express is running on http://localhost:3000`)
})
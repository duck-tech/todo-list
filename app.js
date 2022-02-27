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
// body-parser
const bodyParser = require('body-parser')



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

app.use(bodyParser.urlencoded({extended: true})) // 用 app.use 指定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.static('public'))


app.get('/',(req,res) => {
  Todo.find() // 從資料庫找資料：取出Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({_id: 'asc'}) // 根據_id升冪排序
    .then(todos => res.render('index',{todos})) // 將資料傳給index樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.get('/todos/new', (req,res) => {
  return res.render('new')
})

app.post('/todos', (req,res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({name}) // 存入資料庫
          .then(() => res.redirect('/')) // 新增完成後導回首頁
          .catch(error => console.log(error))
})

app.get('/todos/:id', (req,res) => {
  const id = req.params.id
  return Todo.findById(id) // 查找資料
            .lean() // 資料轉換成單純的 JS 物件
            .then((todo) => res.render('detail',{todo}))  // 將資料傳給detail樣板
            .catch(error => console.error(error)) 
})

app.get('/todos/:id/edit' ,(req,res) => {
  const id = req.params.id
  return Todo.findById(id)
            .lean()
            .then((todo) => res.render('edit',{todo}))
            .catch(error => console.log(error))
})

app.post('/todos/:id/edit' , (req, res) => {
  const id = req.params.id 
  const {name,isDone} = req.body
  return Todo.findById(id)
            .then(todo => {
              todo.name = name
              todo.isDone = isDone === 'on'
              return todo.save()
            })
            .then(() => res.redirect(`/todos/${id}`))
            .catch(error => console.log(error))
})

app.post('/todos/:id/delete' , (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
            .then(todo => todo.remove())
            .then(() => res.redirect('/'))
            .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log(`Express is running on http://localhost:3000`)
})
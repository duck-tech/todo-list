const express = require('express')
const app = express()
// setting template engine
const exphbs = require('express-handlebars')
// body-parser
const bodyParser = require('body-parser')
// mothod-override
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

// 使用者登入
const flash = require('connect-flash')
const session = require('express-session')
const usePassport = require('./config/passport')

console.log(process.env)



console.log('-----------')
console.log(process.env)
// 如果在 Heroku 環境則使用 process.env.PORT
const PORT = process.env.PORT
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars') // 啟用樣版引擎

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true})) // 用 app.use 指定每一筆請求都需要透過 body-parser 進行前置處理

usePassport(app)
app.use(flash())

// 這個middleware會做用於所有路由
app.use((req,res,next) => {
  //res.locals：所有樣板都可以使用的變數
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)
app.use(express.static('public'))





app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})

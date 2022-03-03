const express = require('express')
const session = require('express-session')
const app = express()
// setting template engine
const exphbs = require('express-handlebars')
// body-parser
const bodyParser = require('body-parser')
// mothod-override
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')
// 如果在 Heroku 環境則使用 process.env.PORT
const PORT = process.env.PORT || 3000
app.engine('handlebars',exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars') // 啟用樣版引擎

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true})) // 用 app.use 指定每一筆請求都需要透過 body-parser 進行前置處理
app.use(routes)
app.use(express.static('public'))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
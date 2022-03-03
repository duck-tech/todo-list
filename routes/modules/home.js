const express = require('express')
const router = express.Router()

// 引用todo model
const Todo = require('../../models/todo')

// 定義首頁路由
router.get('/',(req,res) => {
  const userId = req.user._id
  Todo.find({userId}) // 從資料庫找資料：取出Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({_id: 'asc'}) // 根據_id升冪排序
    .then(todos => res.render('index',{todos})) // 將資料傳給index樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router
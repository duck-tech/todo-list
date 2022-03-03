const mongoose = require('mongoose') // 載入 mongoose
const Schema = mongoose.Schema // 
const todoSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type:Boolean,
    default: false
  },
  userId : {
    type : Schema.Types.ObjectId, // 定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
    ref : 'User', // 參考對象是user model
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Todo',todoSchema)
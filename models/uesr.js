const mongoose = require('mongoose') // 載入 mongoose
const Schema = mongoose.Schema // 
const userSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  creatAt: {
    type:Date,
    default: Date.now
  }
})
module.exports = mongoose.model('User',userSchema)
module.exports = {
  authenticator:(req,res,next) => { 
    if(req.isAuthenticated()){ // passport.js 提供的函示,會根據 request 的登入狀態回傳 true 或 false。
      return next()
    }
    req.flash('warning_msg','請先登入才能使用！')
    res.redirect('/users/login')
  }
}
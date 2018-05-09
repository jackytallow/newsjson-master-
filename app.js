//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  data:{
    servsers:"http://127.0.0.1/wechat/toutiao.json"   //pc编辑器开发时使用地址。 放在data 文件中，大家取出来放到自己的服务上。记住把 不校验请求域名勾上!
  }
})
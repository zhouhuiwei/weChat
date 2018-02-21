//app.js
App({
  onLaunch: function (options) {
    
    console.log(options);
    var that=this;
    //验证授权
    wx.request({
      url: this.globalData.host + "GetDiscription",
      data: { page: 'authority' },
      method: 'POST',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      success: function (e) {
        console.log(e.data);
        that.globalData.authority = e.data;
      }
    });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log("未授权");
          wx.authorize({
            scope: 'scope.userInfo',
            success: function(res){
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  onShow: function(options){
    console.log("onShow:"+options);
    
  },
  globalData: {
    userInfo: null,
    //host: "http://localhost:8080/shenfei"
    host: "https://miracle.duapp.com/",
    authority: '是'
  }
})

App({
  globalData: {
    systemInfo: {},
    userInfo: ''
  },

  onLaunch: function(msg) {
    var that = this
    wx.getSystemInfo({
      success: function(res) { that.globalData.systemInfo = res }
    })

    wx.getStorage({
      key: 'bright',
      success: function (e) {
        wx.setScreenBrightness({ value: e.data / 100 })      
      },
      fail: function () {
        wx.setScreenBrightness({ value: 0.1 })
      }
    })
  }
})


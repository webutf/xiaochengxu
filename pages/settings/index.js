
Page({
  data: {
    sliderValue: ''
  },

  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({ title: '设置' })
    wx.getStorage({
      key: 'bright',
      success: function(e) {
        that.setData({ sliderValue: e.data })
      },
      fail: function() {
        that.setData({ sliderValue: 10 })
      }
    })

  },

  sliderChange: function (e) {
    wx.setStorage({ key: 'bright', data: e.detail.value })
    wx.setScreenBrightness({ value: e.detail.value / 100 })
  },

  primary: function () {
    wx.vibrateLong()
  },

  addContract: function() {
    wx.addPhoneContact({
      nickName: '中国联通',
      mobilePhoneNumber: '10010'
    })
  },

  clearStorage: function() {
    wx.clearStorage()
    wx.showToast({ title: '清除成功', icon: 'success'})
    this.setData({ sliderValue: 30 })
    wx.setScreenBrightness({ value: 0.3 })
  },

  getUserInfo: function () {
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            console.log(res.userInfo)
            that.setData({ userInfo : res.userInfo })
          }
        })
      }
    })
  }
})
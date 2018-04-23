
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    circular: true,
    activeColor: '#09bb07',
    flashUrls: [
      '../../assets/img/flash/1.jpg',
      '../../assets/img/flash/2.jpg',
      '../../assets/img/flash/3.jpg',
      '../../assets/img/flash/4.jpg'
    ],

    showPhone: false,
    showMask: false,
    disabled: false,
    inputValue: '10086'
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: 'webnian.com' })
  },

  onReady: function () {
    
  },

  onShow: function () {

  },

  navigator: function(e) {
    if (e.currentTarget.dataset.num == 0) {
      this.setData({
        showMask: true,
        showPhone: true,
        disabled: false,
        inputValue: '10086'
      })

    } else if (e.currentTarget.dataset.num == 1) {
      wx.scanCode({
        onlyFromCamera: false,
        success: function(res) {
          console.log(res)
          wx.showModal({
            title: '扫码结果',
            content: res.result,
            showCancel: false
          })
        }
      })
    } 
  },

  hideMask: function() {
    this.setData({
      showMask: false,
      showPhone: false
    })
  },

  bindInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
    if (e.detail.value.length > 4 || e.detail.value == '') {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  makePhoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.inputValue || '10086',
    })
  },

  onUnload: function () {
  
  },

  onHide: function () {
    this.setData({
      showPhone: false,
      showMask: false,
    })
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
    return {
      title: '分享给好友',
      path: '/page/index',
      success: function(res) {
        console.log(res)
      }
    }
  }
})

var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
Page({
  data: {
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '照相机' })
  },

  onReady: function () {
    
  },

  onShow: function () {
    
  },

  bindChange: function(e) {
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        sourceTypeIndex: e.detail.value
      })
    } else if (e.currentTarget.dataset.id == 2) {
      this.setData({
        sizeTypeIndex: e.detail.value
      })
    } else if (e.currentTarget.dataset.id == 3 ) {
      this.setData({
        countIndex: e.detail.value
      })
    } 
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.imageList
    })
  },

  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: this.data.count[this.data.countIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      sourceType: sourceType[this.data.sourceTypeIndex],
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  onPullDownRefresh: function () {
    
  },

  onReachBottom: function () {
    
  }
})
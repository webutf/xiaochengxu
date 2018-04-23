var utils = require('../../utils/util')
var app = getApp()
var toggleLock = false
var loadLock = false

Page({
  data: {
    currentTab: 0,
    windowWidth: app.globalData.systemInfo.windowWidth,
    windowHeight: app.globalData.systemInfo.windowHeight,
    category: [
      { id: 0, name: '文本笑话大全' },
      { id: 1, name: '图片笑话大全' },
      { id: 2, name: '动态搞笑图' }
    ],
    textList: [],
    imageList: [],
    gifList: []
  },

  onLoad: function () {
    wx.showLoading({ title: '加载中...' })
    this.load(1)
    wx.setNavigationBarTitle({ title: this.data.category[0].name })
  },
 
  toggle: function(e) {
    if (toggleLock || loadLock || this.data.currentTab == e.target.dataset.id) {
      return 0
    }

    toggleLock = loadLock = true
    this.setData({ 
      currentTab: e.target.dataset.id
    })
    if (this.data.currentTab == 0 && this.data.textList.length == 0) {
      wx.showLoading({ title: '加载中...' })
      this.load(1)
    } if (this.data.currentTab == 1 && this.data.imageList.length == 0) {
      wx.showLoading({ title: '加载中...' })
      this.load(1)
    } if (this.data.currentTab == 2 && this.data.gifList.length == 0) {
      wx.showLoading({ title: '加载中...' })
      this.load(1)
    } else {
      toggleLock = loadLock = false
    }

    wx.setNavigationBarTitle({ title: this.data.category[this.data.currentTab].name })
  },

  bindscrolltolower: function () {
    if (loadLock) {
      return 0
    }
    loadLock = true
    if (this.data.currentTab == 0) {
      var page = this.data.textList.length / 20 + 1
    } else if (this.data.currentTab == 1) {
      var page = this.data.imageList.length / 4 + 1
    } else if (this.data.currentTab == 2) {
      var page = this.data.gifList.length / 4 + 1
    }
    this.load(page)
  },

  load: function(page) {
    var that = this
    this.noResult(false)

    loadJoke(this.data.currentTab, page, function (res) {
      if (res.length > 0) {
        if (that.data.currentTab == 0) {
          that.setData({ textList: that.data.textList.concat(res) })
        } else if (that.data.currentTab == 1) {
          that.setData({ imageList: that.data.imageList.concat(res) })
        } else if (that.data.currentTab == 2) {
          that.setData({ gifList: that.data.gifList.concat(res) })
        }

      } else {
        that.noResult(true)
      }

      toggleLock = loadLock = false
      wx.hideLoading()
      wx.hideNavigationBarLoading()

    }, function () {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      that.noResult(true)
      toggleLock = loadLock = true
      
    })
  },

  refresh: function() {
    if (loadLock) {
      return 0
    }
    loadLock = true
    if (this.data.currentTab == 0) {
      this.setData({ textList: []})
      this.load(1)
    } else if (this.data.currentTab == 1) {
      this.setData({ imageList: [] })
      this.load(1)
    
    } else if (this.data.currentTab == 2) {
      this.setData({ gifList: [] })
      this.load(1)

    }
  },

  loading: function (toggle) {
    this.setData({
      loading: {
        showLoading: toggle,
        url: utils.URL.loadingImg
      }
    })
  },

  noResult: function(toggle) {
    this.setData({
      toggleResult: {
        showNoResult: toggle,
        url: utils.URL.noResult,
        text: '没有内容'
      }
    })
  },

  showToast: function() {
    wx.showToast({
      title: '数据加载异常',
      image: '../../assets/img/about.png',
      duration: 1000
    })
  }
})  

function loadJoke(id, page, success, fail) {
  wx.showNavigationBarLoading()
  wx.request({
    url: utils.URL.loadJoke+(id+1),
    data: {
      showapi_appid: '28568',
      showapi_sign: 'f831a7115f9b44ea8b63fea20f83efff',
      page: page || 1,
      maxResult: id == 0 ? 20 : 4
    },
    success: function (res) {
      if (!res.showapi_res_code) {
        res = res.data.showapi_res_body.contentlist ? res.data.showapi_res_body.contentlist : []
        if (id == 1) {
          for (var i=0,len=res.length; i<len; i++) {
            res[i].img = res[i].img.replace('http','http')
          }
        }
        success && success(res)
      }
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      toggleLock = loadLock = false
    },
    fail: function () {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      toggleLock = loadLock = false
      fail && fail()
    }
  })
}

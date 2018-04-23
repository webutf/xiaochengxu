var utils = require('../../utils/util')
var app = getApp()
var listImage = []
var showImageList = []
var thisListLength = 0
var scrollToggle = false

var duanziList = []
Page({
  data: {
    imageTitle:['图片','段子'],
    showImageList: [],
    duanziList: [],
    currentTab: 0,
    height: app.globalData.systemInfo.windowHeight,
  },  
  onReady: function() {
    wx.setNavigationBarTitle({ title: 'webnian图片' })
  },

  onLoad: function() {
    var that = this
    this.loading()
    loadContent(1, 10, function (res) {
      listImage = res.contentlist
      showImageList = listImage.slice(0, 4)
      that.setData({
        showImageList: showImageList
      })
      that.hideLoading()
    })
  },

  swipterChange: function (e) {
    wx.setNavigationBarTitle({ title: 'webnian' + this.data.imageTitle[e.detail.current] })
    this.setData({ 
      currentTab: e.detail.current 
    })
    this.loadChangeData()
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  loadChangeData: function() {
    var that = this
    if (this.data.currentTab == 0 && listImage.length == 0) {
      this.loading()
      loadContent(1, 10, function (res) {
        listImage = res.contentlist
        showImageList = listImage.slice(0, 4)
        that.setData({
          showImageList: showImageList
        })
        that.hideLoading()
      })

    } else if (this.data.currentTab == 1 && duanziList.length == 0) {
      this.loading()
      loadContent(1, 29, function (res) {
        duanziList = duanziList.concat(res.contentlist)
        that.setData({
          duanziList: duanziList
        })
        that.hideLoading()
      })
    } 
  },

  scrollToLower: function (e) {
    var that = this
    if (scrollToggle) {
      return 0
    }

    scrollToggle = true
    if (this.data.currentTab == 0) {
      thisListLength = showImageList.length

      if (thisListLength < listImage.length-2) {
        showImageList = showImageList.concat(listImage.slice(thisListLength, thisListLength+2))
        this.setData({
          showImageList: showImageList
        })
        setTimeout(function () {
          scrollToggle = false
        }, 500)

      } else {
        wx.showNavigationBarLoading()
        var page=listImage.length  / 20 + 1
        loadContent(page, 10, function (res) {
          listImage = listImage.concat(res.contentlist)
          showImageList = showImageList.concat(listImage.slice(thisListLength, thisListLength + 2))

          that.setData({
            showImageList: showImageList
          })
          setTimeout(function () {
            scrollToggle = false
          }, 500)
          that.hideLoading()
        })
      } 

    } else if (this.data.currentTab == 1) {
      wx.showNavigationBarLoading()
      var page = duanziList.length / 20 + 1
      loadContent(page, 29, function (res) {
        duanziList = duanziList.concat(res.contentlist)

        that.setData({
          duanziList: duanziList
        })
        setTimeout(function () {
          scrollToggle = false
        }, 500)
        that.hideLoading()
      })
    } 
  },

  loading: function() {
    wx.showNavigationBarLoading()
    wx.showLoading({ title: '加载中...' })
  },

  hideLoading: function() {
    setTimeout(function () {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
    }, 300)
  }
})  

function loadContent(page, type, fn) {
  wx.request({
    url: 'https://route.showapi.com/255-1',
    data: {
      showapi_appid: '28568',
      showapi_sign: 'f831a7115f9b44ea8b63fea20f83efff',
      type: type || 10,
      page: page || 1
    },
    success: function (res) {
      if (!res.data.showapi_res_code) {
        res = res.data.showapi_res_body.pagebean
        for(var i=0,len=res.contentlist.length;i<len;i++){
          res.contentlist[i].image0 = res.contentlist[i].image0 && res.contentlist[i].image0.replace('http', 'https')
          res.contentlist[i].profile_image = res.contentlist[i].profile_image.replace('http','https')
        }
        fn && fn(res)
      }
    },
    fail: function (res) {
      wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.showToast({
        title: '加载失败!',
        image: '../../assets/img/about.png',
        duration: 1000
      })
    }
  })
}
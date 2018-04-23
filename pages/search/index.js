var utils = require("../../utils/util.js");
var app = getApp()

Page({
  data: {
    searchPr: '',
    pr: '',
    idNum: '',
    idInfo: '',
    mobile: app.globalData.systemInfo
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '搜索-查询' })
    this.loadPrData('webnian.com')
  },

  inputSearchPr: function(e) {
    this.setData({ searchPr: e.detail.value })
  },

  btnSearchPr: function() {
    if (!this.data.searchPr) {
      return this.showToast('输入域名!')
    } else {
      this.loadPrData(this.data.searchPr)
    }
  },

  inputSearchId: function(e) {
    this.setData({ idNum: e.detail.value })
  },

  searchId: function() {
    if (this.data.idNum.length == 0) {
      this.setData({ idInfo: '' })
      return this.showToast('输入身份证号!')
    }
    if (this.data.idNum.length < 18) {
      this.setData({ idInfo: '' })
      return this.showToast('身份证号输入不正确!')
    } else {
      this.loadIdData(this.data.idNum)
    }
  },

  onPullDownRefresh: function () {
    this.setData({
      searchPr: '',
      pr: '',
      idNum: '',
      idInfo: '',
    })
    this.onLoad()
    setTimeout(function() {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  hideLoading: function() {
    wx.hideLoading()
    wx.hideNavigationBarLoading()
  },

  showToast: function(text) {
    wx.showToast({
      title: text,
      image: '../../assets/img/about.png',
      duration: 1000
    })
  },

  loadPrData: function(com) {
    var that = this
    prSearch(com, function (res) {
      if (res.data.showapi_res_code == 0) {
        res = res.data.showapi_res_body
        if (res.ret_code == 0) {
          that.setData({ pr: res.pr })
          wx.hideNavigationBarLoading()
        } else {
          that.hideLoading()
        }
      } else {
        that.setData({ pr: '' })
        that.hideLoading()
        that.showToast('pr数据加载异常!')
      }


    }, function () {
      that.hideLoading()
      that.showToast('pr数据加载异常!')
    })
  },

  loadIdData: function(id) {
    var that = this
    that.setData({ idInfo: '' })
    idSearch(id, function (res) {
      if (res.data.showapi_res_code == 0) {
        res = res.data.showapi_res_body
        if (res.errNum == 0) {
          that.setData({ idInfo: res.retData })
          wx.hideNavigationBarLoading()
        } else {
          that.hideLoading()
          that.showToast(res.retMsg)
        }
      } else {
        that.hideLoading()
        that.showToast('数据加载异常!')
      }


    }, function () {
      that.hideLoading()
      that.showToast('数据加载异常!')
    })
  }
})

function prSearch(name, success, fail) {
  wx.showNavigationBarLoading()
  wx.request({
    url: "https://route.showapi.com/118-40",
    data: {
      showapi_appid: '28568',
      showapi_sign: 'f831a7115f9b44ea8b63fea20f83efff',
      name: name
    },
    success: function (res) {
      success && success(res)
    },
    fail: function () {
      fail && fail()
    }
  })
}

function idSearch(id, success, fail) {
  wx.showNavigationBarLoading()
  wx.request({
    url: "https://route.showapi.com/25-3",
    data: {
      showapi_appid: '28568',
      showapi_sign: 'f831a7115f9b44ea8b63fea20f83efff',
      id: id 
    },
    success: function (res) {
      success && success(res)
    },
    fail: function () {
      fail && fail()
    }
  })
}
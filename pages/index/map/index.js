var bmap = require('../../../assets/plugins/bmap-wx.min.js'); 
var app = getApp()
var wxMarkerData = [];

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},

    controls: [{
      id: 0,
      iconPath: '../../../assets/img/marker_red.png',
      position: {
        left: 0,
        top: 0,
        width: 20,
        height: 20
      },
      clickable: true
    }]
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
  },
  onLoad: function () {
    var that = this;

    var BMap = new bmap.BMapWX({
      ak: 'r9hvVAnXVEyeYm0ZjTffGeDk6O8pRno8'
    })

    var fail = function (data) {
      console.log(data)
    }

    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude
      })
    }
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../../assets/img/marker_red.png',
      iconTapPath: '../../..assets/img/marker_red.png'
    })
  }

})
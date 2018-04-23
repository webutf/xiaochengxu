var URL = {
  loadJoke: 'https://route.showapi.com/341-',
  loadingImg: '../../../assets/img/loading.gif',
  noResult: '../../../assets/img/noimg.png',
  weather: 'https://route.showapi.com/9-2'
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(toDouble).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function toDouble(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatSeconds(seconds) {
  if (seconds <= 0) {
    return 0
  }
  var minutes = Math.floor(toDouble(seconds / 60))
  seconds = toDouble(seconds % 60)
  return minutes + ":" + seconds
}

// 日期格式20160203
function getFormatDate(str) { 
  var YEAR = str.substring(0, 4)
      MONTH = str.substring(4, 6)
      DATE = str.slice(-2)

  var dataDay = YEAR + '/' + MONTH + '/' + DATE
  var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  day = new Date(dateDay).getDay()

  var dateBefore = new Date(new Date(dateDay) - 1000 * 60 * 60 * 24).toLocaleDateString();
        var dateBefore = dateBefore.split('/');
        if( dateBefore[1] < 10 ) {
            dateBefore[1] = '0' + dateBefore[1];
        }
        if( dateBefore[2] < 10 ) {
            dateBefore[2] = '0' + dateBefore[2];
        }
        dateBefore = dateBefore.join('');

  return {
    "dateDay": MONTH + "月" + DATE + "日 " + week[day]
  }
}

module.exports = {
  URL,
  formatTime,
  toDouble,
  formatSeconds,
  getFormatDate
}

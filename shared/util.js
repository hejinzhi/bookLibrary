//参数是时间戳
function formatTime(ms) {
  // 86400000
  var newDate = new Date();
  newDate.setTime(ms);
  //console.log(newDate.toLocaleString());
  return newDate.toLocaleDateString();
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}






function showLoading() {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 10000
  });
}

function hideLoading() {
  wx.hideToast();
}

function showSuccess(msg, time, cb) {

  wx.showToast({
    title: msg,
    icon: 'success',
    duration: time
  });

  setTimeout(function () {
    cb();
  }, time);

}



function getObjectKeys(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}

function getObjectValues(obj) {
  var values = [];
  for (var key in obj) {
    values.push(obj[key]);
  }
  return values;
}




module.exports = {
  formatTime: formatTime,
  showLoading: showLoading,
  hideLoading: hideLoading,
  showSuccess: showSuccess,
}
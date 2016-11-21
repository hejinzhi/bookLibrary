function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


  function request(option){
    return new Promise(function(resolve,reject){
      wx.request({
        url: option.url,
        data: option.data?option.data:{},
        method: option.method?option.method:'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          //console.log('success');
          resolve(res);
        },
        fail: function(err) {
          // fail
          //console.log(err);
          reject(err);
        },
        complete: function() {
          //console.log('complete');
          // complete
        }
      })
    });
  }

  function showLoading(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
  }

  function hideLoading(){
     wx.hideToast();
  }

  function showSuccess(msg,time){
    return new Promise(function(resolve,reject){
      wx.showToast({
        title: msg,
        icon: 'success',
        duration: time
      });

      setTimeout(function(){
        resolve();
      },time);
    });
  }

//因为后端返回的数据并不是json格式，使用这个function组合出一个jsonjson object
//DB去掉json data栏位，点击detail后再根据isbn去豆瓣查找详细信息
  // function genBookData(res){
  //     var books=[];
  //     for(var i=0;i<res.data.length;i++){
  //       var book=JSON.parse(res.data[i].JSON_DATA);
  //       var bookQty=res.data[i].QTY;
  //       book["qty"]=bookQty;
  //       books.push(book);
  //     }
  //     return books;
  // }

function genBookData(res){
      var books=[];
      for(var i=0;i<res.data.length;i++){
        var book=res.data[i];
        books.push(book);
      }
      return books;
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

function getISBN13(){
  var ISBN13=['9787115362865','9787302315582','9787121260742','9787302348672','9787302367598',
  '9787111499756','9787121269370','9787302386414','9787115340498','9787121253799'];
  var index=parseInt(Math.random()*10);
  return ISBN13[index];


}

module.exports = {
  formatTime: formatTime,
  request:request,
  showLoading:showLoading,
  hideLoading:hideLoading,
  genBookData:genBookData,
  showSuccess:showSuccess,
  getISBN13:getISBN13
}

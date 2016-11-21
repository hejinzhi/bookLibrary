//index.js
//获取应用实例
var app = getApp();
var config = require('../../utils/config');
var url = config.url;
var util = require('../../utils/util');
var db = require('../../utils/db');

Page({
  data: {
    bookList: [],
    inputValue: ''
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onload index')
    var that = this;

    //1.获取用户的基本信息，查询数据库获取用户的工号，并使用缓存存在本机
    // app.getUserInfo(function(userInfo){
    //   console.log(userInfo);
    // });


    //2.从数据库获取所有书本的信息
    var sql = "select ID,title,AUTHOR,AUTHOR_INTRO,IMAGE,ISBN10,ISBN13,PAGES,PRICE,PUBDATE,QTY,PUBLISHER from moa_book_library order by title ";
    var params = {
      sql: sql
    };

    util.showLoading();
    db.executeSql(params).then(function (res) {
      var books = util.genBookData(res);
      that.setData({
        bookList: books
      });
      util.hideLoading();
    });

  },
  queryBooks: function (e) {
    var that = this;
    var sql = "select ID,title,AUTHOR,AUTHOR_INTRO,IMAGE,ISBN10,ISBN13,PAGES,PRICE,PUBDATE,QTY,PUBLISHER from moa_book_library where upper(title) like upper('%" + that.data.inputValue + "%') order by title";
    var params = {
      sql: sql
    };

    util.showLoading();
    db.executeSql(params).then(function (res) {

      var books = util.genBookData(res);

      that.setData({
        bookList: books
      });
      util.hideLoading();
    })
  },
  goToDetailPage: function (e) {
    var isbn13 = e.currentTarget.id;
    var qty = e.currentTarget.dataset.qty;
    wx.navigateTo({
      url: '../detail/detail?id=' + isbn13 + '&qty=' + qty
    });
  },
  onShow: function () {
    // 页面显示
    console.log('onload index')
  },

})

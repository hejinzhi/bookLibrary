var app = getApp();
var url=app.url;
var util=require('../../utils/util');
var db=require('../../utils/db');
var isbn13;
var qty;
Page({
  data:{
    bookMsg:{},
    isLoading:true, //是否正在读取数据
    windowWidth:'',
    windowHeight:'',
    pixelRatio:'',
    showBorrowBtn:false, //是否显示 借阅 按钮
    showBookBtn:false, //是否显示 预约 按钮
    showAddBook:false, //是否显示 录入 按钮
    addBookQty:1 //默认的录入数量
  },
  inputChange:function(e){
    this.data.addBookQty = e.detail.value;
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var that=this;
    

    //1.动态获取设备屏幕的高度，然后计算scroll view的高度
    wx.getSystemInfo({
      success:function(res){
        that.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight,
          pixelRatio:res.pixelRatio
        });
      }
    });


  //2.从豆瓣查询某本书的相关信息
    isbn13=options.id;
    //qty=options.qty;
    //util.showLoading();
    that.setData({
        isLoading:false
    });

    db.selectBookFromDouban(isbn13).then(function(res){
        var book=res.data;

        if(options.qty){
          book["qty"]=options.qty;
          qty=options.qty;
        }

        if(options.addBook){
            that.setData({
              showAddBook:true
            });
        }
        
        //qty>0 代表从主页面点击图书，且图书可借数量大于0，显示借阅按钮
        if(options.qty>0){
          that.setData({
            bookMsg:book,
            isLoading:true,
            showBorrowBtn:true,
            showBookBtn:false
          });
        }
        //qty=0 代表从主页面点击图书，且图书可借数量等于0，显示预约按钮
        else if(options.qty==0){
           that.setData({
            bookMsg:book,
            isLoading:true,
            showBorrowBtn:false,
            showBookBtn:true
          });
        }
        //qty=undifine 代表从录入页面转跳过来，显示 录入按钮
        else{
            that.setData({
              bookMsg:book,
              isLoading:true,
              showBorrowBtn:false,
              showBookBtn:false
            });
        }
        //util.hideLoading();
    });




  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  },
  borrowBook:function(){
    //借书
    util.showLoading();
    var options={
      //sql:"INSERT INTO MOA_BOOK_BORROW_DETAILS_ALL(EMPNO,BOOK_ID,BORROW_DATE) VALUES('FE717','"+isbn13+"',SYSDATE)"
      tableName:'MOA_BOOK_BORROW_DETAILS_ALL',
      EMPNO:'FE717',
      BOOK_ID:isbn13
    }

    db.insertData(options).then(function(res){
      util.hideLoading();
      if(res.data.rowsAffected==1){
        //图书可借数量-1
        var updateOptions={
          tableName:'MOA_BOOK_LIBRARY',
          setColumns:{
            qty:qty-1
          },
          whereColumns:{
            ISBN13:isbn13
          }
        };
        db.updateData(updateOptions).then(function(res){
          console.log(res);
        });

        //提示借阅成功,正常应该刷新主页面，更新qtyqty，但考虑到速度慢，就暂时不刷新
        util.showSuccess('已成功借阅！',2000).then(function(){
          wx.navigateBack();
        });
      }else{
        util.showSuccess('借阅失败，请联系管理员！',2000).then(function(){
          wx.navigateBack();
        });
      }
    });

    //console.log(getCurrentPages());
  },
  addBook:function(e){
    // console.log(isbn13);
    var that=this;
    var bookMsg=this.data.bookMsg;
    var params={
      tableName:'MOA_BOOK_LIBRARY',
      id:bookMsg.id,
      author:bookMsg.author.join(','),
      author_intro:bookMsg.author_intro,
      image:bookMsg.image,
      isbn10:bookMsg.isbn10,
      isbn13:bookMsg.isbn13,
      pages:bookMsg.pages,
      price:bookMsg.price,
      publisher:bookMsg.publisher,
      title:bookMsg.title,
      qty:that.data.addBookQty
    };

    wx.showToast({
      title: '录入中...',
      icon: 'loading',
      duration: 10000
    });

    db.insertData(params).then(function(res){
      // console.log(res);
      if(res.data.rowsAffected >=1){
        util.hideLoading();
        util.showSuccess('录入成功!',2000).then(()=>{
           wx.navigateBack();
        });
       
      }else{
        console.log(res.data.rowsAffected);
      }


    });
    // console.log(this.data.addBookQty);

  }
})
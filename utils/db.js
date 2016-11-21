var util=require('./util')
var config=require('./config');
var url=config.url;

function selectBooks(params){
    var option={
      method:'POST',
      url:url+'select',
      data:params
    };

    return new Promise(function(resolve,reject){
        util.request(option).then(function(res,err){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    })
}

function selectBookFromDouban(isbn13){
    var option={
      method:'GET',
      url:config.doubanUrl+isbn13
    };

    return new Promise(function(resolve,reject){
        util.request(option).then(function(res,err){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    })
}

function executeSql(params){
    var option={
      method:'POST',
      url:url+'executeSql',
      data:params
    };
    // var option={
    //   method:'GET',
    //   url:config.doubanUrl+'9787302308812',
    //   data:params
    // };

    return new Promise(function(resolve,reject){
        util.request(option).then(function(res,err){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    })

}

function insertData(params){
    var option={
      method:'POST',
      url:url+'insert',
      data:params
    };

    return new Promise(function(resolve,reject){
        util.request(option).then(function(res,err){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}

function updateData(params){
    var option={
      method:'POST',
      url:url+'update',
      data:params
    };

    return new Promise(function(resolve,reject){
        util.request(option).then(function(res,err){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}



module.exports={
    selectBooks:selectBooks,
    executeSql:executeSql,
    selectBookFromDouban:selectBookFromDouban,
    insertData:insertData,
    updateData:updateData
}
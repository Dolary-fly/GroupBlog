var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'blog',
});


function havelike(msg,user,callback){
var  findSql = 'select * from ' +  msg.author  +' where  user = ? and likeblog = ?';
var  find_data = [user, msg.file];
console.log(msg);
console.log('findSql' + findSql);
connection.query(findSql,find_data,function (err, result) {
          if(err){
                console.log('查找错误 - ',err.message);
              return;
                }
                else if (result.length != 0) {
                  console.log(result);
                  callback(1);
                }
                else{
                  console.log(result);
                  callback(0);
                }

});

};

exports.havelike = havelike;

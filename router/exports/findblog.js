var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'blog',
});

function findblog (msg,callback){
  var  findSql = 'SELECT * FROM blogmsg where author = ?';
  var find_data = [msg.author]
  console.log(msg.author);
  connection.query(findSql,find_data,function (err, result) {
          if(err){
           console.log('find ERROR - ',err.message);
           return;
          }
         console.log('--------------------------INSERT----------------------------');
         //console.log('INSERT ID:',result.insertId);
         console.log('find ID:',result);
         console.log('-----------------------------------------------------------------\n\n');
         callback(result);
         return;
  });
}
exports.findblog = findblog;

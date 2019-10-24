var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'blog',
});

function blogauthor (msg,callback){
  var  findSql = 'SELECT * FROM blogmsg where author = ? and title = ?';
  var find_data = [msg.author,msg.file];
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

         callback(result[0]);
         return;
  });
}
exports.blogauthor = blogauthor;

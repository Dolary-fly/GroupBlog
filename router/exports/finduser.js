var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xiyounet',
  database: 'blog',
});

function finduser (msg,callback){
  console.log(msg);
  var  findSql = 'SELECT username,groupis FROM user where username = ?';
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

         callback(result[0]);
         return;
  });
}
exports.finduser = finduser;

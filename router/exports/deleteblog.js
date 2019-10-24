var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'blog',
});

function deleteblog(msg,callback){
var  deleteSql = 'DELETE from blogmsg where author = ? and title = ?';
var  delete_data = [msg.author,msg.title];
console.log(delete_data);
connection.query(deleteSql,delete_data,function (err, result) {
          if(err){
                console.log('[删除错误] - ',err.message);
              return;
                }
                console.log('--------------------------INSERT----------------------------');
                //console.log('INSERT ID:',result.insertId);
                console.log('删除结果:',result);
                console.log('-----------------------------------------------------------------\n\n');
                //callback(result);
                callback(result);
                return;
});

};


exports.deleteblog = deleteblog;

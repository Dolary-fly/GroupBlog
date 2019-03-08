var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xiyounet',
  database: 'blog',
});

function favblog(msg,callback){   //msg中要作者，博客名，点赞的人（用户id）
console.log(msg);
var  addSql = 'INSERT INTO ' +  msg.author + ' (likeblog,user) VALUES(?,?)';
var  add_data = [msg.title, msg.user];
var   find_data = '';
var  find_Sql = 'select *  from ' + msg.author;
connection.query(addSql,add_data,function (err, result) {
          if(err){
                console.log('[INSERT ERROR] - ',err.message);
              return;
                }
          else {
            connection.query(find_Sql,function (err, result) {
              if(err){
               console.log('[查询出错] - ',err.message);
               return;
              }
              else{
                console.log('--------------------------INSERT----------------------------');
                //console.log('INSERT ID:',result.insertId);
                console.log('查询结果:',result);
                console.log('-----------------------------------------------------------------\n\n');

                var count = result.length;
                var  uplike_Data = [count,msg.title ,msg.author];
                var  uplike_Sql = 'update blogmsg set favor = ? where title = ? and author = ?';
                console.log(uplike_Data);
                connection.query(uplike_Sql,uplike_Data,function (err, result) {
                          if(err){
                                console.log('[updata ERROR] - ',err.message);
                              return;
                                }
                                console.log('--------------------------INSERT----------------------------');
                                //console.log('INSERT ID:',result.insertId);
                                console.log('更新结果:',result);
                                console.log('-----------------------------------------------------------------\n\n');
                                //callback(result);
                                callback(count);
                                return;
                });
              }
            });
          }
});

};


exports.favblog = favblog;

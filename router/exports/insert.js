var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xiyounet',
  database: 'blog',
});

function insert(msg,callback){
var  addSql = 'INSERT INTO blogmsg(title,author,date,class,favor) VALUES(?,?,?,?,?)';
var  add_data = [msg.title, msg.author, msg.date, msg.class, msg.favor];
var  findSql = 'SELECT * FROM blogmsg where title = ? and author = ? ';
var  find_data = [msg.title,msg.author];
console.log(add_data);
connection.query(findSql,find_data,function (err, result) {
  if(err){
        console.log('[find ERROR] - ',err.message);
        return;
      }
      else if(result.length != 0)
      {
        console.log("该博客此标题已经取过");
        back = 2;
        callback(back);
      }
      else{
        connection.query(addSql,add_data,function (err, result) {
                  if(err){
                        console.log('[INSERT ERROR] - ',err.message);
                      return;
                        }
                        console.log('--------------------------INSERT----------------------------');
                        //console.log('INSERT ID:',result.insertId);
                        console.log('插入结果:',result);
                        console.log('-----------------------------------------------------------------\n\n');
                        //callback(result);
                        back =1;
                        callback(result);
                        return;
        });
      }
});
};


exports.insert = insert;

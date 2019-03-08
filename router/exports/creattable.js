var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xiyounet',
  database: 'blog',
});

function newtable(msg,callback){
var creatname = msg;
console.log(creatname);
var  newSql = 'CREATE TABLE ' + creatname + '(likeblog varchar(255), user varchar(255))';
console.log(newSql);
connection.query(newSql,function (err, result) {
          if(err){
                console.log('创建错误 - ',err.message);
              return;
                }
                console.log('--------------------------INSERT----------------------------');
                //console.log('INSERT ID:',result.insertId);
                console.log('创建表格成功');
                console.log('-----------------------------------------------------------------\n\n');
                //callback(result);

                return;
});

};
exports.newtable = newtable;

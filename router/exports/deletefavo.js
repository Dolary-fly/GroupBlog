var mysql  = require('mysql');
var express=require("express");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'xiyounet',
  database: 'blog',
});

function deletefav(msg,callback){
var  deleteSql = 'DELETE FROM ' + msg.author + ' where likeblog = ? and user = ?';
var  delete_data = [msg.title, msg.user];
var  find_data = '';
var  find_Sql = 'select *  from ' + msg.author;
console.log(delete_data);
connection.query(deleteSql,delete_data,function (err, result) {
          if(err){
                console.log('[delete ERROR] - ',err.message);
              return;
                }
                else {
                  connection.query(find_Sql,function (err, result) {
                    if(err){
                     console.log('[删除出错] - ',err.message);
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


exports.deletefav = deletefav;

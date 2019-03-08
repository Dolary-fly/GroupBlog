var fs = require('fs');
var path = require('path');
function deletefile(msg,callback){
  var fname = {
    author : msg.author,
    title : msg.title + '.md'
  };
  var needfind = '../user/' + fname.author ;
  function finddir(inputPath){
       let files = fs.readdirSync(inputPath)      //同步读取文件
       for(file of files){
           let filePath = inputPath + '/' + file;
           let fileState = fs.statSync(filePath);
           if(fileState.isDirectory()){ // 如果是目录 递归
               finddir(filePath)
           }else if (file == fname.title)
           {
             fs.unlinkSync(filePath)
           }
       }

  }
  finddir(needfind)
  callback(fname.title);
}


exports.deletefile = deletefile;

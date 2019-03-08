var fs = require('fs');
var path = require('path');
function findfile(userid,callback){
  var fname = {
    author : userid,
    title : new Array()
  };
  var needfind = '../user/' + userid ;
  function getDirTree( inputPath){
       let files = fs.readdirSync(inputPath)      //同步读取文件
       for(file of files){
           let filePath = inputPath + '/' + file;
           let fileState = fs.statSync(filePath);
           if(fileState.isDirectory()){ // 如果是目录 递归
               getDirTree(filePath)
           }else{
               fname.title.push(file.slice(0,file.length-3));     //字符串截取，去掉文件后缀
           }
       }

  }
  getDirTree(needfind)
  callback(fname);
}


exports.findfile = findfile;

var fs = require("fs");
function newfile(userid){
  console.log(userid);
  console.log("创建目录" + userid);
  var dirname = '../user/' + userid;        //新建路径字符串拼接
  console.log(dirname);
  fs.mkdir(dirname,function(err){         //使用./代表当前目录
     if (err) {
         return console.error(err);
     }
     var result = dirname + "目录创建成功。";

  });
}

exports.newfile = newfile;

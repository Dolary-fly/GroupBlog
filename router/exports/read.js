var fs = require("fs");
var buf = new Buffer.alloc(60);

console.log("准备打开已存在的文件！");
function readf(readmsg,callback){
  console.log('readms:' + readmsg);
  for(let i = 0;i<readmsg.length;i++)
  {
    var username = readmsg[i].author;
    var fname = readmsg[i].title;
    console.log("username:" + username);
    var date = fs.readFileSync('../user/' + username + '/' + fname + '.md','utf-8');
    readmsg[i].main = date.slice(0,60);
    readmsg[i].main =readmsg[i].main.replace(/=/g,"");
    readmsg[i].main =readmsg[i].main.replace(/\n/g,"");
    readmsg[i].main =readmsg[i].main.replace(/#/g,"");
    readmsg[i].main = readmsg[i].main + '...';
    //console.log(buf.slice(0, bytes).toString());
  //  readmsg[i].main = buf.slice(0, bytes).toString();
    console.log(readmsg[i].main);
  }
    callback(readmsg);
}
exports.readf = readf;

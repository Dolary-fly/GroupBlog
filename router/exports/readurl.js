function readurl (url,callback){
  var urlmsg = {
    author : url.name,
    file : url.title
  }
  callback(urlmsg);
}

exports.readurl = readurl;

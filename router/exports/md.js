 var express = require('express');
 var fs = require('fs');
 var marked = require( "marked" );

function mdmake(msg,callback){
  var path="../user/" + msg.author + "/" + msg.title + ".md";
	fs.readFile(path, function(err, data){
		if(err){
            console.log("文件不存在！");
            console.log(err);
            res.send("文件不存在！");
        }else{
        	  console.log(data);
            htmlStr = marked(data.toString());
            console.log(htmlStr);
            callback(htmlStr);
        }

	});
}


exports.mdmake = mdmake;

var http = require("http");
var express = require("express");
var app = express();
var crypto=require('crypto');
var svgCaptcha = require('svg-captcha');
var salt="acdef";
var mysql  = require('mysql');
var session=require("express-session");
var db=mysql.createConnection({  host:'localhost',
  user:'root',
  password:'123456',
  database: 'blog'});

var cookieParase = require('cookie-parser');
var NewFile = require('./exports/newfile');   //调用newfile模块(新建用户目录)
var FindFile = require('./exports/findfile');         //扫描用户目录
var bodyParser = require('body-parser');
var ReadF = require('./exports/read');          //读取文件内容
var ReadUrl = require('./exports/readurl');       //解析url
var ReturnBlog = require('./exports/returnblog');    //返回所有博客信息
var Insert = require('./exports/insert');           //插入博客信息(返回1代表插入成功，返回2代表已经写过此博客)
var NewTable = require('./exports/creattable');       //新建用户表
var FavBlog = require('./exports/favblog');         //将用户喜欢博客存入用户对应表中
var MdMake = require('./exports/md');             //md文件转换为html字符串
var DeleteFavo = require('./exports/deletefavo');     //删除次点赞信息
var HaveLike = require('./exports/havelike');         //查询该用户是否点赞过
var DeleteFile = require('./exports/deletefile');     //用户删除博客文件
var DeleteBlog = require('./exports/deleteblog');       //用户删除博客数据库
var FindBlog = require('./exports/findblog');         //数据库查找用户主页博客信息
var FindUser = require('./exports/finduser');           //查找用户主页用户信息
var BlogAuthor = require('./exports/blogauthor');           //查找用户主页用户信息
var fs = require('fs');
var multer = require('multer');
const path = require('path');
var bin = multer({dest:'../user'});         //查找用户主页用户信息
var connection = mysql.createConnection({
   host:'localhost',
  user:'root',
  password:'xiyounet',
  database: 'blog'
});
const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParase());
app.use(cors({
      origin: 'http://xiyounet.org',
　　credentials: true
}));


function cryptPwd(password, salt) {
	// 密码“加盐”
	var saltPassword = password + ':' + salt;
	console.log('原始密码：%s', password);
	console.log('加盐后的密码：%s', saltPassword);

	// 加盐密码的md5值
	var md5 = crypto.createHash('md5');
	var result = md5.update(saltPassword).digest('hex');
	console.log('加盐密码的md5值：%s', result);
	return result;
}


connection.connect();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//设置跨域server
app.all('*', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", 'http://xiyounet.org');
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.use(session({
    name:'loginname',
    secret: 'loginandregister',
    cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized:true, //
}));

// app.use(cookieParser());
app.get('/captcha-signup',function(req,res){
	console.log('进入注册验证码请求');
    var option={
    	color:true,
    };
    var captcha = svgCaptcha.createMathExpr(option);

    req.session.randomcode = captcha.text;//注册时候用
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.json({err:false,data:captcha.data})
    // res.status(200).send(captcha.data);
})
app.get('/captcha-login',function(req,res){
	console.log('进入登录验证码请求');
	var option={
		color:true,
	};
	var captcha = svgCaptcha.createMathExpr(option);
	req.session.randomlog = captcha.text;//登录时候使用
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.json({err:false,data:captcha.data})
	// res.status(200).send(captcha.data);
})

app.post('/test',function(req,res){
	console.log('这是测试session');
	var sess = req.session.username;
  console.log("here : " + sess);
})

app.post('/user-register',function(req,res){
    console.log(req.body);
		console.log('验证注册的session' + req.session.randomcode);
    if(req.body.svgcode==req.session.randomcode){
    	console.log("接下来处理数据");
    	var userName=req.body.userName;
    	var password=req.body.password;
    	var groupis=req.body.group;
    	var invicode=req.body.invicode;
    	var svgcode=req.body.svgcode;
    	const nameExp=/^\w{6,20}$/ //名字正则验证
		const passwordExp=/^[A-Za-z0-9_!@#$%^&*]{8,16}$/; //密码正则验证
		const groupExp=/^[\d\u4e00-\u9fa5]{3,5}$/;//组别正则验证
    	console.log("以下是数据结果");
     	console.log(userName,password,groupis,invicode,svgcode);
      	var datasend={};
		var operate1="SELECT * FROM `invitationcode` where `invicode`='"+invicode+"';";
		var operate2="SELECT `username` FROM `user` where `username`='"+userName+"';";
		var operate3='INSERT INTO `user` (username,password,invicode,groupis) values(?,?,?,?)';
      	db.query(operate1,function(err,data){
			if(err){
				console.log(err);
				return;
			}else{
				console.log(data.length);
				if(data.length==0){
					datasend.type="fail";
					datasend.wrongis="邀请码错误";
					res.send(datasend);
				}else{
					console.log("接下来进行后台验证");
					if(!nameExp.test(userName)||!passwordExp.test(password)||!groupExp.test(groupis)){
						return;
					}
					db.query(operate2,function(err,data){
						if(err){
							console.log(err);
							return;
						}
						else{
							console.log('此用户名在数据库出现'+data.length+'次');
							if(data.length>0){
								datasend.type="fail";
								datasend.wrongis="用户名重复";
								res.send(datasend);
							}
							else{
								password=cryptPwd(password, salt);
								console.log("现在是通过验证并且进行过加密的数据");
								console.log(userName,password,groupis,invicode,svgcode);

								console.log("接下来插入数据");
								var param=[userName,password,invicode,groupis];
								db.query(operate3,param,function(err,data){
									if(err){
										console.log(err);
										datasend.type="fail";
										datasend.wrongis="no";
										res.send(datasend);
									}else{
										console.log("插入成功");
                    NewFile.newfile(userName);
                    NewTable.newtable(userName);
										datasend.type="success";
										datasend.wrongis="no";
										res.send(datasend);
									}

								})
							}

						}
					})
					//插入加密并且验证




				}
			}
		})

    }
    else{
      res.send({'wrongis':'验证码错误','type':'fail'});
    }

})


var loginresData={};
app.post('/user-login',function(req,res){
	// if(req.session.username!=null){
	// 	res.send(req.session.username);
	// }else{

  var username=req.body.username;
  //密码加密
  var password=cryptPwd(req.body.password, salt);
  var valicode=req.body.valicode;
  var operate="SELECT password FROM `user` where username='"+username+"';";
  console.log(username,password,valicode);
  console.log('验证登录的session: ' + req.session.randomlog);
  if(valicode==req.session.randomlog)//验证码输入正确
  {
    console.log("进入验证注册");
    db.query(operate,function(err,data){
      if(err){
        console.log(err);
        loginresData.type="fail";
        loginresData.wrongis="数据库错误";
        res.send(loginresData);
        return;
      }else{
        if(data.length==0){
          //用户不存在
          loginresData.type="fail";
		  loginresData.wrongis="用户名不存在";
		  res.send(loginresData);
        }
        else{
			if(data[0].password==password){

				//存储在session中，用户免登录
				req.session.username = username;
				req.session.logged_in = 1;
				loginresData.type="success";
				loginresData.wrongis="no";
				//登录成功，保持状态
				console.log('success : '  + req.session.username );
			}
			else{
				//密码错误
				loginresData.type="fail";
				loginresData.wrongis="密码输入有误";
			}
 			res.send(loginresData);
        }

      }

    })
  }
  else{
	loginresData.type="fail";
	loginresData.wrongis="验证码输入有误";
	res.send(loginresData);
  }
// }
})

app.get('/logout',function(req,res){
	// console.log(req.session.username,req.session.logged_in);
	req.session.destroy(function(err){
		if(err){
			res.json({err:true,logout_message:'退出登录失败',});
			return;
		}
		// res.clearCookie(loginname);
		// console.log(req.session.username,req.session.logged_in);
		res.json({err:false,logout_message:'退出登录成功'});
	})
})

app.post('/getUser',function(req,res){
	console.log("现在输出用户session:"+req.session.username);
	res.send(req.session.username)
});

app.post('/newfile',function(req,res){          //登陆时新建新建文件夹，需要用户名称（ret.id）
  var ret = new Object();        //新建文件夹
          NewFile.newfile(req.body.id,function(result){
          ret.id = result;
				});
          NewTable.newtable(req.body.id,function(result){       //新建用户表同样需要用户名称(req.body.id)demo是从前端获取
            console.log(result);
          ret.msg = result;
          console.log(ret);
          res.send(JSON.stringify(ret));
      });
});

app.post('/findfile',function(req,res){           //扫描目录返回对应目录下的所有文件数组

          FindFile.findfile(req.body.id,function(result){     //id为用户名称也就是文件夹名字
            console.log(result);
					res.send(JSON.stringify(result));
				});
});


app.post('/readf',function(req,res){            //读取文件内容，返回字符串
          ReadF.readf(req.body,function(result){
            console.log(result);
					res.send(JSON.stringify(result));
				});
});

//个人主页的状态返回
app.post('/serurl/',function(req,res){            //解析url
      ReadUrl.readurl(req.body,function(result){
        var back = new Object();
        console.log("session是:" + req.session.username);
         if(req.session.username == result.author)
         {
           back.masterstate = 1;
        }
       else{
            back.masterstate = 2;
        }
        if(req.session.username)//用户登录状态
        {

          back.returnstate = 1;
          back.user = req.session.username;
        }
        else{
          back.returnstate = 2;
        }
        // 以上是根据session判断用户是否为个人中心master
        console.log("masterstate=" + back);
        res.send(JSON.stringify(back));
        //res.send(JSON.stringify(result.author));
      });
});

//个人主页的博客信息返回
app.post('/homeblog',function(req,res){       //返回个人主页的所有博客信息

    ReadUrl.readurl(req.body,function(result){      //先解析url分析出博主的name（作者）
        FindBlog.findblog(result,function(result){       //查找数据库中博主的所有文章
      result_index = result;
      ReadF.readf(result_index,function(result){          //读取文件中博客的主要信息
        console.log(result);
        result_index = result;
        res.send(JSON.stringify(result_index));
      })
    });
      });
});


app.post('/returnblog',function(req,res){           //给主页返回所有博客
          var result_index = [];
          ReturnBlog.returnblog(req.body,function(result){       //查询数据库中的所有文件信息
          result_index = result;
          ReadF.readf(result_index,function(result){          //读取每个博客主要内容
            console.log(result);
            result_index = result;
            res.send(JSON.stringify(result_index));
          })
				});
});

app.post('/insert',function(req,res){             //用户写博客时插入的博客信息，会根据用户是否写过同样文章返回1成功2重复
          Insert.insert(req.body,function(result){       //传输对象
            console.log(result);
					res.send(JSON.stringify(result));
				});
});



app.post('/favblog',function(req,res){        //用户点赞博客时数据库增添
          FavBlog.favblog(req.body,function(result){
            console.log(result);
					res.send(JSON.stringify(result));
				});
});

app.post('/mdmake',function(req,res){         //md文件转换
    ReadUrl.readurl(req.body,function(result){      //解析url知道需要转换的文件
          var ur = result;
          MdMake.mdmake(ur,function(result){        //md文件转换
            console.log(result);
					res.send(JSON.stringify(result));
				});
      });
});

app.post('/deletefav',function(req,res){          //取消赞功能
          DeleteFavo.deletefav(req.body,function(result){
            console.log(result);
					res.send(JSON.stringify(result));
				});
});


app.post('/havelike',function(req,res){       //判断用户是否点过赞1为点过，2为未点
    ReadUrl.readurl(req.body,function(result){
      var ur = result;
      var back = new Object();
      if(req.session.username == result.author)
      {
        back.masterstate = 1;
      }
      else{
      back.masterstate = 2;
      }
      if(req.session.username)//用户登录状态
      {
        back.returnstate = 1;
        back.user = req.session.username;
      }
      else{
        back.returnstate = 2;             //根据登录状态判断是否有点赞功能
      }
      // 以上是根据session判断用户是否为个人中心master
      console.log("masterstate=" + back.returnstate);
    //  back.user = req.session.username;//利用session拿到username

      HaveLike.havelike(ur,back.user,function(result){
        console.log(result);
      back.havefavo = result;
      res.send(JSON.stringify(back));
      //res.send(JSON.stringify(result.author));
    });
	});
});

app.post('/deletefile',function(req,res){       //删除文件
          DeleteFile.deletefile(req.body,function(result){
            console.log(result);
					res.send(JSON.stringify(result));
				});
});

//删除博客API
app.post('/deleteblog',function(req,res){       //用户在自己管理员页面删除博客
      DeleteBlog.deleteblog(req.body,function(result){        //删除数据库
        console.log(result);
        DeleteFile.deletefile(req.body,function(result){        //删除文件
          console.log(result);
        res.send(JSON.stringify(result));
      });
    });
});

//个人主页返回master信息
app.post('/finduser',function(req,res){           //找到用户主页的用户信息
    ReadUrl.readurl(req.body,function(result){      //解析url中的author（home的主人）
        FindUser.finduser(result,function(result){
        console.log("用户 :" + result);
        res.send(JSON.stringify(result));
      })
    });
});


app.post('/blogauthor',function(req,res){       //博客渲染页面的作者信息
    ReadUrl.readurl(req.body,function(result){
        BlogAuthor.blogauthor(result,function(result){
        console.log("博客信息 :" + result);
        res.send(JSON.stringify(result));
      })
    });
});

app.get('/memberlist',function(req,res){
	var memberoperate="SELECT username,groupis FROM `user`";
	connection.query(memberoperate,function(err,data){
		if(err){
			console.log(err);
			return;
		}else{
			res.send(data);
		}
	})
})

app.post('/file',bin.single('wenjian'),function(req,res,next){

  console.log("进入上传文件");
  var filename = req.file.originalname;
  console.log(req.file);
  var msg={};
  var myDate = new Date();
  myDate=myDate.toLocaleDateString();
  msg.title=filename.slice(0,filename.length-3);
  msg.author=req.session.username;
  msg.date=myDate;
  msg.favor=0;
  msg.class=req.body.sel;
  Insert.insert(msg,function(result){
    console.log("插入成功");
    fs.renameSync('../user/'+req.file.filename,'../user/'+req.session.username+'/'+filename);
    console.log("上传成功");
    res.location('index.html')
  });

});

app.post('/keep',function(req,res){
  console.log(req.body);
  var data=req.body.val;
  var msg={};
  msg.title=req.body.cla;
  msg.author=req.session.username;
  msg.date=req.body.myDate;
  msg.favor=0;
  msg.class=req.body.opt;
  console.log(msg);
  Insert.insert(msg,function(result){       //传输对象
    console.log(result);
  res.send(JSON.stringify(result));
});
  console.log("插入成功");
  fs.writeFile('../user/'+req.session.username+'/'+msg.title+'.md',data);
  console.log("上传成功");
  console.log(req.session);


});

app.listen(8089);

var express = require('express');
var cookieParase = require('cookie-parser');
var session=require("express-session");
var crypto=require('crypto');
var app = express();
var svgCaptcha = require('svg-captcha');
var bodyParser=require("body-parser");
var mysql=require("mysql");
var db=mysql.createConnection({host:'localhost',user:'root',password:'123456',database:'blog'});
var salt="acdef";

const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParase());
app.use(cors({
    origin: 'http://localhost:8088',
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
//设置跨域server
app.all('*', function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", 'http://localhost');
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
app.listen('8080',function(){
	console.log("sever is running on 8080");
})

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

var result_data = {
	author : 'new',        //博客作者
	class : 'web',         //博客分类
	returnstate: 1,          //是否登录
  title : 'ES6中的let命令',   //题目
  favo : 50,                //点赞数
  date : '2011-10-07',      //时间
  havefavo : 1,     //是否点过赞0未点1点了
  blogcontent : '',     //博客主体内容
  user : 'unknow'       //用户，session获取
}

var ur = window.location.search.slice(1,window.location.search.length);//前端获取url
$.ajax({
                  url: 'http://xiyounet.org:8089/mdmake/',
                  type: 'POST',
                  dataType :'JSON',
                  async: false,  //采用同步
                  data:ur,
									xhrFields: {
					                      withCredentials: true
					              },
					        crossDomain: true,
                  success:function(data){
                          result_data.blogcontent = data;
                          $('#docontent').append(result_data.blogcontent);
                          console.log('returnstate:' +	data);
                        },
                      error:function(err){
                          console.log("xxx");
                      }
              });

  $.ajax({
            url: 'http://xiyounet.org:8089/havelike/',
            type: 'POST',
            dataType :'JSON',
            async: false,  //采用同步
            data:ur,
        		xhrFields: {
              		      withCredentials: true
              			   },
            crossDomain: true,
            success:function(data){
																	result_data.returnstate = data.returnstate;
																	result_data.user = data.user;
                                  result_data.havefavo = data.havefavo;
                                    console.log('havelike:' +	 result_data.havefavo);
                                  },
            error:function(err){
                                console.log("xxx");
                                }
      });

      $.ajax({
                url: 'http://xiyounet.org:8089/blogauthor/',
                type: 'POST',
                dataType :'JSON',
                async: false,  //采用同步
                data:ur,
            		xhrFields: {
                  		      withCredentials: true
                  			   },
                crossDomain: true,
                success:function(data){
                                      console.log(data);
                                      result_data.favo = data.favor;
                                      result_data.title = data.title;
                                      result_data.author = data.author;
                                      result_data.date = data.date.slice(0,10);

                                      },
                error:function(err){
                                    console.log("xxx");
                                    }
          });

					Vue.component('logehead',{
						data : function(){
							return {
								state : result_data.returnstate,
								user : result_data.user     //要根据session获取
							}
						},
						methods : {
							LogOut : function(){
								$.ajax({
														url: 'http://xiyounet.org:8089/logout/',
														type: 'GET',
														dataType :'JSON',
														data:'',
													 xhrFields: {
																				withCredentials: true
																				},
														crossDomain: true,
														success:function(){
																	 window.location.href="./index.html";
																			},
														error:function(err){
																						console.log("xxx");
																						}
							});
							}
						},
						template : '<div class="collapse navbar-collapse"id="myNavbar"> <ul v-if= "state == 1" class="nav navbar-nav navbar-right" id="first" style="text-align: center; float: none;"><li class="a" style="float: none; display: inline-block;"><div class="piture"><a href=""><img src=""></a></div></li><li class="a dropdown icon" style="float: none; display: inline-block; margin-top: 3px;"><a  :href=" \'./\' + \'person.html?\' + \'name=\' + user" class="eassy"><img src="img/人才.png">个人中心</a></li><li class="a icon" style="float: none; display: inline-block; margin-top: 3px;"><a  :href=" \'./\' + \'write.html?\' + \'name=\' + user" class="eassy"><img src="img/3.png">写文章</a></li><li class="a icon" v-on:click = "LogOut()" style="float: none;  display: inline-block; margin-top: 3px;"><a href="javascript:;" class="eassy"><img src="img/关闭.gif">退出登录</a></li></ul>  <ul v-else class="nav navbar-nav navbar-right" id="second" style="text-align: center; float: none;display: block;"><li class="a" style="float: none; display: inline-block;"><div class="piture"><a href=""><img src=""></a></div></li> <li class="a dropdown icon tiaozhuan"" style="float: none; display: inline-block; margin-top: 3px;"> <a href="registered.html" class="dropdown-toggle">注册</a> </li><li class="a icon"   style="float: none; display: inline-block; margin-top: 3px;"><a href="registered.html" class="dropdown-toggle eass">登录</a> </li></ul></div>'
					})

Vue.component('pagehead',{
  data : function(){
    return {
      state : result_data.returnstate,
      title : result_data.title
    }
  },
  template : '<div class="col-md-offset-2  col-md-8  col-xs-12 col-sm-12  title">{{title}}</div>'
})

Vue.component('pagemore',{
  data : function(){
    return {
      author : result_data.author,
      title : result_data.title,
      date : result_data.date,
      favo : result_data.favo,
      havefavo : result_data.havefavo,
      user : result_data.user,
      returnstate : result_data.returnstate
    }
  },
  methods : {
    LikeBlog : function(author,title,user){
      var data = {
        author : author,
        title : title,
        user : user
      }
      console.log('send:' + data);
      $.ajax({
                  url: 'http://xiyounet.org:8089/favblog/',
                  type: 'POST',
                  dataType :'JSON',
                  data:data,
                 xhrFields: {
                              withCredentials: true
                              },
                  crossDomain: true,
                  success:function(data){
                         console.log(data);
                           location.reload();
                            },
                  error:function(err){
                                  console.log("xxx");
                                  }
    });
    },
  NolikeBlog : function(author,title,user){
    var data = {
      author : author,
      title : title,
      user : user
    }
    console.log('send:' + data);
    $.ajax({
                url: 'http://xiyounet.org:8089/deletefav/',
                type: 'POST',
                dataType :'JSON',
                data:data,
               xhrFields: {
                            withCredentials: true
                            },
                crossDomain: true,
                success:function(data){
                       console.log(data);
                         location.reload();
                          },
                error:function(err){
                                console.log("xxx");
                                }
  });
    }
  },
  template : '<div class="col-md-offset-2  col-md-8  col-xs-12 col-sm-12 message"><div class="picture" style="float:left;"><img src="img/head.jpg" style="height:70px;border-radius:50%;"></div><div class="xinxi la1">{{author}}</div><div class="xinxi la2">{{date}}</div><p class="p1" style="margin-top:55px;">点  赞  数：</p><div class="xinxi la3">{{favo}}</div><div v-if="returnstate==1" style="display:inline;"><img v-if="havefavo==0" v-on:click = "LikeBlog(author,title,user)" class="xinxi la4" src="img/点赞1.png"><img v-if="havefavo==1"  v-on:click = "NolikeBlog(author,title,user)"  class="xinxi la4" src="img/点赞2.png"></div></div>'
})
 new Vue({ el: '#root' })

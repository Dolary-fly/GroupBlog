var result_data = {
	author : 'test2',
	class : 'web',
//	returnstate: 1, //是否登录 1登录2未登录，渲染导航栏
//	masterstate : 1, //是否为master(当前个人中心管理员)
	returnmsg : [ //博客数据
		{
			 author:"new",
			 class:"web",
			 date:"2018-08-02T16:00:00.000Z",
			 favor:0,
			 main:"何为Animate.css在写CSS3的动画效果时，时常因为自己实现的效果不好，或者庞大的代码量而...",
			 title:"CSS3动画库Animate-css"
		 },
		 {
			 author:"new",
			 class:"web",
			 date:"2018-08-02T16:00:00.000Z",
			 favor:0,
			 main:"之前看了CSS3的一些效果，对其中的3D比较感兴趣，看了看transform和动画效果，因为时间原因也就简单的总结下tr...",
			 title:"CSS3中的transform和transition"
		 },
		 {
			 author:"new2",
			 class:"web",
			 date:"2018-08-02T16:00:00.000Z",
			 favor:0,
			 main:"ES6中新规定了let命令，用于声明变量，但是有了var命令，我们为什么还需要let命令呢。let用于声明变量，类似...",
			 title:"ES6中的let命令"
		 },
		 {
			 author:"new2",
			 class:"web",
			 date:"2018-08-02T16:00:00.000Z",
			 favor:0,
			 main:"jQuery中的动画累积问题在之前用jQuery做hover动...",
			 title:"jQuery中的动画积累问题"
		 },
		 {
			 author:"new2",
			 class:"安全",
			 date:"2018-08-02T16:00:00.000Z",
			 favor:0,
			 main:"博客的吉祥物之前在B站看直播时发现了右边有一只萌萌的22娘在左顾右盼，对这个很好奇，但是没有花时间去看。之后在别...",
			 title:"如何搭建一只博客看板娘"
		 },
		 {
			 author:"new",
			 class:"web",
			 date:"2018-08-02T16:00:00.000Z",
			 favor:0,
			 main:" 博客的吉祥物之前在B站看直播时发现了右边有一只萌萌的22娘在左顾右盼，对这个很好奇，但是没有花时间去看。之后在别...",
			 title:"如何搭建一只博客看板娘"
		 },
		 {
			 author:"new3",
			 class:"安全",
			 date:"2018-05-02T16:00:00.000Z",
			 favor:0,
			 main:" 当live2D到web页面之前写了在博客上运用npm模块实现live2D，现在把web页面上的live2D的坑一...",
			 title:"Live2D-lao-po-的web页面实现"
		 },
		 {
			 author:"new3",
			 class:"安全",
			 date:"2018-05-02T16:00:00.000Z",
			 favor:9,
			 main:"当display:flex遇到margin:10%<meta pro...",
			 title:"当display-flex遇到margin-10"
		 },
		 {
			 author:"new3",
			 class:"安全",
			 date:"2018-05-02T16:00:00.000Z",
			 favor:1,
			 main:" 讲一些没用的东西为什么写了这个博客呢，因为最近遇到需要返回目录文件的功能，这里就用nodejs实现下 需要模...",
			 title:"简单的用fs模块遍历文件夹"
		 }
			 ] //博客数据
};


//return_data为测试数据，可由以下AJAX获取，将测试数据注释,新建result_data即可
  var ur = window.location.search.slice(1,window.location.search.length);//前端获取url
$.ajax({
                  url: 'http://xiyounet.org:8089/serurl/',
                  type: 'POST',
                  dataType :'JSON',
                  async: false,  //采用同步
                  data:ur,
									xhrFields: {
					                      withCredentials: true
					              },
					        crossDomain: true,
                  success:function(data){
													result_data.user = data.user;
													result_data.masterstate = data.masterstate;
                          result_data.returnstate = data.returnstate;
                          console.log('masterstate:' +	result_data.masterstate);
                          console.log('returnstate:' +	result_data.returnstate);
                        },
                      error:function(err){
                          console.log("xxx");
                      }
              });
  $.ajax({
                  url: 'http://xiyounet.org:8089/finduser/',
                  type: 'POST',
                  dataType :'JSON',
                  async: false,  //采用同步
                  data:ur,
            			xhrFields: {
              	            withCredentials: true
                              },
                  crossDomain: true,
                  success:function(data){
                            				  result_data.author = data.username;
                                        result_data.class = data.groupis;
                                        console.log('master:' +	result_data.author);
                                        console.log('class:' +	result_data.class);
                                      },
                  error:function(err){
                                    console.log("xxx");
                                    }
    });
  $.ajax({
              url: 'http://xiyounet.org:8089/homeblog/',
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
												if(data.length != 0 )
												{
													result_data.havemsg = 1;
												}
												else
												{
													result_data.havemsg = 0;
												}
              					result_data.returnmsg = data;
                        },
              error:function(err){
                              console.log("xxx");
                              }
});






				 	var favo = 0;
				 	for(let i =0 ; i<result_data.returnmsg.length;i++)
					{
						favo = result_data.returnmsg[i].favor + favo;
					}
					 var x=Math.ceil(result_data.returnmsg.length/5);//总页数
		       var z=Math.ceil(result_data.returnmsg.length%5);//最后一页有多少
		       console.log(x,z);
					 Vue.component('bloghead',{
						 data : function(){
							 return {
								 classz : result_data.class,
								 author : result_data.author
							 }
						 },
						 	template : '<div ><img src="img/head.jpg"><ul class="list"><div><li>{{author}}</li><br><li>组别：{{classz}}</li></div></ul></div>'
					 })
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
					 Vue.component('blognum',{
						data : function(){
							return {
								blognum : result_data.returnmsg.length,
								favonum : favo
							}
						},
						template : '	<div ><span class="b2">	<div style="text-align: center;">获赞总数</div>	<div style="text-align: center;">{{favonum}}</div></span> <span class="b"><div style="text-align: center;">发表文章</div><div style="text-align: center;">{{blognum}}</div>	</span></div>'
					})
					 Vue.component('my-app',{
          data : function(){
            return {
              page_all : x,
              page_now : 1,
							master : result_data.masterstate,
              blogs : result_data.returnmsg,
							havemsg: result_data.havemsg
            }
          },
          computed : {
            BlogsNow : function(){
              var pageblog =[];
              var index = this.page_now*5-5;
              if(z<5&&this.page_now == x &&z!=0)
              {
                for(let i = 0;i<z;i++,index++)
                {
                  pageblog[i] = this.blogs[index];
                }
              }
              else{
                for(let i = 0;i<5;i++,index++)
                {
                  pageblog[i] = this.blogs[index];
                }
              }
              return pageblog;
            },
            pagemark : function(){
              var left = 1;
              var right = this.page_all;
              var pagemk = [];
              if(this.page_all >= 5)
              {
                if(this.page_now > 3 && this.page_now < this.page_all - 2)
                {
                  left = this.page_now - 2;
                  right = this.page_now + 2;
                }
                else
                {
                  if(this.page_now <= 3)
                  {
                    left = 1;
                    right = this.page_all;
                  }
                  else
                  {
                    right = this.page_all;
                    left = this.page_all - 4;
                  }
                }
              }
              while(left <= right)
              {
                pagemk.push(left);
                left++;
              }
              return pagemk;
            }
          },
          methods : {
            ClickeBtn : function(page){
              this.page_now = page;
            },
						DeleteBtn : function(title,author){
              var data = {
                title : title,
                author : author
              }
							 var truthBeTold = window.confirm('是否删除文章' + title);
							 if(truthBeTold)
							 {
                 $.ajax({
                             url: 'http://xiyounet.org:8089/deleteblog/',
                             type: 'POST',
                             dataType :'JSON',
                             data:data,
                            xhrFields: {
                                         withCredentials: true
                                         },
                             crossDomain: true,
                             success:function(data){
                                    location.reload();
                                       },
                             error:function(err){
                                             console.log("xxx");
                                             }
               });
							 }
							 else
							 {
								 console.log('no' + title);
							 }
						}
          },
          template : '<div class="box-vs"><div v-if="havemsg == 1"><ul><a name="1"></a><div class="v1"><li v-for = "item in BlogsNow"><div class="timu"><a class="t" :href=" \'./\' + \'passage.html?\' + \'name=\' + item.author + \'&file=\' + item.title">{{item.title}}</a></div><div class="zhai"><p class="zhai">{{item.main}}</p></div><div class="zuozhe"><p><img src="img/点赞.png">{{item.favor}}</p></div><div class="btn-group userwork" v-if= "master == 1" role="group" aria-label="..." style="display:inline-block;"><button type="button" class="btn btn-default"><a :href=" \'./\' + \'write.html?\' + \'name=\' + item.author + \'&file=\' + item.title" style= "color:black;text-decoration:none">修改</a></button><button type="button" class="btn btn-danger"  v-on:click = "DeleteBtn(item.title,item.author)">删除</button></div></li>	</div></ul></div><div class="btn-p"><nav aria-label="Page navigation outer" style="display: flex;justify-content: center;"><ul class="pagination" id="page"><li v-if = "page_now == 1" class="disabled"><a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li><li v-if = "page_now != 1"><a v-on:click = "page_now--" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li><li v-for = "item in pagemark" :class = "{\'active\': item == page_now}"><a v-on:click = "ClickeBtn(item)">{{item}}</a></li><li v-if = "page_now != page_all"><a v-on:click = "page_now++" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li><li v-if = "page_now == page_all" class="disabled"><a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav></div></div>'
				});
     new Vue({ el: '#root' })

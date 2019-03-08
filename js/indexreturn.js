var result_data = new Object();
$.ajax({
            url: 'http://xiyounet.org:8089/returnblog/',
            type: 'POST',
            dataType :'JSON',
            async: false,  //采用同步
            xhrFields: {
                          withCredentials: true
                  },
            crossDomain: true,
            data:'',
            success:function(data){

                  result_data.blogmsg = data;
                  console.log(result_data.blogmsg);
                  },
                error:function(err){
                    console.log("xxx");
                }
        });

//返回用户是否登录（result_data.returnstate）  1是登录  2 是未登录
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
                                result_data.returnstate = data.returnstate;
                                console.log('returnstate:' +	result_data.returnstate);
                              },
                            error:function(err){
                                console.log("xxx");
                            }
                    });

//组别筛选直接前端过滤分类数据result_data.blogmsg 中的class


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
 new Vue({ el: '#root' })

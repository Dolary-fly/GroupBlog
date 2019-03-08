console.log("进入分页器");
console.log(result_data.blogmsg);
var cons=result_data.blogmsg;

console.log("dwsaferfer"+result_data.blogmsg.length);
var x=Math.ceil(result_data.blogmsg.length/10);//总页数
var z=Math.ceil(result_data.blogmsg.length%10);//最后一页有多少
console.log(x,z);
Vue.component('page',{
	data : function(){
		return {
			con:cons,
			all:x, //总页数
			cur: 1,
			massage:[],
      		// alls:null
		}
	},
  	props:['mag','alls'],
	watch:{
		　mag(curVal,oldVal){
		console.log("进入watch");
		}
	},
	// updated:function(){
	// 	console.log("gengxin");
	// },
	mounted:function(){
		console.log("进入这里")
	},
   	methods: {
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data
            }
        },
        pageClick: function(){
            console.log('现在在'+this.cur+'页');
        },
        getmsg:function(){
          this.$on('send',function(val){
            console.log(val);
          })
		},
		dealmassage: function(dat){
			// $('#page').empty();
			this.massage=[];
			this.con=[];
			var _self=this;
			console.log(dat,"这里是ajax");
			for(var i=0;i<result_data.blogmsg.length;i++){
				if(result_data.blogmsg[i].class==dat){
					this.massage.push(result_data.blogmsg[i]);
					this.con.push(result_data.blogmsg[i]);
				}
			}
			this.all=Math.ceil(this.con.length/10);
			z=Math.ceil(this.con.length%10);
			x=Math.ceil(this.con.length/10);
			// $.ajax({
			// 	url: 'http://localhost:8080/returnblog/',
			// 	type: 'POST',
			// 	dataType :'JSON',
			// 	async: false,  //采用同步
			// 	xhrFields: {
			// 		withCredentials: true
			// 	},
			// 	crossDomain: true,
			// 	data:{dat},
			// 	success:function(data){
			// 		console.log(data);
			// 		_self.massage=data;
			// 		console.log(result_data.blogmsg);
			// 	},
			// 	error:function(err){
			// 		console.log("xxx");
			// 	}
			// });
		},
		sendmsg:function(){
			this.$emit('send',this.massage);
		}
    },
    computed: {
        indexs: function(){
			var left = 1;
			var right = this.all;
			var ar = [];
			if(this.all>= 5){
				if(this.cur > 3 && this.cur < this.all-2){
						left = this.cur - 2
						right = this.cur + 2
				}else{
					if(this.cur<=3){
						left = 1
						right = 5
					}else{
						right = this.all
						left = this.all -4
					}
				}
			}
			while (left <= right){
				ar.push(left)
				left ++
			}
			return ar;

		},
      	co: function(){
			var al=[];
			var ye= this.cur*10-10;//当前页的第一项

			if(z<10&&this.cur===x && z!=0)
			{
				for(var i=0;i<z;i++,ye++)
				{
					al[i]=this.con[ye];
				}
			}
			else{
				for(var i=0;i<10;i++,ye++)
				{
					al[i]=this.con[ye];
				}
			}
    		return al;
        }
    },
	template:
	`
	<div class="zhongjian">
		<div class="zuo">
			<dl>
				<div class="shouye animated wobble" style="background-color: #FF3366;"><dt><a href="index.html" class="t"><img src="img/首页.png">首页</a></dt></div>
				<div class="fenlei animated tada" style="background-color: #F08080;" @click="dealmassage('web')"><dt><img src="img/前端.png">前端</dt></div>
				<div class="fenlei animated tada" style="background-color: #FFCC99;" @click="dealmassage('后台')"><dt><img src="img/后台.png">后台</dt></div>
				<div class="fenlei animated tada" style="background-color: #FFFF66;" @click="dealmassage('安全')"><dt><img src="img/安全.png">安全</dt></div>
				<div class="fenlei animated tada" style="background-color: #99FF33;" @click="dealmassage('网络')"><dt><img src="img/网络.png">网络</dt></div>
				<div class="fenlei animated tada" style="background-color: #CCFFFF;" @click="dealmassage('运营')"><dt><img src="img/运营.png">运营</dt></div>
				<div class="fenlei animated tada" style="background-color: #CCCCFF;" @click="dealmassage('视觉设计')"><dt><img src="img/视觉设计.png">视觉设计</dt></div>
				<div class="fenlei animated rubberBand" style="background-color: #FF99FF;" @click="dealmassage('其他')"><dt><img src="img/其他.png">其他</dt></div>
			</dl>
		</div>

		<div class="you">
			<section class="container111">
			<div class="box">
				<div class="box-vs">
				<ul>
					<div class="v1">
						<li v-for="index in co">
						<div class="timu">
							<a class="t" :href="'passage.html?name='+index.author+'&title='+index.title">{{index.title}}</a>
						</div>
						<div class="zhai">
							<p class="zhai">{{index.main}}</p>
						</div>
						<div class="zuozhe">
							<p><a class="o" :href="'person.html?name='+index.author"><img src="img/作者.png">{{index.author}}</a><a class="o" href="index.html"><img src="img/组别.png">{{index.class}}</a><img src="img/赞.png">{{index.favor}}<img src="img/日期.png">{{index.date.slice(0,10)}}</p>
						</div>
						</li>
					</div>
				</ul>
				<div class="btn-p pagination">
					<ul>

						<li v-for="index in indexs"  v-bind:class="{ 'active': cur == index}">
						<label for="p1" v-on:click="btnClick(index)" class="P">{{ index }}</label>
						</li>
						&nbsp;&nbsp;<a href="#1"><img src="img/顶部.png" width="25" height="25"></a>
					</ul>
				</div>
				</div>
			</div>
			</section>
		</div>
	</div>
	`
});
//  Vue.component('page-bar',{
//   data:function(){
//     return {massage:[],
//       alls:null

//     }
//   },

//   template:
//   `
//   <div class="zuo" class="col-xs-8">

//   <dl>
//         <div class="shouye animated wobble" style="background-color: #FF3366;" onmouseover="dong()"><dt><a href="index.html" class="t"><img src="img/首页.png">首页</a></dt></div>
//         <div class="fenlei animated tada" style="background-color: #F08080;" @click="dealmassage('web')"><dt><a href="#" class="t"><img src="img/前端.png">前端</a></dt></div>
//         <div class="fenlei animated tada" style="background-color: #FFCC99;"><dt><a href="index.html" class="t"><img src="img/后台.png">后台</a></dt></div>
//         <div class="fenlei animated tada" style="background-color: #FFFF66;"><dt><a href="index.html" class="t"><img src="img/安全.png">安全</a></dt></div>
//         <div class="fenlei animated tada" style="background-color: #99FF33;"><dt><a href="index.html" class="t"><img src="img/网络.png">网络</a></dt></div>
//         <div class="fenlei animated tada" style="background-color: #CCFFFF;"><dt><a href="index.html" class="t"><img src="img/运营.png">运营</a></dt></div>
//         <div class="fenlei animated tada" style="background-color: #CCCCFF;"><dt><a href="index.html" class="t"><img src="img/视觉设计.png">视觉设计</a></dt></div>
//         <div class="qita animated rubberBand" style="background-color: #FF99FF;"><dt><a href="index.html" class="t"><img src="img/其他.png">其他</a></dt></div>
//    </dl>

//    </div>
//   `,

//   methods:{
//     dealmassage: function(dat){
//     	$('#page').empty();
//     	console.log(dat,"这里是ajax");
// 		$.ajax({
// 			url: 'http://localhost:8080/returnblog/',
// 			type: 'POST',
// 			dataType :'JSON',
// 			async: false,  //采用同步
// 			xhrFields: {
// 				withCredentials: true
// 			},
// 			crossDomain: true,
// 			data:{dat},
// 			success:function(data){
// 				_self.massage=data;
// 				console.log(result_data.blogmsg);
// 			},
// 			error:function(err){
// 				console.log("xxx");
// 			}
// 		});
//    	},

// 	sendmsg:function(){
// 	this.$emit('send',this.massage);
// 	}
// }


// });
new Vue({
	 el: '#page',
});
//   new Vue({ el: '#page-bar',
//     template: '<page-bar></page-bar>',
//    components: {
//     'child':"page-bar"
//   }

//   });

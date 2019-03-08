var vm=new Vue({
    el:'#user-list-component',
    data:{
        usergroup:{
            web:[],
            network:[],
            safe:[],
            design:[],
            operate:[]
        },
        listshow:false,
    },

    mounted:function(){
        this.dealWithData();
    },
    components:{
        'user-list':{
            props:['group'],
            components:{
                'user-list-group':{
                    props:['items','groupis','imgurl'],
                    data: function () {
                        return {
                            show:false,
                        }
                    },
                    methods: {
                        displayOrNot:function(){
                            this.show=!this.show;
                        }
                    },
                    template:
                    `<div class="allUser">
                        <div class="group" @click="displayOrNot"><img :src="imgurl" style="width:12%">{{groupis}}</div>
                            <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
                                <ul id="web" v-if="show">
                                  <li v-for="item in items"><a :href="'./person.html?name='+item.user">{{item.user}}</a></li>
                                </ul>
                            </transition>

                    </div>`
                },
            },
            template:
            `<div id="userlistdiv">
                <user-list-group :items="group.web" groupis="web" imgurl="./img/littleweb.png"></user-list-group>
                <user-list-group :items="group.network" groupis="网络" imgurl="./img/planet.png"></user-list-group>
                <user-list-group :items="group.safe" groupis="安全" imgurl="./img/littlesafe.png"></user-list-group>
                <user-list-group :items="group.design" groupis="设计组" imgurl="./img/littledesign.png"></user-list-group>
                <user-list-group :items="group.operate" groupis="运营组" imgurl="./img/littleoperate.png"></user-list-group>
            </div>
            `
        },
    },
    methods:{
        changelistshow:function(){
                                        this.listshow=!this.listshow
                                  },
        dealWithData:function(){
            $.ajax({
                type:'GET',
                url:'http://xiyounet.org:8089/memberlist',
                dataType:'JSON',
                success:function(data){
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        if(data[i].groupis=="前端组"){
                            var userweb={user:''};
                            userweb.user=data[i].username;
                            vm.usergroup.web.push(userweb);
                        }else if(data[i].groupis=="网络组"){
                            var usernet={user:''};
                            usernet.user=data[i].username;
                            vm.usergroup.network.push(usernet);
                        }else if(data[i].groupis=="安全组"){
                            var usersafe={user:''};
                            usersafe.user=data[i].username;
                            vm.usergroup.safe.push(usersafe);
                        }else if(data[i].groupis=="视觉设计组"){
                            var userdesign={user:''};
                            userdesign.user=data[i].username;
                            vm.usergroup.design.push(userdesign);
                        }else if(data[i].groupis=="运营组"){
                            var useroperate={user:''};
                            useroperate.user=data[i].username;
                            vm.usergroup.operate.push(useroperate);
                        }
                    }
                },
                error:function(err){
                    console.log(err);
                }
            })
        }
    }
})

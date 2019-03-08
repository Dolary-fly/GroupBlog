

$("#upto").click(function(){
  alert("上传成功");
})

     $("#c1").click(function(){
        var val=document.getElementById('mark').value;
        var sub=document.getElementById('c1');
        var cla=document.getElementById('cla').value;
        var myDate = new Date();
        myDate=myDate.toLocaleDateString();
        console.log(myDate);
    var options=$("#test option:selected");
    var opt=options.text();
        console.log("进入函数");
        console.log(val,opt,cla);
        $.ajax({
                type:'POST',
                dataType :'JSON',
                url:'http://xiyounet.org:8089/keep',
                data:{val,opt,myDate,cla},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success:function(data){
                        console.log('传递成功');
      },
      error:function(err){
            console.log(err);
      }
  });
});

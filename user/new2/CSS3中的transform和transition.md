之前看了CSS3的一些效果，对其中的3D比较感兴趣，看了看transform和动画效果，因为时间原因也就简单的总结下transform的一些要点。用transform来实现一些动画效果。

# 1.transition

* transition: property duration timing-function delay
老生常谈的东西，transition如同margin的CSS属性一样，是几个属性的合并写法，他们分别是：
* transition-property
需要过渡的属性
* transition-duration
过渡开始的时间
* transition-timing-function
过渡的速度曲线，可由[这里]生成
* transition-delay
过渡效果的延迟开始时间

# 2.transform
需要转换的属性，W3C上对所有属性都有介绍，就不多赘述。在这里重点说下perspective属性。


perspective:观察元素的距离，也就是俗称的透视，学过美术和建筑的对这玩意不会陌生,在CSS3中设置perspective就是Z轴的观察距离，所以perspective越小，离得越近变化就越明显。根据透视的基点不同，产生的透视效果也不同[here]。


在这里借用一张图：
![][2d]
这样就对网页的3D有所了解了，所谓的perspective就是我们相对于页面平面的距离。

# 3.transform-style

* transform-style: flat | preserve-3d

属性值中的flat是指以2D形式呈现子元素，preserve-3d指以3D形式呈现子元素。
也就是说，如果对一个元素设置了transform-style的值为flat，则该元素的所有子元素都将被平展到该元素的2D平面中进行呈现。沿着X轴或Y轴方向旋转该元素将导致位于正或负Z轴位置的子元素显示在该元素的平面上，而不是它的前面或者后面。如果对一个元素设置了transform-style的值为preserve-3d，它表示不执行平展操作，他的所有子元素位于3D空间中。

# 4.perspective-origin

属性是3D变形中另一个重要属性，主要用来决定perspective属性的源点角度。它实际上设置了X轴和Y轴位置(或者说基点)，在该位置观看者好像在观看该元素的子元素。
可取值：
x-axis：

* left
* center
* right
* length
* %

y-axis:

* top
* center
* bottom
* length
* %

# 5.如何写出不一样的弹出框动画
简单的通过3D旋转和JS做出旋转效果
HTML、CSS:
```
<html>
<head>
    <title></title>
    <script src="jquery.min.js"></script>
    <style media="screen">

    .outer-1{
        height: 1000px;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
      .outer{
        padding: 20px;
        height: 600px;
        width: 600px;
        background-color: #c2eed9;
      }
    </style>
</head>
<body>
    <button type="button" name="button" class="btn">点击</button>
  <div class="outer-1">
    <div class="outer" style="transition: all 800ms ease 0ms; transform: rotate3d(0, 0, 0, 0deg); transform-style: preserve-3d; pointer-events: auto; display: block;">
      <h1>这是第一行标题，我也不知道写什么</h1>
      <h2>这是第二行，就是试下</h2>
      <h3>emmmmm,第三回？好吧这是最后一个标题了，我已经不打算写了</h3>
      <p>Some thing</p>
    </div>
  </div>
</body>
</html>
```

JS:
```
 <script type="text/javascript">
      var temp = true;
      function fun(){
        if(temp){
        temp = false;
        $(".outer").css({
          "transition": "all 800ms ease 0ms"
        })
        $(".outer").css({
          "transform": "rotate3d(1, 1, 1,240deg)",
          "transform-style": "preserve-3d",
          "pointer-events": "auto",
        })
        setTimeout(function(){
          $(".outer").css({
            "display": "none"
          })
       }, 800);
      }
      else {
        temp = true;
        console.log("xxxx");
        $(".outer").css({
          "display" : "block",
        })
        setTimeout(function(){
        $(".outer").css({
          "transition": "all 800ms ease 0ms",
        })
        $(".outer").css({
          "transform": "rotate3d(0, 0, 0,0deg)",
          "transform-style": "preserve-3d",
          "pointer-events": "auto",
        })
      },50);
      }
    }
      $(".btn").click(fun);
  </script>
```

封面画师：[SA'yuki@no.23]

[这里]:http://cubic-bezier.com
[here]:http://www.zhangxinxu.com/study/201209/transform-perspective-same-rotate.html
[2d]:http://p6894qyp6.bkt.clouddn.com/3d.png
[SA'yuki@no.23]:https://www.pixiv.net/member.php?id=6266532

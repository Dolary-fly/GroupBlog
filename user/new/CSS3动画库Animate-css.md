
何为Animate.css
========

在写CSS3的动画效果时，时常因为自己实现的效果不好，或者庞大的代码量而头痛不已。那么这时候就轮到我们强大的动画库登场了，之前写东西的时候找到了Animate.css这个动画库。看到Animate，就让我们想到了CSS3中的animation属性。没错，Animate.css就是一个功能强大的CSS3动画库。

* [github地址]
* npm安装
> $ npm install animate.css
* CDN
> https://unpkg.com/animate.css@3.5.2/animate.min.css
* [在线演示]

使用方法
========

CSS引入
------
```
<head>
  <link rel="stylesheet" href="animate.min.css">
</head>
```
给元素加上animated类名
------------------------
```
<div class="animated">demo</div>
```
根据需要的动画效果添加对应的动画类名(如rotateInDownRight)
--------------------------------
```
<div class="animated rotateInDownRight">demo</div>
```
这样就完成了静态的动画效果添加

动态添加动画样式
================

由静态的样式添加，我们可以知道如果想让元素有动画效果，只需给它增添对应的class属性即可。所以问题就迎刃而解了。

运用jQuery经行class的添加(js同理)
---------------------------------------
* 添加class
```
$('.demo').addClass('animated rotateInDownRight');
```

如果你需要给元素添加其他动画，或元素隐藏后让他重现，那么你需要将class名删除,再之后你就可以进行上一步的动画效果添加了
--------------------------------------
* class名的添加后移除
```
$(function(){
    $('.demo').addClass('animated rotateInDownRight');
    setTimeout(function(){
        $('.demo').removeClass('rotateInDownRight');
    }, 500);
});
```

小结
===================
Animate.css是一款强大的CSS3动画库，他的所有动画样式（class名）可以在 [在线演示] 看到和获取。通过操作class可以灵活运用Animate.css实现动画效果，大大减少了工作量，提高效率。

封面画师：[忘川の泉眼]

[github地址]: https://github.com/daneden/animate.css
[在线演示]:https://daneden.github.io/animate.css/
[忘川の泉眼]:https://www.pixiv.net/member.php?id=2616777

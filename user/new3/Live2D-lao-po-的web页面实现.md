# 当live2D到web页面

之前写了在博客上运用npm模块实现live2D，现在把web页面上的live2D的坑一填。live2D之前主要运用在游戏方面，web方面的运用并不是很多。但是需求是需要满足的，我们要怎么实现web端的live2D呢？好在WebGL已经搞定了这个最难的部分，提供了官方的SDK。

[SDK下载]：Live2D_SDK_WebGL_2.0.05_1_en.zip

下载之后我们开始对SDK经行分析

# 文件目录

![][2d]

* framework：framework框架的js文件
* lib：live2d的js文件
* sample：官方给的例子，SampleApp1是比较完整的例子，Sample和SimpleMultiCanves只是类似于gif的效果
> 需要注意的是live2d的SDK会牵扯到跨域问题，以下是在chrome下的问题，把文件夹放到服务器上可以解决，或者用Edge打开html文件
![][ky]

# SampleApp1分析

## assets
* images：示例里面的背景图片
* live2d：live2d的模型和动作数据，文件夹名称为模型的名字

### 模型包文件(例：shizuku)

* expresssions：表情的配置文件，json格式
* motions：动作文件，只要处理点击时候的动作，mtn文件
* shizuku.1024：人物的肉体图片（尸块），png文件
* sounds：声音文件，有些模型没有，mp3文件
* shizuku.model.json：对上面各个文件夹中的文件经行引入

### src
* LAppDefine.js：对模型的定义
* LAppLive2DManger.js：对模型的创建和切换等等
* SampleApp.js：在这个文件中有一个参数需要特别注意，在文件34行，initL2dCanvas("glCanvas")；这里括号内的字符串是在HTML文件上canvas的ID，这样才能完成页面的渲染。

SampleApp.js:

![][in]

index.html:

![][ht]

## HTML文件

把相应的文件引入即可，之后设置canvas就行
```
<!DOCTYPE HTML>
<html>
<head>
    <script src='lib/live2d.min.js'></script>
    <script src='framework/Live2DFramework.js'></script>
    <script src="src/utils/MatrixStack.js"></script>
    <script src="src/utils/ModelSettingJson.js"></script>
    <script src="src/PlatformManager.js"></script>
    <script src="src/LAppDefine.js"></script>
    <script src="src/LAppModel.js"></script>
    <script src="src/LAppLive2DManager.js"></script>
    <script src="src/SampleApp1.js"></script>
</head>


<body>
    <canvas id="glCanvas" width="450px" height="500px" style="position:fixed;right:0px;bottom:-10px;">
    </canvas>
    <script>
      SampleApp1();
    </script>
</body>
</html>
```
* canvas的id要和SampleApp.js中定义的一样，上面强调过
* canvas的width和height就是live2d的宽高
* canvas的position：定义在页面上的位置
* SampleApp1()：执行SampleApp1文件


如果不想用切换模型功能可以把LAppLive2DManager.js中有change部分的函数注释掉，再修改LAppDefine。

# 在live2d上越走越远...

这样就完成了html文件上live2d的引用，关于live2d的模型包可以从一些手游的apk解包获得，或者去网上下载。之后可能会写一下apk的解包，说不定也会看看live2d的动作设计，嘛，这都是之后的事了...


封面画师：[河CY]

[2d]:http://p6894qyp6.bkt.clouddn.com/2d.png
[ky]:http://p6894qyp6.bkt.clouddn.com/ky.png
[SDK载]:https://link.zhihu.com/?target=http%3A//app2.live2d.com/cubism/sdk/bowiuex/webgl/Live2D_SDK_WebGL_2.0.05_1_en.zip
[in]:http://p6894qyp6.bkt.clouddn.com/in.png
[ht]:http://p6894qyp6.bkt.clouddn.com/ht.png
[河CY]:https://www.pixiv.net/member.php?id=3869665

jQuery中的动画累积问题
==========================

在之前用jQuery做hover动画效果时发现当鼠标快速滑入画出触发元素时，动画会出现累积。在执行完一次之后多次执行，直到动画队列执行完毕。很影响动画效果，毕竟鼠标不小心划过都会触发动画。同样当你用click事件多次点击时动画也是会累积。为什么会出现动画累积呢？因为动画的执行需要时间而事件的触发不需要时间间隔，所以会出现动画累积。之后，我找到了两种解决方法。</p>
<h1 id="1-stop"><a href="#1-stop" class="headerlink" title="1.stop()"></a>1.stop()</h1><p><strong>语法：$(selector).stop(stopAll,goToEnd)</strong></p>
<p><strong>两个参数的值为true或者false，默认值为false。</strong></p>
<p><strong>stopAll可选。规定是否停止被选元素的所有加入队列的动画。</strong></p>
<p><strong>goToEnd    可选。规定是否允许完成当前的动画。该参数只能在设置了 stopAll 参数时使用。</strong></p>
<p>1.stop()，由于两个参数都是false。所以事件发生时，animater没有跳到当前动画（动画1）的最终效果，而直接进入动画2，然后动画3，4，5.直至完成整个动画。</p>
<p>2.stop(true)，由于第一个是true，第二个是false，所以animater立刻全部停止了。</p>
<p>3.stop(false,true)，由于第一个是false，第二个是true，所以事件发生时，animater身处的当前动画（动画1）停止并且animater直接跳到当前动画（动画1）的最终末尾效果位置，接着正常执行下面的动画（动画2，3，4，5），直至完成整个动画。</p>
<p>4.stop(true，true)，由于两个都是true，所以事件发生时，animater跳到当前动画（动画1）的最终末尾效果位置，然后，全部动画停止。</p>
<p><strong>stop()的解决思路是当动画累积时，每次动画先停止之前动画，而进行该次动画，即每次执行的是原动画队列中的最后一个动画。</strong></p>
<h4 id="测试代码："><a href="#测试代码：" class="headerlink" title="测试代码："></a>测试代码：</h4><p>HTML:</p>
<pre><code>&lt;body&gt;
    &lt;div class=&quot;out&quot;&gt;
        &lt;div class=&quot;front&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
</code></pre><p>CSS:</p>
<pre><code>.out
{
    width: 200px;
    height: 200px;
    background-color: black;
    margin-bottom: 2vh;
}
.front
{
    position: relative;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    background-color: red;
    display: none;
}
</code></pre><p>jQuery:</p>
<pre><code>$(document).ready(function(){  
         $(&quot;.out&quot;).hover(function()          
         {
             $(this).find(&quot;.front&quot;).stop(true);    
             $(this).find(&quot;.front&quot;).fadeIn(&apos;slow&apos;);
         },
         function()
         {
             $(this).find(&quot;.front&quot;).stop(true);
             $(this).find(&quot;.front&quot;).fadeOut(&apos;fast&apos;);
         })
     });
</code></pre><h1 id="2-setTimeout"><a href="#2-setTimeout" class="headerlink" title="2.setTimeout"></a>2.setTimeout</h1><p><strong>语法：setTimeout(code,millisec)</strong></p>
<p><strong>code必需。要调用的函数后要执行的 JavaScript 代码串。</strong></p>
<p><strong>millisec必需。在执行代码前需等待的毫秒数。</strong></p>
<p><strong>setTimeout的解决思路是延迟动画执行时间。而利用setTimeout，我们增长了事件触发到动画执行的时间，如果在这段时间有另一个事件触发我们则清除这个待执行的动画去执行下个动画，以此来解决动画积累。</strong></p>
<h4 id="测试代码：-1"><a href="#测试代码：-1" class="headerlink" title="测试代码："></a>测试代码：</h4><p>jQuery:</p>
<pre><code>var timer=null;                                   
        $(document).ready(function(){
         $(&quot;.out&quot;).hover(function()
         {    
             var child = $(this).find(&quot;.front&quot;);
             timer=setTimeout(function()
            {
                 child.fadeIn(&apos;slow&apos;)
            },500);
         },
         function()
         {
             if(timer)
             clearTimeout(timer);
             $(this).find(&quot;.front&quot;).fadeOut(&apos;fast&apos;);
         });
     });
</code></pre><p>在这要注意在执行setTimeout前用一个变量(child)来保存动画对象。因为在setTimeout中this指向的是window。有可能导致对象的丢失。</p>
<p>用setTimeout并不能完美解决动画累积，因为在执行动画时，如果我们再次触发事件还是会进行累积，这点在click事件中尤为明显。所以在click事件中推荐用stop()解决问题。</p>
<h2 id="个人看法"><a href="#个人看法" class="headerlink" title="个人看法"></a>个人看法</h2><p>最后说一些个人看法吧，在动画时间短或瞬间执行完成的hover事件中个人倾向用setTimeout解决（想象一下一个大型模态框在你鼠标不小心划过触发元素时就瞬间弹出了…）。而在click事件中用stop()解决动画累积问题。</p>

<p>封面画师:<a href='https://www.pixiv.net/member.php?id=11246082'>Miv4t</a></p>
  </div>

当display:flex遇到margin:10%
=======================

<meta property="og:description" content="最近发现了CSS中关于单位：%  的一些有趣的东西。让我之前遇到了不少BUG，之后就去看了一下这方面的东西，把之前的坑填一下。
测试版本：Chrome(59.0.3071.115)   Firefox(54.0.1)
1.当%遇到margin和padding在规定子元素的height和width时，我们常常会用%来设置。它的height和width为它父元素对应数值的百分比。这个非常好理解。那么如">
<meta property="og:updated_time" content="2017-08-01T08:57:00.956Z">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="当display:flex遇到margin:10%">
<meta name="twitter:description" content="最近发现了CSS中关于单位：%  的一些有趣的东西。让我之前遇到了不少BUG，之后就去看了一下这方面的东西，把之前的坑填一下。
测试版本：Chrome(59.0.3071.115)   Firefox(54.0.1)
1.当%遇到margin和padding在规定子元素的height和width时，我们常常会用%来设置。它的height和width为它父元素对应数值的百分比。这个非常好理解。那么如">


  <link rel="alternative" href="/atom.xml" title="Gaminghard" type="application/atom+xml">



  <link rel="icon" href="/favicon.png">


<link rel="stylesheet" href="/perfect-scrollbar/css/perfect-scrollbar.min.css">
<link rel="stylesheet" href="/styles/main.css">






</head>




  </div>
  <div class="article-entry">
    <p>最近发现了CSS中关于单位：%  的一些有趣的东西。让我之前遇到了不少BUG，之后就去看了一下这方面的东西，把之前的坑填一下。</p>
<p><strong>测试版本：Chrome(59.0.3071.115)   Firefox(54.0.1)</strong></p>
<h1 id="1-当-遇到margin和padding"><a href="#1-当-遇到margin和padding" class="headerlink" title="1.当%遇到margin和padding"></a>1.当%遇到margin和padding</h1><p>在规定子元素的height和width时，我们常常会用%来设置。它的height和width为它父元素对应数值的百分比。这个非常好理解。那么如果我设置margin: 10%;padding: 10%;呢，margin和padding的值各是多少。下面举一个例子。</p>
<h3 id="测试代码"><a href="#测试代码" class="headerlink" title="测试代码"></a>测试代码</h3><h4 id="HTML"><a href="#HTML" class="headerlink" title="HTML"></a>HTML</h4><pre><code>&lt;body&gt;
&lt;div id=&quot;first&quot;&gt;
    &lt;div id=&quot;second&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre><h4 id="CSS"><a href="#CSS" class="headerlink" title="CSS"></a>CSS</h4><pre><code>#first
{
    height: 800px;
    width: 600px;
    background-color: #66ccff;
}    
#second
{
    height: 100px;
    width: 100px;
    background-color: #FFE4B5;
    margin: 10%;
    padding: 10%;
}
</code></pre><p>在这里子元素的margin和padding会是多少呢？期初我认为是 80 60 80 60。之后用调试工具查看以后发现margin和padding都是 60 60 60 60。为什么会是父元素的宽度呢（当然这是在默认的writing-mode: horizontal-tb; 和 direction: ltr; 的情况下）。这其实是和排版有关，当默认的横向排版时，我们的横向宽是度固定的，而纵向是无限延伸的，这就是为什么排版时会换行。所以，我们与其找一个无限延伸的参照物不如找一个长度固定的参照物。这就是为什么默认下margin和padding是以宽度为基准的原因。</p>
<h1 id="2-display-flex下的margin：10"><a href="#2-display-flex下的margin：10" class="headerlink" title="2.display:flex下的margin：10%"></a>2.display:flex下的margin：10%</h1><p>之前用flex布局时，发现了display:flex下的margin：x%是个非常有意思的东西（padding：x%同样）。由于电脑上浏览器有限，只采用了Chrome和Firefox做测试。</p>
<h3 id="测试代码-1"><a href="#测试代码-1" class="headerlink" title="测试代码"></a>测试代码</h3><h4 id="HTML-1"><a href="#HTML-1" class="headerlink" title="HTML"></a>HTML</h4><pre><code>&lt;body&gt;
&lt;div id=&quot;first&quot;&gt;
    &lt;div id=&quot;second&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
</code></pre><h4 id="CSS-1"><a href="#CSS-1" class="headerlink" title="CSS"></a>CSS</h4><pre><code>#first
{
    height: 800px;
    width: 600px;
    background-color: #66ccff;
    display: flex;
}    
#second
{
    height: 100px;
    width: 100px;
    background-color: #FFE4B5;
    margin: 10%;
    padding: 10%;
}
</code></pre><p>在这里的margin和padding会是多少？如果按照上面所说的那么应该是 60 60 60 60。实际是怎么样的呢？<br>在Chrome和Firefox下这个值是不同的。</p>
<p>Chrome：打开调试工具我们会发现margin是60 60 60 60。和我们之前所说的一样。</p>
<p>Firefox：打开调试工具后，我们会发现它的margin是80 60 80 60。也就是它的margin-top和margin-bottom的基准是父元素的高。</p>
<p>这点在Chrome和Firefox的差异需要注意。</p>
<h2 id="height-auto"><a href="#height-auto" class="headerlink" title="height:auto;"></a>height:auto;</h2><p>当我们对上面代码稍作修改将父元素的height: 800px;修改为height:auto;时，又会发现不同的结果。</p>
<h4 id="CSS-2"><a href="#CSS-2" class="headerlink" title="CSS"></a>CSS</h4><pre><code>#first
{
    height: auto;
    width: 600px;
    background-color: #66ccff;
    display: flex;
}    
#second
{
    height: 100px;
    width: 100px;
    background-color: #FFE4B5;
    margin: 10%;
    padding: 10%;
}
</code></pre><p>Chrome：margin 的值为60 60 60 60 与之前两次没有差异。</p>
<p>Firefox：margin 的值为0 60 0 60与之前两次都不同。父元素的height在这里没有作为子元素margin-top和margin-bottom的基准。</p>
<p><strong>margin和padding取%并且父元素为display:flexs时，会在不同浏览器中产生差异。所以最好用vh、vw、px等单位来兼顾浏览器差异。</strong></p>

<p>封面画师:<a href='https://www.pixiv.net/member.php?id=648285'>mocha＠コミティアA29b</a></p>

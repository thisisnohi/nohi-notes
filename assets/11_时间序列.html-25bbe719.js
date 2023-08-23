import{_ as e,p as i,q as a,a1 as d}from"./framework-449724a9.js";const n={},s=d(`<h2 id="第11章-时间序列" tabindex="-1"><a class="header-anchor" href="#第11章-时间序列" aria-hidden="true">#</a> 第11章 时间序列</h2><h3 id="datetime" tabindex="-1"><a class="header-anchor" href="#datetime" aria-hidden="true">#</a> datetime</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>from datetime import datetime
now = datetime.now()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>timedelta表示两个datetime对象之间的时间差</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>delta = datetime(2011, 1, 7) - datetime(2008, 6, 24, 8, 15)
delta -&gt; datetime.timedelta(926, 56700)
delta.days -&gt; 926
delta.seconds-&gt; 56700
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>datetime对象加上（或减去）一个或多个timedelta</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>start = datetime(2011, 1, 7)
start + timedelta(12)  -&gt; datetime.datetime(2011, 1, 19, 0, 0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p><img src="https://upload-images.jianshu.io/upload_images/7178691-4af261a305a70aeb.png?imageMogr2/auto-orient/strip|imageView2/2/w/554/format/webp" alt="img"></p><h3 id="字符串和datatime的相互转换" tabindex="-1"><a class="header-anchor" href="#字符串和datatime的相互转换" aria-hidden="true">#</a> 字符串和datatime的相互转换</h3><p><img src="https://upload-images.jianshu.io/upload_images/7178691-de0181e1f6b45eaf.png?imageMogr2/auto-orient/strip|imageView2/2/w/554/format/webp" alt="img"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [22]: stamp = datetime(2011, 1, 3)
In [23]: str(stamp)
Out[23]: &#39;2011-01-03 00:00:00&#39;
In [24]: stamp.strftime(&#39;%Y-%m-%d&#39;)
Out[24]: &#39;2011-01-03&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>str -&gt; datetime : datetime.strptime</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [25]: value = &#39;2011-01-03&#39;
In [26]: datetime.strptime(value, &#39;%Y-%m-%d&#39;)
Out[26]: datetime.datetime(2011, 1, 3, 0, 0)
In [27]: datestrs = [&#39;7/6/2011&#39;, &#39;8/6/2011&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>第三方包格式： dateutil这个第三方包中的parser.parse</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [29]: from dateutil.parser import parse
In [30]: parse(&#39;2011-01-03&#39;)
Out[30]: datetime.datetime(2011, 1, 3, 0, 0)

In [31]: parse(&#39;Jan 31, 1997 10:45 PM&#39;)
Out[31]: datetime.datetime(1997, 1, 31, 22, 45)

日出现在月的前面很普遍，传入dayfirst=True
In [32]: parse(&#39;6/12/2011&#39;, dayfirst=True)
Out[32]: datetime.datetime(2011, 12, 6, 0, 0)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>pandas通常是用于处理成组日期的， to_datetime方法可以解析多种不同的日期表示形式。对标准日期格式（如ISO8601）的解析非常快</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [33]: datestrs = [&#39;2011-07-06 12:00:00&#39;, &#39;2011-08-06 00:00:00&#39;]
In [34]: pd.to_datetime(datestrs)
Out[34]: DatetimeIndex([&#39;2011-07-06 12:00:00&#39;, &#39;2011-08-06 00:00:00&#39;], dtype=&#39;dat
etime64[ns]&#39;, freq=None)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="生成日期范围" tabindex="-1"><a class="header-anchor" href="#生成日期范围" aria-hidden="true">#</a> 生成日期范围</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>index = pd.date_range(&#39;2012-04-01&#39;, &#39;2012-06-01&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>默认情况下，date_range会产生按天计算的时间点。如果只传入起始或结束日期，那就还得传入一个表示一段时间的数字：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pd.date_range(start=&#39;2012-04-01&#39;, periods=20)
pd.date_range(end=&#39;2012-06-01&#39;, periods=20)
pd.date_range(&#39;2000-01-01&#39;, &#39;2000-12-01&#39;, freq=&#39;BM&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>&quot;BM&quot;频率，表示business end of month</p><p>表11-4是频率列表，基本的时间序列频率（不完整）</p><p><img src="https://upload-images.jianshu.io/upload_images/7178691-c8614ddbd10793ca.png?imageMogr2/auto-orient/strip|imageView2/2/w/554/format/webp" alt="img"></p><p><img src="https://upload-images.jianshu.io/upload_images/7178691-8da46ba96544b071.png?imageMogr2/auto-orient/strip|imageView2/2/w/554/format/webp" alt="img"></p></li></ul><p><img src="https://upload-images.jianshu.io/upload_images/7178691-3ca410609195edc4.png?imageMogr2/auto-orient/strip|imageView2/2/w/554/format/webp" alt="img"></p><p>​</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [80]: pd.date_range(&#39;2012-05-02 12:56:31&#39;, periods=5, normalize=True)
Out[80]: 
DatetimeIndex([&#39;2012-05-02&#39;, &#39;2012-05-03&#39;, &#39;2012-05-04&#39;, &#39;2012-05-05&#39;,
               &#39;2012-05-06&#39;],
              dtype=&#39;datetime64[ns]&#39;, freq=&#39;D&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="移动-超前和滞后-数据" tabindex="-1"><a class="header-anchor" href="#移动-超前和滞后-数据" aria-hidden="true">#</a> 移动（超前和滞后）数据</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [91]: ts = pd.Series(np.random.randn(4),
   ....:                index=pd.date_range(&#39;1/1/2000&#39;, periods=4, freq=&#39;M&#39;))

In [92]: ts
Out[92]: 
2000-01-31   -0.066748
2000-02-29    0.838639
2000-03-31   -0.117388
2000-04-30   -0.517795
Freq: M, dtype: float64

In [93]: ts.shift(2)
Out[93]: 
2000-01-31         NaN
2000-02-29         NaN
2000-03-31   -0.066748
2000-04-30    0.838639
Freq: M, dtype: float64

In [94]: ts.shift(-2)
Out[94]: 
2000-01-31   -0.117388
2000-02-29   -0.517795
2000-03-31         NaN
2000-04-30         NaN
Freq: M, dtype: float64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-4-时区处理" tabindex="-1"><a class="header-anchor" href="#_11-4-时区处理" aria-hidden="true">#</a> 11.4 时区处理</h3><h3 id="_11-5-时期及其算术运算" tabindex="-1"><a class="header-anchor" href="#_11-5-时期及其算术运算" aria-hidden="true">#</a> 11.5 时期及其算术运算</h3><h3 id="_11-6-重采样及频率转换" tabindex="-1"><a class="header-anchor" href="#_11-6-重采样及频率转换" aria-hidden="true">#</a> 11.6 重采样及频率转换</h3><h3 id="_11-7-移动窗口函数" tabindex="-1"><a class="header-anchor" href="#_11-7-移动窗口函数" aria-hidden="true">#</a> 11.7 移动窗口函数</h3>`,21),t=[s];function l(r,m){return i(),a("div",null,t)}const v=e(n,[["render",l],["__file","11_时间序列.html.vue"]]);export{v as default};

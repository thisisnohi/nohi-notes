import{_ as n,p as a,q as s,a1 as e}from"./framework-449724a9.js";const t={},p=e(`<h1 id="第8章-数据规整-聚合" tabindex="-1"><a class="header-anchor" href="#第8章-数据规整-聚合" aria-hidden="true">#</a> 第8章 数据规整：聚合</h1><p>在许多应用中，数据可能分散在许多文件或数据库中，存储的形式也不利于分析。本章关注可以聚合、合并、重塑数据的方法。</p><h2 id="_8-1-层次化索引" tabindex="-1"><a class="header-anchor" href="#_8-1-层次化索引" aria-hidden="true">#</a> 8.1 层次化索引</h2><ul><li><p>MultiIndex</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>In <span class="token punctuation">[</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">:</span> data <span class="token operator">=</span> pd<span class="token punctuation">.</span>Series<span class="token punctuation">(</span>np<span class="token punctuation">.</span>random<span class="token punctuation">.</span>randn<span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">:</span>                  index<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">:</span>                         <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

In <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">:</span> data
Out<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">:</span> 
a  <span class="token number">1</span>   <span class="token operator">-</span><span class="token number">0.204708</span>
   <span class="token number">2</span>    <span class="token number">0.478943</span>
   <span class="token number">3</span>   <span class="token operator">-</span><span class="token number">0.519439</span>
b  <span class="token number">1</span>   <span class="token operator">-</span><span class="token number">0.555730</span>
   <span class="token number">3</span>    <span class="token number">1.965781</span>
c  <span class="token number">1</span>    <span class="token number">1.393406</span>
   <span class="token number">2</span>    <span class="token number">0.092908</span>
d  <span class="token number">2</span>    <span class="token number">0.281746</span>
   <span class="token number">3</span>    <span class="token number">0.769023</span>
dtype<span class="token punctuation">:</span> float64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>通过unstack方法将这段数据重新安排到一个DataFrame, unstack的逆运算是stack(data.unstack().stack())</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [16]: data.unstack()
Out[16]: 
          1         2         3
a -0.204708  0.478943 -0.519439
b -0.555730       NaN  1.965781
c  1.393406  0.092908       NaN
d       NaN  0.281746  0.769023
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>DataFrame，每条轴都可以有分层索引</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [18]: frame = pd.DataFrame(np.arange(12).reshape((4, 3)),
   ....:                      index=[[&#39;a&#39;, &#39;a&#39;, &#39;b&#39;, &#39;b&#39;], [1, 2, 1, 2]],
   ....:                      columns=[[&#39;Ohio&#39;, &#39;Ohio&#39;, &#39;Colorado&#39;],
   ....:                               [&#39;Green&#39;, &#39;Red&#39;, &#39;Green&#39;]])
In [19]: frame
Out[19]: 
     Ohio     Colorado
    Green Red    Green
a 1     0   1        2
  2     3   4        5
b 1     6   7        8
  2     9  10       11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="重排与分级排序" tabindex="-1"><a class="header-anchor" href="#重排与分级排序" aria-hidden="true">#</a> 重排与分级排序</h3><ul><li><p>frame.swaplevel(&#39;key1&#39;, &#39;key2&#39;)</p></li><li><p>sort_index则根据单个级别中的值对数据进行排序</p></li></ul><h3 id="根据级别汇总统计" tabindex="-1"><a class="header-anchor" href="#根据级别汇总统计" aria-hidden="true">#</a> 根据级别汇总统计</h3><ul><li>level 利用了pandas的groupby功能</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [27]: frame.sum(level=&#39;key2&#39;)
Out[27]: 
state  Ohio     Colorado
color Green Red    Green
key2                    
1         6   8       10
2        12  14       16

In [28]: frame.sum(level=&#39;color&#39;, axis=1)
Out[28]: 
color      Green  Red
key1 key2            
a    1         2    1
     2         8    4
b    1        14    7
     2        20   10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用dataframe的列进行索引" tabindex="-1"><a class="header-anchor" href="#使用dataframe的列进行索引" aria-hidden="true">#</a> 使用DataFrame的列进行索引</h3><ul><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>frame<span class="token punctuation">.</span>set_index<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;d&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> drop<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>frame2<span class="token punctuation">.</span>reset_index<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="_8-2-合并数据集" tabindex="-1"><a class="header-anchor" href="#_8-2-合并数据集" aria-hidden="true">#</a> 8.2 合并数据集</h2><h3 id="数据库风格的dataframe合并" tabindex="-1"><a class="header-anchor" href="#数据库风格的dataframe合并" aria-hidden="true">#</a> 数据库风格的DataFrame合并</h3><ul><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code> pd<span class="token punctuation">.</span>merge<span class="token punctuation">(</span>df1<span class="token punctuation">,</span> df2<span class="token punctuation">,</span> on<span class="token operator">=</span><span class="token string">&#39;key&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pd<span class="token punctuation">.</span>merge<span class="token punctuation">(</span>df3<span class="token punctuation">,</span> df4<span class="token punctuation">,</span> left_on<span class="token operator">=</span><span class="token string">&#39;lkey&#39;</span><span class="token punctuation">,</span> right_on<span class="token operator">=</span><span class="token string">&#39;rkey&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code> pd<span class="token punctuation">.</span>merge<span class="token punctuation">(</span>df1<span class="token punctuation">,</span> df2<span class="token punctuation">,</span> how<span class="token operator">=</span><span class="token string">&#39;outer&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul>`,14),i=[p];function l(c,o){return a(),s("div",null,i)}const d=n(t,[["render",l],["__file","08_第8章 数据规整：聚合.html.vue"]]);export{d as default};

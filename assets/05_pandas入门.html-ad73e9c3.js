import{_ as e,p as a,q as n,a1 as i}from"./framework-449724a9.js";const s={},d=i(`<h1 id="pandas入门" tabindex="-1"><a class="header-anchor" href="#pandas入门" aria-hidden="true">#</a> pandas入门</h1><blockquote><p>create by nohi 20210808</p></blockquote><h2 id="_5-1-pandas的数据结构介绍" tabindex="-1"><a class="header-anchor" href="#_5-1-pandas的数据结构介绍" aria-hidden="true">#</a> 5.1 pandas的数据结构介绍</h2><p>Series是一种类似于一维数组的对象，数据+标签(索引) values+index</p><p>DataFrame是一个表格型的数据结构，它含有一组有序的列.既有行索引也有列索引</p><h3 id="series" tabindex="-1"><a class="header-anchor" href="#series" aria-hidden="true">#</a> Series</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>obj = pd.Series([4, 7, -5, 3])
指定索引
obj2 = pd.Series([4, 7, -5, 3], index=[&#39;d&#39;, &#39;b&#39;, &#39;a&#39;, &#39;c&#39;])
-- 通过字典初始化
In [26]: sdata = {&#39;Ohio&#39;: 35000, &#39;Texas&#39;: 71000, &#39;Oregon&#39;: 16000, &#39;Utah&#39;: 5000}
In [27]: obj3 = pd.Series(sdata)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dataframe" tabindex="-1"><a class="header-anchor" href="#dataframe" aria-hidden="true">#</a> DataFrame</h3><ul><li><p>修改值：data.loc[0,&#39;message&#39;] = &#39;NOHI&#39;</p></li><li><p>创建</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data = {&#39;state&#39;: [&#39;Ohio&#39;, &#39;Ohio&#39;, &#39;Ohio&#39;, &#39;Nevada&#39;, &#39;Nevada&#39;, &#39;Nevada&#39;],
        &#39;year&#39;: [2000, 2001, 2002, 2001, 2002, 2003],
        &#39;pop&#39;: [1.5, 1.7, 3.6, 2.4, 2.9, 3.2]}
frame = pd.DataFrame(data)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>对于特别大的DataFrame，head方法会选取前五行：frame.head()</p></li><li><p>指定了列序列： pd.DataFrame(data, columns=[&#39;year&#39;, &#39;state&#39;, &#39;pop&#39;])</p></li><li><p>行也可以通过位置或名称的方式进行获取，比如用loc属： frame2.loc[&#39;three&#39;]</p></li><li><p>添加列：frame2[&#39;eastern&#39;] = frame2.state == &#39;Ohio&#39;</p></li><li><p>删除列： del frame2[&#39;eastern&#39;]</p></li><li><p>嵌套字典：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [65]: pop = {&#39;Nevada&#39;: {2001: 2.4, 2002: 2.9},&#39;Ohio&#39;: {2000: 1.5, 2001: 1.7, 2002: 3.6}}
In [66]: frame3 = pd.DataFrame(pop)

In [67]: frame3
Out[67]: 
      Nevada  Ohio
2000     NaN   1.5
2001     2.4   1.7
2002     2.9   3.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="索引对象" tabindex="-1"><a class="header-anchor" href="#索引对象" aria-hidden="true">#</a> 索引对象</h3><h2 id="_5-2-基本功能" tabindex="-1"><a class="header-anchor" href="#_5-2-基本功能" aria-hidden="true">#</a> 5.2 基本功能</h2><h3 id="重新索引" tabindex="-1"><a class="header-anchor" href="#重新索引" aria-hidden="true">#</a> 重新索引</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>obj = pd.Series([4.5, 7.2, -5.3, 3.6], index=[&#39;d&#39;, &#39;b&#39;, &#39;a&#39;, &#39;c&#39;])
obj2 = obj.reindex([&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;e&#39;])


In [95]: obj3 = pd.Series([&#39;blue&#39;, &#39;purple&#39;, &#39;yellow&#39;], index=[0, 2, 4])

In [96]: obj3
Out[96]: 
0      blue
2    purple
4    yellow
dtype: object
-- 填充
In [97]: obj3.reindex(range(6), method=&#39;ffill&#39;)
Out[97]: 
0      blue
1      blue
2    purple
3    purple
4    yellow
5    yellow
dtype: object
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>列可以用columns关键字重新索引：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [98]: frame = pd.DataFrame(np.arange(9).reshape((3, 3)),
   ....:                      index=[&#39;a&#39;, &#39;c&#39;, &#39;d&#39;],
   ....:                      columns=[&#39;Ohio&#39;, &#39;Texas&#39;, &#39;California&#39;])

In [99]: frame
Out[99]: 
   Ohio  Texas  California
a     0      1           2
c     3      4           5
d     6      7           8

In [100]: frame2 = frame.reindex([&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;])

In [101]: frame2
Out[101]: 
   Ohio  Texas  California
a   0.0    1.0         2.0
b   NaN    NaN         NaN
c   3.0    4.0         5.0
d   6.0    7.0         8.0
states = [&#39;Texas&#39;, &#39;Utah&#39;, &#39;California&#39;]
frame.reindex(columns=states)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="丢弃指定轴上的项" tabindex="-1"><a class="header-anchor" href="#丢弃指定轴上的项" aria-hidden="true">#</a> 丢弃指定轴上的项</h3><ul><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>obj<span class="token punctuation">.</span>drop<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;d&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>通过传递axis=1或axis=&#39;columns&#39;可以删除列的值：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data = pd.DataFrame(np.arange(16).reshape((4, 4)),index=[&#39;Ohio&#39;, &#39;Colorado&#39;, &#39;Utah&#39;, &#39;New York&#39;],columns=[&#39;one&#39;, &#39;two&#39;, &#39;three&#39;, &#39;four&#39;])
data.drop([&#39;Colorado&#39;, &#39;Ohio&#39;])
data.drop(&#39;two&#39;, axis=1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="用loc和iloc进行选取" tabindex="-1"><a class="header-anchor" href="#用loc和iloc进行选取" aria-hidden="true">#</a> 用loc和iloc进行选取</h3><ul><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data<span class="token punctuation">.</span>loc<span class="token punctuation">[</span><span class="token string">&#39;Colorado&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;two&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;three&#39;</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data.iloc[2, [3, 0, 1]] 
iloc[2: 第三行（2+1）
[3，0，1] ，显示的列索引
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="算术运算和数据对齐" tabindex="-1"><a class="header-anchor" href="#算术运算和数据对齐" aria-hidden="true">#</a> 算术运算和数据对齐</h3><ul><li>自动的数据对齐操作在不重叠的索引处引入了NA值。缺失值会在算术运算过程中传播。</li><li>对于DataFrame，对齐操作会同时发生在行和列上</li></ul><h3 id="在算术方法中填充值" tabindex="-1"><a class="header-anchor" href="#在算术方法中填充值" aria-hidden="true">#</a> 在算术方法中填充值</h3><ul><li>df1.add(df2, fill_value=0)</li><li>df1.reindex(columns=df2.columns, fill_value=0)</li></ul><h2 id="_5-3-汇总和计算描述统计" tabindex="-1"><a class="header-anchor" href="#_5-3-汇总和计算描述统计" aria-hidden="true">#</a> 5.3 汇总和计算描述统计</h2><ul><li><h2 id="相关系数与协方差" tabindex="-1"><a class="header-anchor" href="#相关系数与协方差" aria-hidden="true">#</a> 相关系数与协方差</h2></li><li></li></ul>`,26),l=[d];function r(t,c){return a(),n("div",null,l)}const v=e(s,[["render",r],["__file","05_pandas入门.html.vue"]]);export{v as default};

import{_ as n,p as a,q as e,a1 as i}from"./framework-449724a9.js";const s={},l=i(`<h1 id="第7章-数据清洗和准备" tabindex="-1"><a class="header-anchor" href="#第7章-数据清洗和准备" aria-hidden="true">#</a> 第7章 数据清洗和准备</h1><h2 id="_7-1-处理缺失数据" tabindex="-1"><a class="header-anchor" href="#_7-1-处理缺失数据" aria-hidden="true">#</a> 7.1 处理缺失数据</h2><ul><li>pandas使用浮点值NaN（Not a Number）表示缺失数据。哨兵值</li></ul><h3 id="滤除缺失数据" tabindex="-1"><a class="header-anchor" href="#滤除缺失数据" aria-hidden="true">#</a> 滤除缺失数据</h3><ul><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> numpy <span class="token keyword">import</span> nan <span class="token keyword">as</span> NA
data <span class="token operator">=</span> pd<span class="token punctuation">.</span>Series<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> NA<span class="token punctuation">,</span> <span class="token number">3.5</span><span class="token punctuation">,</span> NA<span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
data<span class="token punctuation">.</span>dropna<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token operator">==</span>  data<span class="token punctuation">[</span>data<span class="token punctuation">.</span>notnull<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>DataFrame</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data = pd.DataFrame([[1., 6.5, 3.], [1., NA, NA],[NA, NA, NA], [NA, 6.5, 3.]])
cleaned = data.dropna()
In [22]: cleaned
Out[22]: 
     0    1    2
0  1.0  6.5  3.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>传入how=&#39;all&#39;将只丢弃全为NA的那些行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [23]: data.dropna(how=&#39;all&#39;)
Out[23]: 
     0    1    2
0  1.0  6.5  3.0
1  1.0  NaN  NaN
3  NaN  6.5  3.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>name ‘NA’ is not defined <ul><li>from numpy import nan as NA</li></ul></li></ul></li><li><p>只需传入axis=1即可： data.dropna(axis=1, how=&#39;all&#39;)</p></li><li><p>另一个滤除DataFrame行的问题涉及时间序列数据。假设你只想留下一部分观测数据，可以用thresh参数实现此目的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [27]: df = pd.DataFrame(np.random.randn(7, 3))

In [28]: df.iloc[:4, 1] = NA

In [29]: df.iloc[:2, 2] = NA

In [30]: df
Out[30]: 
          0         1         2
0 -0.204708       NaN       NaN
1 -0.555730       NaN       NaN
2  0.092908       NaN  0.769023
3  1.246435       NaN -1.296221
4  0.274992  0.228913  1.352917
5  0.886429 -2.001637 -0.371843
6  1.669025 -0.438570 -0.539741

In [31]: df.dropna()
Out[31]: 
          0         1         2
4  0.274992  0.228913  1.352917
5  0.886429 -2.001637 -0.371843
6  1.669025 -0.438570 -0.539741

In [32]: df.dropna(thresh=2)
Out[32]: 
          0         1         2
2  0.092908       NaN  0.769023
3  1.246435       NaN -1.296221
4  0.274992  0.228913  1.352917
5  0.886429 -2.001637 -0.371843
6  1.669025 -0.438570 -0.539741
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="填充缺失数据" tabindex="-1"><a class="header-anchor" href="#填充缺失数据" aria-hidden="true">#</a> 填充缺失数据</h3><ul><li>fillna</li><li>通过一个字典调用fillna，就可以实现对不同的列填充不同的值: df.fillna({1: 0.5, 2: 0})</li><li>fillna默认会返回新对象，但也可以对现有对象进行就地修改: _ = df.fillna(0, inplace=True)</li><li>对reindexing有效的那些插值方法也可用于fillna：</li></ul><h2 id="_7-2-数据转换" tabindex="-1"><a class="header-anchor" href="#_7-2-数据转换" aria-hidden="true">#</a> 7.2 数据转换</h2><h3 id="移除重复数据" tabindex="-1"><a class="header-anchor" href="#移除重复数据" aria-hidden="true">#</a> 移除重复数据</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data = pd.DataFrame({&#39;k1&#39;: [&#39;one&#39;, &#39;two&#39;] * 3 + [&#39;two&#39;],&#39;k2&#39;: [1, 1, 2, 3, 3, 4, 4]})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>是否重复：data.duplicated()</li><li>删除重复记录：data.drop_duplicates()</li><li>定部分列进行重复项判断： data.drop_duplicates([&#39;k1&#39;])</li><li>传入keep=&#39;last&#39;则保留最后一个： data.drop_duplicates([&#39;k1&#39;, &#39;k2&#39;], keep=&#39;last&#39;)</li></ul><h3 id="利用函数或映射进行数据转换" tabindex="-1"><a class="header-anchor" href="#利用函数或映射进行数据转换" aria-hidden="true">#</a> 利用函数或映射进行数据转换</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>data = pd.DataFrame({&#39;food&#39;: [&#39;bacon&#39;, &#39;pulled pork&#39;, &#39;bacon&#39;,
   ....:                               &#39;Pastrami&#39;, &#39;corned beef&#39;, &#39;Bacon&#39;,
   ....:                               &#39;pastrami&#39;, &#39;honey ham&#39;, &#39;nova lox&#39;],
   ....:                      &#39;ounces&#39;: [4, 3, 12, 6, 7.5, 8, 3, 5, 6]})
   
meat_to_animal = {
  &#39;bacon&#39;: &#39;pig&#39;,
  &#39;pulled pork&#39;: &#39;pig&#39;,
  &#39;pastrami&#39;: &#39;cow&#39;,
  &#39;corned beef&#39;: &#39;cow&#39;,
  &#39;honey ham&#39;: &#39;pig&#39;,
  &#39;nova lox&#39;: &#39;salmon&#39;
}
# 转换大小写
lowercased = data[&#39;food&#39;].str.lower()
# 映射
data[&#39;animal&#39;] = lowercased.map(meat_to_animal)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>一个函数搞定：data[&#39;food&#39;].map(lambda x: meat_to_animal[x.lower()])</li></ul><h3 id="替换值" tabindex="-1"><a class="header-anchor" href="#替换值" aria-hidden="true">#</a> 替换值</h3><ul><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">999</span><span class="token punctuation">,</span> np<span class="token punctuation">.</span>nan<span class="token punctuation">)</span>
data<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">999</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1000</span><span class="token punctuation">]</span><span class="token punctuation">,</span> np<span class="token punctuation">.</span>nan<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="重命名轴索引" tabindex="-1"><a class="header-anchor" href="#重命名轴索引" aria-hidden="true">#</a> 重命名轴索引</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> data = pd.DataFrame(np.arange(12).reshape((3, 4)),
   ....:                     index=[&#39;Ohio&#39;, &#39;Colorado&#39;, &#39;New York&#39;],
   ....:                     columns=[&#39;one&#39;, &#39;two&#39;, &#39;three&#39;, &#39;four&#39;])
In [67]: transform = lambda x: x[:4].upper()

In [68]: data.index.map(transform)
Out[68]: Index([&#39;OHIO&#39;, &#39;COLO&#39;, &#39;NEW &#39;], dtype=&#39;object&#39;)  
data.index = data.index.map(transform)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data<span class="token punctuation">.</span>rename<span class="token punctuation">(</span>index<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">.</span>title<span class="token punctuation">,</span> columns<span class="token operator">=</span><span class="token builtin">str</span><span class="token punctuation">.</span>upper<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="离散化和面元划分" tabindex="-1"><a class="header-anchor" href="#离散化和面元划分" aria-hidden="true">#</a> 离散化和面元划分</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>年龄： ages = [20, 22, 25, 27, 21, 23, 37, 31, 61, 45, 41, 32]
分段： bins = [18, 25, 35, 60, 100]
离散：cats = pd.cut(ages, bins)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>统计：pd.value_counts(cats)</li></ul><h3 id="检测和过滤异常值" tabindex="-1"><a class="header-anchor" href="#检测和过滤异常值" aria-hidden="true">#</a> 检测和过滤异常值</h3><h2 id="_7-3-字符串操作" tabindex="-1"><a class="header-anchor" href="#_7-3-字符串操作" aria-hidden="true">#</a> 7.3 字符串操作</h2><h3 id="字符串对象方法" tabindex="-1"><a class="header-anchor" href="#字符串对象方法" aria-hidden="true">#</a> 字符串对象方法</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [134]: val = &#39;a,b,  guido&#39;
In [135]: val.split(&#39;,&#39;)
Out[135]: [&#39;a&#39;, &#39;b&#39;, &#39;  guido&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>去除空格：pieces = [x.strip() for x in val.split(&#39;,&#39;)]</p></li><li><p>拆分+拼接</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [138]: first, second, third = pieces

In [139]: first + &#39;::&#39; + second + &#39;::&#39; + third
Out[139]: &#39;a::b::guido&#39;

&#39;::&#39;.join(pieces) -&gt; &#39;a::b::guido&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式" aria-hidden="true">#</a> 正则表达式</h3><p>re模块的函数可以分为三个大类：模式匹配、替换以及拆分</p><ul><li><p>一个或多个空白符的regex是\\s+</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [148]: import re
In [149]: text = &quot;foo    bar\\t baz  \\tqux&quot;
In [150]: re.split(&#39;\\s+&#39;, text)
Out[150]: [&#39;foo&#39;, &#39;bar&#39;, &#39;baz&#39;, &#39;qux&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [151]: regex = re.compile(&#39;\\s+&#39;)
In [152]: regex.split(text)
Out[152]: [&#39;foo&#39;, &#39;bar&#39;, &#39;baz&#39;, &#39;qux&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>match和search跟findall功能类似。findall返回的是字符串中所有的匹配项，而search则只返回第一个匹配项。match更加严格，它只匹配字符串的首部。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>text = &quot;&quot;&quot;Dave dave@google.com
Steve steve@gmail.com
Rob rob@gmail.com
Ryan ryan@yahoo.com
&quot;&quot;&quot;
pattern = r&#39;[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}&#39;

# re.IGNORECASE makes the regex case-insensitive
regex = re.compile(pattern, flags=re.IGNORECASE)

In [155]: regex.findall(text)
Out[155]: 
[&#39;dave@google.com&#39;,
 &#39;steve@gmail.com&#39;,
 &#39;rob@gmail.com&#39;,
 &#39;ryan@yahoo.com&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>将各个地址分成3个部分：用户名、域名以及域后缀（将待分段的模式的各部分用圆括号包起来）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [161]: pattern = r&#39;([A-Z0-9._%+-]+)@([A-Z0-9.-]+)\\.([A-Z]{2,4})&#39;
In [162]: regex = re.compile(pattern, flags=re.IGNORECASE)
In [163]: m = regex.match(&#39;wesm@bright.net&#39;)

In [164]: m.groups()
Out[164]: (&#39;wesm&#39;, &#39;bright&#39;, &#39;net&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3>`,31),d=[l];function t(r,c){return a(),e("div",null,d)}const v=n(s,[["render",t],["__file","07_第7章 数据清洗和准备.html.vue"]]);export{v as default};

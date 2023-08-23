import{_ as e,p as i,q as a,a1 as s}from"./framework-449724a9.js";const n={},d=s(`<h1 id="第6章-数据加载、存储与文件格式" tabindex="-1"><a class="header-anchor" href="#第6章-数据加载、存储与文件格式" aria-hidden="true">#</a> 第6章 数据加载、存储与文件格式</h1><blockquote><p>create by nohi 20210800</p></blockquote><h2 id="_6-1-读写文本格式的数据" tabindex="-1"><a class="header-anchor" href="#_6-1-读写文本格式的数据" aria-hidden="true">#</a> 6.1 读写文本格式的数据</h2><ul><li><p>read_csv和read_table可能会是你今后用得最多的</p><p><img src="https://upload-images.jianshu.io/upload_images/7178691-958f849e6067b19b.png?imageMogr2/auto-orient/strip|imageView2/2/w/778/format/webp" alt="img"></p></li><li><p>列名为空，索引为列名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [13]: pd.read_csv(&#39;examples/ex2.csv&#39;, header=None)
Out[13]: 
   0   1   2   3      4
0  1   2   3   4  hello
1  5   6   7   8  world
2  9  10  11  12    foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>指定列名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [14]: pd.read_csv(&#39;examples/ex2.csv&#39;, names=[&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;message&#39;])
Out[14]: 
   a   b   c   d message
0  1   2   3   4   hello
1  5   6   7   8   world
2  9  10  11  12     foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>指定索引列</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [15]: names = [&#39;a&#39;, &#39;b&#39;, &#39;c&#39;, &#39;d&#39;, &#39;message&#39;]

In [16]: pd.read_csv(&#39;examples/ex2.csv&#39;, names=names, index_col=&#39;message&#39;)
Out[16]: 
         a   b   c   d
message               
hello    1   2   3   4
world    5   6   7   8
foo      9  10  11  12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>将多个列做成一个层次化索引</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>parsed = pd.read_csv(&#39;examples/csv_mindex.csv&#39;,index_col=[&#39;key1&#39;, &#39;key2&#39;])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>跳过行：pd.read_csv(&#39;examples/ex4.csv&#39;, skiprows=[0, 2, 3])</p></li></ul><h3 id="逐块读取文本文件" tabindex="-1"><a class="header-anchor" href="#逐块读取文本文件" aria-hidden="true">#</a> 逐块读取文本文件</h3><ul><li>预告设置最大行数：pd.options.display.max_rows = 10</li><li>只读取几行：pd.read_csv(&#39;examples/ex6.csv&#39;, nrows=5)</li><li>逐块读取文件： chunker = pd.read_csv(&#39;ch06/ex6.csv&#39;, chunksize=1000)</li></ul><h3 id="将数据写出到文本格式" tabindex="-1"><a class="header-anchor" href="#将数据写出到文本格式" aria-hidden="true">#</a> 将数据写出到文本格式</h3><ul><li><p>修改值：data.loc[0,&#39;message&#39;] = &#39;NOHI&#39;</p></li><li><p>保存成文件：data.to_csv(&#39;examples/out.csv&#39;)</p></li><li><p>指定分隔符</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [45]: import sys
In [46]: data.to_csv(sys.stdout, sep=&#39;|&#39;)
|something|a|b|c|d|message
0|one|1|2|3.0|4|
1|two|5|6||8|world
2|three|9|10|11.0|12|foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>缺失值在输出结果中会被表示为空字符串</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [47]: data.to_csv(sys.stdout, na_rep=&#39;NULL&#39;)
,something,a,b,c,d,message
0,one,1,2,3.0,4,NULL
1,two,5,6,NULL,8,world
2,three,9,10,11.0,12,foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>不保存列头：data.to_csv(sys.stdout, index=False, header=False)</p></li><li><p>只写出一部分的列： data.to_csv(sys.stdout, index=False, columns=[&#39;a&#39;, &#39;b&#39;, &#39;c&#39;])</p></li><li><p>Series也有一个to_csv方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [50]: dates = pd.date_range(&#39;1/1/2000&#39;, periods=7)
In [51]: ts = pd.Series(np.arange(7), index=dates)
In [52]: ts.to_csv(&#39;examples/tseries.csv&#39;)
In [53]: !cat examples/tseries.csv
2000-01-01,0
2000-01-02,1
2000-01-03,2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="处理分隔符格式" tabindex="-1"><a class="header-anchor" href="#处理分隔符格式" aria-hidden="true">#</a> 处理分隔符格式</h3><ul><li><p>字典构造式和zip(*values)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>with open(&#39;examples/ex7.csv&#39;) as f:
     lines = list(csv.reader(f))
header, values = lines[0], lines[1:]
data_dict = {h: v for h, v in zip(header, zip(*values))}
In [60]: data_dict
Out[60]: {&#39;a&#39;: (&#39;1&#39;, &#39;1&#39;), &#39;b&#39;: (&#39;2&#39;, &#39;2&#39;), &#39;c&#39;: (&#39;3&#39;, &#39;3&#39;)}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="json数据" tabindex="-1"><a class="header-anchor" href="#json数据" aria-hidden="true">#</a> JSON数据</h3><ul><li>result = json.loads(obj)</li><li>asjson = json.dumps(result)</li><li>siblings = pd.DataFrame(result[&#39;siblings&#39;], columns=[&#39;name&#39;, &#39;age&#39;])</li><li>data = pd.read_json(&#39;examples/example.json&#39;)</li><li>输出： print(data.to_json())</li></ul><h3 id="xml和html-web信息收集" tabindex="-1"><a class="header-anchor" href="#xml和html-web信息收集" aria-hidden="true">#</a> XML和HTML：Web信息收集</h3><h3 id="利用lxml-objectify解析xml" tabindex="-1"><a class="header-anchor" href="#利用lxml-objectify解析xml" aria-hidden="true">#</a> 利用lxml.objectify解析XML</h3><h2 id="_6-2-二进制数据格式" tabindex="-1"><a class="header-anchor" href="#_6-2-二进制数据格式" aria-hidden="true">#</a> 6.2 二进制数据格式</h2><h3 id="pickle" tabindex="-1"><a class="header-anchor" href="#pickle" aria-hidden="true">#</a> pickle</h3><h3 id="使用hdf5格式" tabindex="-1"><a class="header-anchor" href="#使用hdf5格式" aria-hidden="true">#</a> 使用HDF5格式</h3><h3 id="读取microsoft-excel文件" tabindex="-1"><a class="header-anchor" href="#读取microsoft-excel文件" aria-hidden="true">#</a> 读取Microsoft Excel文件</h3><ul><li><p>读</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code> pd<span class="token punctuation">.</span>read_excel<span class="token punctuation">(</span>xlsx<span class="token punctuation">,</span> <span class="token string">&#39;Sheet1&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>writer = pd.ExcelWriter(&#39;examples/ex2.xlsx&#39;)
frame.to_excel(writer, &#39;Sheet1&#39;)
writer.save()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>不使用ExcelWriter，而是传递文件的路径到to_excel</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>frame.to_excel(&#39;examples/ex2.xlsx&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="_6-3-web-apis交互" tabindex="-1"><a class="header-anchor" href="#_6-3-web-apis交互" aria-hidden="true">#</a> 6.3 Web APIs交互</h2><h2 id="_6-4-数据库交互" tabindex="-1"><a class="header-anchor" href="#_6-4-数据库交互" aria-hidden="true">#</a> 6.4 数据库交互</h2><h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h3><blockquote><p>安装mysqlclient</p><p>使用参见：https://www.cnblogs.com/kingwangzhen/p/9395914.html</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import MySQLdb

conn= MySQLdb.connect(
        host=&#39;localhost&#39;,
        port = 3306,
        user=&#39;root&#39;,
        passwd=&#39;root1234&#39;,
        db =&#39;test&#39;,
        )
        
cur = conn.cursor()

## 获取记录数
data=cur.execute(&quot;select * from data_ssqmodel order by qiCi&quot;)

## 获取数据
cur.execute(&quot;select * from data_ssqmodel order by qiCi&quot;)
data=cur.fetchall()

## 查看列名
cur.description
## DataFrame构造器
dataDF = pd.DataFrame(data, columns=[x[0] for x in cur.description])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),l=[d];function r(t,c){return i(),a("div",null,l)}const u=e(n,[["render",r],["__file","06_第6章 数据加载、存储与文件格式.html.vue"]]);export{u as default};

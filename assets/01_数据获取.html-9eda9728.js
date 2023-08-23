import{_ as e,p as i,q as n,a1 as s}from"./framework-449724a9.js";const a={},d=s(`<h2 id="数据获取" tabindex="-1"><a class="header-anchor" href="#数据获取" aria-hidden="true">#</a> 数据获取</h2><h3 id="数据来源" tabindex="-1"><a class="header-anchor" href="#数据来源" aria-hidden="true">#</a> 数据来源</h3><ul><li><p>超级大乐透： http://datachart.500.com/dlt/history/history.shtml</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>页面获取地址：http://datachart.500.com/dlt/history/newinc/history.php?start=07001&amp;end=22022
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>双色球： http://datachart.500.com/ssq/?expect=100#</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>页面获取地址： http://datachart.500.com/ssq/history/newinc/history.php?start=03001&amp;end=22023
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="数据提取" tabindex="-1"><a class="header-anchor" href="#数据提取" aria-hidden="true">#</a> 数据提取</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
import statsmodels as sm
from pandas import Series, DataFrame

import MySQLdb

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


cur.execute(&quot;select * from data_dltmodel order by qiCi&quot;)
dlt=cur.fetchall()
dlt = pd.DataFrame(dlt, columns=[x[0] for x in cur.description])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[d];function r(t,c){return i(),n("div",null,l)}const u=e(a,[["render",r],["__file","01_数据获取.html.vue"]]);export{u as default};

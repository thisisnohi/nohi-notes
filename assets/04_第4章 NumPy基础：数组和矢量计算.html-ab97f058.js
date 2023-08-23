import{_ as e,p as a,q as i,a1 as n}from"./framework-449724a9.js";const d={},r=n(`<h1 id="第4章-numpy基础-数组和矢量计算" tabindex="-1"><a class="header-anchor" href="#第4章-numpy基础-数组和矢量计算" aria-hidden="true">#</a> 第4章 NumPy基础：数组和矢量计算</h1><p>NumPy（Numerical Python的简称）是Python数值计算最重要的基础包。大多数提供科学计算的包都是用NumPy的数组作为构建基础。</p><p>NumPy的部分功能如下：</p><ul><li>ndarray，一个具有矢量算术运算和复杂广播能力的快速且节省空间的多维数组。</li><li>用于对整组数据进行快速运算的标准数学函数（无需编写循环）。</li><li>用于读写磁盘数据的工具以及用于操作内存映射文件的工具。</li><li>线性代数、随机数生成以及傅里叶变换功能。</li><li>用于集成由C、C++、Fortran等语言编写的代码的A C API</li></ul><h2 id="_4-1-numpy的ndarray-一种多维数组对象" tabindex="-1"><a class="header-anchor" href="#_4-1-numpy的ndarray-一种多维数组对象" aria-hidden="true">#</a> 4.1 NumPy的ndarray：一种多维数组对象</h2><ul><li><p>随机数据的小数组</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [12]: import numpy as np

# Generate some random data
In [13]: data = np.random.randn(2, 3)

In [14]: data
Out[14]: 
array([[-0.2047,  0.4789, -0.5194],
       [-0.5557,  1.9658,  1.3934]])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>数据运算</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [15]: data * 10
Out[15]: 
array([[ -2.0471,   4.7894,  -5.1944],
       [ -5.5573,  19.6578,  13.9341]])

In [16]: data + data
Out[16]: 
array([[-0.4094,  0.9579, -1.0389],
       [-1.1115,  3.9316,  2.7868]])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ndarray是一个通用的同构数据多维容器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [17]: data.shape
Out[17]: (2, 3)

In [18]: data.dtype
Out[18]: dtype(&#39;float64&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="创建ndarray" tabindex="-1"><a class="header-anchor" href="#创建ndarray" aria-hidden="true">#</a> 创建ndarray</h3><p>创建数组最简单的办法就是使用array函数</p><ul><li><p>指定类型：numeric_strings = np.array([&#39;1.25&#39;, &#39;-9.6&#39;, &#39;42&#39;], dtype=np.string_)</p></li><li><p>转换类型</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [44]: numeric_strings = np.array([&#39;1.25&#39;, &#39;-9.6&#39;, &#39;42&#39;], dtype=np.string_)

In [45]: numeric_strings.astype(float)
Out[45]: array([  1.25,  -9.6 ,  42.  ])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="numpy数组的运算" tabindex="-1"><a class="header-anchor" href="#numpy数组的运算" aria-hidden="true">#</a> NumPy数组的运算</h3><ul><li><p>大小相等的数组之间的任何算术运算都会将运算应用到元素级</p></li><li><p>大小相同的数组之间的比较会生成布尔值数组</p></li><li><p>不同大小的数组之间的运算叫做广播</p></li></ul><h3 id="基本的索引和切片" tabindex="-1"><a class="header-anchor" href="#基本的索引和切片" aria-hidden="true">#</a> 基本的索引和切片</h3><ul><li>切片：arr[5:8]</li><li>切片的一份副本而非视图 <code>arr[5:8].copy()</code></li></ul><h3 id="切片索引" tabindex="-1"><a class="header-anchor" href="#切片索引" aria-hidden="true">#</a> 切片索引</h3><h3 id="布尔型索引" tabindex="-1"><a class="header-anchor" href="#布尔型索引" aria-hidden="true">#</a> 布尔型索引</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [98]: names = np.array([&#39;Bob&#39;, &#39;Joe&#39;, &#39;Will&#39;, &#39;Bob&#39;, &#39;Will&#39;, &#39;Joe&#39;, &#39;Joe&#39;])
In [99]: data = np.random.randn(7, 4)
In [100]: names
Out[100]: 
array([&#39;Bob&#39;, &#39;Joe&#39;, &#39;Will&#39;, &#39;Bob&#39;, &#39;Will&#39;, &#39;Joe&#39;, &#39;Joe&#39;],
      dtype=&#39;&lt;U4&#39;)
In [102]: names == &#39;Bob&#39;
Out[102]: array([ True, False, False,  True, False, False, False], dtype=bool)     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数组转置和轴对换" tabindex="-1"><a class="header-anchor" href="#数组转置和轴对换" aria-hidden="true">#</a> 数组转置和轴对换</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>In [126]: arr = np.arange(15).reshape((3, 5))

In [127]: arr
Out[127]: 
array([[ 0,  1,  2,  3,  4],
       [ 5,  6,  7,  8,  9],
       [10, 11, 12, 13, 14]])

In [128]: arr.T
Out[128]: 
array([[ 0,  5, 10],
       [ 1,  6, 11],
       [ 2,  7, 12],
       [ 3,  8, 13],
       [ 4,  9, 14]])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>np.dot计算矩阵内积：</li></ul><h2 id="_4-2-通用函数-快速的元素级数组函数" tabindex="-1"><a class="header-anchor" href="#_4-2-通用函数-快速的元素级数组函数" aria-hidden="true">#</a> 4.2 通用函数：快速的元素级数组函数</h2><h2 id="_4-3-利用数组进行数据处理" tabindex="-1"><a class="header-anchor" href="#_4-3-利用数组进行数据处理" aria-hidden="true">#</a> 4.3 利用数组进行数据处理</h2><h2 id="_4-4-用于数组的文件输入输出" tabindex="-1"><a class="header-anchor" href="#_4-4-用于数组的文件输入输出" aria-hidden="true">#</a> 4.4 用于数组的文件输入输出</h2><ul><li>np.save和np.load是读写磁盘数组数据的两个主要函数。默认情况下，数组是以未压缩的原始二进制格式保存在扩展名为.npy的文件中的：np.save(&#39;some_array&#39;, arr)</li></ul><h2 id="_4-5-线性代数" tabindex="-1"><a class="header-anchor" href="#_4-5-线性代数" aria-hidden="true">#</a> 4.5 线性代数</h2><h2 id="_4-6-伪随机数生成" tabindex="-1"><a class="header-anchor" href="#_4-6-伪随机数生成" aria-hidden="true">#</a> 4.6 伪随机数生成</h2><h2 id="_4-7-随机漫步" tabindex="-1"><a class="header-anchor" href="#_4-7-随机漫步" aria-hidden="true">#</a> 4.7 随机漫步</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import random
position = 0
walk = [position]
steps = 1000
for i in range(steps):
    step = 1 if random.randint(0, 1) else -1
    position += step
    walk.append(position)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> plt.plot(walk[:100])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://upload-images.jianshu.io/upload_images/7178691-80e85ae6b9c89ada.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img"></p><p><img src="https://upload-images.jianshu.io/upload_images/7178691-dcdb66e49e5f70ea.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img"></p><p><img src="https://upload-images.jianshu.io/upload_images/7178691-97ba09c96dab93a2.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp" alt="img"></p><p><img src="https://upload-images.jianshu.io/upload_images/7178691-6ed04fae3d1178e2.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp" alt="img"></p>`,32),s=[r];function l(t,u){return a(),i("div",null,s)}const v=e(d,[["render",l],["__file","04_第4章 NumPy基础：数组和矢量计算.html.vue"]]);export{v as default};

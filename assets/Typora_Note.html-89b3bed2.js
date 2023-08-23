import{_ as a,M as e,p as i,q as t,N as l,U as d,t as o,a1 as n}from"./framework-449724a9.js";const r={},p=n('<h1 id="typora-note" tabindex="-1"><a class="header-anchor" href="#typora-note" aria-hidden="true">#</a> Typora Note</h1><blockquote><p>create by nohi 20191106</p></blockquote><h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2><p>无序列表: * + -</p><p>有序列表: 1. <code>注意加空格</code></p><p>加粗：cmd+b 或 <code>**加粗**</code> <strong>加粗</strong></p><p>斜体： cmd+i 或 <code>*斜体*</code><em>斜体</em></p><p>下划线：cmd+u 或<code>&lt;u&gt;下划线&lt;/u&gt;</code> <u>下划线</u></p><p>删除线：<s>删除线</s></p><p>标签: <code>这是标签</code></p><p>居中显示：</p>',11),c=n(`<p>注释 ：ctrl + - 或者 <!--注释--></p><p>代码：ctrl + \` 插入代码</p><p>代码块：cmd+option+c 指定语言代码块</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\`这是代码块吗\` 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>水平分隔线： option+cmd+ -</p><hr><p>脚注：cmd+option+r 或者 [^]: --&gt; 这是啥啊 <a href="%E8%BF%99%E6%98%AF1%E7%9A%84%E8%84%9A%E6%B3%A8%EF%BC%8C%E8%AF%B7%E7%9C%8B%E6%96%87%E6%A1%A3%E6%9C%80%E4%B8%8B%E6%96%B9">^ 1</a>:这是啥</p><p>上标：Typoa1<a href="%E8%BF%99%E6%98%AF%E8%84%9A%E6%B3%A8....">^ 这是脚注</a></p><p>下标 H[~2~]O H^2^</p><p>下标： 2^2^ == 4 2[^2] = 4</p><p>[^]:</p><p>代码块: cmd + option + c</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">pritnln</span><span class="token punctuation">(</span>&#39;&#39;<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>表格：option+cmd+t</p><table><thead><tr><th style="text-align:right;"></th><th></th><th></th></tr></thead><tbody><tr><td style="text-align:right;"></td><td></td><td></td></tr><tr><td style="text-align:right;"></td><td></td><td></td></tr><tr><td style="text-align:right;"></td><td></td><td></td></tr></tbody></table><h2 id="typora画流程图" tabindex="-1"><a class="header-anchor" href="#typora画流程图" aria-hidden="true">#</a> Typora画流程图</h2><blockquote><p>参见：https://www.jianshu.com/p/7ddbb7dc8fec</p></blockquote><ul><li><p>横向流程图</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph LR
A[方形] --&gt;B(圆角)
    B --&gt; C{条件a}
    C --&gt;|a=1| D[结果1]
    C --&gt;|a=2| E[结果2]
    F[横向流程图]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
A<span class="token text string">[方形]</span> <span class="token arrow operator">--&gt;</span>B<span class="token text string">(圆角)</span>
    B <span class="token arrow operator">--&gt;</span> C<span class="token text string">{条件a}</span>
    C <span class="token arrow operator">--&gt;</span><span class="token label property">|a=1|</span> D<span class="token text string">[结果1]</span>
    C <span class="token arrow operator">--&gt;</span><span class="token label property">|a=2|</span> E<span class="token text string">[结果2]</span>
    F<span class="token text string">[横向流程图]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>竖向流程图</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>graph TD
A[方形] --&gt;B(圆角)
    B --&gt; C{条件a}
    C --&gt;|a=1| D[结果1]
    C --&gt;|a=2| E[结果2]
    F[竖向流程图]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token keyword">graph</span> TD
A<span class="token text string">[方形]</span> <span class="token arrow operator">--&gt;</span>B<span class="token text string">(圆角)</span>
    B <span class="token arrow operator">--&gt;</span> C<span class="token text string">{条件a}</span>
    C <span class="token arrow operator">--&gt;</span><span class="token label property">|a=1|</span> D<span class="token text string">[结果1]</span>
    C <span class="token arrow operator">--&gt;</span><span class="token label property">|a=2|</span> E<span class="token text string">[结果2]</span>
    F<span class="token text string">[竖向流程图]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>标准流程图源码格式 (为啥显示不出来)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>st=&gt;start: 开始框
op=&gt;operation: 处理框
cond=&gt;condition: 判断框(是或否?)
sub1=&gt;subroutine: 子流程
io=&gt;inputoutput: 输入输出框
e=&gt;end: 结束框
st-&gt;op-&gt;cond
cond(yes)-&gt;io-&gt;e
cond(no)-&gt;sub1(right)-&gt;op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code>st<span class="token operator">=&gt;</span>start<span class="token operator">:</span> 开始框
op<span class="token operator">=&gt;</span>operation<span class="token operator">:</span> 处理框
cond<span class="token operator">=&gt;</span>condition<span class="token operator">:</span> <span class="token function">判断框</span><span class="token punctuation">(</span>是或否<span class="token operator">?</span><span class="token punctuation">)</span>
sub1<span class="token operator">=&gt;</span>subroutine<span class="token operator">:</span> 子流程
io<span class="token operator">=&gt;</span>inputoutput<span class="token operator">:</span> 输入输出框
e<span class="token operator">=&gt;</span>end<span class="token operator">:</span> 结束框
st<span class="token operator">-</span><span class="token operator">&gt;</span>op<span class="token operator">-</span><span class="token operator">&gt;</span>cond
<span class="token function">cond</span><span class="token punctuation">(</span>yes<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span>io<span class="token operator">-</span><span class="token operator">&gt;</span>e
<span class="token function">cond</span><span class="token punctuation">(</span>no<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token function">sub1</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span>op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>标准流程图源码格式（横向）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>st=&gt;start: 开始框
op=&gt;operation: 处理框
cond=&gt;condition: 判断框(是或否?)
sub1=&gt;subroutine: 子流程
io=&gt;inputoutput: 输入输出框
e=&gt;end: 结束框
st(right)-&gt;op(right)-&gt;cond
cond(yes)-&gt;io(bottom)-&gt;e
cond(no)-&gt;sub1(right)-&gt;op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code>st<span class="token operator">=&gt;</span>start<span class="token operator">:</span> 开始框
op<span class="token operator">=&gt;</span>operation<span class="token operator">:</span> 处理框
cond<span class="token operator">=&gt;</span>condition<span class="token operator">:</span> <span class="token function">判断框</span><span class="token punctuation">(</span>是或否<span class="token operator">?</span><span class="token punctuation">)</span>
sub1<span class="token operator">=&gt;</span>subroutine<span class="token operator">:</span> 子流程
io<span class="token operator">=&gt;</span>inputoutput<span class="token operator">:</span> 输入输出框
e<span class="token operator">=&gt;</span>end<span class="token operator">:</span> 结束框
<span class="token function">st</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token function">op</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span>cond
<span class="token function">cond</span><span class="token punctuation">(</span>yes<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token function">io</span><span class="token punctuation">(</span>bottom<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span>e
<span class="token function">cond</span><span class="token punctuation">(</span>no<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span><span class="token function">sub1</span><span class="token punctuation">(</span>right<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">&gt;</span>op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>UML时序图源码样例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>对象A-&gt;对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B--&gt;对象A: 我很好(响应)
对象A-&gt;对象B: 你真的好吗？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><div class="language-sequence line-numbers-mode" data-ext="sequence"><pre class="language-sequence"><code>对象A-&gt;对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B--&gt;对象A: 我很好(响应)
对象A-&gt;对象B: 你真的好吗？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>UML时序图源码复杂样例</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Title: 标题：复杂使用
对象A-&gt;对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B--&gt;对象A: 我很好(响应)
对象B-&gt;小三: 你好吗
小三--&gt;&gt;对象A: 对象B找我了
对象A-&gt;对象B: 你真的好吗？
Note over 小三,对象B: 我们是朋友
participant C
Note right of C: 没人陪我玩
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sequence line-numbers-mode" data-ext="sequence"><pre class="language-sequence"><code>Title: 标题：复杂使用
对象A-&gt;对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B--&gt;对象A: 我很好(响应)
对象B-&gt;小三: 你好吗
小三--&gt;&gt;对象A: 对象B找我了
对象A-&gt;对象B: 你真的好吗？
Note over 小三,对象B: 我们是朋友
participant C
Note right of C: 没人陪我玩
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>UML标准时序图样例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>%% 时序图例子,-&gt; 直线，--&gt;虚线，-&gt;&gt;实线箭头
  sequenceDiagram
    participant 张三
    participant 李四
    张三-&gt;王五: 王五你好吗？
    loop 健康检查
        王五-&gt;王五: 与疾病战斗
    end
    Note right of 王五: 合理 食物 &lt;br/&gt;看医生...
    李四--&gt;&gt;张三: 很好!
    王五-&gt;李四: 你怎么样?
    李四--&gt;王五: 很好!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token comment">%% 时序图例子,-&gt; 直线，--&gt;虚线，-&gt;&gt;实线箭头</span>
  <span class="token keyword">sequenceDiagram</span>
    <span class="token keyword">participant</span> 张三
    <span class="token keyword">participant</span> 李四
    张三<span class="token arrow operator">-&gt;</span>王五<span class="token operator">:</span> 王五你好吗？
    <span class="token keyword">loop</span> 健康检查
        王五<span class="token arrow operator">-&gt;</span>王五<span class="token operator">:</span> 与疾病战斗
    <span class="token keyword">end</span>
    <span class="token keyword">Note right of</span> 王五<span class="token operator">:</span> 合理 食物 &lt;br/&gt;看医生...
    李四<span class="token arrow operator">--&gt;&gt;</span>张三<span class="token operator">:</span> 很好!
    王五<span class="token arrow operator">-&gt;</span>李四<span class="token operator">:</span> 你怎么样?
    李四<span class="token arrow operator">--&gt;</span>王五<span class="token operator">:</span> 很好!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>甘特图样例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>%% 语法示例
        gantt
        dateFormat  YYYY-MM-DD
        title 软件开发甘特图

        section 设计
        需求                      :done,    des1, 2014-01-06,2014-01-08
        原型                      :active,  des2, 2014-01-09, 3d
        UI设计                     :         des3, after des2, 5d
    未来任务                     :         des4, after des3, 5d

        section 开发
        学习准备理解需求                      :crit, done, 2014-01-06,24h
        设计框架                             :crit, done, after des2, 2d
        开发                                 :crit, active, 3d
        未来任务                              :crit, 5d
        耍                                   :2d

        section 测试
        功能测试                              :active, a1, after des3, 3d
        压力测试                               :after a1  , 20h
        测试报告                               : 48h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mermaid line-numbers-mode" data-ext="mermaid"><pre class="language-mermaid"><code><span class="token comment">%% 语法示例</span>
        <span class="token keyword">gantt</span>
        dateFormat  YYYY-MM-DD
        title 软件开发甘特图

        section 设计
        需求                      <span class="token operator">:</span>done,    des1, 2014-01-06,2014-01-08
        原型                      <span class="token operator">:</span>active,  des2, 2014-01-09, 3d
        UI设计                     <span class="token operator">:</span>         des3, after des2, 5d
    未来任务                     <span class="token operator">:</span>         des4, after des3, 5d

        section 开发
        学习准备理解需求                      <span class="token operator">:</span>crit, done, 2014-01-06,24h
        设计框架                             <span class="token operator">:</span>crit, done, after des2, 2d
        开发                                 <span class="token operator">:</span>crit, active, 3d
        未来任务                              <span class="token operator">:</span>crit, 5d
        耍                                   <span class="token operator">:</span>2d

        section 测试
        功能测试                              <span class="token operator">:</span>active, a1, after des3, 3d
        压力测试                               <span class="token operator">:</span>after a1  , 20h
        测试报告                               <span class="token operator">:</span> 48h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,32);function v(u,m){const s=e("center");return i(),t("div",null,[p,l(s,null,{default:d(()=>[o("居中显示")]),_:1}),c])}const g=a(r,[["render",v],["__file","Typora_Note.html.vue"]]);export{g as default};

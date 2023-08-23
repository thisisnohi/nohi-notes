import{_ as i,M as s,p as l,q as r,R as e,t as a,N as t,a1 as c}from"./framework-449724a9.js";const d={},o=e("h1",{id:"java-crash问题分析",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#java-crash问题分析","aria-hidden":"true"},"#"),a(" Java crash问题分析")],-1),m=e("p",null,"create by nohi 20230716",-1),v={href:"https://www.cnblogs.com/yelao/p/9814467.html",target:"_blank",rel:"noopener noreferrer"},p=c(`<h2 id="一、如何生成日志文件" tabindex="-1"><a class="header-anchor" href="#一、如何生成日志文件" aria-hidden="true">#</a> 一、如何生成日志文件</h2><ul><li>缺省情况下，这个文件会产生在工作目录下。</li><li>指定生成文件路径<code>java -XX:ErrorFile=/var/log/java/java_error_%p.log</code></li><li>这个文件将包括： <ul><li>触发致命错误的操作异常或者信号；</li><li>版本和配置信息；</li><li>触发致命异常的线程详细信息和线程栈；</li><li>当前运行的线程列表和它们的状态；</li><li>堆的总括信息；</li><li>加载的本地库；</li><li>命令行参数；</li><li>环境变量；</li><li>操作系统CPU的详细信息。</li></ul></li></ul><h2 id="二、产生错误的原因" tabindex="-1"><a class="header-anchor" href="#二、产生错误的原因" aria-hidden="true">#</a> 二、产生错误的原因</h2><ul><li>虚拟机自身的bug</li><li>系统的库文件、API或第三方库文件</li><li>系统资源</li></ul><h2 id="三、对日志文件的分析" tabindex="-1"><a class="header-anchor" href="#三、对日志文件的分析" aria-hidden="true">#</a> 三、对日志文件的分析</h2><h3 id="_1-文件头" tabindex="-1"><a class="header-anchor" href="#_1-文件头" aria-hidden="true">#</a> 1 文件头</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>-- 第一个文件的头
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－  
<span class="token comment">#  </span>
<span class="token comment"># An unexpected error has been detected by HotSpot Virtual Machine:  </span>
<span class="token comment">#  </span>
<span class="token comment"># EXCEPTION_ACCESS_VIOLATION (0xc0000005) at pc=0x0815e87e, pid=7268, tid=4360 </span>
<span class="token comment">#  </span>
<span class="token comment"># Java VM: Java HotSpot(TM) Server VM (1.4.2_13-b06 mixed mode)  </span>
<span class="token comment"># Problematic frame:  </span>
<span class="token comment"># V [jvm.dll+0x15e87e]  </span>
<span class="token comment">#  </span>
-- 其他文件的头
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 
<span class="token comment"># A fatal error has been detected by the Java Runtime Environment:</span>
<span class="token comment">#</span>
<span class="token comment">#  SIGILL (0x4) at pc=0x00007ff805499b9e, pid=19025, tid=259</span>
<span class="token comment">#</span>
<span class="token comment"># JRE version: OpenJDK Runtime Environment JBR-17.0.7+10-829.16-jcef (17.0.7+10) (build 17.0.7+10-b829.16)</span>
<span class="token comment"># Java VM: OpenJDK 64-Bit Server VM JBR-17.0.7+10-829.16-jcef (17.0.7+10-b829.16, mixed mode, tiered, compressed oops, compressed class ptrs, g1 gc, bsd-amd64)</span>
<span class="token comment"># Problematic frame:</span>
<span class="token comment"># C  [libsystem_kernel.dylib+0x7b9e]  __kill+0xa</span>
<span class="token comment">#</span>
<span class="token comment"># No core dump will be written. Core dumps have been disabled. To enable core dumping, try &quot;ulimit -c unlimited&quot; before starting Java again</span>
<span class="token comment">#</span>
<span class="token comment"># If you would like to submit a bug report, please visit:</span>
<span class="token comment">#   https://youtrack.jetbrains.com/issues/JBR</span>
<span class="token comment"># The crash happened outside the Java Virtual Machine in native code.</span>
<span class="token comment"># See problematic frame for where to report the bug.</span>
<span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>“EXCEPTION_ACCESS_VIOLATION ”意味着Java应用Crash的时候，正在运行JVM自己的代码，而不是外部的Java代码或其他类库代码</li><li>“SIGSEGV(0xb)”，意味着JVM正在执行本地或JNI的代码;</li><li>“EXCEPTION_STACK_OVERFLOW”意味着这是个栈溢出的错误</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Problematic frame:  
# V [jvm.dll+0x15e87e] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>说明Crash的时候，JVM正在从哪个库文件执行代码。除了“V”以外，还有可能是“C”、“j”、“v”、“J”。具体的表示意思如下： <ol><li>FrameType Description：</li><li>C: Native C frame 本地C帧</li><li>j: Interpreted Java frame 解释的Java帧</li><li>V: VMframe 虚拟机帧</li><li>v: VMgenerated stub frame 虚拟机生成的存根栈帧</li><li>J: Other frame types, including compiled Java frames 其他帧类型，包括编译后的Java帧</li></ol></li></ul><h2 id="四、内存回收引起的crash" tabindex="-1"><a class="header-anchor" href="#四、内存回收引起的crash" aria-hidden="true">#</a> 四、内存回收引起的Crash</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Problematic frame: # V [jvm.dll+....”的信息，意味着这是在JVM内部处理，而且多半是JVM的Bug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对于内存回收的错误，一般</p><ol><li>generation collection for allocation</li><li>full generation collection</li><li>parallel gc failed allocation</li><li>parallel gc failed permanent allocation</li><li>parallel gc system gc</li></ol><h2 id="五、栈溢出引起的crash" tabindex="-1"><a class="header-anchor" href="#五、栈溢出引起的crash" aria-hidden="true">#</a> 五、栈溢出引起的Crash</h2><p>Java代码引起的栈溢出，通常不会引起JVM的Crash，而是抛出一个Java异常：java.lang.StackOverflowError。但是在Java虚拟机中，Java的代码和本地C或C++代码公用相同的Stack。这样，在执行本地代码所造成的栈溢出，就有可能引起JVM的Crash了。栈溢出引起的Crash会在日志的文件头中看到“EXCEPTION_STACK_OVERFLOW”字样。另外，在当前线程的Stack信息中也能发现一些信息。例如下面的例子：</p>`,16);function u(h,b){const n=s("ExternalLinkIcon");return l(),r("div",null,[o,e("blockquote",null,[m,e("p",null,[a("参考："),e("a",v,[a("Java crash问题分析"),t(n)])])]),p])}const f=i(d,[["render",u],["__file","Java crash问题分析.html.vue"]]);export{f as default};

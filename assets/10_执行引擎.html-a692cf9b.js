import{_ as e,p as t,q as i,a1 as l}from"./framework-449724a9.js";const n={},a=l(`<h1 id="_10-执行引擎" tabindex="-1"><a class="header-anchor" href="#_10-执行引擎" aria-hidden="true">#</a> 10 执行引擎</h1><h2 id="_1-解释器、jit编译器" tabindex="-1"><a class="header-anchor" href="#_1-解释器、jit编译器" aria-hidden="true">#</a> 1. 解释器、JIT编译器</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>╰─➤  java -version
java version &quot;1.8.0_221&quot;
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, mixed mode)
(base) ╭─nohi@nohis-MacBook-Pro.local ~
╰─➤  java -Xcomp -version
java version &quot;1.8.0_221&quot;
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, compiled mode)
(base) ╭─nohi@nohis-MacBook-Pro.local ~
╰─➤  java -Xint -version
java version &quot;1.8.0_221&quot;
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, interpreted mode)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>Server VM 为服务器模式，64位JDK为server，无需指定</p></li><li><p>mixed 为解释器、JIT编译器混合模式</p><ul><li>通过 -Xint -Xcomp指定解释器、编译器模式</li><li>-Xmixed: 采用混合模式</li></ul><table><thead><tr><th></th><th style="text-align:center;">解释器</th><th style="text-align:center;">编译器</th></tr></thead><tbody><tr><td>编译</td><td style="text-align:center;">快</td><td style="text-align:center;">慢</td></tr><tr><td>运行</td><td style="text-align:center;">解释执</td><td style="text-align:center;">编译执行</td></tr><tr><td>响应</td><td style="text-align:center;">即使响应</td><td style="text-align:center;">编译完成后响应</td></tr><tr><td>运行</td><td style="text-align:center;">运行较慢</td><td style="text-align:center;">运行机器指令，更快</td></tr></tbody></table></li></ul><h2 id="_2-热点代码" tabindex="-1"><a class="header-anchor" href="#_2-热点代码" aria-hidden="true">#</a> 2. 热点代码</h2><ul><li>-XX:CompileThreshold</li><li>衰减 半衰周期</li></ul><h2 id="_3-aot编译器" tabindex="-1"><a class="header-anchor" href="#_3-aot编译器" aria-hidden="true">#</a> 3. AOT编译器</h2><ul><li>AOT静态提前编译器，程序运行产将字节码转换为机器码</li><li>JIT为程序运行期间，将字节友转换为可在硬件上直接运行机器码</li><li>优点 <ul><li>直接编译成机器指令，运行速度慢</li></ul></li><li>缺点 <ul><li>编译慢</li><li>丧失部分java动态性</li><li>实验阶段，目前只支持Linux64位</li></ul></li></ul>`,8),d=[a];function r(s,o){return t(),i("div",null,d)}const c=e(n,[["render",r],["__file","10_执行引擎.html.vue"]]);export{c as default};

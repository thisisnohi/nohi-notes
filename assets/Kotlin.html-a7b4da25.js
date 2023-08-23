import{_ as e,p as i,q as n,a1 as a}from"./framework-449724a9.js";const l={},t=a(`<h1 id="kotlin" tabindex="-1"><a class="header-anchor" href="#kotlin" aria-hidden="true">#</a> Kotlin</h1><blockquote><p>参考：</p><p>从 Java 角度深入理解 Kotlin https://chiclaim.blog.csdn.net/article/details/85575213</p><p>Kotlin从入门到进阶https://www.jianshu.com/p/f98dcd2da323</p></blockquote><h2 id="类的修饰符" tabindex="-1"><a class="header-anchor" href="#类的修饰符" aria-hidden="true">#</a> 类的修饰符</h2><ul><li>classModifier: 类属性修饰符，标示类本身特性。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>abstract    // 抽象类  
final       // 类不可继承，默认属性
enum        // 枚举类
open        // 类可继承，类默认是final的
annotation  // 注解类
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>accessModifier: 访问权限修饰符</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private    // 仅在同一个文件中可见
protected  // 同一个文件中或子类可见
public     // 所有调用的地方都可见
internal   // 同一个模块中可见
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>变量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const val 公有常量
val 私有常量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>伴生对象</p><blockquote><p>参见：https://blog.csdn.net/sinat_14849739/article/details/80552111</p></blockquote></li></ul>`,8),d=[t];function s(c,r){return i(),n("div",null,d)}const u=e(l,[["render",s],["__file","Kotlin.html.vue"]]);export{u as default};

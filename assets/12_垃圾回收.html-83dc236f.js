import{_ as n,p as e,q as s,a1 as a}from"./framework-449724a9.js";const i={},l=a(`<h1 id="_12-垃圾回收" tabindex="-1"><a class="header-anchor" href="#_12-垃圾回收" aria-hidden="true">#</a> 12 垃圾回收</h1><h2 id="_1-什么是垃圾、为什么需要gc" tabindex="-1"><a class="header-anchor" href="#_1-什么是垃圾、为什么需要gc" aria-hidden="true">#</a> 1. 什么是垃圾、为什么需要GC</h2><ul><li>程序运行里，没有指针引用的数据</li><li>内存不停消耗，尽早被消耗完</li></ul><p><strong>内存泄漏、内存溢出</strong></p><ul><li>内存泄漏：内存中存在无法回收的垃圾占用</li><li>内存溢出：分配内存时，内存不够，垃圾回收后仍无法满足</li></ul><p><strong>阶段</strong></p><ul><li>标识阶段 <ul><li>引用计数法</li><li>GC Roots 可达性算法</li></ul></li><li>回收阶段 <ul><li>标记-清理</li><li>标记-压缩</li><li>复制</li></ul></li></ul><h2 id="_2-识别垃圾" tabindex="-1"><a class="header-anchor" href="#_2-识别垃圾" aria-hidden="true">#</a> 2 识别垃圾</h2><ul><li>引用计数法 <ul><li>java未采用此算法</li><li>GC Roots 可达性算法/根搜索方法</li></ul></li><li>GC roots包括元素 <ul><li>虚拟机栈中引用的对象</li><li>本地方法栈内JNI(通常说的本地方法)引用的对象</li><li>方法区中类中静态属性引用的对象</li><li>方法区中常量引用的对象</li><li>所有被同步锁synchronized持有的对象</li><li>Java虚拟机内部的引用 <ul><li>基本数据类型对应的class对象，一些常驻的异常对象（如：NullPointerException、OutOfMemeryError），系统类加载器</li></ul></li><li>反映Java虚拟机内部情况的JMXBean、JVMTI中注册的回调、本地代码缓存等</li><li>分代收集、局部回收</li></ul></li></ul><h2 id="_3-对象的finalization机制" tabindex="-1"><a class="header-anchor" href="#_3-对象的finalization机制" aria-hidden="true">#</a> 3 对象的finalization机制</h2><p>对象被终止(finalization)机制来允许开发人员提供对象被销毁前的自定义处理逻辑</p><ul><li>finalize()可能导致对象复活</li><li>finalize()方法执行时间没有保障，完全由gc线程决定</li><li>一个糟糕的finalize()会严重影响GC的性能</li></ul><p>对象存在三中可能状态：可触及、可复活、不可触及</p><h2 id="_4-垃圾清理" tabindex="-1"><a class="header-anchor" href="#_4-垃圾清理" aria-hidden="true">#</a> 4 垃圾清理</h2><table><thead><tr><th></th><th style="text-align:center;">Mark Sweep(标记清除)</th><th style="text-align:center;">Mark Compact(标记压缩)</th><th style="text-align:center;">Copying(拷贝)</th></tr></thead><tbody><tr><td>速度</td><td style="text-align:center;">中等</td><td style="text-align:center;">最慢</td><td style="text-align:center;">最快</td></tr><tr><td>空间开销</td><td style="text-align:center;">少（存在碎片堆积）</td><td style="text-align:center;">少（不堆积碎片）</td><td style="text-align:center;">需要存活对象2位空间大小（不堆积碎片）</td></tr><tr><td>移动对象</td><td style="text-align:center;">否</td><td style="text-align:center;">是</td><td style="text-align:center;">是</td></tr></tbody></table><ul><li>标记清除 <ul><li>缺点： <ul><li>效率不高</li><li>在进行GC时，STW，用户体验差</li><li>清理出来的空间不连续，产生碎片，需要维护一个空闲列表</li></ul></li><li>清除只是把需要清除的对象地址保存在空间的地址列表里</li></ul></li></ul><h2 id="_5-垃圾回收并行并发" tabindex="-1"><a class="header-anchor" href="#_5-垃圾回收并行并发" aria-hidden="true">#</a> 5 垃圾回收并行并发</h2><h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h3><ul><li>并发 <ul><li>一段时间段内几个程序都处于启动运行到运行完毕之间。</li></ul></li><li>并行 <ul><li>同一时间点cpu执行多项任务（一般一个cpu存在多核）</li></ul></li></ul><h3 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收" aria-hidden="true">#</a> 垃圾回收</h3><ul><li>并行Parallel</li><li>Seial</li></ul><h3 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> DEMO</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package nohi.jvm._12_GC;

import org.junit.Test;

/**
 * &lt;h3&gt;thinkinjava&lt;/h3&gt;
 *
 * @author NOHI
 * @description &lt;p&gt;&lt;/p&gt;
 * @date 2022/11/26 16:04
 **/
public class LocalVarGC {

    public void localVarGc1() {
        byte[] bs = new byte[10 * 1024 * 1024];
        System.gc();
    }

    public void localVarGc2() {
        byte[] bs = new byte[10 * 1024 * 1024];
        bs = null;
        System.gc();
    }

    public void localVarGc3() {
        {
            byte[] bs = new byte[10 * 1024 * 1024];
        }
        System.gc();
    }

    public void localVarGc4() {
        {
            byte[] bs = new byte[10 * 1024 * 1024];
        }
        int i = 0;
        System.gc();
    }

    public void localVarGc5() {
        localVarGc1();
        System.gc();
    }

    /**
     * -XX:+PrintGCDetails
     * @param args
     */
    public static void main(String[] args) {
        LocalVarGC l = new LocalVarGC();
        // localVarGc1 不回收
        // [GC (System.gc()) [PSYoungGen: 14172K-&gt;10720K(76288K)] 14172K-&gt;10812K(251392K), 0.0065290 secs] [Times: user=0.07 sys=0.01, real=0.01 secs]
        // [Full GC (System.gc()) [PSYoungGen: 10720K-&gt;0K(76288K)] [ParOldGen: 92K-&gt;10656K(175104K)] 10812K-&gt;10656K(251392K), [Metaspace: 3111K-&gt;3111K(1056768K)], 0.0063655 secs] [Times: user=0.02 sys=0.02, real=0.00 secs]
        // [GC (System.gc()): young gc时未回收
        // Full GC： 到老年代
        // l.localVarGc1();

        // 回收
        // [GC (System.gc()) [PSYoungGen: 14172K-&gt;656K(76288K)] 14172K-&gt;664K(251392K), 0.0011722 secs] [Times: user=0.00 sys=0.00, real=0.00 secs]
        // [Full GC (System.gc()) [PSYoungGen: 656K-&gt;0K(76288K)] [ParOldGen: 8K-&gt;416K(175104K)] 664K-&gt;416K(251392K), [Metaspace: 3111K-&gt;3111K(1056768K)], 0.0040826 secs] [Times: user=0.03 sys=0.00, real=0.00 secs]
        // l.localVarGc2();

        // 不回收
        // [GC (System.gc()) [PSYoungGen: 14172K-&gt;10720K(76288K)] 14172K-&gt;10828K(251392K), 0.0060878 secs] [Times: user=0.06 sys=0.00, real=0.01 secs]
        // [Full GC (System.gc()) [PSYoungGen: 10720K-&gt;0K(76288K)] [ParOldGen: 108K-&gt;10655K(175104K)] 10828K-&gt;10655K(251392K), [Metaspace: 3105K-&gt;3105K(1056768K)], 0.0065082 secs] [Times: user=0.02 sys=0.03, real=0.01 secs]
        // l.localVarGc3();

        // 回收
        // [GC (System.gc()) [PSYoungGen: 14172K-&gt;704K(76288K)] 14172K-&gt;712K(251392K), 0.0012136 secs] [Times: user=0.01 sys=0.00, real=0.00 secs]
        // [Full GC (System.gc()) [PSYoungGen: 704K-&gt;0K(76288K)] [ParOldGen: 8K-&gt;416K(175104K)] 712K-&gt;416K(251392K), [Metaspace: 3111K-&gt;3111K(1056768K)], 0.0041112 secs] [Times: user=0.02 sys=0.01, real=0.01 secs]
        // l.localVarGc4();

        // 回收
        // [GC (System.gc()) [PSYoungGen: 14172K-&gt;10720K(76288K)] 14172K-&gt;10808K(251392K), 0.0058146 secs] [Times: user=0.06 sys=0.00, real=0.01 secs]
        // [Full GC (System.gc()) [PSYoungGen: 10720K-&gt;0K(76288K)] [ParOldGen: 88K-&gt;10656K(175104K)] 10808K-&gt;10656K(251392K), [Metaspace: 3112K-&gt;3112K(1056768K)], 0.0057435 secs] [Times: user=0.02 sys=0.03, real=0.00 secs]
        // [GC (System.gc()) [PSYoungGen: 0K-&gt;0K(76288K)] 10656K-&gt;10656K(251392K), 0.0004863 secs] [Times: user=0.00 sys=0.00, real=0.00 secs]
        // [Full GC (System.gc()) [PSYoungGen: 0K-&gt;0K(76288K)] [ParOldGen: 10656K-&gt;416K(175104K)] 10656K-&gt;416K(251392K), [Metaspace: 3112K-&gt;3112K(1056768K)], 0.0038133 secs] [Times: user=0.03 sys=0.00, real=0.00 secs]
        // 前两个：GC、Full GC为方法一中
        // 后两个：GC、Full Gc 为localVarGc5方法中,由于方法一已经执行完，可以被回收
        l.localVarGc5();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-安全点-safe-point-、安全区域-safe-region" tabindex="-1"><a class="header-anchor" href="#_6-安全点-safe-point-、安全区域-safe-region" aria-hidden="true">#</a> 6 安全点（Safe Point）、安全区域(Safe Region)</h2><ul><li><strong>安全点</strong>：程序执行时并非在所有地方都能停顿下开始GC，只有在特定位置才能停顿去执行GC，这些位置称为安全点（Safepoint) <ul><li>方法调用、循环跳转、异常跳转</li><li>抢先式中断</li><li>主动式中断</li></ul></li><li><strong>安全区域</strong>：一段代码版本中，对象的引用关系不会发生变化，在这个区域中的任何位置开始GC都是安全的</li></ul><h2 id="_7-引用" tabindex="-1"><a class="header-anchor" href="#_7-引用" aria-hidden="true">#</a> 7 引用</h2><ul><li>强引用、软引用、弱引用、虚引用有什么区别、具体使用场景是什么？ <ul><li>强引用：代码普遍存在，类似Object obj = new Ojbect()这种引用关系，无论任何情况下，些引用关系存在，则不会回收</li><li>软件引用：内存溢出之前，将会把这些对象列入回收，范围之中进行第二次回收，如果回收后没有足够内存，抛溢出异常。</li><li>弱引用：被弱引用关系的对象只能生存到下次垃圾回收之前，即垃圾回收时，无论空间是否足够，都会回收弱引用关系对象。</li><li>虚引用：一个对象是否有虚引用存在，完全不会对期生存时间构成影响，也无法通过虚引用来获得一个对象的实例，为一个对象设置虚引用的唯一目的就是在这个对象被收集器回收时收到一个系统通知。</li></ul></li></ul><h3 id="强引用-不回收" tabindex="-1"><a class="header-anchor" href="#强引用-不回收" aria-hidden="true">#</a> 强引用-不回收</h3><h3 id="软引用-内在不足即回收" tabindex="-1"><a class="header-anchor" href="#软引用-内在不足即回收" aria-hidden="true">#</a> 软引用-内在不足即回收</h3><p>当内存足够时，不会回收软件引用可达对象</p><p>当内存不够时，会回收软件引用可达对象</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 声明强引用</span>
<span class="token class-name">SoftReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> sf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SoftReference</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
obj <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">// 销毁引用 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="虚引用-对象回收跟踪" tabindex="-1"><a class="header-anchor" href="#虚引用-对象回收跟踪" aria-hidden="true">#</a> 虚引用-对象回收跟踪</h3><p>唯一目的在于跟踪垃圾回收过程。比如：能在这个对象被收集器回收时收到一个系统通知</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token class-name">PhantomQueue</span> phantomQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PhantomQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">PhantomReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> pr <span class="token operator">=</span> <span class="token keyword">new</span>  <span class="token class-name">PhantomReference</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> phantomQueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),t=[l];function c(d,r){return e(),s("div",null,t)}const o=n(i,[["render",c],["__file","12_垃圾回收.html.vue"]]);export{o as default};

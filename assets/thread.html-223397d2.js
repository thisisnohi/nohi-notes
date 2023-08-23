import{_ as a,M as s,p as t,q as r,R as e,t as n,N as u,a1 as i}from"./framework-449724a9.js";const d="/assets/20221019-threadpool-7864a563.png",o={},c=i(`<h1 id="thread" tabindex="-1"><a class="header-anchor" href="#thread" aria-hidden="true">#</a> Thread</h1><blockquote><p>create by nohi 20221012</p></blockquote><h2 id="创建线程的几种方式" tabindex="-1"><a class="header-anchor" href="#创建线程的几种方式" aria-hidden="true">#</a> 创建线程的几种方式</h2><ul><li><p>继承Thread类创建线程类</p></li><li><p>通过Runnable接口创建线程类</p></li><li><p>通过Callable和Future创建线程</p><p>Runnable接口中的run()方法的返回值是void，它做的事情只是纯粹地去执行run()方法中的代码而已； Callable接口中的call()方法是有返回值的，是一个泛型，和Future、FutureTask配合可以用来获取异步执行的结果。</p></li></ul><h2 id="样例" tabindex="-1"><a class="header-anchor" href="#样例" aria-hidden="true">#</a> 样例</h2><blockquote><p>参见：SpringCloud2022/nohi-web/src/test/java/nohi/_java/_thread/TestThreadPool.java</p></blockquote><ul><li><p>Thread、Runnable</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> // lambda表达式
 Runnable runnable1 = () -&gt; {
   System.out.println(&quot;lambda Runnable&quot;);
 };
 new Thread(runnable1).start();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Callable</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> Callable&lt;Integer&gt; callable = new Callable&lt;Integer&gt;() {
   @Override
   public Integer call() throws Exception {
     Thread.sleep(6000);
     return new Random().nextInt();
   }
 };
 FutureTask&lt;Integer&gt; future = new FutureTask&lt;&gt;(callable);
 new Thread(future).start();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="线程池" tabindex="-1"><a class="header-anchor" href="#线程池" aria-hidden="true">#</a> 线程池</h2><blockquote><p>参考：https://zhuanlan.zhihu.com/p/65556060</p><p>/nohi-web/src/test/java/nohi/_java/_thread/TestExecutors.java</p><p>⚠️ 不建议使用Executors</p></blockquote><p><img src="`+d+`" alt="img"></p><h3 id="executors" tabindex="-1"><a class="header-anchor" href="#executors" aria-hidden="true">#</a> Executors</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* 该方法返回一个固定线程数量的线程池，该线程池池中的线程数量始终不变。
 * 当有一个新的任务提交时，线程池中若有空闲线程，则立即执行。
 * 若没有，则新的任务会被暂存在一个任务队列中，待有线程空闲时，便处理在任务队列中的任务 
 * 默认等待队列长度为Integer.MAX_VALUE
 */
ExecutorService fixedThreadPool = Executors.newFixedThreadPool(1);
/* 该方法返回一个只有一个线程的线程池。
 * 若多余一个任务被提交到线程池，任务会被保存在一个任务队列中，等待线程空闲，按先入先出顺序执行队列中的任务
 * 默认等待队列长度为Integer.MAX_VALUE
 */
ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
/* 
 * 该方法返回一个可根据实际情况调整线程数量的线程池。
 * 线程池的线程数量不确定，但若有空闲线程可以复用，则会优先使用可复用的线程。
 * 若所有线程均在工作，又有新任务的提交，则会创建新的线程处理任务。
 * 所有线程在当前任务执行完毕后，将返回线程池进行复用
 */
ExecutorService newCachedThreadPool = Executors.newCachedThreadPool();
/* 该方法返回一个ScheduledExecutorService对象，线程池大小为1。
 * ScheduledExecutorService接口在ExecutorService接口之上扩展了在给定时间内执行某任务的功能，
 * 如在某个固定的延时之后执行，或者周期性执行某个任务
 */
ExecutorService newSingleThreadScheduledExecutor = Executors.newSingleThreadScheduledExecutor();
/*
 * 该方法也返回一个ScheduledExecutorService对象，但该线程池可以指定线程数量
 */
ExecutorService newScheduledThreadPool = Executors.newScheduledThreadPool(1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上的工具类的具体实现都是基于ThreadPoolExecutor类，处理策略都是AbortPolicy（直接抛出异常，阻止系统正常工作）</p><p>Executors 返回的线程池对象的弊端如下：</p><p>1） FixedThreadPool 、SingleThreadPool:</p><p>​ 允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，从而导致 OOM。</p><p>2） CachedThreadPool 、 ScheduledThreadPool、SingleThreadScheduledExecutor:</p><p>​ 允许的创建线程数量为 Integer.MAX_VALUE， 可能会创建大量的线程，从而导致 OOM。</p><p>通常情况下，线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险。</p><h3 id="threadpoolexecutor" tabindex="-1"><a class="header-anchor" href="#threadpoolexecutor" aria-hidden="true">#</a> ThreadPoolExecutor</h3><blockquote><p>nohi-web/src/test/java/nohi/_java/_thread/TestThreadPoolExecutor.java</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// ThreadPoolExecutor的全参构造方法
public ThreadPoolExecutor(int corePoolSize,int maximumPoolSize,long keepAliveTime, TimeUnit unit,
 BlockingQueue&lt;Runnable&gt; workQueue,ThreadFactory threadFactory,RejectedExecutionHandler handler) 
{
        if (corePoolSize &lt; 0 ||
            maximumPoolSize &lt;= 0 ||
            maximumPoolSize &lt; corePoolSize ||
            keepAliveTime &lt; 0)
            throw new IllegalArgumentException();
        if (workQueue == null || threadFactory == null || handler == null)
            throw new NullPointerException();
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
        this.keepAliveTime = unit.toNanos(keepAliveTime);
        this.threadFactory = threadFactory;
        this.handler = handler;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>corePoolSize 表示 核心线程数 1. 创建线程池时, 在线程池中常驻的线程, 当corePoolSize &lt;= 0 销毁线程池 2. 当corePoolSize &gt; 0 线程池中常驻的线程数 = corePoolSize. 3. corePoolSize选择: 应该根据实际情况选择 , 如果corePoolSize 太小会存在频繁创建线程和销毁线程的行为</p></li><li><p>maximumPoolSize表示 线程池最大线程数</p><ol><li><p>该数值必须在满足corePoolSize条件的情况下 大于当corePoolSize的数值</p></li><li><p>当提交的线程数大于corePoolSize时 , 那么线程池就会创建新的线程</p></li><li><p>这个线程的数量一定是在 corePoolSize &lt;=线程数&lt;= maximumPoolSize</p></li></ol></li><li><p>keepAliveTime 表示空闲的线程存活时间</p><p>当线程池中的线程空闲时间大于 keepAliveTime时, 那么就会销毁多余的线程 , 到等于corePoolSize的 数值</p><p>TimeUnit 表示线程存活的时间单位</p></li><li><p>workQueue 线程任务队列 1. 当线程池中的所有任务队列都在执行任务时,那么新的线程任务就会存入到队列中 , 等待被消费</p></li><li><p>threadFactory 创建线程的工厂 一般使用默认..Executors.defaultThreadFactory()</p></li><li><p>handler 表示线程池的拒绝策略 当线程池中的线程数 = maximumPoolSize , workQueue = Integer.MAX_VALUE时</p><ol><li>AbortPolicy：直接抛出异常，阻止系统正常工作。</li><li>CallerRunsPolicy：只要线程未关闭，该策略直接在调用者线程中，运行当前被丢弃的任务。</li><li>DiscardOldestPolicy：该策略将丢弃最老的一个请求，也就是即将被执行的一个人任务，并尝试再次提交当前任务。</li><li>DiscardPolicy：该策略默默的丢弃无法处理</li><li>当然也可以根据应用场景需要来实现RejectedExecutionHandler接口自定义策略。</li></ol></li><li><p>DEMO</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ThreadPoolExecutor executor = new ThreadPoolExecutor(
                10 ,
                20 ,
                60,
                TimeUnit.SECONDS,
                new ArrayBlockingQueue&lt;Runnable&gt;(10),  // 指定队列大小
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy()
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="completablefuture" tabindex="-1"><a class="header-anchor" href="#completablefuture" aria-hidden="true">#</a> CompletableFuture</h2>`,24),p={href:"https://juejin.cn/post/6970558076642394142",target:"_blank",rel:"noopener noreferrer"},v=i(`<h3 id="future" tabindex="-1"><a class="header-anchor" href="#future" aria-hidden="true">#</a> Future</h3><ul><li>Future.get() 就是阻塞调用，在线程获取结果之前<strong>get方法会一直阻塞</strong>。</li><li>Future提供了一个isDone方法，可以在程序中<strong>轮询这个方法查询</strong>执行结果。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Test
public void testFutureCallable() throws InterruptedException {
    FutureTask&lt;FutureVO&gt; ft = new FutureTask(new Callable&lt;FutureVO&gt;() {
        long sleep = 10l;
        @Override
        public FutureVO call() throws Exception {
            System.out.println(&quot;callable do something then return...&quot;);
            FutureVO vo = new FutureVO();
            vo.setMsgId(new SecureRandom().nextLong());
            vo.setTitle(&quot;FUTURE&quot;);
            vo.setMsg(&quot;TEST future&quot;);
            if (sleep &gt; 0) {
                TimeUnit.SECONDS.sleep(sleep);
            }
            return vo;
        }
    });
    executor.submit(ft);

    try {
        System.out.println(&quot;isDone:&quot; + ft.isDone());
        System.out.println(&quot;isDone:&quot; + ft.isDone());
        System.out.println(&quot;isDone:&quot; + ft.isDone());

        FutureVO futureVO = ft.get();
        System.out.println(JSON.toJSONString(futureVO));
    } catch (ExecutionException e) {
        e.printStackTrace();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建异步任务" tabindex="-1"><a class="header-anchor" href="#创建异步任务" aria-hidden="true">#</a> 创建异步任务</h3><ul><li><p>supplyAsync执行CompletableFuture任务，支持返回值</p></li><li><p>runAsync执行CompletableFuture任务，没有返回值。</p><h4 id="supplyasync方法" tabindex="-1"><a class="header-anchor" href="#supplyasync方法" aria-hidden="true">#</a> supplyAsync方法</h4><div class="language-swift line-numbers-mode" data-ext="swift"><pre class="language-swift"><code><span class="token comment">//使用默认内置线程池ForkJoinPool.commonPool()，根据supplier构建执行任务</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token operator">&lt;</span><span class="token class-name">U</span><span class="token operator">&gt;</span> <span class="token class-name">CompletableFuture</span><span class="token operator">&lt;</span><span class="token class-name">U</span><span class="token operator">&gt;</span> <span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span><span class="token operator">&lt;</span><span class="token class-name">U</span><span class="token operator">&gt;</span> supplier<span class="token punctuation">)</span>
<span class="token comment">//自定义线程，根据supplier构建执行任务</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token operator">&lt;</span><span class="token class-name">U</span><span class="token operator">&gt;</span> <span class="token class-name">CompletableFuture</span><span class="token operator">&lt;</span><span class="token class-name">U</span><span class="token operator">&gt;</span> <span class="token function">supplyAsync</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span><span class="token operator">&lt;</span><span class="token class-name">U</span><span class="token operator">&gt;</span> supplier<span class="token punctuation">,</span> <span class="token class-name">Executor</span> executor<span class="token punctuation">)</span>
复制代码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="runasync方法" tabindex="-1"><a class="header-anchor" href="#runasync方法" aria-hidden="true">#</a> runAsync方法</h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//使用默认内置线程池ForkJoinPool.commonPool()，根据runnable构建执行任务</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span> <span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">)</span> 
<span class="token comment">//自定义线程，根据runnable构建执行任务</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">CompletableFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">&gt;</span></span> <span class="token function">runAsync</span><span class="token punctuation">(</span><span class="token class-name">Runnable</span> runnable<span class="token punctuation">,</span>  <span class="token class-name">Executor</span> executor<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ul><li>DEMO</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ExecutorService executor = Executors.newFixedThreadPool(2);
@Test
public void testCompletableFuture() {
    long sleep = 10l;

    CompletableFuture&lt;FutureVO&gt; cf = CompletableFuture.supplyAsync(() -&gt; {
        System.out.println(&quot;CompletableFuture.supplyAsync do something then return...&quot;);
        FutureVO vo = new FutureVO();
        vo.setMsgId(new SecureRandom().nextLong());
        vo.setTitle(&quot;FUTURE&quot;);
        vo.setMsg(&quot;TEST future&quot;);
        if (sleep &gt; 0) {
            try {
                TimeUnit.SECONDS.sleep(sleep);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        return vo;
    }, executor);

    try {
        FutureVO vo = cf.get(1, TimeUnit.SECONDS);
        System.out.println(&quot;1:&quot; + JSONObject.toJSONString(vo));
        return;
    } catch (Exception e) {
        e.printStackTrace();
        System.out.println(&quot;get with 1s error &quot; + e.getMessage());
    }

    try {
        FutureVO vo = cf.get(2, TimeUnit.SECONDS);
        System.out.println(&quot;2:&quot; + JSONObject.toJSONString(vo));
        return;
    } catch (Exception e) {
        System.out.println(&quot;get with 2s error &quot; + e.getMessage());
    }

    try {
        FutureVO vo = cf.get();
        System.out.println(&quot;3:&quot; + JSONObject.toJSONString(vo));
    } catch (Exception e) {
        System.out.println(&quot;get error &quot; + e.getMessage());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="任务异步回调" tabindex="-1"><a class="header-anchor" href="#任务异步回调" aria-hidden="true">#</a> 任务异步回调</h3><h4 id="_1-thenrun-thenrunasync" tabindex="-1"><a class="header-anchor" href="#_1-thenrun-thenrunasync" aria-hidden="true">#</a> 1. thenRun/thenRunAsync</h4><p>CompletableFuture的thenRun方法，通俗点讲就是，<strong>做完第一个任务后，再做第二个任务</strong>。某个任务执行完成后，执行回调方法；但是前后两个任务<strong>没有参数传递，第二个任务也没有返回值</strong></p><ul><li><p>调用thenRun方法执行第二个任务时，则第二个任务和第一个任务是<strong>共用同一个线程池</strong>。</p></li><li><p>调用thenRunAsync执行第二个任务时，则第一个任务使用的是你自己传入的线程池，<strong>第二个任务使用的是ForkJoin线程池</strong></p></li><li><p>DEMO</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Test
public void testThenRun() throws ExecutionException, InterruptedException {
    CompletableFuture&lt;String&gt; orgFuture = CompletableFuture.supplyAsync(() -&gt; {
        System.out.println(&quot;先执行第一个CompletableFuture方法任务&quot;);
        return &quot;捡田螺的小男孩&quot;;
    });

    CompletableFuture thenRunFuture = orgFuture.thenRun(() -&gt; {
        System.out.println(&quot;接着执行第二个任务&quot;);
    });

    System.out.println(thenRunFuture.get());
}

# 执行结果
先执行第一个CompletableFuture方法任务
接着执行第二个任务
null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-thenaccept-thenacceptasync" tabindex="-1"><a class="header-anchor" href="#_2-thenaccept-thenacceptasync" aria-hidden="true">#</a> 2.thenAccept/thenAcceptAsync</h4><p>CompletableFuture的thenAccept方法表示，第一个任务执行完成后，执行第二个回调方法任务，会将该任务的执行结果，作为入参，传递到回调方法中，但是回调方法是<strong>没有返回值</strong>的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Test
public void testThenAccept() throws ExecutionException, InterruptedException {
    CompletableFuture&lt;String&gt; orgFuture = CompletableFuture.supplyAsync(() -&gt; {
        System.out.println(&quot;原始CompletableFuture方法任务&quot;);
        return &quot;捡田螺的小男孩&quot;;
    });
    System.out.println(&quot;orgFuture:&quot; + orgFuture.get());
    CompletableFuture thenAcceptFuture = orgFuture.thenAccept((a) -&gt; {
        if (&quot;捡田螺的小男孩&quot;.equals(a)) {
            System.out.println(&quot;关注了&quot;);
        }
        System.out.println(&quot;先考虑考虑&quot;);
    });
    System.out.println(&quot;thenAcceptFuture:&quot; + thenAcceptFuture.get());
}

# 执行结果
原始CompletableFuture方法任务
orgFuture:捡田螺的小男孩
关注了
先考虑考虑
thenAcceptFuture:null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-thenapply-thenapplyasync" tabindex="-1"><a class="header-anchor" href="#_3-thenapply-thenapplyasync" aria-hidden="true">#</a> 3. thenApply/thenApplyAsync</h4><p>CompletableFuture的thenApply方法表示，第一个任务执行完成后，执行第二个回调方法任务，会将该任务的执行结果，作为入参，传递到回调方法中，并且回调方法是有返回值的。</p><h4 id="_4-exceptionally" tabindex="-1"><a class="header-anchor" href="#_4-exceptionally" aria-hidden="true">#</a> 4. exceptionally</h4><p>CompletableFuture的exceptionally方法表示，某个任务执行异常时，执行的回调方法;并且有<strong>抛出异常作为参数</strong>，传递到回调方法。</p><h4 id="_5-whencomplete方法" tabindex="-1"><a class="header-anchor" href="#_5-whencomplete方法" aria-hidden="true">#</a> 5. whenComplete方法</h4><p>CompletableFuture的whenComplete方法表示，某个任务执行完成后，执行的回调方法，<strong>无返回值</strong>；并且whenComplete方法返回的CompletableFuture的<strong>result是上个任务的结果</strong>。</p><h4 id="_6-handle方法" tabindex="-1"><a class="header-anchor" href="#_6-handle方法" aria-hidden="true">#</a> 6. handle方法</h4><p>CompletableFuture的handle方法表示，<strong>某个任务执行完成后，执行回调方法，并且是有返回值的</strong>;并且handle方法返回的CompletableFuture的result是<strong>回调方法</strong>执行的结果。</p><h3 id="多个任务组合处理" tabindex="-1"><a class="header-anchor" href="#多个任务组合处理" aria-hidden="true">#</a> 多个任务组合处理</h3><h4 id="and组合关系" tabindex="-1"><a class="header-anchor" href="#and组合关系" aria-hidden="true">#</a> AND组合关系</h4><p>thenCombine / thenAcceptBoth / runAfterBoth都表示：<strong>将两个CompletableFuture组合起来，只有这两个都正常执行完了，才会执行某个任务</strong>。</p><p>区别在于：</p><ul><li>thenCombine：会将两个任务的执行结果作为方法入参，传递到指定方法中，且<strong>有返回值</strong></li><li>thenAcceptBoth: 会将两个任务的执行结果作为方法入参，传递到指定方法中，且<strong>无返回值</strong></li><li>runAfterBoth 不会把执行结果当做方法入参，且没有返回值。</li></ul><h4 id="or-组合的关系" tabindex="-1"><a class="header-anchor" href="#or-组合的关系" aria-hidden="true">#</a> OR 组合的关系</h4><p>applyToEither / acceptEither / runAfterEither 都表示：将两个CompletableFuture组合起来，只要其中一个执行完了,就会执行某个任务。</p><p>区别在于：</p><ul><li>applyToEither：会将已经执行完成的任务，作为方法入参，传递到指定方法中，且有返回值</li><li>acceptEither: 会将已经执行完成的任务，作为方法入参，传递到指定方法中，且无返回值</li><li>runAfterEither： 不会把执行结果当做方法入参，且没有返回值。</li></ul><h4 id="allof" tabindex="-1"><a class="header-anchor" href="#allof" aria-hidden="true">#</a> AllOf</h4><p>所有任务都执行完成后，才执行 allOf返回的CompletableFuture。如果任意一个任务异常，allOf的CompletableFuture，执行get方法，会抛出异常</p><h3 id="anyof" tabindex="-1"><a class="header-anchor" href="#anyof" aria-hidden="true">#</a> AnyOf</h3><p>任意一个任务执行完，就执行anyOf返回的CompletableFuture。如果执行的任务异常，anyOf的CompletableFuture，执行get方法，会抛出异常</p><h3 id="thencompose" tabindex="-1"><a class="header-anchor" href="#thencompose" aria-hidden="true">#</a> thenCompose</h3><p>thenCompose方法会在某个任务执行完成后，将该任务的执行结果,作为方法入参,去执行指定的方法。该方法会返回一个新的CompletableFuture实例</p><ul><li>如果该CompletableFuture实例的result不为null，则返回一个基于该result新的CompletableFuture实例；</li><li>如果该CompletableFuture实例为null，然后就执行这个新任务</li></ul><h3 id="completablefuture使用有哪些注意点" tabindex="-1"><a class="header-anchor" href="#completablefuture使用有哪些注意点" aria-hidden="true">#</a> CompletableFuture使用有哪些注意点</h3><p>CompletableFuture 使我们的异步编程更加便利的、代码更加优雅的同时，我们也要关注下它，使用的一些注意点。</p><h4 id="_1-future需要获取返回值-才能获取异常信息" tabindex="-1"><a class="header-anchor" href="#_1-future需要获取返回值-才能获取异常信息" aria-hidden="true">#</a> 1. Future需要获取返回值，才能获取异常信息</h4><p>Future需要获取返回值，才能获取到异常信息。如果不加 get()/join()方法，看不到异常信息。小伙伴们使用的时候，注意一下哈,考虑是否加try...catch...或者使用exceptionally方法。</p><h4 id="_2-completablefuture的get-方法是阻塞的。" tabindex="-1"><a class="header-anchor" href="#_2-completablefuture的get-方法是阻塞的。" aria-hidden="true">#</a> 2. CompletableFuture的get()方法是阻塞的。</h4><p>CompletableFuture的get()方法是阻塞的，如果使用它来获取异步调用的返回值，需要添加超时时间~</p><h4 id="_3-默认线程池的注意点" tabindex="-1"><a class="header-anchor" href="#_3-默认线程池的注意点" aria-hidden="true">#</a> 3. 默认线程池的注意点</h4><p>CompletableFuture代码中又使用了默认的线程池，处理的线程个数是电脑CPU核数-1。在<strong>大量请求过来的时候，处理逻辑复杂的话，响应会很慢</strong>。一般建议使用自定义线程池，优化线程池配置参数。</p><h4 id="_4-自定义线程池时-注意饱和策略" tabindex="-1"><a class="header-anchor" href="#_4-自定义线程池时-注意饱和策略" aria-hidden="true">#</a> 4. 自定义线程池时，注意饱和策略</h4><p>CompletableFuture的get()方法是阻塞的，我们一般建议使用<code>future.get(3, TimeUnit.SECONDS)</code>。并且一般建议使用自定义线程池。</p><p>但是如果线程池拒绝策略是<code>DiscardPolicy</code>或者<code>DiscardOldestPolicy</code>，当线程池饱和时，会直接丢弃任务，不会抛弃异常。因此建议，CompletableFuture线程池策略<strong>最好使用AbortPolicy</strong>，然后耗时的异步线程，做好<strong>线程池隔离</strong>哈。</p>`,49);function m(h,b){const l=s("ExternalLinkIcon");return t(),r("div",null,[c,e("blockquote",null,[e("p",null,[n("👉 "),e("a",p,[n("参考"),u(l)])])]),v])}const x=a(o,[["render",m],["__file","thread.html.vue"]]);export{x as default};

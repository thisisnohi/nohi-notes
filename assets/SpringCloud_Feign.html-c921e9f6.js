import{_ as n,p as s,q as a,a1 as e}from"./framework-449724a9.js";const t={},p=e(`<h1 id="springcloud-feign" tabindex="-1"><a class="header-anchor" href="#springcloud-feign" aria-hidden="true">#</a> SpringCloud Feign</h1><blockquote><p>create by nohi 20191121</p></blockquote><h2 id="超时时间设置" tabindex="-1"><a class="header-anchor" href="#超时时间设置" aria-hidden="true">#</a> 超时时间设置</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token number">1.</span>把超时发生异常属性关闭 <span class="token punctuation">(</span>测试后发现，超过<span class="token number">60</span>s后仍超时<span class="token punctuation">)</span>
hystrix<span class="token operator">:</span>
  command<span class="token operator">:</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        execution<span class="token operator">:</span>
          timeout<span class="token operator">:</span>
            enabled<span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token number">2.</span>同样出现超过<span class="token number">60</span>秒超时总是
hystrix<span class="token operator">:</span>
  command<span class="token operator">:</span>
    <span class="token string">&quot;MyFeignClient#sayWhyByFeign()&quot;</span><span class="token operator">:</span>
      execution<span class="token operator">:</span>
        isolation<span class="token operator">:</span>
          thread<span class="token operator">:</span>
            timeoutInMilliseconds<span class="token operator">:</span> <span class="token number">9000</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      execution<span class="token operator">:</span>
        isolation<span class="token operator">:</span>
          thread<span class="token operator">:</span>
            timeoutInMilliseconds<span class="token operator">:</span> <span class="token number">2000</span>

ribbon<span class="token operator">:</span>
  <span class="token class-name">ReadTimeout</span><span class="token operator">:</span> <span class="token number">5000</span>
  <span class="token class-name">ConnectTimeout</span><span class="token operator">:</span> <span class="token number">5000</span>

<span class="token number">3.</span> configu设置超时
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Feign<span class="token punctuation">.</span>Builder</span> <span class="token function">feignHystrixBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">HystrixFeign</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setterFactory</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">SetterFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">public</span> <span class="token class-name">HystrixCommand<span class="token punctuation">.</span>Setter</span> <span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Target</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> target<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> groupKey <span class="token operator">=</span> target<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//@FeignClient(name = &quot;xxx-im&quot;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>groupKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> commandKey <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;commandKey==&quot;</span><span class="token operator">+</span>commandKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">//打印,为每一个方法生成一个对象，此时groupKey，commandKey没用，可以设置超时时间</span>
                <span class="token doc-comment comment">/**
                 * xxx-im2
                 commandKey==queryCategoriesCodeByProductCode2
                 xxx-im2
                 commandKey==queryCategoriesCodeByProductCode
                 xxx-im2
                 commandKey==queryMaxBasicPriceByPizzaSizeCode
                 */</span>
                <span class="token keyword">int</span> time <span class="token operator">=</span> <span class="token number">120000</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;queryCategoriesCodeByProductCode2&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>commandKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    time <span class="token operator">=</span> <span class="token number">4000</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> <span class="token class-name">HystrixCommand<span class="token punctuation">.</span>Setter</span>
                        <span class="token punctuation">.</span><span class="token function">withGroupKey</span><span class="token punctuation">(</span><span class="token class-name">HystrixCommandGroupKey<span class="token punctuation">.</span>Factory</span><span class="token punctuation">.</span><span class="token function">asKey</span><span class="token punctuation">(</span>groupKey<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">// 控制 RemoteProductService 下,所有方法的Hystrix Configuration</span>
                        <span class="token punctuation">.</span><span class="token function">andCommandKey</span><span class="token punctuation">(</span><span class="token class-name">HystrixCommandKey<span class="token punctuation">.</span>Factory</span><span class="token punctuation">.</span><span class="token function">asKey</span><span class="token punctuation">(</span>commandKey<span class="token punctuation">)</span><span class="token punctuation">)</span>
                        <span class="token punctuation">.</span><span class="token function">andCommandPropertiesDefaults</span><span class="token punctuation">(</span>
                                <span class="token class-name">HystrixCommandProperties<span class="token punctuation">.</span>Setter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withExecutionTimeoutInMilliseconds</span><span class="token punctuation">(</span>time<span class="token punctuation">)</span> <span class="token comment">// 超时配置</span>
                        <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","SpringCloud_Feign.html.vue"]]);export{r as default};

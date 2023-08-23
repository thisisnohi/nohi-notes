import{_ as l,M as r,p as s,q as u,R as e,t,N as a,a1 as n}from"./framework-449724a9.js";const d={},o=n(`<h1 id="eureka" tabindex="-1"><a class="header-anchor" href="#eureka" aria-hidden="true">#</a> Eureka</h1><blockquote><p>create by nohi 20220718</p></blockquote><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考：</h2><ul><li>深入Eureka Server启动源码分析：https://www.jianshu.com/p/f720d3857830</li><li>默认配置：https://www.cnblogs.com/liukaifeng/p/10052594.html</li></ul><h2 id="eureka-server" tabindex="-1"><a class="header-anchor" href="#eureka-server" aria-hidden="true">#</a> Eureka Server：</h2><ul><li><p>spring.factories</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>org.springframework.boot.autoconfigure.EnableAutoConfiguration=\\
  org.springframework.cloud.netflix.eureka.server.EurekaServerAutoConfiguration
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>EurekaServerAutoConfiguration</p></li><li><p>DefaultEurekaServerContext</p></li><li><p>EurekaServerInitializerConfiguration</p><ul><li><p>server初始化 start()</p></li><li><p>EurekaServerBootstrap.contextInitialized -&gt; initEurekaServerContext</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>initEurekaEnvironment();
initEurekaServerContext();
context.setAttribute(EurekaServerContext.class.getName(), this.serverContext);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>EurekaServerBootstrap.initEurekaServerContext</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int registryCount = this.registry.syncUp(); // 同步其他结点
this.registry.openForTraffic(this.applicationInfoManager, registryCount);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>openForTraffic -〉 PeerAwareInstanceRegistryImpl.openForTraffic -&gt;</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
super.postInit();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>AbstractInstanceRegistry.postInit -&gt; EvictionTask</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> renewsLastMin.start();
        if (evictionTaskRef.get() != null) {
            evictionTaskRef.get().cancel();
        }
        evictionTaskRef.set(new EvictionTask());
        evictionTimer.schedule(evictionTaskRef.get(),
                serverConfig.getEvictionIntervalTimerInMs(),
                serverConfig.getEvictionIntervalTimerInMs());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p><code>InstanceRegistry</code></p><ul><li>cancel</li><li>register</li></ul></li><li><p>定时器：\`DefaultEurekaServerContext.initialize()</p><ul><li><p>registry.init(peerEurekaNodes); -&gt; PeerAwareInstanceRegistryImpl.init</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>initializedResponseCache();
scheduleRenewalThresholdUpdateTask();
initRemoteRegionRegistry();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>scheduleRenewalThresholdUpdateTask</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>timer.schedule(new TimerTask() {
                           @Override
                           public void run() {
                               updateRenewalThreshold();
                           }
                       }, serverConfig.getRenewalThresholdUpdateIntervalMs(),
                serverConfig.getRenewalThresholdUpdateIntervalMs());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="restfull" tabindex="-1"><a class="header-anchor" href="#restfull" aria-hidden="true">#</a> restFull</h3><ul><li><p>apps: <code>http://127.0.0.1:7001/eureka/apps</code></p></li><li><p>instance: <code>http://127.0.0.1:7001/eureka/apps/SYS-USER</code></p></li></ul><h3 id="服务" tabindex="-1"><a class="header-anchor" href="#服务" aria-hidden="true">#</a> 服务</h3><ul><li><code>com.netflix.eureka.resources.ApplicationResource</code><ul><li>注册<code>addInstance</code></li></ul></li><li><code>com.netflix.eureka.resources.InstanceResource</code><ul><li>更新: renewLease</li><li>删除: cancelLease</li></ul></li></ul><h2 id="eureka-client" tabindex="-1"><a class="header-anchor" href="#eureka-client" aria-hidden="true">#</a> Eureka Client</h2><h3 id="源码" tabindex="-1"><a class="header-anchor" href="#源码" aria-hidden="true">#</a> 源码</h3>`,12),c=e("li",null,[e("p",null,"初始化：com.netflix.discovery.DiscoveryClient.DiscoveryClient"),e("ul",null,[e("li",null,"@Inject方式初调用"),e("li",null,"调用 initScheduledTasks() 初始化缓存、心跳任务")])],-1),v=e("li",null,[e("p",null,"com.netflix.discovery.DiscoveryClient.initScheduledTasks"),e("ul",null,[e("li",null,"cacheRefreshTask 缓存"),e("li",null,"heartbeatTask 心跳"),e("li",null,"statusChangeListener 状态变更")])],-1),p={href:"https://blog.csdn.net/a953713428/article/details/102909929",target:"_blank",rel:"noopener noreferrer"},h=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.首先调用接口为什么会直接发送请求？
  原因就是Spring扫描了@FeignClient注解，并且根据配置的信息生成代理类，调用的接口实际上调用的是生成的代理类。
  
2 其次请求是如何被Feign接管的？
	Feign通过扫描@EnableFeignClients注解中配置包路径，扫描@FeignClient注解并将注解配置的信息注入到Spring容器中，类型为FeignClientFactoryBean；
然后通过FeignClientFactoryBean的getObject()方法得到不同动态代理的类并为每个方法创建一个SynchronousMethodHandler对象；
为每一个方法创建一个动态代理对象， 动态代理的实现是 ReflectiveFeign.FeignInvocationHanlder，代理被调用的时候，会根据当前调用的方法，转到对应的 SynchronousMethodHandler。
这样我们发出的请求就能够被已经配置好各种参数的Feign handler进行处理，从而被Feign托管。

3 请求如何被Feign分发的？
  上一个问题已经回答了Feign将每个方法都封装成为代理对象，那么当该方法被调用时，真正执行逻辑的是封装好的代理对象进行处理，执行对应的服务调用逻辑。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>SynchronousMethodHandler.invoke</code> -&gt; executeAndDecode -&gt; client(FeignBlockingLoadBalancerClient).execute</li><li>FeignBlockingLoadBalancerClient.execute -&gt; loadBalancerClient(BlockingLoadBalancerClient).choose -&gt; loadBalancer(RoundRobinLoadBalancer).choose(request)</li></ul>`,2),m=e("p",null,"load balance",-1),g={href:"https://zhuanlan.zhihu.com/p/456948287",target:"_blank",rel:"noopener noreferrer"},b=e("li",null,"默认：RoundRobinLoadBalancer",-1),q=n(`<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><ul><li><strong>eureka.instance.lease-renewal-interval-in-seconds</strong> 该服务实例向注册中心发送心跳间隔 30s</li><li><strong>eureka.client.registry-fetch-interval-seconds</strong> 指示从eureka服务器获取注册表信息的频率（s） 30</li></ul><h3 id="注册-更新-删除" tabindex="-1"><a class="header-anchor" href="#注册-更新-删除" aria-hidden="true">#</a> 注册/更新/删除</h3><ul><li><p>服务类：<code>com.netflix.discovery.DiscoveryClient</code></p></li><li><p>通讯类<code>org.springframework.cloud.netflix.eureka.http.RestTemplateEurekaHttpClient</code></p><ul><li><p>注册：<code>register</code></p><ul><li><p>org.springframework.cloud.netflix.eureka.EurekaClientAutoConfiguration.EurekaAutoServiceRegistration</p></li><li><details><summary>注册：\`register\`</summary> post http://127.0.0.1:7001/eureka/apps/SYS-USER <pre><code>{
    &quot;instance&quot;: {
        &quot;instanceId&quot;: &quot;10.0.0.53:8001&quot;,
        &quot;app&quot;: &quot;SYS-USER&quot;,
        &quot;appGroupName&quot;: null,
        &quot;ipAddr&quot;: &quot;10.0.0.53&quot;,
        &quot;sid&quot;: &quot;na&quot;,
        &quot;homePageUrl&quot;: &quot;http://10.0.0.53:8001/&quot;,
        &quot;statusPageUrl&quot;: &quot;http://10.0.0.53:8001/actuator/info&quot;,
        &quot;healthCheckUrl&quot;: &quot;http://10.0.0.53:8001/actuator/health&quot;,
        &quot;secureHealthCheckUrl&quot;: null,
        &quot;vipAddress&quot;: &quot;sys-user&quot;,
        &quot;secureVipAddress&quot;: &quot;sys-user&quot;,
        &quot;countryId&quot;: 1,
        &quot;dataCenterInfo&quot;: {
            &quot;@class&quot;: &quot;com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo&quot;,
            &quot;name&quot;: &quot;MyOwn&quot;
        },
        &quot;hostName&quot;: &quot;10.0.0.53&quot;,
        &quot;status&quot;: &quot;UP&quot;,
        &quot;overriddenStatus&quot;: &quot;UNKNOWN&quot;,
        &quot;leaseInfo&quot;: {
            &quot;renewalIntervalInSecs&quot;: 30,
            &quot;durationInSecs&quot;: 90,
            &quot;registrationTimestamp&quot;: 0,
            &quot;lastRenewalTimestamp&quot;: 0,
            &quot;evictionTimestamp&quot;: 0,
            &quot;serviceUpTimestamp&quot;: 0
        },
        &quot;isCoordinatingDiscoveryServer&quot;: false,
        &quot;lastUpdatedTimestamp&quot;: 1658238666529,
        &quot;lastDirtyTimestamp&quot;: 1658238667158,
        &quot;actionType&quot;: null,
        &quot;asgName&quot;: null,
        &quot;port&quot;: {
            &quot;$&quot;: 8001,
            &quot;@enabled&quot;: &quot;true&quot;
        },
        &quot;securePort&quot;: {
            &quot;$&quot;: 443,
            &quot;@enabled&quot;: &quot;false&quot;
        },
        &quot;metadata&quot;: {
            &quot;management.port&quot;: &quot;8001&quot;
        }
    }
}
</code></pre></details></li></ul></li><li><p>更新：<code>DiscoveryClient -&gt; renew(HeartbeatThread)</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -X PUT   http://10.0.0.210:7001/eureka/apps/SYS-USER/10.0.0.53:8001?status=UP&amp;lastDirtyTimestamp=1658240856334
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>删除：<code>DiscoveryClient.shutdown</code></p><ul><li>RestTemplateEurekaHttpClient.cancel</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -X delete http://10.0.0.210:7001/eureka/apps/SYS-USER/10.0.0.210:8801
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="应用-实例列表获取" tabindex="-1"><a class="header-anchor" href="#应用-实例列表获取" aria-hidden="true">#</a> 应用/实例列表获取</h3><ul><li>应用列表：http://10.0.0.210:7001/eureka/apps</li><li>实例列表：http://10.0.0.210:7001/eureka/apps/SYS-USERS</li></ul><h2 id="自我保护机制" tabindex="-1"><a class="header-anchor" href="#自我保护机制" aria-hidden="true">#</a> 自我保护机制</h2><ul><li><p>CAP（Consistency 一致性 Availability 可用性 Partition tolerance 分区容错性）</p><p>Eureka: AP</p><p>Eureka-Server和client端的通信被终止,Eureka宁可保留也许已经宕机了的client端 ， 也不愿意将可以用的client端一起剔除</p></li><li><p>关闭自我保护机制</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>eureka:
  server:
    enable-self-preservation: false  #（设为false，关闭自我保护主要）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>定期清理：\`AbstractInstanceRegistry.evict()</li></ul></li><li><p>重要变量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># InstanceR	egistryProperties.expectedNumberOfClientsSendingRenews
this.expectedNumberOfRenewsPerMin = count * 2;  
this.numberOfRenewsPerMinThreshold =(int) (this.expectedNumberOfRenewsPerMin * serverConfig.getRenewalPercentThreshold());
# EurekaServerConfigBean.renewalPercentThreshold
serverConfig.getRenewalPercentThreshold()

20220727 eureka3.1.1 已变更
synchronized (lock) {
            if (this.expectedNumberOfClientsSendingRenews &gt; 0) {
                // Since the client wants to cancel it, reduce the number of clients to send renews.
                this.expectedNumberOfClientsSendingRenews = this.expectedNumberOfClientsSendingRenews - 1;
                updateRenewsPerMinThreshold();
            }
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>  - expectedNumberOfRenewsPerMin ：每分钟最大的续约数量. 客户端数量 * 2
  - numberOfRenewsPerMinThreshold ： 每分钟最小续约数量= expectedNumberOfRenewsPerMin *  最低百分比（默认值为0.85）
</code></pre><ul><li>更新场景 <ul><li>Eureka-Server初始化，cancle主动下线， 客户端注册 ,定时器</li></ul></li></ul></li></ul>`,8);function f(x,k){const i=r("ExternalLinkIcon");return s(),u("div",null,[o,e("ul",null,[c,v,e("li",null,[e("p",null,[e("a",p,[t("Spring Cloud Feign 调用过程分析"),a(i)])]),h]),e("li",null,[m,e("ul",null,[e("li",null,[e("a",g,[t("Spring Cloud LoadBalancer知乎"),a(i)])]),b])])]),q])}const S=l(d,[["render",f],["__file","Eureka.html.vue"]]);export{S as default};

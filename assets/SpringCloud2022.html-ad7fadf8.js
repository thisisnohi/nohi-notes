import{_ as e,p as i,q as l,a1 as n}from"./framework-449724a9.js";const a="/assets/sentinel-dashboard-1-6eefff39.png",s={},d=n(`<h1 id="spring-cloud" tabindex="-1"><a class="header-anchor" href="#spring-cloud" aria-hidden="true">#</a> spring cloud</h1><blockquote><p>create by nohi 20220708</p></blockquote><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2><ul><li>微服务是什么 http://c.biancheng.net/springcloud/micro-service.html</li></ul><ul><li>第一代实现：Spring Cloud Netflix</li><li>第二代实现：Spring Cloud Alibaba</li></ul><p>Spring Cloud 包括 Spring Cloud Gateway、Spring Cloud Config、Spring Cloud Bus 等近 20 个服务组件，这些组件提供了服务治理、服务网关、智能路由、负载均衡、熔断器、监控跟踪、分布式消息队列、配置管理等领域的解决方案。</p><ul><li>springboot 版本：https://spring.io/projects/spring-cloud</li></ul><h2 id="环境参数" tabindex="-1"><a class="header-anchor" href="#环境参数" aria-hidden="true">#</a> 环境参数</h2><ul><li>jdk 8 -&gt; 17</li></ul><h2 id="eureka" tabindex="-1"><a class="header-anchor" href="#eureka" aria-hidden="true">#</a> Eureka</h2><blockquote><p>Eureka.md</p></blockquote><h2 id="swagger3" tabindex="-1"><a class="header-anchor" href="#swagger3" aria-hidden="true">#</a> Swagger3</h2><blockquote><p>参考：SpringBoot 2.7.1整合Swagger3.0 https://blog.csdn.net/weixin_48687496/article/details/125847501</p><p>代码：SwaggerConfig.springfoxHandlerProviderBeanPostProcessor 解决swagger在springboot2.7以后的空指针异常</p></blockquote><h2 id="ribbo" tabindex="-1"><a class="header-anchor" href="#ribbo" aria-hidden="true">#</a> Ribbo</h2><blockquote><p>Spring Cloud Ribbon 是一套基于 Netflix Ribbon 实现的客户端负载均衡和服务调用工具</p><p>Netflix Ribbon 是 Netflix 公司发布的开源组件，其主要功能是提供客户端的负载均衡算法和服务调用。Spring Cloud 将其与 Netflix 中的其他开源服务组件（例如 Eureka、Feign 以及 Hystrix 等）一起整合进 Spring Cloud Netflix 模块中，整合后全称为 Spring Cloud Netflix Ribbon。</p></blockquote><h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3><ul><li><h4 id="服务端负载均衡" tabindex="-1"><a class="header-anchor" href="#服务端负载均衡" aria-hidden="true">#</a> 服务端负载均衡</h4><ul><li>需要建立一个独立的负载均衡服务器。</li><li>负载均衡是在客户端发送请求后进行的，因此客户端并不知道到底是哪个服务端提供的服务。</li><li>可用服务端清单存储在负载均衡服务器上。</li></ul></li><li><h4 id="客户端负载均衡" tabindex="-1"><a class="header-anchor" href="#客户端负载均衡" aria-hidden="true">#</a> 客户端负载均衡</h4><ul><li>负载均衡器位于客户端，不需要单独搭建一个负载均衡服务器。</li><li>负载均衡是在客户端发送请求前进行的，因此客户端清楚地知道是哪个服务端提供的服务。</li><li>客户端都维护了一份可用服务清单，而这份清单都是从服务注册中心获取的。</li></ul></li></ul><h2 id="openfeign" tabindex="-1"><a class="header-anchor" href="#openfeign" aria-hidden="true">#</a> OpenFeign</h2><blockquote><p>OpenFeign 全称 Spring Cloud OpenFeign，它是 Spring 官方推出的一种声明式服务调用与负载均衡组件，它的出现就是为了替代进入停更维护状态的 Feign。</p><p>OpenFeign 是 Spring Cloud 对 Feign 的二次封装，它具有 Feign 的所有功能，并在 Feign 的基础上增加了对 Spring MVC 注解的支持，例如 @RequestMapping、@GetMapping 和 @PostMapping 等。</p></blockquote><h2 id="hystrix" tabindex="-1"><a class="header-anchor" href="#hystrix" aria-hidden="true">#</a> Hystrix</h2><blockquote><p>2018 netflix 宣布 Hystrix、Ribbon、Zuul、Eureka等进入维护状态，不再进行新特性开发，只修 BUG</p><p>替代方案：sentinel</p></blockquote><ul><li><p>在微服务系统中，Hystrix 能够帮助我们实现以下目标：</p><ul><li><p><strong>保护线程资源</strong>：防止单个服务的故障耗尽系统中的所有线程资源。</p></li><li><p><strong>快速失败机制</strong>：当某个服务发生了故障，不让服务调用方一直等待，而是直接返回请求失败。</p></li><li><p><strong>提供降级（FallBack）方案</strong>：在请求失败后，提供一个设计好的降级方案，通常是一个兜底方法，当请求失败后即调用该方法。</p></li><li><p><strong>防止故障扩散</strong>：使用熔断机制，防止故障扩散到其他服务。</p></li><li><p><strong>监控功能</strong>：提供熔断器故障监控组件 Hystrix Dashboard，随时监控熔断器的状态。</p></li></ul></li><li><p>Hystrix 会在以下场景下进行服务降级处理：</p><ul><li><p>程序运行异常</p></li><li><p>服务超时</p></li><li><p>熔断器处于打开状态</p></li><li><p>线程池资源耗尽</p></li></ul></li><li><p>依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!--hystrix 依赖--&gt;
&lt;dependency&gt;
  &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
  &lt;artifactId&gt;spring-cloud-starter-netflix-hystrix&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="sentinel" tabindex="-1"><a class="header-anchor" href="#sentinel" aria-hidden="true">#</a> Sentinel</h2><ul><li><p>依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-alibaba-sentinel&lt;/artifactId&gt;
    &lt;version&gt;2.2.1.RELEASE&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>FeignClient 服务降级</p><ul><li><p>FeignClient</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@FeignClient(value = &quot;SYS-USER&quot;, fallback = UserFeignFallback.class)
public interface UserFeignApi {
    @RequestMapping(value = &quot;/user/lists&quot;, method = RequestMethod.GET)
    List&lt;UserDTO&gt; lists();
    @RequestMapping(value = &quot;/user/lists-sleep&quot;, method = RequestMethod.GET)
    List&lt;UserDTO&gt; listsSleep(@RequestParam(&quot;sleep&quot;) Integer sleep);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>fallback</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class UserFeignFallback implements UserFeignApi{
    @Override
    public List&lt;UserDTO&gt; lists() {
        return new ArrayList&lt;&gt;();
    }
    @Override
    public List&lt;UserDTO&gt; listsSleep(Integer sleep) {
        return this.lists();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>当feignclient调用失败时，自动进入UserFeignFallback对应方法</p></li></ul></li></ul><h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3><h4 id="sentinel-自定义规则" tabindex="-1"><a class="header-anchor" href="#sentinel-自定义规则" aria-hidden="true">#</a> sentinel -&gt; 自定义规则</h4><ul><li><p>初始化规则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@PostConstruct
public void initRule() {
  List&lt;FlowRule&gt; ruleList = new ArrayList&lt;&gt;();
  FlowRule rule = new FlowRule();
  // 设置资源名称
  rule.setResource(RESOURCE_LISTS); // &quot;/sentinel/lists&quot;
  // 指定限流模式为QPS
  rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
  // 指定QPS限流阈值
  rule.setCount(5);
  ruleList.add(rule);
  // 加载该规则
  FlowRuleManager.loadRules(ruleList);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>降级、失败方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class HanlderExpection {
    /**
     *   返回类型和参数必须与原函数返回类型和参数一致
     */
    public static List&lt;UserDTO&gt; AllHandlerExpection(BlockException exception) {
        log.warn(&quot;===========AllHandlerExpection==========&quot;);
        return Lists.newArrayList();
    }
}
public class ClientFallBack {
    public static List&lt;UserDTO&gt; fallBack() {
        log.warn(&quot;fallBack&quot;);
        return Lists.newArrayList();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>定义资源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SentinelResource(value = RESOURCE_LISTS,
            // 限流
            blockHandlerClass = HanlderExpection.class,
            blockHandler = &quot;AllHandlerExpection&quot;,
            // 失败
            fallbackClass = ClientFallBack.class,
            fallback = &quot;fallBack&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="sentinel-dashboard不回规则" tabindex="-1"><a class="header-anchor" href="#sentinel-dashboard不回规则" aria-hidden="true">#</a> sentinel -&gt; dashboard不回规则</h4><p><img src="`+a+`" alt="image-20220807171230763"></p><h3 id="todo" tabindex="-1"><a class="header-anchor" href="#todo" aria-hidden="true">#</a> TODO</h3><ul><li><p>各种规则详解</p></li><li><p>通过配置自动增加规则</p></li><li><p>Gateway + sentinel</p></li></ul><h2 id="gateway" tabindex="-1"><a class="header-anchor" href="#gateway" aria-hidden="true">#</a> Gateway</h2><p>API 网关是一个搭建在客户端和微服务之间的服务，我们可以在 API 网关中处理一些非业务功能的逻辑，例如权限验证、监控、缓存、请求路由等。</p><p>API 网关就像整个微服务系统的门面一样，是系统对外的唯一入口。有了它，客户端会先将请求发送到 API 网关，然后由 API 网关根据请求的标识信息将请求转发到微服务实例。</p><h3 id="spring-cloud-gateway" tabindex="-1"><a class="header-anchor" href="#spring-cloud-gateway" aria-hidden="true">#</a> Spring Cloud Gateway</h3><p>Spring Cloud Gateway 是 Spring Cloud 团队基于 Spring 5.0、Spring Boot 2.0 和 Project Reactor 等技术开发的高性能 API 网关组件。Spring Cloud Gateway 旨在提供一种简单而有效的途径来发送 API，并为它们提供横切关注点，例如：安全性，监控/指标和弹性。 Spring Cloud Gateway 是基于 WebFlux 框架实现的，而 WebFlux 框架底层则使用了高性能的 Reactor 模式通信框架 Netty。</p><h3 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h3><p>Route（路由）： 网关最基本的模块。它由一个 ID、一个目标 URI、一组断言（Predicate）和一组过滤器（Filter）组成。</p><p>Predicate（断言）： 路由转发的判断条件，我们可以通过 Predicate 对 HTTP 请求进行匹配，例如请求方式、请求路径、请求头、参数等，如果请求与断言匹配成功，则将请求转发到相应的服务。</p><p>Filter（过滤器）： 过滤器，我们可以使用它对请求进行拦截和修改，还可以使用它对上文的响应进行再处理。</p><h3 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由" aria-hidden="true">#</a> 动态路由</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  cloud:
    gateway: #网关路由配置
      routes:
        - id: sys-user   #路由 id,没有固定规则，但唯一，建议与服务名对应
#          uri: http://localhost:8001          #匹配后提供服务的路由地址
          uri: lb://SYS-USER # 动态路由
          predicates:
            #以下是断言条件，必选全部符合条件
            - Path=/user/**               #断言，路径匹配 注意：Path 中 P 为大写
            - Method=GET #只能时 GET 请求时，才能访问

访问网关7005  http://127.0.0.1:7005/user/lists            
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="filter-过滤器" tabindex="-1"><a class="header-anchor" href="#filter-过滤器" aria-hidden="true">#</a> Filter 过滤器</h3><p>Pre 类型、Post 类型</p><ul><li>GatewayFilter：应用在单个路由或者一组路由上的过滤器。</li><li>GlobalFilter：应用在所有的路由上的过滤器</li></ul><h2 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> Config</h2><p>Spring Cloud Config 工作流程如下：</p><ol><li>开发或运维人员提交配置文件到远程的 Git 仓库。</li><li>Config 服务端（分布式配置中心）负责连接配置仓库 Git，并对 Config 客户端暴露获取配置的接口。</li><li>Config 客户端通过 Config 服务端暴露出来的接口，拉取配置仓库中的配置。</li><li>Config 客户端获取到配置信息，以支持服务的运行。</li></ol><h2 id="链路跟踪" tabindex="-1"><a class="header-anchor" href="#链路跟踪" aria-hidden="true">#</a> 链路跟踪</h2><h3 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h3><ul><li>故障快速定位</li><li>各个调用环节的性能分析</li><li>数据分析</li><li>生成服务调用拓扑图</li></ul>`,51),r=[d];function t(u,c){return i(),l("div",null,r)}const p=e(s,[["render",t],["__file","SpringCloud2022.html.vue"]]);export{p as default};

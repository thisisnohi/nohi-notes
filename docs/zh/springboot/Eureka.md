---
sidebar: auto
---

# Eureka

> create by nohi 20220718

## 参考：

* 深入Eureka Server启动源码分析：https://www.jianshu.com/p/f720d3857830
* 默认配置：https://www.cnblogs.com/liukaifeng/p/10052594.html



## Eureka Server：

* spring.factories

  ```json
  org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
    org.springframework.cloud.netflix.eureka.server.EurekaServerAutoConfiguration
  ```

* EurekaServerAutoConfiguration

* DefaultEurekaServerContext

* EurekaServerInitializerConfiguration

  * server初始化  start()

  * EurekaServerBootstrap.contextInitialized  -> initEurekaServerContext

    ```
    initEurekaEnvironment();
    initEurekaServerContext();
    context.setAttribute(EurekaServerContext.class.getName(), this.serverContext);
    ```

  * EurekaServerBootstrap.initEurekaServerContext

    ```
    int registryCount = this.registry.syncUp(); // 同步其他结点
    this.registry.openForTraffic(this.applicationInfoManager, registryCount);
    ```

  * openForTraffic  -〉 PeerAwareInstanceRegistryImpl.openForTraffic -> 

    ```
    
    super.postInit();
    ```

  * AbstractInstanceRegistry.postInit  -> EvictionTask

    ```
     renewsLastMin.start();
            if (evictionTaskRef.get() != null) {
                evictionTaskRef.get().cancel();
            }
            evictionTaskRef.set(new EvictionTask());
            evictionTimer.schedule(evictionTaskRef.get(),
                    serverConfig.getEvictionIntervalTimerInMs(),
                    serverConfig.getEvictionIntervalTimerInMs());
    ```

    

* `InstanceRegistry`

  * cancel
  * register

* 定时器：`DefaultEurekaServerContext.initialize()   

  * registry.init(peerEurekaNodes); -> PeerAwareInstanceRegistryImpl.init

    ```
    initializedResponseCache();
    scheduleRenewalThresholdUpdateTask();
    initRemoteRegionRegistry();
    ```

  * scheduleRenewalThresholdUpdateTask

    ```
    timer.schedule(new TimerTask() {
                               @Override
                               public void run() {
                                   updateRenewalThreshold();
                               }
                           }, serverConfig.getRenewalThresholdUpdateIntervalMs(),
                    serverConfig.getRenewalThresholdUpdateIntervalMs());
    ```

    



### restFull

* apps: `http://127.0.0.1:7001/eureka/apps`

* instance: `http://127.0.0.1:7001/eureka/apps/SYS-USER`

### 服务

* `com.netflix.eureka.resources.ApplicationResource`
  * 注册`addInstance`
* `com.netflix.eureka.resources.InstanceResource`
  * 更新: renewLease
  * 删除: cancelLease

 



## Eureka Client 

### 源码

* 初始化：com.netflix.discovery.DiscoveryClient.DiscoveryClient
  * @Inject方式初调用
  * 调用 initScheduledTasks() 初始化缓存、心跳任务

* com.netflix.discovery.DiscoveryClient.initScheduledTasks

  * cacheRefreshTask 缓存
  * heartbeatTask  心跳
  * statusChangeListener 状态变更

* [Spring Cloud Feign 调用过程分析](https://blog.csdn.net/a953713428/article/details/102909929)

  ```
  1.首先调用接口为什么会直接发送请求？
    原因就是Spring扫描了@FeignClient注解，并且根据配置的信息生成代理类，调用的接口实际上调用的是生成的代理类。
    
  2 其次请求是如何被Feign接管的？
  	Feign通过扫描@EnableFeignClients注解中配置包路径，扫描@FeignClient注解并将注解配置的信息注入到Spring容器中，类型为FeignClientFactoryBean；
  然后通过FeignClientFactoryBean的getObject()方法得到不同动态代理的类并为每个方法创建一个SynchronousMethodHandler对象；
  为每一个方法创建一个动态代理对象， 动态代理的实现是 ReflectiveFeign.FeignInvocationHanlder，代理被调用的时候，会根据当前调用的方法，转到对应的 SynchronousMethodHandler。
  这样我们发出的请求就能够被已经配置好各种参数的Feign handler进行处理，从而被Feign托管。
  
  3 请求如何被Feign分发的？
    上一个问题已经回答了Feign将每个方法都封装成为代理对象，那么当该方法被调用时，真正执行逻辑的是封装好的代理对象进行处理，执行对应的服务调用逻辑。
  ```

  * `SynchronousMethodHandler.invoke`  -> executeAndDecode  -> client(FeignBlockingLoadBalancerClient).execute
  * FeignBlockingLoadBalancerClient.execute  -> loadBalancerClient(BlockingLoadBalancerClient).choose -> loadBalancer(RoundRobinLoadBalancer).choose(request)

* load balance
  * [Spring Cloud LoadBalancer知乎](https://zhuanlan.zhihu.com/p/456948287)
  * 默认：RoundRobinLoadBalancer

### 配置

* **eureka.instance.lease-renewal-interval-in-seconds** 该服务实例向注册中心发送心跳间隔   30s
* **eureka.client.registry-fetch-interval-seconds** 指示从eureka服务器获取注册表信息的频率（s） 30

### 注册/更新/删除

* 服务类：`com.netflix.discovery.DiscoveryClient`

* 通讯类`org.springframework.cloud.netflix.eureka.http.RestTemplateEurekaHttpClient`

  * 注册：`register`

    * org.springframework.cloud.netflix.eureka.EurekaClientAutoConfiguration.EurekaAutoServiceRegistration

    * <details>     <summary>注册：`register`</summary> post   http://127.0.0.1:7001/eureka/apps/SYS-USER  <pre><code>{
          "instance": {
              "instanceId": "10.0.0.53:8001",
              "app": "SYS-USER",
              "appGroupName": null,
              "ipAddr": "10.0.0.53",
              "sid": "na",
              "homePageUrl": "http://10.0.0.53:8001/",
              "statusPageUrl": "http://10.0.0.53:8001/actuator/info",
              "healthCheckUrl": "http://10.0.0.53:8001/actuator/health",
              "secureHealthCheckUrl": null,
              "vipAddress": "sys-user",
              "secureVipAddress": "sys-user",
              "countryId": 1,
              "dataCenterInfo": {
                  "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                  "name": "MyOwn"
              },
              "hostName": "10.0.0.53",
              "status": "UP",
              "overriddenStatus": "UNKNOWN",
              "leaseInfo": {
                  "renewalIntervalInSecs": 30,
                  "durationInSecs": 90,
                  "registrationTimestamp": 0,
                  "lastRenewalTimestamp": 0,
                  "evictionTimestamp": 0,
                  "serviceUpTimestamp": 0
              },
              "isCoordinatingDiscoveryServer": false,
              "lastUpdatedTimestamp": 1658238666529,
              "lastDirtyTimestamp": 1658238667158,
              "actionType": null,
              "asgName": null,
              "port": {
                  "$": 8001,
                  "@enabled": "true"
              },
              "securePort": {
                  "$": 443,
                  "@enabled": "false"
              },
              "metadata": {
                  "management.port": "8001"
              }
          }
      }
      </code></pre>   </details>

  * 更新：`DiscoveryClient -> renew(HeartbeatThread)`

    ```
    curl -X PUT   http://10.0.0.210:7001/eureka/apps/SYS-USER/10.0.0.53:8001?status=UP&lastDirtyTimestamp=1658240856334
    ```

  * 删除：`DiscoveryClient.shutdown`

    * RestTemplateEurekaHttpClient.cancel

    ```
    curl -X delete http://10.0.0.210:7001/eureka/apps/SYS-USER/10.0.0.210:8801
    ```

### 应用/实例列表获取

* 应用列表：http://10.0.0.210:7001/eureka/apps
* 实例列表：http://10.0.0.210:7001/eureka/apps/SYS-USERS



## 自我保护机制

* CAP（Consistency  一致性     Availability 可用性     Partition tolerance 分区容错性）

  Eureka: AP

  Eureka-Server和client端的通信被终止,Eureka宁可保留也许已经宕机了的client端 ， 也不愿意将可以用的client端一起剔除

* 关闭自我保护机制

  ```
  eureka:
    server:
      enable-self-preservation: false  #（设为false，关闭自我保护主要）
  ```

  * 定期清理：`AbstractInstanceRegistry.evict()

* 重要变量

  ```
  # InstanceR	egistryProperties.expectedNumberOfClientsSendingRenews
  this.expectedNumberOfRenewsPerMin = count * 2;  
  this.numberOfRenewsPerMinThreshold =(int) (this.expectedNumberOfRenewsPerMin * serverConfig.getRenewalPercentThreshold());
  # EurekaServerConfigBean.renewalPercentThreshold
  serverConfig.getRenewalPercentThreshold()
  
  20220727 eureka3.1.1 已变更
  synchronized (lock) {
              if (this.expectedNumberOfClientsSendingRenews > 0) {
                  // Since the client wants to cancel it, reduce the number of clients to send renews.
                  this.expectedNumberOfClientsSendingRenews = this.expectedNumberOfClientsSendingRenews - 1;
                  updateRenewsPerMinThreshold();
              }
          }
  ```

  		- expectedNumberOfRenewsPerMin ：每分钟最大的续约数量. 客户端数量 * 2
  		- numberOfRenewsPerMinThreshold ： 每分钟最小续约数量= expectedNumberOfRenewsPerMin *  最低百分比（默认值为0.85）

  - 更新场景
    - Eureka-Server初始化，cancle主动下线， 客户端注册 ,定时器
---
sidebar: auto
---

# SpringCloudAlibaba

> create by nohi 20220605

## 参考

* 官方文档：https://spring-cloud-alibaba-group.github.io/github-pages/2021/zh-cn/index.html#_introduction
  * Readme:https://github.com/alibaba/spring-cloud-alibaba/blob/2021.x/README-zh.md

* 本地代码： 



## Nacos

> 见：Nacos.md



## Sentinel

**流量控制规则**、**熔断降级规则**、**系统保护规则**、**来源访问控制规则** 和 **热点参数规则**。

* WIKI/介绍/文档：https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D

### 控制台

启动：

```
java -Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard.jar
```

* 默认用户名密码： sentinel/sentinel
* sentinel控制台一直没有对应服务
  * 需要发起一个请求，sentinel才会显示
  * 客户端向注册中心注册时，客户端ip需要可达

### 参考示例

> https://www.jianshu.com/p/7616fbc915af 



## Dubbo

### 参考：

* Spring Cloud Alibaba 教程 | Dubbo（一）https://www.jianshu.com/p/0d53c5bcda28
* https://blog.csdn.net/g5zhu5896/article/details/122588793

### Key Point

* dubbo配置：需要group相同，否则dubbo admin获取不到无数据

- [ ] ```
  dubbo:
    cloud:
      subscribed-services: ${spring.application.name}
    protocol:
      name: dubbo
      # 这个dubbo的协议端口在一台服务器上的时候，每个项目的必须配置成不一样的（否则将启动失败），或者配置为-1，使用随机端口
      port: 20881
      host: 127.0.0.1
    registry:
      # 由于使用的是spring-cloud，因此这里使用spring-cloud的
  #    address: spring-cloud://127.0.0.1:8848
      address: nacos://127.0.0.1:8848?group=dubbo
    scan:
      # 配置需要扫描的注解包
      base-packages: nohi.cloud
  ```

## RocketMQ简介

### 参考

* docker：https://blog.csdn.net/apple_csdn/article/details/125277508

  窗口中文件路径为：/home/rocketmq 而非 /root/rocketmq

* 安装版本：https://blog.csdn.net/qq_40744423/article/details/124429251

### 主题

#### Broker

> 其实就是 RocketMQ 服务器，负责存储消息、转发消息

* **路由模块**：整个 Broker 的实体，负责处理来自 clients 端的请求。
* **客户端管理**：负责管理客户端(Producer/Consumer)和维护 Consumer 的 Topic 订阅信息
* **存储服务**：提供方便简单的 API 接口处理消息存储到物理硬盘和查询功能。
* **高可用服务**：高可用服务，提供 Master Broker 和 Slave Broker 之间的数据同步功能。
* **消息索引服务**：根据特定的 Message key 对投递到 Broker 的消息进行索引服务，以提供消息的快速查询。

#### NameServer

> Topic 路由注册中心

- **Broker 管理**：NameServer 接受 Broker 集群的注册信息并且保存下来作为路由信息的基本数据。然后提供心跳检测机制，检查 Broker 是否还存活；
- **路由信息管理**：给 Producer 和 Consumer 提供服务获取 Broker 列表。每个 NameServer 将保存关于 Broker 集群的整个路由信息和用于客户端查询的队列信息。然后 Producer 和 Conumser 通过 NameServer 就可以知道整个 Broker 集群的路由信息，从而进行消息的投递和消费。

### 安装

* 网络连接

  ```
  docker network create rocketmq
  ```

* Name Server

  ```
  docker run -d --name rocketmq-namesrv --network rocketmq -p 9876:9876 -v /opt/docker_volumes/rocketmq/namesrv/logs:/home/rocketmq/logs -v /opt/docker_volumes/rocketmq/namesrv/store:/home/rocketmq/store apache/rocketmq:4.9.3 sh mqnamesrv
  ```

* Broker

  ```
  -- 拷贝Image配置到 本地目录
  docker cp 69b3f6495841:/home/rocketmq/rocketmq-4.9.3/conf /opt/docker_volumes/rocketmq/broker-a
  
  docker run -d --name rocketmq-broker-a -p 10909:10909 -p 10911:10911 -v /opt/docker_volumes/rocketmq/broker-a/logs:/root/logs -v /opt/docker_volumes/rocketmq/broker-a/store:/root/store -v /opt/docker_volumes/rocketmq/broker-a/conf:/home/rocketmq/rocketmq-4.9.3/conf  apache/rocketmq:4.9.3 sh mqbroker -c /home/rocketmq/rocketmq-4.9.3/conf/broker.conf
  
  -- 指定内存
  docker run -d --name rocketmq-broker-a --network rocketmq -p 10909:10909 -p 10911:10911 -v /opt/docker_volumes/rocketmq/broker-a/logs:/root/logs -v /opt/docker_volumes/rocketmq/broker-a/store:/root/store -v /opt/docker_volumes/rocketmq/broker-a/conf:/home/rocketmq/rocketmq-4.9.3/conf -e "JAVA_OPT_EXT=-server -Xms256m -Xmx256m -Xmn256m" apache/rocketmq:4.9.3 sh mqbroker -c /home/rocketmq/rocketmq-4.9.3/conf/broker.conf
  
  ```

* console控制台搭建

  ```
  docker run -d --name rocketmq-console --network rocketmq -e "JAVA_OPTS=-Drocketmq.namesrv.addr=rocketmq-namesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false" -p 8081:8080 apacherocketmq/rocketmq-dashboard:latest
  ```

  * 访问：http://10.0.0.210:10000/  http://127.0.0.1:8081


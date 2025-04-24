## 一、参考

* [10分钟入门Flink--了解Flink](https://zhuanlan.zhihu.com/p/642671403)
* [try flink](https://nightlies.apache.org/flink/flink-docs-master/zh/docs/try-flink/local_installation/)

### 10分钟入门Flink--了解Flink

* **词频统计-批数据**
* **词频统计-流数据**

### 主要组件

* 存储层：Flink没有提供分布式存储，其依赖外部存储
* 调度层：自带简易调度器，称为独立调度器(Standalone)。同时支持在其他集群管理器上运行，如：YARN、Apache Mesos等。
* 计算层：Flink的核心是一个对由很多计算任务组成的、运行在多个工作机器或者一个计算集群上的应用进行调度、分发以及监控的计算引擎，为API工具层提供基础服务。
* 工具层：在Flink Runtime的基础上，Flink提供了面向流处理（DataStream API）和批处理（DataSetAPI）的不同计算接口

### 程序结构

* `Source` `Transfromation` `Sink`
* 编程固定套路
  * 创建执行环境：任务执行环境用于定义任务的属性、创建数据源以及最终启动任务的执行。
  * 读取源数据
  * 转换数据
  * 输出转换结果
  * 触发任务执行

### 算子

Flink提供了丰富的用于数据处理的函数，这些函数称为算子

### 处理次数

处理次数分为：`At-Most-Once`、`At-Least-Once`、`Exactly-Once`。

`At-Most-Once`：每条数据最多被处理一次，会有丢失数据的可能。

`At-Least-Once`：每条数据至少被处理一次，保证数据不会丢失，但数据可能会被重复处理。

`Exactly-Once`：每条数据仅被处理一次，不会丢失数据，也不会重复处理。

Storm实现了`At-Least-Once`，可以对数据至少处理一次，但不能保证仅处理一次，这样就会导致数据重复处理的问题，因此针对计数类的需求可能会产生一些误差；

`Spark Streaming`和Flink都实现了`Exactly-Once`，可以保证对数据仅处理一次，即每个记录将被精确处理一次，数据不会丢失，并且不会重复处理。



## 二、Flink

> https://nightlies.apache.org/flink/flink-docs-master/zh/docs/try-flink/local_installation/

### 命令

* 启动: `./bin/start-cluster.sh`
* 停止:`./bin/stop-cluster.sh`



### `基于 Table API 实现实时报表 `

> [基于 Table API 实现实时报表](https://nightlies.apache.org/flink/flink-docs-release-2.0/zh/docs/try-flink/table_api/)
>
> [Flink入门项目之flink-playgrounds/table-walkthrough使用过程](https://juejin.cn/post/7128761416927936542)

```
docker compose down
docker compose build
docker compose up -d
```

* `docker compose build` 慢的问题

  ```
  -- 修改maven仓库地址
  COPY ./settings.xml /usr/share/maven/conf
  ```

  
# Redis

> create by nohi 20240913

## 安装

* macos安装

  ```shell
  brew install redis
  ```

* 启停

  ```shell
  brew services start redis
  brew services stop redis
  -- 查看redis信息
  brew services info redis
  
  # 直接启动
  redis-server
  
  # 带配置文件启动
  redis-server ./redis.conf 
  
  # 带配置文件启动 且指定某几个配置 配置名称前加 --   daemonize 后台启动
  redis-server --daemonize yes
  redis-server ./redis.conf --daemonize yes --port 1123
  ```

* 操作

  * rdm工具操作

  * 命令行

    ```
    -- 连接
    redis-cli
    
    可以指定 ip port
    redis-cli -h 127.0.0.1 -p 6379
    
    -- 认证
    auth "123456"
    
    -- 停止
    redis-cli shutdown
    -- 带密码关闭
    ./redis-cli -a 123456 shutdown
    ```
    
    



## 数据类型

字符串 ( String ) , 哈希 ( Map ) , 列表 ( list ) , 集合 ( Sets ) 或有序集合 ( Sorted Sets ) 等类型

### 字符串

字符串是最基本的数据类型，可以存储任何类型的数据。以下是字符串的命令行命令：

```shell
set <key> <value>  # 设置字符串
get <key>          # 获取字符串
append <key> <value>  # 追加字符串
incr <key>         # 将键值加1
decr <key>         # 将键值减1
```

### 哈希

哈希是一种键值对集合，其中每个键都对应一个值。以下是哈希的命令行命令：

```shell 
hset <key> <field> <value>  # 设置哈希字段
hget <key> <field>          # 获取哈希字段
hgetall <key>               # 获取哈希所有字段和值
hkeys <key>                 # 获取哈希所有字段
hvals <key>                 # 获取哈希所有值
hdel <key> <field>          # 删除哈希字段
```

### 列表

列表是一种有序的字符串集合，可以在列表的两端进行插入和删除操作。以下是列表的命令行命令：

```shell
lpush <key> <value>  # 在列表左端插入元素
rpush <key> <value>  # 在列表右端插入元素
lpop <key>           # 删除列表左端元素
rpop <key>           # 删除列表右端元素
lrange <key> <start> <stop>  # 获取列表指定范围的元素

```

### 集合

集合是一种无序的字符串集合，可以进行交集、并集和差集等操作。以下是集合的命令行命令：

```shell
sadd <key> <value>   # 添加集合元素
srem <key> <value>   # 删除集合元素
smembers <key>       # 获取集合所有元素
sinter <key1> <key2>  # 获取集合交集
sunion <key1> <key2>  # 获取集合并集
sdiff <key1> <key2>   # 获取集合差集
```

### 有序集合

```shell
zadd <key> <score> <value>  # 添加有序集合元素
zrem <key> <value>           # 删除有序集合元素
zrange <key> <start> <stop>  # 获取有序集合指定范围的元素
zrevrange <key> <start> <stop>  # 获取有序集合指定范围的元素（按分数倒序）
zrangebyscore <key> <min> <max>  # 获取有序集合指定分数范围的元素
```



## 集群

> 参见：[详解Redis三大集群模式，轻松实现高可用!](https://www.cnblogs.com/yidengjiagou/p/17345831.html)



## 锁

> [已废弃 RedLock](https://xie.infoq.cn/article/159756c5338c93a54687d8e75)



* RedLock 主要存在以下两个问题：

```
性能问题：RedLock 要等待大多数节点返回之后，才能加锁成功，而这个过程中可能会因为网络问题，或节点超时的问题，影响加锁的性能。
并发安全性问题：当客户端加锁时，如果遇到 GC 可能会导致加锁失效，但 GC 后误认为加锁成功的安全事故，例如以下流程：
客户端 A 请求 3 个节点进行加锁。
在节点回复处理之前，客户端 A 进入 GC 阶段（存在 STW，全局停顿）。
之后因为加锁时间的原因，锁已经失效了。
客户端 B 请求加锁（和客户端 A 是同一把锁），加锁成功。
客户端 A GC 完成，继续处理前面节点的消息，误以为加锁成功。
此时客户端 B 和客户端 A 同时加锁成功，出现并发安全性问题。
```

因为 RedLock 存在的问题争议较大，且没有完美的解决方案，所以 Redisson 中已经废弃了 RedLock，这一点在 Redisson 官方文档中能找到。



## 发布订阅

### 订阅者/接收消息

```
127.0.0.1:6379(subscribed mode)> subscribe bbx
1) "subscribe"
2) "bbx"
3) (integer) 1
```

### 发布者/发布消息

```
127.0.0.1:6379> PUBLISH bbx hello1
(integer) 1

接收者会收到消息
127.0.0.1:6379(subscribed mode)> subscribe bbx
1) "subscribe"
2) "bbx"
3) (integer) 1
1) "message"
2) "bbx"
3) "hello1"
```

`RedisTemplate` 代码`demo`   :point_down:

```java
git: https://github.com/thisisnohi/SpringCloud2022.git 
分支： feature-demo
代码路径： test/java/nohi/redis/pubsub/TestRedisTemplatePub.java

@DisplayName("定时发布消息,TOPIC_ONE/TOPIC_TWO")
    @Test
    @Order(1)
    public void 发布消息() throws InterruptedException {
        int index = 0;
        while (true) {
            index++;
            // 创建消息
            MessageVo msg = MessageVo.builder().id("TOP1" + index).title(TOPIC_ONE).content(DateUtil.now() + " " + index).build();
             template.convertAndSend(TOPIC_ONE, msg);

            if (index % 2 == 0) {
                log.info("===>TOP2");
                msg = MessageVo.builder().id("TOP2" + index).title(TOPIC_TWO).content(DateUtil.now() + " " + index).build();
                template.convertAndSend(TOPIC_TWO, msg);
            }
            log.info("消息[{}] 发布", index);
            TimeUnit.SECONDS.sleep(1);
        }
    }

    @DisplayName("订阅消息")
    @Test
    @Order(2)
    public void 订阅消息() throws InterruptedException {
        RedisMessageListener listener = new RedisMessageListener(template);

        PrintMessageReceiver receiver = new PrintMessageReceiver();
        MessageListenerAdapter adapter = new MessageListenerAdapter(receiver);
        adapter.setDefaultListenerMethod("handleMessage"); // 明确指定方法名
        adapter.setSerializer(RedisSerializer.json());
        /** adapter必须增加afterPropertiesSet方法调用 **/
        adapter.afterPropertiesSet();

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        // 监听所有库的key过期事件
        container.setConnectionFactory(lcf);
        // 所有的订阅消息，都需要在这里进行注册绑定,new PatternTopic(TOPIC_NAME1)表示发布的主题信息
        // 可以添加多个 messageListener，配置不同的通道
        container.addMessageListener(listener, new PatternTopic(TOPIC_ONE));
        // new PatternTopic("pattern.*") 模糊匹配
        container.addMessageListener(adapter, new ChannelTopic(TOPIC_TWO));
        // 可选配置
        container.setTaskExecutor(Executors.newFixedThreadPool(4)); // 自定义线程池
        container.setErrorHandler(e -> System.err.println("Listener error: " + e.getMessage()));

        // 初始化容器
        container.afterPropertiesSet(); // 重要！启动容器
        container.start(); // 显式启动
        TimeUnit.SECONDS.sleep(30);
    }
```




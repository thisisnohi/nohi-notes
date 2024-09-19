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
  ```

* 操作

  * rdm工具操作

  * 命令行

    ```
    -- 连接
    redis-cli
    
    -- 认证
    auth "123456"
    
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


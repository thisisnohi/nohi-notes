# Redis集群

## 一、集群分类
* 主从

## 三、主从集群
### 1. 配置
* `主节点` 无需特殊配置, 允许读写
* `从节点` 只允许读
  ```
    # 从节点配置(老版本使用 slaveof)
	replicaof 主节点ip port
	
    # redis 3 使用 slaveof，新版本使用 replicaof
	slaveof 10.0.0.100 16379
  
	# 如果主节点设置了 requirepass 主节点密码，从节点需要配置主节点密码
	masterauth 主节点密码
  ```
### 2. 优缺点
* 优点
	- 配置简单，易于实现
	- 实现数据冗余，提高数据可靠性
	- 读写分享，提高系统性能
* 缺点
	- 主节点故障时，需要手动切换到从节点，故障恢复时间较长
	- 主节点承担所有写操作，可能成为性能瓶颈
	- 无法实现数据分片，受单节点内存限制

### 3. 适用场景
* 数据备份和容灾恢复：通过从节点备份主节点的数据，实现数据冗余。
* 读写分享：将读操作分发到从节点，减轻主节点压力，提高系统性能。
* 在线升级和扩展：在不影响主节点的情况下，通过增加从节点来扩展系统的读取能力。

## 四、哨兵模式(Sentinel)

### 1. 配置
```
10.0.0.100 6379 主
10.0.0.101 6379 从
10.0.0.102 6379 从

sentinel.conf 中 配置主的ip port，当sentinel切换主节点时，会自动修改sentinel.conf文件内容
# sentinel 默认端口为26379
sentinel monitor mymaster 10.0.0.100 6379 2

daemonize yes
# 需求配置绝对路径
logfile "/root/redis/redis-6/logs/sentinel.log"

# 主节点密码
sentinel auth-pass mymaster PasswordABC


# 检查节点情况
./redis-cli -p 26379 
> info sentinel

# 检查主从情况
./redis-cli -p 6379
> info replication


```

### 2. 优缺点
* 优点
	* 自动故障转移，提高系统的高可用性
	* 具有主从复制模式的所有优点，如数据冗余和读写分离
* 缺点
	* 配置和管理相对复杂
	* 依然无法实现数据分片，受单节点内存限制


### 3. 适用场景
* 高可用性要求较高场景：通过自动故障转移，确保服务的持续可用
* 数据备份和容灾恢复：在主从复制的基础上，提供故障转移功能


## 五、Cluster模式
> 提供数据分片、高可用功能

* Cluster集群中有16384个槽位，必须要将这些槽位分别规划到几台Master中

###　1.部署
* 地址规划
	
	```
	10.0.0.100 6380 6381
	10.0.0.101  6380 6381
	10.0.0.102 6380 6380
	
	redis_cluster_port.conf
	

 	相关配置
 	dbfilename "dump_6380.rdb"
 	cluster-enabled yes
 	cluster-config-file nodes-6380.conf
 	cluster-node-timeout 15000	
 	
 	/etc/hosts
 	10.0.0.100 node1
 	10.0.0.101 node2
 	10.0.0.102 node3
 	
 	```
* 加入集群
	
  ```	
  1. 启动各个节点 
  2. 加入集群
  ./redis-cli -h node1 -p 6380
  
  cluster meet 10.0.0.100 6381
  cluster meet 10.0.0.101 6380
  cluster meet 10.0.0.101 6381
  cluster meet 10.0.0.102 6380
  cluster meet 10.0.0.102 6381
	
  3. 查询所有节点的nodeid
     cluster nodes
  
  4. 设置slave节点
     cluster replicate  nodeid
  5. master节点分配槽位  16384/3 = 5462个，从0开始
     ./redis-cli -h node1 -p 6380 -a PasswordABCD cluster addslots {0..5461}
	   ./redis-cli -h node2 -p 6380 -a PasswordABCD cluster addslots {5462..10922}
	   ./redis-cli -h node3 -p 6380 -a PasswordABCD cluster addslots {10923..16383}
  6. cluster nodes 查看分配情况 
  7. cluster info 查看集群信息
      
  ```
* 操作

  ```
  移动
  127.0.0.1:6380> set k1 "v1"
  (error) MOVED 12706 10.0.0.100:6380
  
  -c 参数 解决移动问题
  ./redis-cli -c -h node1 -p 6380
  ```


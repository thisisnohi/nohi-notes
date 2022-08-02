# MQ

>  create by nohi 20211214

## 概念

### 消息 (Message): MQ 中最小的概念，本质上就是一段数据,应用程序之间传递的信息载体。

* 消息可以大致分成两部分: 应用数据体和消息数据头
  * 消息数据头是对消息属性的描述: 目标队列管理器的名字，目标队列的名字等
  * 应用数据体是应用间传送的实质的数据消息
* 消息可以分成持久 (Persistent) 消息和非持久 (Non-Persistent) 消息

### 队列 (Queue)： 容器，用于存放消息

* 本地队列、 远程队列定义、别名队列定义、模型队列
* 一个队列管理器下辖很多个消息队列，但每个队列却只能属于一个队列管理器



* 本地队列
  本地队列按功能又可分成初始化队列，传输队列，目标队列和死信队列

	### 队列管理器 (Queue Manager)

队列管理器构建了独立的 WebSphere MQ 的运行环境，它是消息队列的管理者，用来维 护和管理消息队列

队列管理 器集成了对象的定义、配置、管理、调度以及提供各种服务的功能于一身

### 通道 (Channel)

通道是两个队列管理器之间的一种单向的点对点的通信连接，消息在通道中只能单向流 动。如果需要双向交流，可以建立一对通道，一来一去



## 安装

> https://blog.csdn.net/liuyouzhang89/article/details/113643323

网盘 soft/mq目录

### Linux 安装

> https://blog.csdn.net/weixin_37539417/article/details/93488229
>
> 注意修改版本号为下载的版本





## 常用命令

### 队列管理器命令

a,创建队列管理器
   crtmqm -q QMA (-q表示QMA为默认队列管理器)
b,启动队列管理器
   strmqm QMA（对于默认队列管理器，则为strmqm ）
c,关闭队列管理器
	endmqm QmgrName 受控停止
  endmqm –i QmgrName 立即停止
  endmqm –p QmgrName 强制停止
d,显示队列管理器
  dspmq –m QmgrName
e,启动管理器平台
  runmqsc QMA

* 以下操作是在队列管理器平台中做的，就是启动管理器平台后才能执行的命令
       (前提是执行启动管理器平台runmqsc QMA)

```
 ```
 a.定义本地队列
   define qlocal(queueA)
 	例1：define qlocal(QL1)
 	若用于队列管理器之间进行通信 即传输队列，这应为 define qlocal(queue1) usage(xmitq).
 	定义传输队列
 	define qlocal(QT1) usage(xmitq) trigger trigtype(first) initq(system.channel.initq) trigdata(QM1.QM2)
 	 例2: define qlocal(QT1) usage(xmitq) trigger trigtype(first) initq(system.channel.initq) trigdata(QM1.QM2)
 	传输队列是传输的介质，消息是通过传输队列进行传输的。
 			usage 用途xmitq是传输队列
 			trigger 消息触发开关
 			trigtype 触发类型第一条消息触发
 			initq    初始队列
 			trigdata 触发数据 
 b.定义远程队列
 	define qremote(queue.remote) rname(apple.queue) rqmname('queueB') xmitq(queue1)
 	例3：define qremote(QR1) rname(QL1) rqmname(QM2) xmitq(QT1)
 	 （xmitq是本地传输队列 ; apple.queue为 远程队列管理器queueB 中的本地队列; ）
 c.定义发送端通道
   define channel(queueA.queueB) chltype(sdr) conname('192.168.1.90(1414)') xmitq(queueA) trptype(tcp)
   例4：define channel(QM1.QM2) chltype(sdr) conname('localhost(7788)') xmitq(QT1) trptype(tcp)
   xmitq本地传输队列		        
 d.定义接受方通道
   define channel(queueB.queueA) chltype(rcvr) trptype(tcp)
   例5: define channel(QM2.QM1) chltype(rcvr) trptype(tcp)
   接受通道和发送通道名称对应，如发送通道名：a.b，则接受通道为: b.a
 e.定义侦听:
 	def listener(LSR.QM1) trptype(tcp) port(7799) control(qmgr)
 	例6： def listener(LSR.QM1) trptype(tcp) port(7799) control(qmgr)
 	解释下 trptype 监听类型
 				port           监听端口
 				ontrol        监听控制，如果是qmgr则在队列管理器启动的时候监听也自动启动。
   
 e.更改侦听端端口号
   alter listener(system.default.listener.tcp) trptype(tcp) port(1415)
 f.启动侦听
 	start listener(system.default.listener.tcp)
 g.列出侦听状态
   display lsstatus(*)  ##此命令必须在监听启动时才可以用，启动监听START LISTENER(启动QM的监听，而不是自己新建的监听)
  DISPLAY LISTENER(listener_name)		       
 h.测试， 向队列中放入消息
   amqsput queue_name queue_manager_name
 i.从队列中取出消息
 	amqsget queue_name queue_manager_name		      
 j.在服务器方建立用于客户方链接的通道
 	define channel(channel2) chltype(svrconn) trptype(tcp) mcauser(' ')	      
 k.在客户机方，使用MQSERVER定义客户机链接通道（如使用了Active Directory 服务支持，则可略过本步骤）
 	SET MQSERVER=CHANNEL1/TCP/192.168.1.90(1414)   //Windows
 	export MQSERVER=’CHANNEL1/TCP/server-hostname(port)’  //linux			  			     
 l.启动监听START LISTENER
 m.结束所有侦听进程
 	endmqlsr -m mqm_name
 n.退出队列管理器平台
   end
 ```
```

* 查看WebSphere MQ版本号
       dspmqver
* 查看已有的MQ管理器
  dspmq

* 启动WebSphere MQ Explorer
  strmqcfg

* "dspmqfls" command to convert between real and transformed object names.	






	/*******************************************************************************************/
	总结：
	1,创建队列管理器QM1
	  crtmqm -q QM1
	2,启动队列管理器QM1
	  strmqm QM1
	3,启动队列管理器平台QM1(带命令行的窗口，可以创建各种队列、通道、侦听＝＝)
	  runmqsc QM1
	以下各步是在 runmqsc QM1下运行的，即在QM1平台上运行的
	4,定义本地队列QL1：
	  define qlocal(QL1) 									
	5,定义传输队列QT1:
	  define qlocal(QT1) usage(xmitq) trigger trigtype(first) initq(system.channel.initq) trigdata(QM1.QM2)
	6,定义运程队列QR1:
	  define qremote(QR1) rname(QL1) rqmname(QM2) xmitq(QT1)			
	  注：这里的rname(QL1)是QM2队列管理器中的本地队列, 
	     xmitq(QT1) QT1是本队列管理器中的传输聊表QT1
	7,定义发送端通道QM1.QM2:
	  define channel(QM1.QM2) chltype(sdr) conname('localhost(7788)') xmitq(QT1) trptype(tcp)
	8,定义接受方通道QM2.QM1: 接受通道和发送通道名称对应，如发送通道名：a.b，则接受通道为: b.a
	  define channel(QM2.QM1) chltype(rcvr) trptype(tcp)
	9,定义侦听LSR.QM1:
	  def listener(LSR.QM1) trptype(tcp) port(7799) control(qmgr)
	10,启动侦听：
	  start listener(system.default.listener.tcp)
	  注：(因为9中创建侦听中 control(qmgr) 参数指定是队列管理器默认侦听,所以10启动侦听直接启动默认管理器，不需要指定名称)
	   参见：window 下建立队列脚本_(测试QMTest1).cmda	
	/*******************************************************************************************/



### 队列一

```
## 1: 创建队列管理器
crtmqm QMTEST1  

## 2: 启动队列管理器
strmqm QMTEST1

## 3: 运行队列管理器控制台
runmqsc QMTEST1 

*#######根据实际需要修改队列管理器的CCSID,一般为1386(GBK),1381(GB2312),1208(UTF-8)
ALTER QMGR CCSID(1386)

*#######为队列管理器创建死信队列QMTEST1.DEAD.QUEUE,这步一般可以不需要
ALTER QMGR DEADQ(QMTEST1.DEAD.QUEUE) FORCE 
DEFINE QLOCAL(QMTEST1.DEAD.QUEUE) MAXDEPTH(999999999) DEFPSIST(YES) REPLACE

*####### 4: 创建本地队列 QMTEST1.QL1
define qlocal(QMTEST1.QL1)

*####### 5: 创建传输队列 QMTEST1.QT1
define qlocal(QMTEST1.QT1) usage(xmitq) trigger trigtype(first) initq(system.channel.initq) trigdata(QMTEST1.QMTEST2)

*####### 6,定义运程队列 QMTEST1.QR1(本地传输队列为QMTEST1.QT1,远程队列管理器为QMTEST2,远程队列为QMTEST2.QL1)
define qremote(QMTEST1.QR1) rname(QMTEST2.QL1) rqmname(QMTEST2) xmitq(QMTEST1.QT1)

*####### 7,定义发送端通道QMTEST1.QMTEST2,指定对方地址localhost(9902) 7788为侦听端口
define channel(QMTEST1.QMTEST2) chltype(sdr) conname('localhost(9902)') xmitq(QMTEST1.QT1) trptype(tcp)

*####### 8,定义接受方通道QM2.QM1: 
define channel(QMTEST2.QMTEST1) chltype(rcvr) trptype(tcp)

*#######启动发送方通道
START CHANNEL(QMTEST1.QMTEST2)

*#######查看发送方通道状态  DISPLAY CHSTATUS(QMTEST2.QMTEST1)
DISPLAY CHSTATUS(QMTEST1.QMTEST2)

*####### 9,定义侦听QMTEST1.LSR1, control(qmgr) 参数指定是队列管理器默认侦听
def listener(QMTEST1.LSR1) trptype(tcp) port(9901) control(qmgr)

*####### 10,启动侦听：
start listener(system.default.listener.tcp)


*#######修改服务器通道,以便接受Java请求
*# ALTER CHANNEL(SYSTEM.DEF.SVRCONN) CHLTYPE(SVRCONN) MCAUSER('')

*#######创建侦听器(端口根据实际环境自行修改)
*#DEFINE LISTENER ('MQTEST.LSR.REQ') TRPTYPE(TCP) PORT(78183) BACKLOG(0) CONTROL(QMGR) REPLACE

*#######启动侦听器
*#START LISTENER ('MQTEST.LSR.REQ')

*#######为服务创建本地侦听队列：实际上 4: 创建本地队列 QMTEST1.QL1 即可
*#DEFINE QLOCAL(LOCALQ.MQTEST.REQ) REPLACE

END

endmqm -i QMTEST1
strmqm QMTEST1
```

### 队列二

```
## 1: 创建队列管理器
crtmqm QMTEST2 

## 2: 启动队列管理器
strmqm QMTEST2

## 3: 运行队列管理器控制台
runmqsc QMTEST2

*#######根据实际需要修改队列管理器的CCSID,一般为1386(GBK),1381(GB2312),1208(UTF-8)
ALTER QMGR CCSID(1386)

*#######为队列管理器创建死信队列,这步一般可以不需要
ALTER QMGR DEADQ(QMTEST2.DEAD.QUEUE) FORCE 
DEFINE QLOCAL(QMTEST2.DEAD.QUEUE) MAXDEPTH(999999999) DEFPSIST(YES) REPLACE

*####### 4: 创建本地队列 QMTEST2.QL1
define qlocal(QMTEST2.QL1)

*####### 5: 创建传输队列 QMTEST2.QT1
define qlocal(QMTEST2.QT1) usage(xmitq) trigger trigtype(first) initq(system.channel.initq) trigdata(QMTEST2.QMTEST1)

*####### 6,定义运程队列 QMTEST2.QR1(本地传输队列为QMTEST2.QT1,远程队列管理器为QMTEST1,远程队列为QMTEST1.QL1)
define qremote(QMTEST2.QR1) rname(QMTEST1.QL1) rqmname(QMTEST1) xmitq(QMTEST2.QT1)

*####### 7,定义发送端通道QMTEST2.QMTEST1,指定对方地址localhost(9901) 7788为侦听端口
define channel(QMTEST2.QMTEST1) chltype(sdr) conname('localhost(9901)') xmitq(QMTEST2.QT1) trptype(tcp)

*####### 8,定义接受方通道QMTEST1.QMTEST2: 
define channel(QMTEST1.QMTEST2) chltype(rcvr) trptype(tcp)

*#######启动发送方通道
START CHANNEL(QMTEST2.QMTEST1)

*#######查看发送方通道状态
DISPLAY CHSTATUS(QMTEST2.QMTEST1)

*####### 9,定义侦听QMTEST2.LSR1, control(qmgr) 参数指定是队列管理器默认侦听
def listener(QMTEST2.LSR1) trptype(tcp) port(9902) control(qmgr)

*####### 10,启动侦听：
start listener(system.default.listener.tcp)


*#######修改服务器通道,以便接受Java请求
*# ALTER CHANNEL(SYSTEM.DEF.SVRCONN) CHLTYPE(SVRCONN) MCAUSER('')

*#######创建侦听器(端口根据实际环境自行修改)
*#DEFINE LISTENER ('MQTEST.LSR.REQ') TRPTYPE(TCP) PORT(78183) BACKLOG(0) CONTROL(QMGR) REPLACE

*#######启动侦听器
*#START LISTENER ('MQTEST.LSR.REQ')

*#######为服务创建本地侦听队列：实际上 4: 创建本地队列 QMTEST1.QL1 即可
*#DEFINE QLOCAL(LOCALQ.MQTEST.REQ) REPLACE

END

endmqm -i QMTEST2
strmqm QMTEST2
```

## 常见问题

* 2035 MQRC_NOT_AUTHORIZED

  ```
  参见：https://blog.csdn.net/u011461385/article/details/81546000
  
  RUNMQSC 队列管理器名称
  ALTER QMGR CHLAUTH(DISABLED)
  #修改连接认证策略
  ALTER AUTHINFO(SYSTEM.DEFAULT.AUTHINFO.IDPWOS) AUTHTYPE(IDPWOS) CHCKCLNT(OPTIONAL)
  #或者关闭连接认证
  ALTER QMGR CONNAUTH(' ')   
  #最后刷新连接认证策略
  REFRESH SECURITY TYPE(CONNAUTH)
  
  --关闭认证
  ALTER QMGR CHLAUTH(DISABLED) 
  REFRESH SECURITY TYPE(CONNAUTH
  
  20220802 通过如下修改，成功连接mq
  ALTER CHANNEL(SYSTEM.DEF.SVRCONN) CHLTYPE(SVRCONN) MCAUSER('')  或者MCAUSER('mqm')
  ```

  

第二部分 JMS MQ编程
------------------------------------------------------------------------------------------------------

> 参见：https://github.com/thisisnohi/springbootmq.git



## docker IBM MQ

>  参考：https://www.cnblogs.com/rmxd/p/12521450.html




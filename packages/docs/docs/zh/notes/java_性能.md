# 性能
> 20190130 https://www.ibm.com/developerworks/cn/java/j-lo-performance-tuning-practice/index.html

## Java 应用诊断工具

### JPS

>  查看进程信息

```
> jps -m -l
```



### jamp

> 可以生成 java 程序的 dump 文件， 也可以查看堆内对象示例的统计信息、查看 ClassLoader 的信息以及 finalizer 队列

* jmap -dump:format=b,file=dumpFileName pid 内存使用情况dump到文件中

   jmap -dump:format=b,file=/tmp/dump.dat 21711

### jstat -gcutil 332 1000

### jstack

jstack是jdk自带的线程堆栈分析工具，使用该命令可以查看或导出 Java 应用程序中线程堆栈信息。

* top -H -p pid 定位 Java 进程和线程
* jstack -l pid 导出线程栈

### Jconsole

* 启动命令增加：-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=12345 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=192.168.0.194"
* 本机启动jconsole

### jmap

* 生成快照：jmap -dump:format=b,file=heapdump.phrof pid

### JProfiler

> https://www.cnblogs.com/AmilyWilly/p/7272160.html?utm_source=itdadao&utm_medium=referral
> 建议安装 9.2.1  ，安装10 idea中出现license 失效问题。

L-Larry_Lau@163.com#40775-3wle0g1uin5c1#0674


#### jprofiler9 + linux + was
> 服务器安装，不需要启动。

* 客户端(windows)
* start center -> new seession -> new server integration
* 选择容器(was) .... 
* Remote installation directory 服务器jprofiler安装目录
* config synchronization 选择 manual synchronization(手工同步)
	* 配置目录输入一个目录，需要把客户端的config文件同步过去。
	* 客户端config.xml  C:\Users\用户名(因人不而异)\.jprofiler9\config.xml

* Locate the config file。需要拷贝was服务器的server.xml至本地目录。
	* /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/config/cells/appNode01Cell/nodes/appNode01/servers/server1/server.xml
* 最后一步： 选择稍后启动。

* 第一次会连接失败，需要将本地目录server.xml拷贝到WebSphere的server.xml配置文件的位置，然后覆盖之（覆盖之前备份一下）	
* 启动was

* 本地连接



### MAT (Memory Analyzer tool)

> 参考：https://cloud.tencent.com/developer/article/1379028

在线分析：https://fastthread.io/

### async-profiler

> https://github.com/jvm-profiling-tools/async-profiler

*  ./profiler.sh -d 30 -f ./aaa.svg 2488

### 查看线程、进程

* top -Hp pid 查看进程下线程信息

  查看到耗时的线程

* printf "%x\n" threadid 得到十六进制串
* jstack -l pid 查看堆栈信息










# 性能

> 20190130 https://www.ibm.com/developerworks/cn/java/j-lo-performance-tuning-practice/index.html

## 常规
* JVM
  ```
  -Xmx   Java Heap最大值，默认值为物理内存的1/4，最佳设值应该视物理内存大小及计算机内其他内存开销而定
  -Xms   Java Heap初始值，Server端JVM最好将-Xms和-Xmx设为相同值，开发测试机JVM可以保留默认值；
  
  -Xmn   Java Heap Young区大小，不熟悉最好保留默认值；
  
  -Xss   每个线程的Stack大小，不熟悉最好保留默认值；
  ```


```
### 查看线程、进程
* top -Hp pid 查看进程下线程信息(mac： ps -M pid查看线程信息)
  查看到耗时的线程
* printf "%x\n" threadid 得到十六进制串
* jstack -l pid 查看堆栈信息
```

* jdk8

  ```
  https://blog.csdn.net/vivisran/article/details/103060508
  java -XX:+PrintFlagsFinal -version | grep MetaspaceSize查看metaspacesize
  fullgc:
  	-Xms4096m -Xmx4096m -XX:MetaspaceSize=512m -XX:MaxMetaspaceSize=512m
  ```

  



## Java 应用诊断工具

### JPS

>  查看进程信息

```
> jps -m -l
```

### jmap

> 可以生成 java 程序的 dump 文件， 也可以查看堆内对象示例的统计信息、查看 ClassLoader 的信息以及 finalizer 队列

* jmap -dump:format=b,file=dumpFileName pid 内存使用情况dump到文件中

   jmap -dump:format=b,file=/tmp/dump.dat 21711

* 生成快照：jmap -dump:format=b,file=heapdump.phrof pid

* jmap -heap pid:查看堆使用情况

* jmap -histo pid：查看堆中对象数量和大小

### jstat -gcutil 332 1000

* jstat -gcutil pid  1000(轮循时间间隔)

### jstack

jstack是jdk自带的线程堆栈分析工具，使用该命令可以查看或导出 Java 应用程序中线程堆栈信息。

* top -H -p pid 定位 Java 进程和线程
* mac： ps -M pid查看线程信息
* jstack -l pid 导出线程栈

### Jconsole

* 启动命令增加：-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=12345 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Djava.rmi.server.hostname=192.168.0.194"
* 本机启动jconsole

### jinfo

> jinfo可以用来查看正在运行的java运用程序的扩展参数，甚至支持在运行时动态地更改部分参数

* jinfo  pid

* -flag< name >: 打印指定java虚拟机的参数值

  -flag [+|-]< name >：设置或取消指定java虚拟机参数的布尔值

  -flag < name >=< value >：设置指定java虚拟机的参数的值

### jcmd

> 在JDK 1.7之后，新增了一个命令行工具jcmd。它是一个多功能工具，可以用来导出堆，查看java进程，导出线程信息，执行GC等。jcmd拥有jmap的大部分功能，Oracle官方建议使用jcmd代替jmap。

*  jcmd -l 列出当前运行的所有虚拟机
* jcmd pid help 列出该虚拟机支持的所有命令
* jcmd pid VM.command_line 



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












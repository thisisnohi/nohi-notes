# JAVA应用,内存问题、程序卡顿简单分析

* 要求：
  * Linux运行环境、JDK1.8
  * Eclipe MAT (Memory Analyzer)
* 主题
  * 服务线程堆栈查看
  * OOM分析

```
http://127.0.0.1:8099/demo/loop?loopSec=1
http://127.0.0.1:8099/demo/lock?lockSec=10
http://127.0.0.1:8099/demo/oom?objNum=6000000
http://127.0.0.1:8099/demo/oss?loopNum=1000

http://127.0.0.1:8099/demo/loop2?loopSec=10 运行10次，每次间隔10s
```



## 服务线程堆栈查看

​		列举说明查看线程堆栈常用方法、命令

### 查看进程 获取pid

> 两种方式： jps、  ps -ef | grep java/xxx.jar/进程名

* jps:

  ```
  > jps -ml
  18967 demo-web-1.0-SNAPSHOT.jar
  19439 sun.tools.jps.Jps -ml
  ```

* ps -ef | grep java

  ```
  [nohi@nohi logs]$ ps -ef | grep java
  nohi     18967  6475 18 14:01 pts/0    00:00:10 java -jar demo-web-1.0-SNAPSHOT.jar
  nohi     23827 26256  0 14:02 pts/7    00:00:00 grep java
  说明
  UID        PID  PPID  C STIME TTY          TIME CMD
  
  ```

18967 23827 为pid

### 查看有问题线程

根据进程，查看进程下线程，根据线程占用CPU、运行时间，获取有问题线程

* top -Hp pid

```
top -Hp pid 查看进程下线程信息

 PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND                                                                                                                                          
20160 nohi      20   0 2976m 172m  13m R 90.6  4.5   1:13.48 java                                                                                                                                             
18976 nohi      20   0 2976m 172m  13m S  0.3  4.5   0:00.98 java                                                                                                                                             
18967 nohi      20   0 2976m 172m  13m S  0.0  4.5   0:00.00 java                                                                                                                                             
18968 nohi      20   0 2976m 172m  13m S  0.0  4.5   0:04.86 java                                                                                                                                             
18969 nohi      20   0 2976m 172m  13m S  0.0  4.5   0:00.51 java                                                                                                                                             
18970 nohi      20   0 2976m 172m  13m S  0.0  4.5   0:00.00 java                                                                                                                                             
18971 nohi      20   0 2976m 172m  13m S  0.0  4.5   0:00.00 java                                                                                                                                             
18972 nohi      20   0 2976m 172m  13m S  0.0  4.5   0:00.00 java    
```

​                                                                                                                                         

* arthas： thread 

  ![image-20200721154745020](/Users/nohi/Library/Application Support/typora-user-images/image-20200721154745020.png)

### 打印堆栈

* jstack -l pid 导出线程栈	
* kill -3 pid

注：

	 需要进程以nohup 方式启动，kill -3 后会在jar所生成的nohup.out文件中（一般在jar同目录）

### 查看堆栈信息

 1. printf '%x\n'  线程ID
    $> printf '%x\n' 20168
    4ec8
  2. 线程栈信息中查询线程id （4ec8）

![image-20200721155624560](/Users/nohi/Library/Application Support/typora-user-images/image-20200721155624560.png)

​	 

* Arthas: thread 22

  ![image-20200721154940093](/Users/nohi/Library/Application Support/typora-user-images/image-20200721154940093.png)

### 查看、备份

* tail -n 10000 nohup.out > 1.txt

  nohup.out 最后1w行数据存储到1.txt文件中备份

问题定位：

​	查看nohup.out/1.txt文件，从尾部向上查看

​    一般如果是代码逻辑问题，卡某个方法，会找到方法执行的堆栈（业务逻辑代码），即可定位问题

## OOM分析

* 生成dump文件
  *  -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/nohi/demo  应用启动后出现内存异常则会自动导出dump文件，默认的文件名是：java_pid<进程号>.hprof
  * jmap -dump:format=b,file=/home/nohi/demo/dump.dat  pid
  * arthas: heapdump /home/nohi/demo/dump.hprof
* MAT 打开dump文件

## 其它

* 工具：arthas
  * 参考：https://alibaba.github.io/arthas/
  * thread -b 查看线程死锁
  * sc 查看已加载的类
    * sc -d *DemoService
  * sm 查看类的方法
    * sm demo.service.DemoService
  * jad 反编译
    * jad demo.service.DemoService
  * monitor 监控方法执行情况
    * monitor -c 10 demo.service.DemoService testLoopAndReturn  -c 统计周期 默认120s
  * watch 查看方法执行数据
    * watch demo.service.DemoService testLoopAndReturn "{params,returnObj}" -x 3  -x 深度

### 作业

* http://127.0.0.1:8099/demo/lock?lockSec=2000
  * 线程堆栈   记录分析过程
* http://127.0.0.1:8099/demo/oom2?objNum=6000000
  * objNum多少出现oom
  * 记录分析过程，找出问题代码、原因










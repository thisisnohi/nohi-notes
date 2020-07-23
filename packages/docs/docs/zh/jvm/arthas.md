# arthas

* 常用命令
	* dashboard　实时数据面板
	
	* thread　 	JVM 的线程堆栈信息
	  
	  * Arthas支持管道，可以用 `thread 1 | grep 'main('` 查找到`main class`
	  
	  * thread -b, 找出当前阻塞其他线程的线程
	  
	  * | 参数名称 | 参数说明                              |
	    | -------- | ------------------------------------- |
	    | *id*     | 线程id                                |
	    | [n:]     | 指定最忙的前N个线程并打印堆栈         |
	    | [b]      | 找出当前阻塞其他线程的线程            |
	    | [i ``]   | 指定cpu占比统计的采样间隔，单位为毫秒 |
	  
	* jvm  JVM 的信息
	
	  ​       THREAD相关
	
	  * COUNT: JVM当前活跃的线程数
	
	  * DAEMON-COUNT: JVM当前活跃的守护线程数
	
	  * PEAK-COUNT: 从JVM启动开始曾经活着的最大线程数
	
	  * STARTED-COUNT: 从JVM启动开始总共启动过的线程次数
	
	  * DEADLOCK-COUNT: JVM当前死锁的线程数
	
	    文件描述符相关
	
	  * MAX-FILE-DESCRIPTOR-COUNT：JVM进程最大可以打开的文件描述符数
	
	  * OPEN-FILE-DESCRIPTOR-COUNT：JVM当前打开的文件描述符数
	
	* sc  JVM已加载的类信息
	  
	  * sc -d *MathGame
	  
	* sm		已加载类的方法信息
	
	  * sm 类
	
	* dump
	
	  * dump xxx.ccc.ccc 已加载类的 bytecode 到特定目录
	
	* heapdump dump java heap, 类似jmap命令的heap dump功能。
	
	  * dump到指定文件 heapdump /tmp/dump.hprof
	
	    ```
	    heapdump /home/cbpc/dump.hprof
	    ```
	
	    
	
	  * 只dump live对象 heapdump --live /tmp/dump.hprof
	
	* jad		反编译指定已加载类的源码
	  
	  * jad demo.MathGame
	  
	* classloader	查看classloader的继承树，urls，类加载信息，使用classloader去getResource
	
	* monitor	方法执行监控
	
	* watch		方法执行数据观测
	  
	  | 参数名称            | 参数说明                                   |
	  | ------------------- | ------------------------------------------ |
	  | *class-pattern*     | 类名表达式匹配                             |
	  | *method-pattern*    | 方法名表达式匹配                           |
	  | *express*           | 观察表达式                                 |
	  | *condition-express* | 条件表达式                                 |
	  | [b]                 | 在**方法调用之前**观察                     |
	  | [e]                 | 在**方法异常之后**观察                     |
	  | [s]                 | 在**方法返回之后**观察                     |
	  | [f]                 | 在**方法结束之后**(正常返回和异常返回)观察 |
	  | [E]                 | 开启正则表达式匹配，默认为通配符匹配       |
	  | [x:]                | 指定输出结果的属性遍历深度，默认为 1       |
	  
	  * watch demo.MathGame primeFactors returnObj 
	  *  watch com.ccdc.pi.market.service.MainTaskService getMyTodoTask "{params,returnObj}" -x 3
	    * 3表示显示深度
	  
	* trace		方法内部调用路径，并输出方法路径上的每个节点上耗时
	
	* stack		输出当前方法被调用的调用路径
	
	  * stack demo.MathGame primeFactors
	
	* tt 		方法执行数据的时空隧道，记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测
	
	* reset		重置增强类，将被 Arthas 增强过的类全部还原，Arthas 服务端关闭时会重置所有增强过的类
	
	* quit		退出
	
	* shutdown	关闭 Arthas 服务端，所有 Arthas 客户端全部退出
	
	*  profiler  使用[async-profiler](https://github.com/jvm-profiling-tools/async-profiler)生成火焰图
	
	  * profiler start

## 安装
> 参见: https://alibaba.github.io/arthas/install-detail.html#
* 全量: https://repository.sonatype.org/service/local/repositories/central-proxy/content/com/taobao/arthas/arthas-packaging/3.0.5/arthas-packaging-3.0.5-bin.zip
* 快速: https://alibaba.github.io/arthas/arthas-boot.jar

```
安装: 执行 ./install.sh
启动: 执行 ./as.sh pid  或者 java -jar arthas-boot.jar --target-ip 0.0.0.0
	   如果多个线程，输入对应数字回车进入
```

## dashboard



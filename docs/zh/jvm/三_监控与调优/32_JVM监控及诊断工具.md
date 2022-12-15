# 32_JVM监控及诊断工具

## 01工具概述

### JDK自带

* jconsole
* VisualVm
* JMC

### 第三方工具

* MAT
* JProfiler
* Arthas
* Btrace

## 02 jconsole



## 03 VisualVM

* jvisualVM    JDK1.6 自带  bin/jvisualVM
* Visual VM 单独安装



## 04 eclipse MAT

MAT(Memory Analyzer Tool)

* 所有对象信息：对象实例、成员变量、存储于栈中的基本类型值 和存储于堆中其他对象的引用值
* 所有的类信息，包括classloader、类名称、父类、静态变量
* GCRoot到所有的对象的引用路径
* 线程信息，包括线程的调用栈及此线程的局部变量（TLS）

### dump文件来源

* jmap

  ```java
  jmap -dump:format=b,file=<filename.hprof>  PID
  jmap -dump:live,format=b,file=<filename.hprof>  PID  堆中存活对象
  ```

* 通过配置JVM参数生成

  * -XX:+HeapDumpOnOutOfMemoryError

  * -XX:+HeapDumpBeforeFullGC

  * -XX:HeapDumpPath=<filename.hprof>

* VisualVM可以导出dump文件
* MAT即可以打开一个已有的堆快照，也可以直接从活动的Java程序中导出堆快照

### 分析

* Hitogram 显示类实例数目及实例的heap和retaninedheap总和

* thread overview: 查看系统java线程、局部变量的信息

* 深堆、浅堆

  * 浅堆：指一个对象所消耗的内存

    ```
    以String为例：2个int值共占8字节，对象引用占用4字节，对象头8字节，合计20字节，向8字节对齐，故占24字节
    ```

  * 保留集

    对象A的保留集指当对象A被垃圾回收后，可以被释放的所有的对象集合（包括A本身），即对象A的保留集可以被认为是`只能通过`对象A被直接或间接访问到的所有对象的集合。通俗地说，就是指仅被对象A所持有的对象集合

  * 深堆

    深堆是指对象的保留集中所有的对象的浅堆大小之和



## 05 内存泄漏

### 概念

* 何为内存泄漏：在被使用，但不是需要的
  * 对象不在被程程序用到，但GC又不能回收他们的情况

### java内存泄漏的情况

* 静态集合类
* 单例模式
* 内部类持有外部类
* 各种连接，如数据库连接、网络连接和IO
* 变量不合理的作用域
* 改变哈希值 
* 缓存泄漏
* 监听器和回调

## 06 OQL

### SELECT

* select * from java.util.Vector v
* 正则：select * from "nohi\\.online\\..*"

## 07 Arthas

> 官方文档：https://arthas.aliyun.com/

 * Web-console:  http://127.0.0.1:8563

 * 常用命令

   * dashboard

   * thread    

   * sysprop

   * heapdump

     ```
     heapdump --live
     heapdump /tmp/dump.hprof
     ```

   * sc  class
   * Sm 方法
   * jad 反编译
   * mc、redefine   
   * classload

## JMC

优点：采用取样，不是采用传统的代码植入技术，对应用性能的影响较小，完成可以开着JMC来做压测。




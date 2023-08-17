# Java crash问题分析

> create by nohi 20230716
>
> 参考：[Java crash问题分析](https://www.cnblogs.com/yelao/p/9814467.html)

## 一、如何生成日志文件

* 缺省情况下，这个文件会产生在工作目录下。
* 指定生成文件路径`java -XX:ErrorFile=/var/log/java/java_error_%p.log`
* 这个文件将包括：
  - 触发致命错误的操作异常或者信号；
  - 版本和配置信息；
  - 触发致命异常的线程详细信息和线程栈；
  - 当前运行的线程列表和它们的状态；
  - 堆的总括信息；
  - 加载的本地库；
  - 命令行参数；
  - 环境变量；
  - 操作系统CPU的详细信息。

## 二、产生错误的原因

* 虚拟机自身的bug
* 系统的库文件、API或第三方库文件
* 系统资源

## 三、对日志文件的分析

### 1 文件头

```shell 
-- 第一个文件的头
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－  
#  
# An unexpected error has been detected by HotSpot Virtual Machine:  
#  
# EXCEPTION_ACCESS_VIOLATION (0xc0000005) at pc=0x0815e87e, pid=7268, tid=4360 
#  
# Java VM: Java HotSpot(TM) Server VM (1.4.2_13-b06 mixed mode)  
# Problematic frame:  
# V [jvm.dll+0x15e87e]  
#  
-- 其他文件的头
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 
# A fatal error has been detected by the Java Runtime Environment:
#
#  SIGILL (0x4) at pc=0x00007ff805499b9e, pid=19025, tid=259
#
# JRE version: OpenJDK Runtime Environment JBR-17.0.7+10-829.16-jcef (17.0.7+10) (build 17.0.7+10-b829.16)
# Java VM: OpenJDK 64-Bit Server VM JBR-17.0.7+10-829.16-jcef (17.0.7+10-b829.16, mixed mode, tiered, compressed oops, compressed class ptrs, g1 gc, bsd-amd64)
# Problematic frame:
# C  [libsystem_kernel.dylib+0x7b9e]  __kill+0xa
#
# No core dump will be written. Core dumps have been disabled. To enable core dumping, try "ulimit -c unlimited" before starting Java again
#
# If you would like to submit a bug report, please visit:
#   https://youtrack.jetbrains.com/issues/JBR
# The crash happened outside the Java Virtual Machine in native code.
# See problematic frame for where to report the bug.
#
```

* “EXCEPTION_ACCESS_VIOLATION ”意味着Java应用Crash的时候，正在运行JVM自己的代码，而不是外部的Java代码或其他类库代码
* “SIGSEGV(0xb)”，意味着JVM正在执行本地或JNI的代码;
* “EXCEPTION_STACK_OVERFLOW”意味着这是个栈溢出的错误

```
# Problematic frame:  
# V [jvm.dll+0x15e87e] 
```

* 说明Crash的时候，JVM正在从哪个库文件执行代码。除了“V”以外，还有可能是“C”、“j”、“v”、“J”。具体的表示意思如下：
  1. FrameType Description：  
  2. C: Native C frame     本地C帧
  3. j: Interpreted Java frame   解释的Java帧
  4. V: VMframe   虚拟机帧
  5. v: VMgenerated stub frame  虚拟机生成的存根栈帧
  6. J: Other frame types, including compiled Java frames   其他帧类型，包括编译后的Java帧

## 四、内存回收引起的Crash

```
# Problematic frame: # V [jvm.dll+....”的信息，意味着这是在JVM内部处理，而且多半是JVM的Bug
```

对于内存回收的错误，一般

1. generation collection for allocation  
2. full generation collection  
3. parallel gc failed allocation  
4. parallel gc failed permanent allocation  
5. parallel gc system gc  

## 五、栈溢出引起的Crash

Java代码引起的栈溢出，通常不会引起JVM的Crash，而是抛出一个Java异常：java.lang.StackOverflowError。但是在Java虚拟机中，Java的代码和本地C或C++代码公用相同的Stack。这样，在执行本地代码所造成的栈溢出，就有可能引起JVM的Crash了。栈溢出引起的Crash会在日志的文件头中看到“EXCEPTION_STACK_OVERFLOW”字样。另外，在当前线程的Stack信息中也能发现一些信息。例如下面的例子：
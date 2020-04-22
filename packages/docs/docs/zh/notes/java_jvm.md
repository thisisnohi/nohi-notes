## JVM



### 参数

> 参考：https://www.cnblogs.com/redcreen/archive/2011/05/04/2037057.html

| 参数名称          | 参数                         | 默认值               | 备注                                                         |
| :---------------- | ---------------------------- | -------------------- | ------------------------------------------------------------ |
| -Xms              | 初始堆大小                   | 物理内存的1/64(<1GB) | 默认(MinHeapFreeRatio参数可以调整)空余堆内存小于40%时，JVM就会增大堆直到-Xmx的最大限制. |
| -Xmx              | 最大堆大小                   | 物理内存的1/4(<1GB)  | 默认(MaxHeapFreeRatio参数可以调整)空余堆内存大于70%时，JVM会减少堆直到 -Xms的最小限制 |
| -Xmn              | 年轻代大小(1.4or lator)      |                      | **注意**：此处的大小是（eden+ 2 survivor space).与jmap -heap中显示的New gen是不同的。<br/>整个堆大小=年轻代大小 + 年老代大小 + 持久代大小.<br/>增大年轻代后,将会减小年老代大小.此值对系统性能影响较大,Sun官方推荐配置为整个堆的3/8 |
| -XX:NewSize       | 设置年轻代大小(for 1.3/1.4)  |                      |                                                              |
| -XX:MaxNewSize    | 年轻代最大值(for 1.3/1.4)    |                      |                                                              |
| -XX:PermSize      | 设置持久代(perm gen)初始值   | 物理内存的1/64       |                                                              |
| -XX:MaxPermSize   | 设置持久代最大值             | 物理内存的1/4        |                                                              |
| -Xss              | 每个线程的堆栈大小           |                      | JDK5.0以后每个线程堆栈大小为1M,以前每个线程堆栈大小为256K.更具应用的线程所需内存大小进行 调整.在相同物理内存下,减小这个值能生成更多的线程.但是操作系统对一个进程内的线程数还是有限制的,不能无限生成,经验值在3000~5000左右<br/>一般小的应用， 如果栈不是很深， 应该是128k够用的 大的应用建议使用256k。这个选项对性能影响比较大，需要严格的测试。（校长）<br/>和threadstacksize选项解释很类似,官方文档似乎没有解释,在论坛中有这样一句话:"”<br/>-Xss is translated in a VM flag named ThreadStackSize”<br/>一般设置这个值就可以了。 |
| -XX:SurvivorRatio | Eden区与Survivor区的大小比值 |                      | 设置为8,则两个Survivor区与一个Eden区的比值为2:8,一个Survivor区占整个年轻代的1/10 |
|                   |                              |                      |                                                              |

| -XX:+PrintGC                          |                                                          |      | 输出形式:[GC 118250K->113543K(130112K), 0.0094143 secs] [Full GC 121376K->10414K(130112K), 0.0650971 secs] |
| ------------------------------------- | -------------------------------------------------------- | ---- | ------------------------------------------------------------ |
| -XX:+PrintGCDetails                   |                                                          |      | 输出形式:[GC [DefNew: 8614K->781K(9088K), 0.0123035 secs] 118250K->113543K(130112K), 0.0124633 secs] [GC [DefNew: 8614K->8614K(9088K), 0.0000665 secs][Tenured: 112761K->10414K(121024K), 0.0433488 secs] 121376K->10414K(130112K), 0.0436268 secs] |
| -XX:+PrintGCTimeStamps                |                                                          |      |                                                              |
| -XX:+PrintGC:PrintGCTimeStamps        |                                                          |      | 可与-XX:+PrintGC -XX:+PrintGCDetails混合使用 输出形式:11.851: [GC 98328K->93620K(130112K), 0.0082960 secs] |
| -XX:+PrintGCApplicationStoppedTime    | 打印垃圾回收期间程序暂停的时间.可与上面混合使用          |      | 输出形式:Total time for which application threads were stopped: 0.0468229 seconds |
| -XX:+PrintGCApplicationConcurrentTime | 打印每次垃圾回收前,程序未中断的执行时间.可与上面混合使用 |      | 输出形式:Application time: 0.5291524 seconds                 |
| -XX:+PrintHeapAtGC                    | 打印GC前后的详细堆栈信息                                 |      |                                                              |
| -Xloggc:filename                      | 把相关日志信息记录到文件以便分析. 与上面几个配合使用     |      |                                                              |
| -XX:+PrintClassHistogram              | garbage collects before printing the histogram.          |      |                                                              |
| -XX:+PrintTLAB                        | 查看TLAB空间的使用情况                                   |      |                                                              |
| XX:+PrintTenuringDistribution         | 查看每次minor GC后新的存活周期的阈值                     |      | Desired survivor size 1048576 bytes, new threshold 7 (max 15) new threshold 7即标识新的存活周期的阈值为7。 |



* -XX:+PrintGCDetails
*  初始堆
* -Xmx 最大堆
* -XX:PermSize 设置持久代(perm gen)初始值 默认
* -Xmn 新生代
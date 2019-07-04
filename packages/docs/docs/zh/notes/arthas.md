# arthas
* 常用命令
	* dashboard　实时数据面板
	* thread　 	JVM 的线程堆栈信息
	* jvm		JVM 的信息
	* sc 		JVM已加载的类信息
	* sm		已加载类的方法信息
	* jad		反编译指定已加载类的源码
	* classloader	查看classloader的继承树，urls，类加载信息，使用classloader去getResource
	* monitor	方法执行监控
	* watch		方法执行数据观测
	* trace		方法内部调用路径，并输出方法路径上的每个节点上耗时
	* stack		输出当前方法被调用的调用路径
	* tt 		方法执行数据的时空隧道，记录下指定方法每次调用的入参和返回信息，并能对这些不同的时间下调用进行观测
	* reset		重置增强类，将被 Arthas 增强过的类全部还原，Arthas 服务端关闭时会重置所有增强过的类
	* quit		退出
	* shutdown	关闭 Arthas 服务端，所有 Arthas 客户端全部退出

## 安装
> 参见: https://alibaba.github.io/arthas/install-detail.html#
* 全量: https://repository.sonatype.org/service/local/repositories/central-proxy/content/com/taobao/arthas/arthas-packaging/3.0.5/arthas-packaging-3.0.5-bin.zip
* 快速: https://alibaba.github.io/arthas/arthas-boot.jar

```
安装: 执行 ./install.sh
启动: 执行 ./as.sh pid
``` 

## dashboard



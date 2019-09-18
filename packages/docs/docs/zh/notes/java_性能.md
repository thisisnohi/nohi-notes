# 性能
> 20190130 https://www.ibm.com/developerworks/cn/java/j-lo-performance-tuning-practice/index.html

## 常规
* JVM
	* -Xmx，默认1/4物理内存大小
	* 

## Java 应用诊断工具

### jstack
* top -H -p pid 定位 Java 进程和线程
* jstack -l pid 导出线程栈

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
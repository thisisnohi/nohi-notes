
# 服务器

## Linux

### 常用命令
* 查看端口占用 netstate -an | grep 9000
* 查看端口进程: lsof -i:port
* 定位 Java 进程和线程  top -H -p pid 
* 再利用 jstack -l pid 导出线程栈

* Linux下查看CPU使用率的命令
		* vmstat 1 5
		* sar -u 1 5
		* mpstat 1 5 每1秒收集一次，共5次。
		* iostat -c 1 2
		* dstat -c 每秒cpu使用率情况获取
		* dstat --top-cpu 最占cpu的进程获取

* mpstat 
	* mpstat  -P ALL 2 #看每个cpu核心的详细
			%user      在internal时间段里，用户态的CPU时间(%)，不包含nice值为负进程  (usr/total)*100
			%nice      在internal时间段里，nice值为负进程的CPU时间(%)   (nice/total)*100
			%sys       在internal时间段里，内核时间(%)       (system/total)*100
			%iowait    在internal时间段里，硬盘IO等待时间(%) (iowait/total)*100
			%irq       在internal时间段里，硬中断时间(%)     (irq/total)*100
			%soft      在internal时间段里，软中断时间(%)     (softirq/total)*100
			%idle      在internal时间段里，CPU除去等待磁盘IO操作外的因为任何原因而空闲的时间闲置时间(%) (idle/total)*100
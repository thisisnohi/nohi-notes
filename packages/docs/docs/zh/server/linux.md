
# 服务器

## Linux

### 常用命令
* 查看端口占用 netstate -an | grep 9000
* 查看端口进程: lsof -i:port
* 定位 Java 进程和线程  top -H -p pid 
* 再利用 jstack -l pid 导出线程栈
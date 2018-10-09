---
sidebar: auto
---

# nginx 安装windows服务
　以windows服务方式启动nginx
::: danger 坑
以服务方式启动，不支持restart，重启服务会生成两条exe在进程列表中
:::

## 步骤

* 下载winsw
::: danger 坑
此处有个坑.之前下载个版本不成功，1.9版本，重新安装，启动OK。参见： https://www.cnblogs.com/liqiao/p/4627528.html
:::

* winsw-1.9-bin.exe 放到nginx解压目录，修改名称为 nginx-service.exe

* 新建nginx-service.xml，内容如下
```
<?xml version="1.0" encoding="UTF-8" ?>
<service>
	<id>nginx</id>
	<name>nginx</name>
	<description>nginx server</description>	
	<logpath>D:/A_ENV/nginx-1.14.0/server-logs/</logpath>
	<logmode>roll</logmode>
	<depend></depend>
	<executable>D:/A_ENV/nginx-1.14.0/nginx.exe</executable>
	<startargument>-p D:/A_ENV/nginx-1.14.0</startargument>
	<stopexecutable>E:/server/nginx/nginx.exe</stopexecutable>
	<stopargument>-p D:/A_ENV/nginx-1.14.0 -s stop</stopargument>
</service>
```

* 管理员cmd运行
	* 安装:nginx-service.exe install
	* 卸载:nginx-service.exe uninstall
	* 查看进程：tasklist /fi "imagename eq nginx.exe"
	* 查看端口: netstat -aon | findstr :80


* nginx命令
	* nginx -h  查看help
	* nginx -v  查看版本
	* nginx -V  查看Nginx的版本和安装时config的参数。
	* nginx -t  测试Nginx的配置
	* nginx -T  测试Nginx的配置，并打印配置
	* start nginx
	* nginx -s  给Nginx发送指令
		* nginx -s reload    在不重新启动nginx的情况下重新加载配置文件
		* nginx -s reopen    重启nginx
		* nginx -s stop      停止nginx
		* nginx -s quit      停止nginx 

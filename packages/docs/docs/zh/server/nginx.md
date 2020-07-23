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

## 配置

> 参考：https://www.cnblogs.com/xiaoliangup/p/9175932.html



**location区段**

通过指定模式来与客户端请求的URI相匹配，基本语法如下：**location [=|~|~\*|^~|@] pattern{……}**

1、没有修饰符 表示：必须以指定模式开始，如：

```
server {
　　server_name baidu.com;
　　location /abc {
　　　　……
　　}
}
那么，如下是对的：http://baidu.com/abchttp://baidu.com/abc?p1http://baidu.com/abc/http://baidu.com/abcde
```

2、=表示：必须与指定的模式精确匹配

```
server {
server_name sish
　　location = /abc {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu.com/abc?p1
如下是错的：
http://baidu.com/abc/
http://baidu.com/abcde
```

3、~ 表示：指定的正则表达式要区分大小写

```
server {
server_name baidu.com;
　　location ~ ^/abc$ {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu.com/abc?p1=11&p2=22
如下是错的：
http://baidu.com/ABC
http://baidu.com/abc/
http://baidu.com/abcde
```

4、~* 表示：指定的正则表达式不区分大小写

```
server {
server_name baidu.com;
location ~* ^/abc$ {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu..com/ABC
http://baidu..com/abc?p1=11&p2=22
如下是错的：
http://baidu..com/abc/
http://baidu..com/abcde
```

5、^~ 类似于无修饰符的行为，也是以指定模式开始，不同的是，如果模式匹配，
那么就停止搜索其他模式了。
6、@ ：定义命名location区段，这些区段客户段不能访问，只可以由内部产生的请
求来访问，如try_files或error_page等

**查找顺序和优先级
1：带有“=“的精确匹配优先
2：没有修饰符的精确匹配
3：正则表达式按照他们在配置文件中定义的顺序
4：带有“^~”修饰符的，开头匹配
5：带有“~” 或“~\*” 修饰符的，如果正则表达式与URI匹配
6：没有修饰符的，如果指定字符串与URI开头匹配**

```
Location区段匹配示例location = / {
　　# 只匹配 / 的查询.
　　[ configuration A ]
}
location / {
　　# 匹配任何以 / 开始的查询，但是正则表达式与一些较长的字符串将被首先匹配。
　　[ configuration B ]
}
location ^~ /images/ {
　　# 匹配任何以 /images/ 开始的查询并且停止搜索，不检查正则表达式。
　　[ configuration C ]
}
location ~* \.(gif|jpg|jpeg)$ {
　　# 匹配任何以gif, jpg, or jpeg结尾的文件，但是所有 /images/ 目录的请求将在Configuration C中处
　　理。
　　[ configuration D ]
} 各
请求的处理如下例：
■/ → configuration A
■/documents/document.html → configuration B
■/images/1.gif → configuration C
■/documents/1.jpg → configuration D
```

**root 、alias指令区别**

```
location /img/ {
    alias /var/www/image/;
}
#若按照上述配置的话，则访问/img/目录里面的文件时，ningx会自动去/var/www/image/目录找文件
location /img/ {
    root /var/www/image;
}
#若按照这种配置的话，则访问/img/目录下的文件时，nginx会去/var/www/image/img/目录下找文件。] 
```

alias是一个目录别名的定义，root则是最上层目录的定义。

还有一个重要的区别是alias后面必须要用“/”结束，否则会找不到文件的。。。而root则可有可无~~


---
sidebar: auto

---

# Nginx-NOTE

> 参考：https://www.bilibili.com/video/BV1yS4y1N76R?p=7&vd_source=9004ce053a52d5930f71e230579961e7
>
> Nginx中文文档: https://blog.redis.com.cn/doc/

## 1 版本

* Nginx
* Nginx plus 商用收费 https://www.nginx-cn.net/products/nginx/
* openresty:https://openresty.org/cn/
* Tengin:http://tengine.taobao.org/documentation_cn.html

## 2 Nginx 编译及使用

* 下载：https://nginx.org/en/download.html
* 参考：[视频教程](https://www.bilibili.com/video/BV1yS4y1N76R/?p=7&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=9004ce053a52d5930f71e230579961e7)

### 安装

* ` ./configure --prefix=/usr/local/nginx`

  ```shell
  ./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-stream=dynamic --add-module=./nginx-rtmp-module
  
  -- rtmp模块
  1. git clone https://github.com/arut/nginx-rtmp-module.git
  2. ./configure命令添加 --add-module=./nginx-rtmp-module
  ```

* `make `

* `make install`

### 启停Nginx

```
cd /usr/local/nginx/sbin
启动: ./nginx
快速停止: ./nginx -s stop
优雅关闭: ./nginx -s quit
验证配置文件: ./nginx -t
重新加载配置: ./nginx -s reload
```

* 可以配置成系统服务（略）

### 常见错误：

* 缺少c ： ./configure: error: C compiler cc is not found

  ```shell
  yum -y install gcc
  ```

* ./configure: error: the HTTP rewrite module requires the PCRE library.

  ```shell
  yum -y install pcre pcre-devel	
  ```

* ./configure: error: the HTTP gzip module requires the zlib library

  ```
  yum -y install zlib zlib-devel
  ```

* nginx 进程启动完成，端口也通，其他机器访问不了

  关闭防火墙：`systemctl stop firewalld.service`

## 3 基础配置

### servername

* nginx server端口+ servername为唯一

* servername可以模糊匹配

* 完整匹配、通配符匹配、通符结束匹配、正则匹配

* 多servername配置

  * nginx配置

    ```nginx 
    server {
      listen       80;
      server_name  www.nohi1.com;
      location / {
        root   html/www;
        index  index.html index.htm;
      }
      error_page   404 500 502 503 504  /50x.html;
      location = /50x.html {
        root   html;
      }
    }
    server {
      listen       80;
      server_name  *.nohi1.com;
      location / {
        root   html/video;
        index  index.html index.htm;
      }
      error_page   404 500 502 503 504  /50x.html;
      location = /50x.html {
        root   html;
      }
    }
    ```

   * hosts配置

     ```
     192.168.56.101 www.nohi1.com
     192.168.56.101 video.nohi1.com
     192.168.56.101 1.nohi1.com
     192.168.56.101 2.nohi1.com
     ```

     `www.nohi1.com` 跳转至`html/www/index.html`

​			  `1.nohi1.com  2.nohi.com`跳转至`html/video/index.html`

### 反向代理、正向代理、负载均衡

* proxy_pass

#### 负载策略

* weight 权重

  weight与访问比率成正比，用于后端服务器性能不均情况

  ```nginx
  upstream lb_local {
    server 127.0.0.1:8081 weight=1 down;
    server 127.0.0.1:8082 weight=2;
    server 127.0.0.1:8083 weight=3 backup;
  }
  ```

  * down 表示当前sever暂不参与负载
  * weight 默认为1  weight越大负载权重就越大
  * backup 其它所有非backup、down或者忙的修改，请求backup机器

* ip_hash

  来源相同的ip指向相同地址，会话保持

* least_conn

  最少连接访问

* url_hash

  根据用户访问url定向转发请求

* fair

  根据后端服务响应时间转发



### 动静分离

* 使用动静分享的场景
* 动静分离原理
* Nginx动静分离配置

​	

* 正则匹配

  ```
  location ~*/(img/css/js) {
     root html;
  }
  ```



### URLRewrite

* 使用场景

  隐藏真实url

* 命令：`rewrite <regex> <replacement> <flag>`
  * flag
    * last 本条规则匹配完成后，继续向下匹配新的locaition URL规则
    * break 本条规则匹配完成后，不再匹配后面的任何规则
    * redirect 返回302临时重定向，浏览顺地址会显示跳转后的URL地址
    * permanent 返回301永久重定向，浏览器地址会显示跳转后的URL地址

```
location / {
   # ^/([1-9]+).html$  /index.jsp?pageNum=$1 break;
   rewrite ^/2.html$  /index.jsp?pageNum=? break;
   proxy_http http://127.0.0.1:8080;
}
```



### 防盗链

* refere
  * 访问页面后，页面引用css、js、image
  * 这些css、js、image属于第二次引用，由浏览器在请求头中增加refere标识哪个页面做的第二次访问

#### 配置

```
valid_referers none | blocked | server_names | strings ...;
```

* none 检测referer头域不存在情况
* blocked 检测referer头域的值被防火墙或者代理服务器删除或伪装的情况。这种情况该头域的值 以“http://”或“https://”开头
* server_names 设置一个或多个url,检测referer头域的值 是否是这些url中的某一个

```nginx
location ~*/(assets) {
  valid_referers 127.0.0.1;
  if ($invalid_referer) {
    return 403;
  }
  root /Users/nohi/work/workspaces-nohi/nohi-notes/docs/.vuepress/dist/;
  index  index.html index.htm;
}
```

#### curl测试

* 显示头信息 `curl -I http://10.0.0.8/assets/style-6fb018bf.css`

  ```
  ╰─➤  curl -I http://10.0.0.8/assets/style-6fb018bf.css
  HTTP/1.1 200 OK
  Server: nginx/1.23.1
  Date: Sat, 17 Dec 2022 08:23:14 GMT
  Content-Type: text/css
  Content-Length: 36154
  Last-Modified: Thu, 15 Dec 2022 13:07:54 GMT
  Connection: keep-alive
  ETag: "639b1c2a-8d3a"
  Accept-Ranges: bytes
  ```

* 设置referer访问`curl -e "http://baidu.com" http://10.0.0.8/assets/style-6fb018bf.css`

  ```
  ╰─➤  curl -e "http://baidu.com" http://10.0.0.8/assets/style-6fb018bf.css
  <html>
  <head><title>403 Forbidden</title></head>
  <body>
  <center><h1>403 Forbidden</h1></center>
  <hr><center>nginx/1.23.1</center>
  </body>
  </html>
  ```



## 4 高可用

keepalived

### 安装keepalived

`yum install keepalived`

### 配置

`vi /etc/keepalived/keepalived.conf`



## 5 HTTPS证书配置

```nginx
server{
  # 比起默认的80 使用了443 默认 是ssl方式  多出default之后的ssl
  listen 443 default ssl;
  # default 可省略
  # 开启  如果把ssl on；这行去掉，ssl写在443端口后面。这样http和https的链接都可以用
  # ssl on;
  # 证书(公钥.发送到客户端的)
  ssl_certificate ssl/9023128_home.nohi.online.pem;
  # 私钥,
  ssl_certificate_key ssl/9023128_home.nohi.online.key;
  ...
}
```



## 6 扩容

* 单机垂直扩容：硬件资源增加
* 水平扩展：集群化
* 细粒度拆分：分布式
  * 数据分区
  * 上游服务SOA化（原生支持水平、垂直扩容）
  * 入口细分
    * 浏览器
    * 移动端原生app（物联网）
    * H5内嵌式应用
* 数据异构化
  * 多级缓存：客户端缓存、CDN缓存、异地多活、Nginx缓存
* 服务异构化
  * 拆分请求、消息中间件



扩容原则

* 无状态原则
* 弹性原则



### 水平扩展：集群化

#### nginx高级负责均衡

* ip_hash
* 其他hash
  * hash $cookie_jsessionid
  * hash $request_uri
    * 不支持cookie
    * 资源不平均分配
* 使用lua逻辑的定向分发

#### Redis + SpringSeesion

#### 第三方模块

* stick

  ```
  upstream abc{
    sticky name=route expires=6h;
    server 10.0.0.210:8080;
    server 10.0.0.211:8080;
  }
  ```

#### keepalive

* keepalive_time限制keepalive保持连接的最大时间 1.9.10新功能
* keepalive_timeout 连接超时时间
  * keepalive_timeout = 0 即关闭
  * keepalive_timeout 10 ;  10s
  * send_timeout 两次向客户端写操作之间的间隔，如果大于些时间则关闭连接，默认60s
* keepalive_request 默认1000 单个连接可以处理的请求数

#### 对上游服务使用keepalive

* upstream 配置

  ```
  keepalive 100 保留连接数
  keepalive_timeout 保留时间
  keepalive_requests 一个tcp利用中，可以并发接收的请求数
  ```

* server中配置

  ```
  proxy_http_version 1.1; 配置http版本号，默认使用1.0协议，需在request增加“connection：keep-alive” header才能够生产。而http1.1默认支持
  proxy_set_header Connection ""; 清除close;
  ```

  

#### 压测

* Apache-benchmark:  https-tools

  * 安装： `yum install https-tools`

  * 使用：`ab -n 10000 -c 10 http://10.0.0.210/`

  * 部分客户端不支持keepalive连接

    ```shell
    [root@nohicent210 ~]# ab -n 100000 -c 10 http://10.0.0.210/
    This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
    Licensed to The Apache Software Foundation, http://www.apache.org/
    
    Benchmarking 10.0.0.210 (be patient)
    Completed 10000 requests
    Completed 20000 requests
    Completed 30000 requests
    Completed 40000 requests
    Completed 50000 requests
    Completed 60000 requests
    Completed 70000 requests
    Completed 80000 requests
    Completed 90000 requests
    Completed 100000 requests
    Finished 100000 requests
    
    
    Server Software:        nginx/1.21.4
    Server Hostname:        10.0.0.210
    Server Port:            80
    
    Document Path:          /
    Document Length:        59077 bytes
    
    Concurrency Level:      10
    Time taken for tests:   5.635 seconds
    Complete requests:      100000
    Failed requests:        0
    Total transferred:      5931300000 bytes
    HTML transferred:       5907700000 bytes
    Requests per second:    17745.28 [#/sec] (mean)
    Time per request:       0.564 [ms] (mean)
    Time per request:       0.056 [ms] (mean, across all concurrent requests)
    Transfer rate:          1027857.10 [Kbytes/sec] received
    
    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:        0    0   0.1      0       1
    Processing:     0    0   0.1      0       1
    Waiting:        0    0   0.0      0       1
    Total:          0    1   0.1      1       1
    
    Percentage of the requests served within a certain time (ms)
      50%      1
      66%      1
      75%      1
      80%      1
      90%      1
      95%      1
      98%      1
      99%      1
     100%      1 (longest request)
    ```

  

  

## 7 基本配置

* 获取真实IP

  `proxy_set_header X-Forwarded-For $remote_addr `



## 8 Gzip压缩



## 9 详细配置












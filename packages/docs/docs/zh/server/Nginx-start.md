# Nginx

> 参考：https://www.bilibili.com/video/BV1yS4y1N76R?p=7&vd_source=9004ce053a52d5930f71e230579961e7



## 1 版本

* Nginx
* Nginx plus 商用收费 https://www.nginx-cn.net/products/nginx/
* openrstry:https://openresty.org/cn/
* Tengin:http://tengine.taobao.org/documentation_cn.html

## 2 Nginx 编译及使用

* 下载：https://nginx.org/en/download.html
* 参考：[视频教程](https://www.bilibili.com/video/BV1yS4y1N76R/?p=7&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=9004ce053a52d5930f71e230579961e7)

### 安装

* ` ./configure --prefix=/usr/local/nginx`
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

## 3 配置

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

## 4 反向代理、正向代理、负载均衡

* proxy_pass

### 负载策略

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



27： https://www.bilibili.com/video/BV1yS4y1N76R?p=26&spm_id_from=pageDriver&vd_source=9004ce053a52d5930f71e230579961e7

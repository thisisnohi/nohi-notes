import{_ as i,p as n,q as e,a1 as s}from"./framework-449724a9.js";const l={},a=s(`<h1 id="nginx-conf" tabindex="-1"><a class="header-anchor" href="#nginx-conf" aria-hidden="true">#</a> Nginx-conf</h1><h2 id="nginx-安装windows服务" tabindex="-1"><a class="header-anchor" href="#nginx-安装windows服务" aria-hidden="true">#</a> nginx 安装windows服务</h2><p>以windows服务方式启动nginx</p><div class="custom-container danger"><p class="custom-container-title">坑</p><p>以服务方式启动，不支持restart，重启服务会生成两条exe在进程列表中</p></div><h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h2><ul><li>下载winsw</li></ul><div class="custom-container danger"><p class="custom-container-title">坑</p><p>此处有个坑.之前下载个版本不成功，1.9版本，重新安装，启动OK。参见： https://www.cnblogs.com/liqiao/p/4627528.html</p></div><ul><li><p>winsw-1.9-bin.exe 放到nginx解压目录，修改名称为 nginx-service.exe</p></li><li><p>新建nginx-service.xml，内容如下</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;
&lt;service&gt;
	&lt;id&gt;nginx&lt;/id&gt;
	&lt;name&gt;nginx&lt;/name&gt;
	&lt;description&gt;nginx server&lt;/description&gt;	
	&lt;logpath&gt;D:/A_ENV/nginx-1.14.0/server-logs/&lt;/logpath&gt;
	&lt;logmode&gt;roll&lt;/logmode&gt;
	&lt;depend&gt;&lt;/depend&gt;
	&lt;executable&gt;D:/A_ENV/nginx-1.14.0/nginx.exe&lt;/executable&gt;
	&lt;startargument&gt;-p D:/A_ENV/nginx-1.14.0&lt;/startargument&gt;
	&lt;stopexecutable&gt;E:/server/nginx/nginx.exe&lt;/stopexecutable&gt;
	&lt;stopargument&gt;-p D:/A_ENV/nginx-1.14.0 -s stop&lt;/stopargument&gt;
&lt;/service&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>管理员cmd运行</p><ul><li>安装:nginx-service.exe install</li><li>卸载:nginx-service.exe uninstall</li><li>查看进程：tasklist /fi &quot;imagename eq nginx.exe&quot;</li><li>查看端口: netstat -aon | findstr :80</li></ul></li><li><p>nginx命令</p><ul><li>nginx -h 查看help</li><li>nginx -v 查看版本</li><li>nginx -V 查看Nginx的版本和安装时config的参数。</li><li>nginx -t 测试Nginx的配置</li><li>nginx -T 测试Nginx的配置，并打印配置</li><li>start nginx</li><li>nginx -s 给Nginx发送指令 <ul><li>nginx -s reload 在不重新启动nginx的情况下重新加载配置文件</li><li>nginx -s reopen 重启nginx</li><li>nginx -s stop 停止nginx</li><li>nginx -s quit 停止nginx</li></ul></li></ul></li></ul><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><blockquote><p>参考：https://www.cnblogs.com/xiaoliangup/p/9175932.html</p></blockquote><p><strong>location区段</strong></p><p>通过指定模式来与客户端请求的URI相匹配，基本语法如下：<strong>location [=|~|~*|^~|@] pattern{……}</strong></p><p>1、没有修饰符 表示：必须以指定模式开始，如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
　　server_name baidu.com;
　　location /abc {
　　　　……
　　}
}
那么，如下是对的：http://baidu.com/abchttp://baidu.com/abc?p1http://baidu.com/abc/http://baidu.com/abcde
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、=表示：必须与指定的模式精确匹配</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、~ 表示：指定的正则表达式要区分大小写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
server_name baidu.com;
　　location ~ ^/abc$ {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu.com/abc?p1=11&amp;p2=22
如下是错的：
http://baidu.com/ABC
http://baidu.com/abc/
http://baidu.com/abcde
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、~* 表示：指定的正则表达式不区分大小写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server {
server_name baidu.com;
location ~* ^/abc$ {
　　　　……
　　}
}
那么，如下是对的：
http://baidu.com/abc
http://baidu..com/ABC
http://baidu..com/abc?p1=11&amp;p2=22
如下是错的：
http://baidu..com/abc/
http://baidu..com/abcde
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、^~ 类似于无修饰符的行为，也是以指定模式开始，不同的是，如果模式匹配， 那么就停止搜索其他模式了。 6、@ ：定义命名location区段，这些区段客户段不能访问，只可以由内部产生的请 求来访问，如try_files或error_page等</p><p><strong>查找顺序和优先级 1：带有“=“的精确匹配优先 2：没有修饰符的精确匹配 3：正则表达式按照他们在配置文件中定义的顺序 4：带有“^~”修饰符的，开头匹配 5：带有“~” 或“~*” 修饰符的，如果正则表达式与URI匹配 6：没有修饰符的，如果指定字符串与URI开头匹配</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Location区段匹配示例location = / {
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
location ~* \\.(gif|jpg|jpeg)$ {
　　# 匹配任何以gif, jpg, or jpeg结尾的文件，但是所有 /images/ 目录的请求将在Configuration C中处
　　理。
　　[ configuration D ]
} 各
请求的处理如下例：
■/ → configuration A
■/documents/document.html → configuration B
■/images/1.gif → configuration C
■/documents/1.jpg → configuration D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>root 、alias指令区别</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location /img/ {
    alias /var/www/image/;
}
#若按照上述配置的话，则访问/img/目录里面的文件时，ningx会自动去/var/www/image/目录找文件
location /img/ {
    root /var/www/image;
}
#若按照这种配置的话，则访问/img/目录下的文件时，nginx会去/var/www/image/img/目录下找文件。] 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>alias是一个目录别名的定义，root则是最上层目录的定义。</p><p>还有一个重要的区别是alias后面必须要用“/”结束，否则会找不到文件的。。。而root则可有可无~~</p><h2 id="配置https" tabindex="-1"><a class="header-anchor" href="#配置https" aria-hidden="true">#</a> 配置HTTPS</h2><blockquote><p>参考：https://blog.csdn.net/weixin_34101229/article/details/93554567</p><p>https的crt和key证书</p><p>x509证书一般会用到三类文，key，csr，crt。</p><p>Key 是私用密钥openssl格，通常是rsa算法。</p><p>Csr 是证书请求文件，用于申请证书。在制作csr文件的时，必须使用自己的私钥来签署申，还可以设定一个密钥。</p><p>crt是CA认证后的证书文，（windows下面的，其实是crt），签署人用自己的key给你签署的凭证。</p></blockquote><ul><li><p><strong>证书和私钥的生成</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>注意：一般生成的目录,应该放在nginx/conf/ssl目录
1.创建服务器证书密钥文件 server.key：
  openssl genrsa -des3 -out server.key 1024  （centos 必须大于1024. 2048即可）
  输入密码，确认密码，自己随便定义，但是要记住，后面会用到。
2.创建服务器证书的申请文件 server.csr
	openssl req -new -key server.key -out server.csr
  输出内容为：
    Enter pass phrase for root.key: ← 输入前面创建的密码 
    Country Name (2 letter code) [AU]:CN ← 国家代号，中国输入CN 
    State or Province Name (full name) [Some-State]:BeiJing ← 省的全名，拼音 
    Locality Name (eg, city) []:BeiJing ← 市的全名，拼音 
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:MyCompany Corp. ← 公司英文名 
    Organizational Unit Name (eg, section) []: ← 可以不输入 
    Common Name (eg, YOUR name) []: ← 此时不输入 
    Email Address []:admin@mycompany.com ← 电子邮箱，可随意填
    Please enter the following ‘extra’ attributes 
    to be sent with your certificate request 
    A challenge password []: ← 可以不输入 
    An optional company name []: ← 可以不输入
4.备份一份服务器密钥文件
	cp server.key server.key.org
5.去除文件口令
	openssl rsa -in server.key.org -out server.key
6.生成证书文件server.crt
	openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Nginx.conf配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server{
	#比起默认的80 使用了443 默认 是ssl方式  多出default之后的ssl
  listen 443 default ssl;
  #default 可省略
	#开启  如果把ssl on；这行去掉，ssl写在443端口后面。这样http和https的链接都可以用
  ssl on; # nginx 1.20需要注释调止处
  #证书(公钥.发送到客户端的)
  ssl_certificate ssl/server.crt;
  #私钥,
  ssl_certificate_key ssl/server.key;
  #下面是绑定域名
  server_name www.daj.com;
  location / {
  	#禁止跳转
  	proxy_redirect off;
		#代理淘宝
		proxy_pass https://www.tao.com/;  
  }        
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,32),d=[a];function t(r,v){return n(),e("div",null,d)}const u=i(l,[["render",t],["__file","nginx.html.vue"]]);export{u as default};

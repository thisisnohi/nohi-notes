import{_ as i,M as l,p as t,q as r,R as n,t as e,N as d,a1 as s}from"./framework-449724a9.js";const c={},p=s('<h1 id="nginx-note" tabindex="-1"><a class="header-anchor" href="#nginx-note" aria-hidden="true">#</a> Nginx-NOTE</h1><blockquote><p>参考：https://www.bilibili.com/video/BV1yS4y1N76R?p=7&amp;vd_source=9004ce053a52d5930f71e230579961e7</p><p>Nginx中文文档: https://blog.redis.com.cn/doc/</p></blockquote><h2 id="_1-版本" tabindex="-1"><a class="header-anchor" href="#_1-版本" aria-hidden="true">#</a> 1 版本</h2><ul><li>Nginx</li><li>Nginx plus 商用收费 https://www.nginx-cn.net/products/nginx/</li><li>openresty:https://openresty.org/cn/</li><li>Tengin:http://tengine.taobao.org/documentation_cn.html</li></ul><h2 id="_2-nginx-编译及使用" tabindex="-1"><a class="header-anchor" href="#_2-nginx-编译及使用" aria-hidden="true">#</a> 2 Nginx 编译及使用</h2>',5),o=n("li",null,"下载：https://nginx.org/en/download.html",-1),u={href:"https://www.bilibili.com/video/BV1yS4y1N76R/?p=7&spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=9004ce053a52d5930f71e230579961e7",target:"_blank",rel:"noopener noreferrer"},v=s(`<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><ul><li><code> ./configure --prefix=/usr/local/nginx</code></li><li><code>make </code></li><li><code>make install</code></li></ul><h3 id="启停nginx" tabindex="-1"><a class="header-anchor" href="#启停nginx" aria-hidden="true">#</a> 启停Nginx</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /usr/local/nginx/sbin
启动: ./nginx
快速停止: ./nginx -s stop
优雅关闭: ./nginx -s quit
验证配置文件: ./nginx -t
重新加载配置: ./nginx -s reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>可以配置成系统服务（略）</li></ul><h3 id="常见错误" tabindex="-1"><a class="header-anchor" href="#常见错误" aria-hidden="true">#</a> 常见错误：</h3><ul><li><p>缺少c ： ./configure: error: C compiler cc is not found</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> gcc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>./configure: error: the HTTP rewrite module requires the PCRE library.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> pcre pcre-devel	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>./configure: error: the HTTP gzip module requires the zlib library</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum -y install zlib zlib-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>nginx 进程启动完成，端口也通，其他机器访问不了</p><p>关闭防火墙：<code>systemctl stop firewalld.service</code></p></li></ul><h2 id="_3-基础配置" tabindex="-1"><a class="header-anchor" href="#_3-基础配置" aria-hidden="true">#</a> 3 基础配置</h2><h3 id="servername" tabindex="-1"><a class="header-anchor" href="#servername" aria-hidden="true">#</a> servername</h3><ul><li><p>nginx server端口+ servername为唯一</p></li><li><p>servername可以模糊匹配</p></li><li><p>完整匹配、通配符匹配、通符结束匹配、正则匹配</p></li><li><p>多servername配置</p><ul><li><p>nginx配置</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span>  www.nohi1.com</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span>   html/www</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">404</span> <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server_name</span>  *.nohi1.com</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span>   html/video</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token directive"><span class="token keyword">error_page</span>   <span class="token number">404</span> <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">location</span> = /50x.html</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>hosts配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>192.168.56.101 www.nohi1.com
192.168.56.101 video.nohi1.com
192.168.56.101 1.nohi1.com
192.168.56.101 2.nohi1.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>www.nohi1.com</code> 跳转至<code>html/www/index.html</code></p></li></ul></li></ul><p>​ <code>1.nohi1.com 2.nohi.com</code>跳转至<code>html/video/index.html</code></p><h3 id="反向代理、正向代理、负载均衡" tabindex="-1"><a class="header-anchor" href="#反向代理、正向代理、负载均衡" aria-hidden="true">#</a> 反向代理、正向代理、负载均衡</h3><ul><li>proxy_pass</li></ul><h4 id="负载策略" tabindex="-1"><a class="header-anchor" href="#负载策略" aria-hidden="true">#</a> 负载策略</h4><ul><li><p>weight 权重</p><p>weight与访问比率成正比，用于后端服务器性能不均情况</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">upstream</span> lb_local</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8081 weight=1 down</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8082 weight=2</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">server</span> 127.0.0.1:8083 weight=3 backup</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>down 表示当前sever暂不参与负载</li><li>weight 默认为1 weight越大负载权重就越大</li><li>backup 其它所有非backup、down或者忙的修改，请求backup机器</li></ul></li><li><p>ip_hash</p><p>来源相同的ip指向相同地址，会话保持</p></li><li><p>least_conn</p><p>最少连接访问</p></li><li><p>url_hash</p><p>根据用户访问url定向转发请求</p></li><li><p>fair</p><p>根据后端服务响应时间转发</p></li></ul><h3 id="动静分离" tabindex="-1"><a class="header-anchor" href="#动静分离" aria-hidden="true">#</a> 动静分离</h3><ul><li>使用动静分享的场景</li><li>动静分离原理</li><li>Nginx动静分离配置</li></ul><p>​</p><ul><li><p>正则匹配</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location ~*/(img/css/js) {
   root html;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="urlrewrite" tabindex="-1"><a class="header-anchor" href="#urlrewrite" aria-hidden="true">#</a> URLRewrite</h3><ul><li><p>使用场景</p><p>隐藏真实url</p></li><li><p>命令：<code>rewrite &lt;regex&gt; &lt;replacement&gt; &lt;flag&gt;</code></p><ul><li>flag <ul><li>last 本条规则匹配完成后，继续向下匹配新的locaition URL规则</li><li>break 本条规则匹配完成后，不再匹配后面的任何规则</li><li>redirect 返回302临时重定向，浏览顺地址会显示跳转后的URL地址</li><li>permanent 返回301永久重定向，浏览器地址会显示跳转后的URL地址</li></ul></li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>location / {
   # ^/([1-9]+).html$  /index.jsp?pageNum=$1 break;
   rewrite ^/2.html$  /index.jsp?pageNum=? break;
   proxy_http http://127.0.0.1:8080;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="防盗链" tabindex="-1"><a class="header-anchor" href="#防盗链" aria-hidden="true">#</a> 防盗链</h3><ul><li>refere <ul><li>访问页面后，页面引用css、js、image</li><li>这些css、js、image属于第二次引用，由浏览器在请求头中增加refere标识哪个页面做的第二次访问</li></ul></li></ul><h4 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>valid_referers none | blocked | server_names | strings ...;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>none 检测referer头域不存在情况</li><li>blocked 检测referer头域的值被防火墙或者代理服务器删除或伪装的情况。这种情况该头域的值 以“http://”或“https://”开头</li><li>server_names 设置一个或多个url,检测referer头域的值 是否是这些url中的某一个</li></ul><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">location</span> ~*/(assets)</span> <span class="token punctuation">{</span>
  <span class="token directive"><span class="token keyword">valid_referers</span> 127.0.0.1</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">if</span> (<span class="token variable">$invalid_referer</span>)</span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">return</span> <span class="token number">403</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token directive"><span class="token keyword">root</span> /Users/nohi/work/workspaces-nohi/nohi-notes/docs/.vuepress/dist/</span><span class="token punctuation">;</span>
  <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="curl测试" tabindex="-1"><a class="header-anchor" href="#curl测试" aria-hidden="true">#</a> curl测试</h4><ul><li><p>显示头信息 <code>curl -I http://10.0.0.8/assets/style-6fb018bf.css</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>╰─➤  curl -I http://10.0.0.8/assets/style-6fb018bf.css
HTTP/1.1 200 OK
Server: nginx/1.23.1
Date: Sat, 17 Dec 2022 08:23:14 GMT
Content-Type: text/css
Content-Length: 36154
Last-Modified: Thu, 15 Dec 2022 13:07:54 GMT
Connection: keep-alive
ETag: &quot;639b1c2a-8d3a&quot;
Accept-Ranges: bytes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>设置referer访问<code>curl -e &quot;http://baidu.com&quot; http://10.0.0.8/assets/style-6fb018bf.css</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>╰─➤  curl -e &quot;http://baidu.com&quot; http://10.0.0.8/assets/style-6fb018bf.css
&lt;html&gt;
&lt;head&gt;&lt;title&gt;403 Forbidden&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;center&gt;&lt;h1&gt;403 Forbidden&lt;/h1&gt;&lt;/center&gt;
&lt;hr&gt;&lt;center&gt;nginx/1.23.1&lt;/center&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_4-高可用" tabindex="-1"><a class="header-anchor" href="#_4-高可用" aria-hidden="true">#</a> 4 高可用</h2><p>keepalived</p><h3 id="安装keepalived" tabindex="-1"><a class="header-anchor" href="#安装keepalived" aria-hidden="true">#</a> 安装keepalived</h3><p><code>yum install keepalived</code></p><h3 id="配置-1" tabindex="-1"><a class="header-anchor" href="#配置-1" aria-hidden="true">#</a> 配置</h3><p><code>vi /etc/keepalived/keepalived.conf</code></p><h2 id="_5-https证书配置" tabindex="-1"><a class="header-anchor" href="#_5-https证书配置" aria-hidden="true">#</a> 5 HTTPS证书配置</h2><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code><span class="token directive"><span class="token keyword">server</span></span><span class="token punctuation">{</span>
  <span class="token comment"># 比起默认的80 使用了443 默认 是ssl方式  多出default之后的ssl</span>
  <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> default ssl</span><span class="token punctuation">;</span>
  <span class="token comment"># default 可省略</span>
  <span class="token comment"># 开启  如果把ssl on；这行去掉，ssl写在443端口后面。这样http和https的链接都可以用</span>
  <span class="token comment"># ssl on;</span>
  <span class="token comment"># 证书(公钥.发送到客户端的)</span>
  <span class="token directive"><span class="token keyword">ssl_certificate</span> ssl/9023128_home.nohi.online.pem</span><span class="token punctuation">;</span>
  <span class="token comment"># 私钥,</span>
  <span class="token directive"><span class="token keyword">ssl_certificate_key</span> ssl/9023128_home.nohi.online.key</span><span class="token punctuation">;</span>
  ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-扩容" tabindex="-1"><a class="header-anchor" href="#_6-扩容" aria-hidden="true">#</a> 6 扩容</h2><ul><li>单机垂直扩容：硬件资源增加</li><li>水平扩展：集群化</li><li>细粒度拆分：分布式 <ul><li>数据分区</li><li>上游服务SOA化（原生支持水平、垂直扩容）</li><li>入口细分 <ul><li>浏览器</li><li>移动端原生app（物联网）</li><li>H5内嵌式应用</li></ul></li></ul></li><li>数据异构化 <ul><li>多级缓存：客户端缓存、CDN缓存、异地多活、Nginx缓存</li></ul></li><li>服务异构化 <ul><li>拆分请求、消息中间件</li></ul></li></ul><p>扩容原则</p><ul><li>无状态原则</li><li>弹性原则</li></ul><h3 id="水平扩展-集群化" tabindex="-1"><a class="header-anchor" href="#水平扩展-集群化" aria-hidden="true">#</a> 水平扩展：集群化</h3><h4 id="nginx高级负责均衡" tabindex="-1"><a class="header-anchor" href="#nginx高级负责均衡" aria-hidden="true">#</a> nginx高级负责均衡</h4><ul><li>ip_hash</li><li>其他hash <ul><li>hash $cookie_jsessionid</li><li>hash $request_uri <ul><li>不支持cookie</li><li>资源不平均分配</li></ul></li></ul></li><li>使用lua逻辑的定向分发</li></ul><h4 id="redis-springseesion" tabindex="-1"><a class="header-anchor" href="#redis-springseesion" aria-hidden="true">#</a> Redis + SpringSeesion</h4><h4 id="第三方模块" tabindex="-1"><a class="header-anchor" href="#第三方模块" aria-hidden="true">#</a> 第三方模块</h4><ul><li><p>stick</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream abc{
  sticky name=route expires=6h;
  server 10.0.0.210:8080;
  server 10.0.0.211:8080;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="keepalive" tabindex="-1"><a class="header-anchor" href="#keepalive" aria-hidden="true">#</a> keepalive</h4><ul><li>keepalive_time限制keepalive保持连接的最大时间 1.9.10新功能</li><li>keepalive_timeout 连接超时时间 <ul><li>keepalive_timeout = 0 即关闭</li><li>keepalive_timeout 10 ; 10s</li><li>send_timeout 两次向客户端写操作之间的间隔，如果大于些时间则关闭连接，默认60s</li></ul></li><li>keepalive_request 默认1000 单个连接可以处理的请求数</li></ul><h4 id="对上游服务使用keepalive" tabindex="-1"><a class="header-anchor" href="#对上游服务使用keepalive" aria-hidden="true">#</a> 对上游服务使用keepalive</h4><ul><li><p>upstream 配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>keepalive 100 保留连接数
keepalive_timeout 保留时间
keepalive_requests 一个tcp利用中，可以并发接收的请求数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>server中配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>proxy_http_version 1.1; 配置http版本号，默认使用1.0协议，需在request增加“connection：keep-alive” header才能够生产。而http1.1默认支持
proxy_set_header Connection &quot;&quot;; 清除close;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="压测" tabindex="-1"><a class="header-anchor" href="#压测" aria-hidden="true">#</a> 压测</h4><ul><li><p>Apache-benchmark: https-tools</p><ul><li><p>安装： <code>yum install https-tools</code></p></li><li><p>使用：<code>ab -n 10000 -c 10 http://10.0.0.210/</code></p></li><li><p>部分客户端不支持keepalive连接</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@nohicent210 ~<span class="token punctuation">]</span><span class="token comment"># ab -n 100000 -c 10 http://10.0.0.210/</span>
This is ApacheBench, Version <span class="token number">2.3</span> <span class="token operator">&lt;</span><span class="token variable">$Revision</span><span class="token builtin class-name">:</span> <span class="token number">1843412</span> $<span class="token operator">&gt;</span>
Copyright <span class="token number">1996</span> Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking <span class="token number">10.0</span>.0.210 <span class="token punctuation">(</span>be patient<span class="token punctuation">)</span>
Completed <span class="token number">10000</span> requests
Completed <span class="token number">20000</span> requests
Completed <span class="token number">30000</span> requests
Completed <span class="token number">40000</span> requests
Completed <span class="token number">50000</span> requests
Completed <span class="token number">60000</span> requests
Completed <span class="token number">70000</span> requests
Completed <span class="token number">80000</span> requests
Completed <span class="token number">90000</span> requests
Completed <span class="token number">100000</span> requests
Finished <span class="token number">100000</span> requests


Server Software:        nginx/1.21.4
Server Hostname:        <span class="token number">10.0</span>.0.210
Server Port:            <span class="token number">80</span>

Document Path:          /
Document Length:        <span class="token number">59077</span> bytes

Concurrency Level:      <span class="token number">10</span>
Time taken <span class="token keyword">for</span> tests:   <span class="token number">5.635</span> seconds
Complete requests:      <span class="token number">100000</span>
Failed requests:        <span class="token number">0</span>
Total transferred:      <span class="token number">5931300000</span> bytes
HTML transferred:       <span class="token number">5907700000</span> bytes
Requests per second:    <span class="token number">17745.28</span> <span class="token punctuation">[</span><span class="token comment">#/sec] (mean)</span>
Time per request:       <span class="token number">0.564</span> <span class="token punctuation">[</span>ms<span class="token punctuation">]</span> <span class="token punctuation">(</span>mean<span class="token punctuation">)</span>
Time per request:       <span class="token number">0.056</span> <span class="token punctuation">[</span>ms<span class="token punctuation">]</span> <span class="token punctuation">(</span>mean, across all concurrent requests<span class="token punctuation">)</span>
Transfer rate:          <span class="token number">1027857.10</span> <span class="token punctuation">[</span>Kbytes/sec<span class="token punctuation">]</span> received

Connection Times <span class="token punctuation">(</span>ms<span class="token punctuation">)</span>
              min  mean<span class="token punctuation">[</span>+/-sd<span class="token punctuation">]</span> median   max
Connect:        <span class="token number">0</span>    <span class="token number">0</span>   <span class="token number">0.1</span>      <span class="token number">0</span>       <span class="token number">1</span>
Processing:     <span class="token number">0</span>    <span class="token number">0</span>   <span class="token number">0.1</span>      <span class="token number">0</span>       <span class="token number">1</span>
Waiting:        <span class="token number">0</span>    <span class="token number">0</span>   <span class="token number">0.0</span>      <span class="token number">0</span>       <span class="token number">1</span>
Total:          <span class="token number">0</span>    <span class="token number">1</span>   <span class="token number">0.1</span>      <span class="token number">1</span>       <span class="token number">1</span>

Percentage of the requests served within a certain <span class="token function">time</span> <span class="token punctuation">(</span>ms<span class="token punctuation">)</span>
  <span class="token number">50</span>%      <span class="token number">1</span>
  <span class="token number">66</span>%      <span class="token number">1</span>
  <span class="token number">75</span>%      <span class="token number">1</span>
  <span class="token number">80</span>%      <span class="token number">1</span>
  <span class="token number">90</span>%      <span class="token number">1</span>
  <span class="token number">95</span>%      <span class="token number">1</span>
  <span class="token number">98</span>%      <span class="token number">1</span>
  <span class="token number">99</span>%      <span class="token number">1</span>
 <span class="token number">100</span>%      <span class="token number">1</span> <span class="token punctuation">(</span>longest request<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h2 id="_7-基本配置" tabindex="-1"><a class="header-anchor" href="#_7-基本配置" aria-hidden="true">#</a> 7 基本配置</h2><ul><li><p>获取真实IP</p><p><code>proxy_set_header X-Forwarded-For $remote_addr </code></p></li></ul><h2 id="_8-gzip压缩" tabindex="-1"><a class="header-anchor" href="#_8-gzip压缩" aria-hidden="true">#</a> 8 Gzip压缩</h2><h2 id="_9-详细配置" tabindex="-1"><a class="header-anchor" href="#_9-详细配置" aria-hidden="true">#</a> 9 详细配置</h2>`,58);function m(b,h){const a=l("ExternalLinkIcon");return t(),r("div",null,[p,n("ul",null,[o,n("li",null,[e("参考："),n("a",u,[e("视频教程"),d(a)])])]),v])}const g=i(c,[["render",m],["__file","Nginx-start.html.vue"]]);export{g as default};

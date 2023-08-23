import{_ as e,p as i,q as n,a1 as s}from"./framework-449724a9.js";const l={},d=s(`<h1 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h1><blockquote><p>create by nohi 20210105</p></blockquote><ul><li><p>常用命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>登录：mysql -uroot -p123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="创建用户" tabindex="-1"><a class="header-anchor" href="#创建用户" aria-hidden="true">#</a> 创建用户</h2><ul><li><p>mysql 8</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE USER &#39;nohi&#39;@&#39;%&#39; IDENTIFIED BY &#39;nohi&#39;;
GRANT ALL ON *.* TO &#39;nohi&#39;@&#39;%&#39;; 
ALTER USER &#39;nohi&#39;@&#39;%&#39; IDENTIFIED WITH mysql_native_password BY &#39;nohi&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改密码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>参考：https://www.cnblogs.com/tmdsleep/p/10967432.html

mysql&gt; select host,user,authentication_string from mysql.user;
host: 允许用户登录的ip‘位置&#39;%表示可以远程；
user:当前数据库的用户名；
authentication_string: 用户密码（后面有提到此字段）；

1.8. 设置（或修改）root用户密码：
默认root密码为空的话 ，下面使用navicat就无法连接，所以我们需要修改root的密码。
这是很关键的一步。此处踩过N多坑，后来查阅很多才知道在mysql 5.7.9以后废弃了password字段和password()函数；authentication_string:字段表示用户密码。
下面直接演示正确修改root密码的步骤：

一、如果当前root用户authentication_string字段下有内容，先将其设置为空，否则直接进行二步骤。

use mysql; 
update user set authentication_string=&#39;&#39; where user=&#39;root&#39;

3.下面直接演示正确修改root密码的步骤：

二、使用ALTER修改root用户密码,方法为 ALTER user &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;新密码&#39;。如下：

ALTER user &#39;root&#39;@&#39;localhost&#39; IDENTIFIED BY &#39;JOhydhLfMsWyBcn#&#39;

此处有两点需要注意：
1、不需要flush privileges来刷新权限。
2、密码要包含大写字母，小写字母，数字，特殊符号。
修改成功； 重新使用用户名密码登录即可；

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,5),a=[d];function r(t,c){return i(),n("div",null,a)}const u=e(l,[["render",r],["__file","mysql.html.vue"]]);export{u as default};

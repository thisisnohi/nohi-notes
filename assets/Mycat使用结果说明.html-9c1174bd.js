import{_ as e,p as i,q as a,a1 as l}from"./framework-449724a9.js";const d={},n=l(`<h1 id="mycat操作结果" tabindex="-1"><a class="header-anchor" href="#mycat操作结果" aria-hidden="true">#</a> Mycat操作结果</h1><blockquote><p>create by nohi 20210621</p></blockquote><h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2><ul><li><p>版本</p><ul><li>最新稳定版本：1.6.7.6 源码、安装文件都不能使用</li><li>源码分支：1673-2019-9-27，可以使用</li><li>源码： https://github.com.cnpmjs.org/MyCATApache/Mycat-Server.git</li></ul></li><li><p>数据库：</p><ul><li><p>Mycat: jdbc:mysql://127.0.0.1:8066/mycat_db?useUnicode=true&amp;characterEncoding=utf-8&amp;serverTimezone=GMT&amp;useServerPrepStmts=true</p></li><li><p>mysql</p><ul><li><p>主从：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mariadb01  root/alpha.abc  jdbc:mysql://192.168.1.236:13311/mysql
mariadb02  root/alpha.abc  jdbc:mysql://192.168.1.236:13312/mysql
mariadb03  root/alpha.abc  jdbc:mysql://192.168.1.236:13313/mysql

database:
	adnc_cus_dev
	adnc_maint_dev
	adnc_usr_dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>单节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mariadb21 root/alpha.abc jdbc:mariadb://192.168.1.236:13321/mysql

databases:
  mycat_db1
  mycat_db2
  mycat_db3
  mycat_db4
table：
	t_user
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>Oracle:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mycat/mycat1234 jdbc:oracle:thin:@192.168.1.211:1521:orcl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li></ul><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><ul><li><p>日期</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql-plus 语句
INSERT INTO UC_USER  ( id, UC_NAME, UC_AGE, CREATE_TIME )  VALUES  ( ?, ?, ?, ? )

-- mycat执行语句
INSERT INTO UC_USER(id,UC_NAME,UC_AGE,CREATE_TIME)VALUES(&#39;22&#39;,&#39;姓名12&#39;,33,&#39;2021-06-22 10:37:23.088&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>CREATE_TIME 日期类型 mysql为format后字符串， oracle不支持，需要转换</li></ul></li><li><p>事务</p><ul><li>单表事务正常没有问题： mysql oracle</li><li>分布式事务 ？？？</li></ul></li><li><p>分片</p><ul><li><p>一张表多结点，一个结点异常，查询异常报某结点.表不存在</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mycat_db2.t_user doesn&#39;t exist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>查询</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select u.user_id, u.user_name, u2.user_id, u2.user_name from t_user u
, t_user u2
where u.user_id != u2.user_id
 and u.user_age = u2.user_age;

select * from t_user u
where u.user_id in (
   select t.user_id from t_user t
    where t.user_age &gt;= 13
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,6),s=[n];function r(t,c){return i(),a("div",null,s)}const m=e(d,[["render",r],["__file","Mycat使用结果说明.html.vue"]]);export{m as default};

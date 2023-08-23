import{_ as e,p as a,q as i,a1 as d}from"./framework-449724a9.js";const n={},r=d(`<h1 id="db" tabindex="-1"><a class="header-anchor" href="#db" aria-hidden="true">#</a> DB</h1><ul><li><p>登录数据库服务器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ssh oracle@215.8.7.60
export NLS_LANG=&quot;AMERICAN_AMERICA.UTF8&quot;
export ORACLE_SID=appdb1
sqlplus curvapp/curvapp
col parameter for a30;
col value for a25;
select * from nls_databas
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>数据库连接三种方式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jdbc:oracle:thin:@host:port:SID 
jdbc:oracle:thin:@//host:port/service_name
jdbc:oracle:thin:@//localhost:1521/orcl.city.com 

jdbc:oracle:thin:@//215.8.7.66:11521/appdb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="druid" tabindex="-1"><a class="header-anchor" href="#druid" aria-hidden="true">#</a> druid</h2><blockquote><p>created by nohi 20191211</p></blockquote><h3 id="druid-监控" tabindex="-1"><a class="header-anchor" href="#druid-监控" aria-hidden="true">#</a> druid 监控</h3><p>参考：https://blog.csdn.net/weixin_45501830/article/details/100847818</p>`,6),l=[r];function s(t,c){return a(),i("div",null,l)}const u=e(n,[["render",s],["__file","database.html.vue"]]);export{u as default};

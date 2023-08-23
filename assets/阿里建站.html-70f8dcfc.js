import{_ as e,p as i,q as l,a1 as n}from"./framework-449724a9.js";const s={},a=n(`<h1 id="阿里建站" tabindex="-1"><a class="header-anchor" href="#阿里建站" aria-hidden="true">#</a> 阿里建站</h1><blockquote><p>create by nohi 20201202</p></blockquote><h2 id="服务器" tabindex="-1"><a class="header-anchor" href="#服务器" aria-hidden="true">#</a> 服务器</h2><ul><li>阿里云去小站（可能会便宜一点） <ul><li>https://www.aliyun.com/minisite/goods?userCode=2a7uv47d</li></ul></li></ul><h2 id="端口启用" tabindex="-1"><a class="header-anchor" href="#端口启用" aria-hidden="true">#</a> 端口启用</h2><ul><li>开通端口 <ul><li><p>本机80端口可以使用，外网访问不了，需要开通本地安全组</p><ul><li>路径：阿里云-云服务器ECS-实例列表选择一台机器-本实例安全组</li><li>手工添加/快速添加</li></ul></li><li><p>开通端口后需要，添加防火墙规则</p><ul><li>参见：https://blog.csdn.net/qq_36640713/article/details/106553833</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>关闭防火墙： systemctl stop firewalld.service
开启： systemctl start firewalld.service
	 先用：systemctl unmask firewalld.service 
   然后：systemctl start firewalld.service
开机运行：systemctl enable firewalld.
关闭开机运行： systemctl disable firewalld.service

查看防火墙状态 systemctl status firewalld  或 firewall-cmd --state

开启端口
#（--permanent永久生效，没有此参数重启后失效）
#注：可以是一个端口范围，如1000-2000/tcp
firewall-cmd --zone=public --add-port=13000-14000/tcp --permanent   
移除端口
firewall-cmd --zone=public --remove-port=80/tcp --permanent
firewall-cmd --permanent --remove-port=123/tcp

重新加载防火墙 firewall-cmd --reload
查看端口状态： firewall-cmd --query-port=80/tcp

查看列表： firewall-cmd --list-port
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul>`,6),d=[a];function r(t,c){return i(),l("div",null,d)}const v=e(s,[["render",r],["__file","阿里建站.html.vue"]]);export{v as default};

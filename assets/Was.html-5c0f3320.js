import{_ as e,p as l,q as i,a1 as a}from"./framework-449724a9.js";const s={},n=a(`<h1 id="was" tabindex="-1"><a class="header-anchor" href="#was" aria-hidden="true">#</a> Was</h1><h2 id="alias" tabindex="-1"><a class="header-anchor" href="#alias" aria-hidden="true">#</a> alias</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alias cdlog=&#39;cd /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/server1&#39;
alias cdbin=&#39;cd /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/bin&#39;
alias cdapp=&#39;cd /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/appNode01Cell/seeyon_war.ear&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="清除websphere中缓存" tabindex="-1"><a class="header-anchor" href="#清除websphere中缓存" aria-hidden="true">#</a> 清除WebSphere中缓存</h2><blockquote><p>was清理缓存: https://blog.csdn.net/allan_chan/article/details/9841249</p></blockquote><ul><li>/home/IBM/WebSphere/AppServer02/profiles/AppSrv01/clearClassCache.sh</li><li>/home/IBM/WebSphere/AppServer02/profiles/AppSrv01/temp/node节点/server1 缓存目录</li></ul><h2 id="清理was缓存-手工删除应用" tabindex="-1"><a class="header-anchor" href="#清理was缓存-手工删除应用" aria-hidden="true">#</a> 清理was缓存，手工删除应用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. Stop server
2. 进入$Profile_install_root/installedApps/$CellName目录,删除你期望删除的应用，例如 TestAsyncInvokerApp.ear
3. 进入$Profile_install_root/tranlog目录，清空tranlog目录
4. 进入$Profile_install_root/wstemp目录，清空wstemp目录
5. 进入$Profile_install_root/temp/$NodeName目录，清空￥NodeName目录
6. 进入$Profile_install_root/config/cells/$CellName/nodes/$NodeName, 打开serverindex.xml文件，删除其中与你的应用相关的一行，例如：&lt;deployedApplications&gt;TestAsyncInvokerApp.ear/deployments/TestAsyncInvokerApp&lt;/deployedApplications&gt;
7. 进入$Profile_install_root/config/cells/$CellName/applications, 删除其中应用对应的目录, 如: TestAsyncInvokerApp.ear.
8. Start server
9. Check SystemOut.log &amp; SystemErr.log


Portlet deployment fails with &#39;A composition unit with name already exists&#39;

&lt;profile root&gt;/config/cells/cellname/applications/PA_myApp
&lt;profile root&gt;/config/cells/cellname/blas/PA_myApp
&lt;profile root&gt;/config/cells/cellname/cus/PA_myApp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),r=[n];function t(d,o){return l(),i("div",null,r)}const c=e(s,[["render",t],["__file","Was.html.vue"]]);export{c as default};

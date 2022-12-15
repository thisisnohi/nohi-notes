# Was

## alias
```
alias cdlog='cd /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/logs/server1'
alias cdbin='cd /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/bin'
alias cdapp='cd /opt/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/appNode01Cell/seeyon_war.ear'
```

## 清除WebSphere中缓存

> was清理缓存: https://blog.csdn.net/allan_chan/article/details/9841249

* /home/IBM/WebSphere/AppServer02/profiles/AppSrv01/clearClassCache.sh 
* /home/IBM/WebSphere/AppServer02/profiles/AppSrv01/temp/node节点/server1 缓存目录

## 清理was缓存，手工删除应用

```
1. Stop server
2. 进入$Profile_install_root/installedApps/$CellName目录,删除你期望删除的应用，例如 TestAsyncInvokerApp.ear
3. 进入$Profile_install_root/tranlog目录，清空tranlog目录
4. 进入$Profile_install_root/wstemp目录，清空wstemp目录
5. 进入$Profile_install_root/temp/$NodeName目录，清空￥NodeName目录
6. 进入$Profile_install_root/config/cells/$CellName/nodes/$NodeName, 打开serverindex.xml文件，删除其中与你的应用相关的一行，例如：<deployedApplications>TestAsyncInvokerApp.ear/deployments/TestAsyncInvokerApp</deployedApplications>
7. 进入$Profile_install_root/config/cells/$CellName/applications, 删除其中应用对应的目录, 如: TestAsyncInvokerApp.ear.
8. Start server
9. Check SystemOut.log & SystemErr.log


Portlet deployment fails with 'A composition unit with name already exists'

<profile root>/config/cells/cellname/applications/PA_myApp
<profile root>/config/cells/cellname/blas/PA_myApp
<profile root>/config/cells/cellname/cus/PA_myApp
```    

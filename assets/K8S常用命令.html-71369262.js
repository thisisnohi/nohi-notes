import{_ as e,p as i,q as n,a1 as d}from"./framework-449724a9.js";const s={},l=d(`<h1 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h1><h2 id="k8s自动补全" tabindex="-1"><a class="header-anchor" href="#k8s自动补全" aria-hidden="true">#</a> k8s自动补全</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum -y install bash-completion
source /usr/share/bash-completion/bash_completion
source &lt;(kubectl completion bash)
echo &quot;source &lt;(kubectl completion bash)&quot; &gt;&gt; ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="域名解析" tabindex="-1"><a class="header-anchor" href="#域名解析" aria-hidden="true">#</a> 域名解析</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>route -n
iptables-save | grep 10.105.42.173
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看日志" tabindex="-1"><a class="header-anchor" href="#查看日志" aria-hidden="true">#</a> 查看日志</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 在pod对应机器节点查看
# 查找对应容器id
crictl ps
crictl ps -a
# 查看容器日志
crictl logs 6e2c272bcbd41
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><h3 id="查看日志-1" tabindex="-1"><a class="header-anchor" href="#查看日志-1" aria-hidden="true">#</a> 查看日志</h3><ul><li><code>docker logs --tail=1 -f 711fe733d6f4</code></li><li><code>docker logs -f 711fe733d6f4</code></li></ul><h2 id="kubectl" tabindex="-1"><a class="header-anchor" href="#kubectl" aria-hidden="true">#</a> kubectl</h2><ul><li><p>常用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create apply get delete logs describe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>label

kubectl get node --show-labels
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="查看所有资源" tabindex="-1"><a class="header-anchor" href="#查看所有资源" aria-hidden="true">#</a> 查看所有资源</h3><ul><li><p><code>kubectl api-resources</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-master ~]# kubectl api-resources
NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
bindings                                       v1                                     true         Binding
componentstatuses                 cs           v1                                     false        ComponentStatus
configmaps                        cm           v1                                     true         ConfigMap

# SHORTNAMES 为简写,如:
kubectl get componentstatuses == kubectl get cs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>kubectl get pod -A / kubectl get pods -A</p></li><li><p>kubectl get svc -A</p></li><li><p>进入pod：<code>kubectl exec -it curl --/bin/sh</code></p></li><li><p>执行pod中命令：<code>kubectl exec -ti curl(此为podname) -- cat /etc/resolv.conf</code></p></li><li><p>ComponentStatus</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get cs/node/pod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>kubectl 展示搜索出的pod列表（含pod所在的namespace</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pod -A / kubectl get pod -A grep &lt;podname&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>kubectl 删除pod命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl delete pod &lt;podname&gt; -n &lt;namespace&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看deployment信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get deployment -n &lt;namespace&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>删除对应pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl delete deployment &lt;deployxxx&gt; -n  &lt;namespace&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="pod" tabindex="-1"><a class="header-anchor" href="#pod" aria-hidden="true">#</a> POD</h3><h4 id="_1-查看pod" tabindex="-1"><a class="header-anchor" href="#_1-查看pod" aria-hidden="true">#</a> 1 查看POD</h4><blockquote><p>主要命令即是：create apply get delete logs describe</p></blockquote><ul><li><p>查看pod基本情况</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看所有namespace下pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pod -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>-owide</code>显示ip、node等信息</p></li></ul><h4 id="_2-查看pod详情" tabindex="-1"><a class="header-anchor" href="#_2-查看pod详情" aria-hidden="true">#</a> 2 查看pod详情</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl describe pod &lt;podname&gt;  # podname可通过kubectl get pod查看 =&gt; demo1-74564bd775-494lz
kubectl get pod &lt;podname&gt; -n &lt;namespace&gt; -o wide -o yaml
kubectl get pod myblog -n nohi -o wide -o yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-pod扩容" tabindex="-1"><a class="header-anchor" href="#_3-pod扩容" aria-hidden="true">#</a> 3 pod扩容</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl scale deployment demo1 --replicas 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="查看窗口情况" tabindex="-1"><a class="header-anchor" href="#查看窗口情况" aria-hidden="true">#</a> 查看窗口情况</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl -n nohi exec -ti myblog -c mysql bash
# 如果pod只有一个非pasuse容器，可省略-c mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="删除pod" tabindex="-1"><a class="header-anchor" href="#删除pod" aria-hidden="true">#</a> 删除POD</h4><ul><li><p>查看pod状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get pod -A
$ kubectl get pods -n ingress-nginx
NAME                                   READY   STATUS             RESTARTS   AGE
ingress-nginx-admission-create-9xnc5   0/1     ImagePullBackOff   0          19m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>确定问题 Pod 所在节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pods ingress-nginx-admission-create-9xnc5 -n ingress-nginx -o wide
NAME                                   READY   STATUS             RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
ingress-nginx-admission-create-9xnc5   0/1     ImagePullBackOff   0          20m   10.243.111.195   k8s-n2   &lt;none&gt;           &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>node 对应 k8s-n2，该 Pod 被调度到了 <code>k8s-n2</code> 节点</p></li><li><p>查看pod所在节点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pod -owide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>确定 Pod 所使用的容器镜像</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pods ingress-nginx-admission-create-9xnc5 -n ingress-nginx -o yaml | grep image
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>删除一个pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1、先删除pod2、再删除对应的deployment否则只是删除pod是不管用的，还会看到pod，因为deployment.yaml文件中定义了副本数量

删除pod
[root@test2 ~]# kubectl get pod -n jenkins
NAME                        READY     STATUS    RESTARTS   AGE
jenkins2-8698b5449c-grbdm   1/1       Running   0          8s
[root@test2 ~]# kubectl delete pod jenkins2-8698b5449c-grbdm -n jenkins
pod &quot;jenkins2-8698b5449c-grbdm&quot; deleted

查看pod仍然存储

[root@test2 ~]# kubectl get pod -n jenkins
NAME                        READY     STATUS    RESTARTS   AGE
jenkins2-8698b5449c-dbqqb   1/1       Running   0          8s
[root@test2 ~]# 

删除deployment

[root@test2 ~]# kubectl get deployment -n jenkins
NAME       DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
jenkins2   1         1         1            1           17h
[root@test2 ~]# kubectl delete deployment jenkins2 -n jenkins

再次查看pod消失

deployment.extensions &quot;jenkins2&quot; deleted
[root@test2 ~]# kubectl get deployment -n jenkins
No resources found.
[root@test2 ~]# 
[root@test2 ~]# kubectl get pod -n jenkins
No resources found.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="查看日志-2" tabindex="-1"><a class="header-anchor" href="#查看日志-2" aria-hidden="true">#</a> 查看日志</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl logs -n nohi myblog -c mysql
# 对应如下命令，711fe733d6f4是mysql id
docker logs --tail=1 -f 711fe733d6f4  

## tail
kubectl logs -n nohi myblog -c mysql -f
kubectl logs -n nohi myblog -c mysql -f --tail=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="标签" tabindex="-1"><a class="header-anchor" href="#标签" aria-hidden="true">#</a> 标签</h3><h4 id="_1-查看节点标签" tabindex="-1"><a class="header-anchor" href="#_1-查看节点标签" aria-hidden="true">#</a> 1. 查看节点标签</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get node --show-labels
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-添加标签" tabindex="-1"><a class="header-anchor" href="#_2-添加标签" aria-hidden="true">#</a> 2. 添加标签</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl label node k8s-master ingress=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-删除标签" tabindex="-1"><a class="header-anchor" href="#_3-删除标签" aria-hidden="true">#</a> 3 删除标签</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl label node k8s-master ingress-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="helm" tabindex="-1"><a class="header-anchor" href="#helm" aria-hidden="true">#</a> helm</h2><ul><li>查询全部服务：<code>helm -n &lt;namespace&gt; ls -a </code></li><li>删除失败的安装： <code>helm -n &lt;namespace&gt; delete &lt;packagename&gt; </code></li></ul><h2 id="metrics-server" tabindex="-1"><a class="header-anchor" href="#metrics-server" aria-hidden="true">#</a> metrics-server</h2><ul><li><p>查看节点metrics</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-m1 ~]# kubectl top node
NAME     CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
k8s-m1   406m         10%    1197Mi          69%
k8s-n1   199m         4%     990Mi           57%
k8s-n2   99m          2%     957Mi           55%

[root@k8s-m1 ~]# kubectl top pod -n kube-system
NAME                               CPU(cores)   MEMORY(bytes)
coredns-5bbd96d687-52ttw           3m           22Mi
coredns-5bbd96d687-prtk8           7m           24Mi
etcd-k8s-m1                        47m          74Mi
kube-apiserver-k8s-m1              122m         401Mi
kube-controller-manager-k8s-m1     41m          76Mi
kube-proxy-5vp7z                   9m           31Mi
kube-proxy-8vj5c                   16m          33Mi
kube-proxy-qwmzl                   15m          24Mi
kube-scheduler-k8s-m1              19m          38Mi
metrics-server-5d466b9d66-2wkrv    7m           15Mi
tigera-operator-7795f5d79b-rhht5   3m           49Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 根据服务名称访问
$ kubectl -n istio-demo get svc
NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
bill-service   ClusterIP   10.107.86.195   &lt;none&gt;        9999/TCP   2d9h
# pod 内访问 bill-service，实际是访问cluster-ip
/ # nslookup bill-service
Server:		10.96.0.10
Address:	10.96.0.10:53

Name:	bill-service.istio-demo.svc.cluster.local
Address: 10.107.86.195

# 查看iptables
$ iptables-save | grep 10.107.86.195
-A KUBE-SERVICES -d 10.107.86.195/32 -p tcp -m comment --comment &quot;istio-demo/bill-service:http cluster IP&quot; -m tcp --dport 9999 -j KUBE-SVC-PK4BNTKC2JYVE7B2
-A KUBE-SVC-PK4BNTKC2JYVE7B2 ! -s 10.224.0.0/16 -d 10.107.86.195/32 -p tcp -m comment --comment &quot;istio-demo/bill-service:http cluster IP&quot; -m tcp --dport 9999 -j KUBE-MARK-MASQ

# 查看svc，策略为0.5
$ iptables-save | grep KUBE-SVC-PK4BNTKC2JYVE7B2
:KUBE-SVC-PK4BNTKC2JYVE7B2 - [0:0]
-A KUBE-SERVICES -d 10.107.86.195/32 -p tcp -m comment --comment &quot;istio-demo/bill-service:http cluster IP&quot; -m tcp --dport 9999 -j KUBE-SVC-PK4BNTKC2JYVE7B2
-A KUBE-SVC-PK4BNTKC2JYVE7B2 ! -s 10.224.0.0/16 -d 10.107.86.195/32 -p tcp -m comment --comment &quot;istio-demo/bill-service:http cluster IP&quot; -m tcp --dport 9999 -j KUBE-MARK-MASQ
-A KUBE-SVC-PK4BNTKC2JYVE7B2 -m comment --comment &quot;istio-demo/bill-service:http -&gt; 10.224.2.176:80&quot; -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-2N5D6YEYMYJU3FWT
-A KUBE-SVC-PK4BNTKC2JYVE7B2 -m comment --comment &quot;istio-demo/bill-service:http -&gt; 10.224.2.177:80&quot; -j KUBE-SEP-4YJXLYWAOEZ73MAQ

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="ingress" tabindex="-1"><a class="header-anchor" href="#ingress" aria-hidden="true">#</a> Ingress</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: jenkins-web
  namespace: jenkins
spec:
  rules:
  - host: jenkins.nohi.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: jenkins
            port:
              number: 8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h1><h2 id="crictl" tabindex="-1"><a class="header-anchor" href="#crictl" aria-hidden="true">#</a> crictl</h2><h3 id="error-while-dialing-dial-unix-var-run-dockershim-sock-connect-no-such-file-or-directory" tabindex="-1"><a class="header-anchor" href="#error-while-dialing-dial-unix-var-run-dockershim-sock-connect-no-such-file-or-directory" aria-hidden="true">#</a> Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory&quot;</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crictl config runtime-endpoint unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,47),a=[l];function t(r,c){return i(),n("div",null,a)}const v=e(s,[["render",t],["__file","K8S常用命令.html.vue"]]);export{v as default};

import{_ as d,M as a,p as r,q as t,R as e,t as i,N as l,a1 as n}from"./framework-449724a9.js";const v="/assets/image-20230325120820130-5e7a63c9.png",c="/assets/image-20230325123309922-7c59d9f9.png",m="/assets/image-20230328210120620-c4ee98ee.png",u="/assets/image-20230328211410739-df9d4c58.png",o="/assets/image-20230328213315703-70650d66.png",b={},p=n('<h1 id="_14-08-docker-k8s教程-08基于istion实现微服务治理-md" tabindex="-1"><a class="header-anchor" href="#_14-08-docker-k8s教程-08基于istion实现微服务治理-md" aria-hidden="true">#</a> 14-08_Docker+k8s教程-08基于Istion实现微服务治理.md</h1><h2 id="基于istio实现微服务治理" tabindex="-1"><a class="header-anchor" href="#基于istio实现微服务治理" aria-hidden="true">#</a> 基于Istio实现微服务治理</h2><blockquote><p>create by nohi 20230325</p></blockquote><p>Service Mesh 服务网格</p><h2 id="_1-安装istio" tabindex="-1"><a class="header-anchor" href="#_1-安装istio" aria-hidden="true">#</a> 1 安装Istio</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>',6),h={href:"https://github.com/istio/istio/releases",target:"_blank",rel:"noopener noreferrer"},g=n(`<blockquote><p>20230325 本次下载 1.17</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 下载
wget https://github.com/istio/istio/releases/download/1.17.1/istio-1.17.1-linux-amd64.tar.gz

# 解压
tar xzvf istio-1.17.1-linux-amd64.tar.gz
cd istio-1.17.1/bin/

# 拷贝系统命令PATH
cp istioctl /bin/
# 查看版本 
[root@k8s-master bin]# istioctl version
no running Istio pods in &quot;istio-system&quot;
1.17.1

# 增加自动补全
cd istio-1.17.1/tools
source istioctl.bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),x=e("h3",{id:"安装插件",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装插件","aria-hidden":"true"},"#"),i(" 安装插件")],-1),f={href:"https://istio.io/latest/docs/setup/additional-setup/config-profiles/",target:"_blank",rel:"noopener noreferrer"},_=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 使用istioctl直接安装
$ istioctl install --set profile=demo --set components.cni.enabled=true
✔ Istio core installed
✔ Istiod installed
✔ Egress gateways installed
✔ Ingress gateways installed
✔ Installation complete
# 查看安装pod
$ kubectl -n istio-system get pod
NAME                                   READY   STATUS    RESTARTS   AGE
istio-egressgateway-774d6846df-kf8rm   1/1     Running   0          6m20s
istio-ingressgateway-69499dc-t7vtb     1/1     Running   0          6m20s
istiod-65dcb8497-n4lc4                 1/1     Running   0          6m47s


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>istio针对不同环境，提供了几种不同的初始化部署profile</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看提供的profile类型
$ istioctl profile list
Istio configuration profiles:
    ambient
    default
    demo
    empty
    external
    minimal
    openshift
    preview
    remote
# 获取kubernetes的yaml
$ istioctl manifest generate --set profile=demo &gt; istio-kubernetes-manifest.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="卸裁" tabindex="-1"><a class="header-anchor" href="#卸裁" aria-hidden="true">#</a> 卸裁</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 整体卸载
istioctl x uninstall --purge
istioctl manifest generate --set profile=demo | kubectl	delete -f -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-快速入门" tabindex="-1"><a class="header-anchor" href="#_2-快速入门" aria-hidden="true">#</a> 2 快速入门</h2><h3 id="场景一" tabindex="-1"><a class="header-anchor" href="#场景一" aria-hidden="true">#</a> 场景一</h3><h4 id="模型图" tabindex="-1"><a class="header-anchor" href="#模型图" aria-hidden="true">#</a> 模型图</h4><p><img src="`+v+`" alt="image-20230325120820130"></p><h4 id="资源清单" tabindex="-1"><a class="header-anchor" href="#资源清单" aria-hidden="true">#</a> 资源清单</h4><p><code>front-tomcat-dpl-v1.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: front-tomcat
    version: v1
  name: front-tomcat-v1
  namespace: istio-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: front-tomcat
      version: v1
  template:
    metadata:
      labels:
        app: front-tomcat
        version: v1
    spec:
      containers:
      - image: consol/tomcat-7.0:latest
        name: front-tomcat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>bill-service-dpl-v1.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    service: bill-service
    version: v1
  name: bill-service-v1
  namespace: istio-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      service: bill-service
      version: v1
  template:
    metadata:
      labels:
        service: bill-service
        version: v1
    spec:
      containers:
      - image: nginx:alpine
        name: bill-service
        command: [&quot;/bin/sh&quot;, &quot;-c&quot;, &quot;echo &#39;this is bill-service-v1&#39; &gt; /usr/share/nginx/html/index.html; nginx -g &#39;daemon off;&#39; &quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>bill-service-svc.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Service
metadata:
  labels:
    service: bill-service
  name: bill-service
  namespace: istio-demo
spec:
  ports:
    - name: http
      port: 9999
      protocol: TCP
      targetPort: 80
  selector:
    service: bill-service
  type: ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 创建命名空间
kubectl create namespace istio-demo
# 创建服务
kubectl apply -f .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl -n istio-demo get po
NAME                               READY   STATUS    RESTARTS   AGE
bill-service-v1-57c4dcc8f5-z72b6   1/1     Running   0          5m17s
front-tomcat-v1-78f6d648cb-g2jg5   1/1     Running   0          3m40s

# 验证
$ kubectl -n istio-demo exec front-tomcat-v1-78f6d648cb-g2jg5 -- curl -s bill-service:9999
this is bill-service-v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="场景二" tabindex="-1"><a class="header-anchor" href="#场景二" aria-hidden="true">#</a> 场景二</h3><blockquote><p>后台账单服务更新v2版本，前期规划90%的流量访问v1版本，导入10%的流量到v2版本</p></blockquote><h4 id="模型图-1" tabindex="-1"><a class="header-anchor" href="#模型图-1" aria-hidden="true">#</a> 模型图</h4><p><img src="`+c+`" alt="image-20230325123309922"></p><h4 id="资源清单-1" tabindex="-1"><a class="header-anchor" href="#资源清单-1" aria-hidden="true">#</a> 资源清单</h4><p>新增<code>bill-service-dpl-v2.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    service: bill-service
    version: v2
  name: bill-service-v2
  namespace: istio-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      service: bill-service
      version: v2
  template:
    metadata:
      labels:
        service: bill-service
        version: v2
    spec:
      containers:
      - image: nginx:alpine
        name: bill-service
        command: [&quot;/bin/sh&quot;, &quot;-c&quot;, &quot;echo &#39;this is bill-service-v2 &#39; &gt; /usr/share/nginx/html/index.html; nginx -g &#39;daemon off;&#39; &quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl apply -f bill-service-dpl-v2.yaml
deployment.apps/bill-service-v2 created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看路由情况" tabindex="-1"><a class="header-anchor" href="#查看路由情况" aria-hidden="true">#</a> 查看路由情况</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># pod内 curl bill-service:9999
# 随机返回： this is bill-service-v1 this is bill-service-v2
# 路由默认0.5，见下方分析过程

# 根据服务名称访问
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="istio" tabindex="-1"><a class="header-anchor" href="#istio" aria-hidden="true">#</a> Istio</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>istioctl kube-inject -f bill-service-dpl-v1.yaml | kubectl apply -f -
istioctl kube-inject -f bill-service-dpl-v2.yaml | kubectl apply -f -
istioctl kube-inject -f front-tomcat-dpl-v1.yaml | kubectl apply -f -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>问题</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># pod CrashLoopBackOff
$ kubectl -n istio-demo get pod
NAME                               READY   STATUS                  RESTARTS        AGE
bill-service-v1-57c4dcc8f5-z72b6   1/1     Running                 0               2d10h
bill-service-v1-9f7cd4df7-wbqlf    0/2     Init:CrashLoopBackOff   5 (32s ago)     3m43s
bill-service-v2-7c47794965-xf7n7   1/1     Running                 0               2d10h
bill-service-v2-7cb677fc95-s8j4m   0/2     Init:CrashLoopBackOff   10 (2m3s ago)   28m
front-tomcat-v1-78f6d648cb-g2jg5   1/1     Running                 0               2d10h
front-tomcat-v1-8fb6f7db8-ggzmr    0/2     Init:CrashLoopBackOff   10 (109s ago)   28m

# 查看pod日志，一直显示等待pod init
# 最后通过crictl logs  &lt;dockercontainerid&gt; 查看出错误原因
# Command error output: xtables parameter problem: iptables-restore: unable to initialize table &#39;nat&#39;
# 通过 修改 istio-iptables.conf &amp;&amp; reboot
cat /etc/modules-load.d/istio-iptables.conf
br_netfilter
nf_nat
xt_REDIRECT
xt_owner
iptable_nat
iptable_mangle
iptable_filter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现流量分发，需要解决以下问题</p><ul><li>让访问账单服务的流量按照我们期望比例，其实是路由规则 -&gt; 如何定义此规则</li><li>如何区分两个版本的服务</li></ul></li></ul><p><code>bill-service-destnation-rule.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata: 
  name: dest-bill-service
  namespace: istio-demo
spec:
  host: bill-service
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels: 
      version: v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>bill-service-virtualservice.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata: 
  name: vs-bill-service
  namespace: istio-demo
spec:
  hosts: 
  - bill-service
  http:
  - name: bill-service-route
    route:
    - destination:
        host: bill-service
        subset: v1
      weight: 90
    - destination:
        host: bill-service
        subset: v2
      weight: 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务网格细节剖析" tabindex="-1"><a class="header-anchor" href="#服务网格细节剖析" aria-hidden="true">#</a> 服务网格细节剖析</h3><p>执行的操作</p><ul><li>使用istioctl为pod注入了sidecar</li><li>创建了virtualservice和destinationrule</li></ul><p><img src="`+m+'" alt="image-20230328210120620"></p><p><img src="'+u+`" alt="image-20230328211410739"></p><h4 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理" aria-hidden="true">#</a> 工作原理</h4><ul><li>用户端，通过创建服务治理的规则(VirtualService、DestinationRule等资源类型)，存储到ETCD中</li><li>istio控制平面中的Pilot服务监听上述规则，转换成envoy可读的规则配置，通过xDS接口同步给各envoy</li><li>envoy通过xDS获取最新的配置后，动态reload，进而改变流量转发的策略</li></ul><p>问题</p><pre><code>* istio中envoy的动态配置是什么格式
* 在istio的网络内，font-tomcat访问到bill-service，流量的流向是怎么样的？
</code></pre><p>问题1</p><p>每个envoy进程启动时，会在127.0.0.1启动监听商品15000端口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl -n istio-demo exec  -it front-tomcat-v1-8fb6f7db8-tpx4p -c istio-proxy -- 
bash
# curl localhost:15000/help
# curl localhost:15000/config_dump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题2</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl -n istio-demo exec  -it front-tomcat-v1-8fb6f7db8-tpx4p -c front-tomcat -- 
bash
# curl bill-service:9999
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+o+`" alt="image-20230328213315703"></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>20230328 istio后续视频暂停
继续SpringCloud服务部署K8S内容
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,54);function k(E,S){const s=a("ExternalLinkIcon");return r(),t("div",null,[p,e("ul",null,[e("li",null,[e("p",null,[i("下载列表"),e("a",h,[i("github"),l(s)])]),g])]),x,e("ul",null,[e("li",null,[e("a",f,[i("profile介绍"),l(s)])])]),_])}const B=d(b,[["render",k],["__file","14_Docker_k8s教程-08基于Istion实现微服务治理.html.vue"]]);export{B as default};

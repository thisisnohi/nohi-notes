import{_ as d,M as v,p as m,q as k,R as n,t as s,N as e,a1 as t}from"./framework-449724a9.js";const b="/assets/kube-scheduler-1-c72b0082.jpg",o="/assets/kube-scheduler-process-b7bcf07e.png",h="/assets/kube-scheduler-pre-498423de.jpg",g="/assets/kube-scheduler-pro-1f24e780.jpg",y="/assets/vxlan-1fce1312.png",f="/assets/vxlan-p2p-1-b591b741.png",x="/assets/vxlan-p2p-3045bbc8.png",q="/assets/vxlan-docker-a8eae7c9.png",w="/assets/vxlan-docker-mul-4f9e8772.png",P="/assets/vxlan-docker-mul-all-c6e42c17.png",V="/assets/flannel-c87784a6.png",c="/assets/flannel-actual-5fe13cb4.png",N="/assets/flannel-host-gw-02d9ef27.png",_="/assets/k8s-apiserver-access-control-overview-892cece9.svg",C="/assets/how-kubectl-be-authorized-d89f85b1.png",u="/assets/rbac-2-aafc0757.jpg",r="/assets/hpa-44684558.png",R="/assets/k8s-hpa-ms-6c0eb191.png",I="/assets/hap-flow-2a01dada.webp",S="/assets/kube-aggregation-77301a10.webp",A="/assets/custom-hpa-2de34879.webp",l="/assets/hpa-prometheus-custom-01081e27.png",$="/assets/pv-access-mode-c80b1b7a.webp",i="/assets/storage-class-5ed40ae1.png",z="/assets/ceph-art-381c8e1e.png",G="/assets/helm2-c4ca3dfb.jpg",p="/assets/helm3-85f4a2f7.jpg",M="/assets/harbor-architecture-365be95c.png",T={},E=t(`<h1 id="_14-03-docker-k8s教程-03进阶" tabindex="-1"><a class="header-anchor" href="#_14-03-docker-k8s教程-03进阶" aria-hidden="true">#</a> 14-03_Docker+k8s教程-03进阶</h1><h2 id="三、进阶" tabindex="-1"><a class="header-anchor" href="#三、进阶" aria-hidden="true">#</a> 三、进阶</h2><p>本章介绍Kubernetes的进阶内容,包含Kubernetes集群调度、CNI插件、认证授权安全体系、分布式存储的对接、Helm的使用等,让学员可以更加深入的学习Kubernetes的核心内容。</p><ul><li><p>ETCD数据的访问</p></li><li><p>kube-scheduler调度策略实践</p><ul><li>预选与优选流程</li><li>生产中常用的调度配置实践</li></ul></li><li><p>k8s集群网络模型</p><ul><li>CNI介绍及集群网络选型</li><li>Flannel网络模型的实现 <ul><li>vxlan Backend</li><li>hostgw Backend</li></ul></li></ul></li><li><p>集群认证与授权</p><ul><li>APIServer安全控制模型</li><li>Kubectl的认证授权</li><li>RBAC</li><li>kubelet的认证授权</li><li>Service Account</li></ul></li><li><p>使用Helm管理复杂应用的部署</p><ul><li>Helm工作原理详解</li><li>Helm的模板开发</li><li>实战：使用Helm部署Harbor仓库</li></ul></li><li><p>kubernetes对接分部式存储</p><ul><li><p>pv、pvc介绍</p></li><li><p>k8s集群如何使用cephfs作为分布式存储后端</p></li><li><p>利用storageClass实现动态存储卷的管理</p></li><li><p>实战：使用分部署存储实现有状态应用的部署</p></li></ul></li><li><p>本章知识梳理及回顾</p></li></ul><h4 id="etcd常用操作" tabindex="-1"><a class="header-anchor" href="#etcd常用操作" aria-hidden="true">#</a> ETCD常用操作</h4><p>拷贝etcdctl命令行工具：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti  etcd_container which etcdctl
$ docker <span class="token function">cp</span> etcd_container:<span class="token operator">/</span>usr/local/bin/etcdctl <span class="token operator">/</span>usr/bin/etcdctl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看etcd集群的成员节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ export ETCDCTL_API=3
$ etcdctl <span class="token operator">--</span>endpoints=https:<span class="token operator">/</span><span class="token operator">/</span><span class="token punctuation">[</span>127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1<span class="token punctuation">]</span>:2379 <span class="token operator">--</span>cacert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/ca<span class="token punctuation">.</span>crt <span class="token operator">--</span>cert=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>crt <span class="token operator">--</span>key=<span class="token operator">/</span>etc/kubernetes/pki/etcd/healthcheck-client<span class="token punctuation">.</span>key member list <span class="token operator">-</span>w table

$ alias etcdctl=<span class="token string">&#39;etcdctl --endpoints=https://[127.0.0.1]:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt --key=/etc/kubernetes/pki/etcd/healthcheck-client.key&#39;</span>

$ etcdctl member list <span class="token operator">-</span>w table
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看etcd集群节点状态：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ etcdctl endpoint status <span class="token operator">-</span>w table

$ etcdctl endpoint health <span class="token operator">-</span>w table
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置key值:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ etcdctl put nohi 1
$ etcdctl get nohi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看所有key值：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$  etcdctl get <span class="token operator">/</span> <span class="token operator">--</span>prefix <span class="token operator">--</span>keys-only
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看具体的key对应的数据：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ etcdctl get <span class="token operator">/</span>registry/pods/jenkins/sonar-postgres-7fc5d748b6-gtmsb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加定时任务做数据快照（重要！）</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ etcdctl snapshot save \`hostname\`<span class="token operator">-</span>etcd_\`date <span class="token operator">+</span><span class="token operator">%</span>Y%m%d%H%M\`<span class="token punctuation">.</span>db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>恢复快照：</p><ol><li><p>停止etcd和apiserver</p></li><li><p>移走当前数据目录</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">mv</span> <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/etcd/ <span class="token operator">/</span>tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>恢复快照</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ etcdctl snapshot restore \`hostname\`<span class="token operator">-</span>etcd_\`date <span class="token operator">+</span><span class="token operator">%</span>Y%m%d%H%M\`<span class="token punctuation">.</span>db <span class="token operator">--</span><span class="token keyword">data</span><span class="token operator">-</span><span class="token function">dir</span>=<span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/etcd/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>集群恢复</p><p>https://github.com/etcd-io/etcd/blob/master/Documentation/op-guide/recovery.md</p></li></ol><h4 id="kubernetes调度" tabindex="-1"><a class="header-anchor" href="#kubernetes调度" aria-hidden="true">#</a> Kubernetes调度</h4><h6 id="为何要控制pod应该如何调度" tabindex="-1"><a class="header-anchor" href="#为何要控制pod应该如何调度" aria-hidden="true">#</a> 为何要控制Pod应该如何调度</h6><ul><li>集群中有些机器的配置高（SSD,更好的内存等）,我们希望核心的服务（比如说数据库）运行在上面</li><li>某两个服务的网络传输很频繁,我们希望它们最好在同一台机器上</li></ul><p>Kubernetes Scheduler 的作用是将待调度的 Pod 按照一定的调度算法和策略绑定到集群中一个合适的 Worker Node 上,并将绑定信息写入到 etcd 中,之后目标 Node 中 kubelet 服务通过 API Server 监听到 Scheduler 产生的 Pod 绑定事件获取 Pod 信息,然后下载镜像启动容器。</p><p><img src="`+b+'" alt=""></p><h6 id="调度的过程" tabindex="-1"><a class="header-anchor" href="#调度的过程" aria-hidden="true">#</a> 调度的过程</h6><p>Scheduler 提供的调度流程分为预选 (Predicates) 和优选 (Priorities) 两个步骤：</p><ul><li>预选,K8S会遍历当前集群中的所有 Node,筛选出其中符合要求的 Node 作为候选</li><li>优选,K8S将对候选的 Node 进行打分</li></ul><p>经过预选筛选和优选打分之后,K8S选择分数最高的 Node 来运行 Pod,如果最终有多个 Node 的分数最高,那么 Scheduler 将从当中随机选择一个 Node 来运行 Pod。</p><p><img src="'+o+'" alt=""></p><p>预选：</p><p><img src="'+h+'" alt=""></p><p>优选：</p><p><img src="'+g+`" alt=""></p><h6 id="cordon" tabindex="-1"><a class="header-anchor" href="#cordon" aria-hidden="true">#</a> Cordon</h6><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># cordon 不可调度  drain 驱逐  uncordon-恢复调度</span>
$ kubectl cordon k8s-worker2
$ kubectl drain k8s-worker2
<span class="token comment"># 恢复</span>
$ kubectl uncordon k8s-worker2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="nodeselector" tabindex="-1"><a class="header-anchor" href="#nodeselector" aria-hidden="true">#</a> NodeSelector</h6><p><code>label</code>是<code>kubernetes</code>中一个非常重要的概念,用户可以非常灵活的利用 label 来管理集群中的资源,POD 的调度可以根据节点的 label 进行特定的部署。</p><p>查看节点的label：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">--</span><span class="token function">show-labels</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为节点打label：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl label node k8s-master disktype=ssd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当 node 被打上了相关标签后,在调度的时候就可以使用这些标签了,只需要在spec 字段中添加<code>nodeSelector</code>字段,里面是我们需要被调度的节点的 label。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>	<span class="token comment"># 声明pod的网络模式为host模式,效果通docker run --net=host</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>   <span class="token comment"># 使用节点选择器将Pod调度到指定label的节点</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  	<span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.136.10<span class="token punctuation">:</span>5000/demo/mysql<span class="token punctuation">:</span><span class="token number">5.7</span>
<span class="token punctuation">...</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="nodeaffinity" tabindex="-1"><a class="header-anchor" href="#nodeaffinity" aria-hidden="true">#</a> nodeAffinity</h6><p>节点亲和性 , 比上面的<code>nodeSelector</code>更加灵活,它可以进行一些简单的逻辑组合,不只是简单的相等匹配 。分为两种,硬策略和软策略。</p><p>requiredDuringSchedulingIgnoredDuringExecution ： 硬策略,如果没有满足条件的节点的话,就不断重试直到满足条件为止,简单说就是你必须满足我的要求,不然我就不会调度Pod。</p><p>preferredDuringSchedulingIgnoredDuringExecution：软策略,如果你没有满足调度要求的节点的话,Pod就会忽略这条规则,继续完成调度过程,说白了就是满足条件最好了,没有满足就忽略掉的策略。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#要求 Pod 不能运行在128和132两个节点上,如果有节点满足disktype=ssd或者sas的话就优先调度到这类节点上</span>
<span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> demo
        <span class="token key atrule">image</span><span class="token punctuation">:</span> 192.168.136.10<span class="token punctuation">:</span>5000/demo/myblog<span class="token punctuation">:</span>v1
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
            <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
                <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> kubernetes.io/hostname
                      <span class="token key atrule">operator</span><span class="token punctuation">:</span> NotIn
                      <span class="token key atrule">values</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> 10.0.0.1838
                        <span class="token punctuation">-</span> 192.168.136.132
                        
            <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
                  <span class="token key atrule">preference</span><span class="token punctuation">:</span>
                    <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> disktype
                      <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                      <span class="token key atrule">values</span><span class="token punctuation">:</span>
                        <span class="token punctuation">-</span> ssd
                        <span class="token punctuation">-</span> sas
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的匹配逻辑是 label 的值在某个列表中,现在<code>Kubernetes</code>提供的操作符有下面的几种：</p><ul><li>In：label 的值在某个列表中</li><li>NotIn：label 的值不在某个列表中</li><li>Gt：label 的值大于某个值</li><li>Lt：label 的值小于某个值</li><li>Exists：某个 label 存在</li><li>DoesNotExist：某个 label 不存在</li></ul><p><em>如果nodeSelectorTerms下面有多个选项的话,满足任何一个条件就可以了；如果matchExpressions有多个选项的话,则必须同时满足这些条件才能正常调度 Pod</em></p><h6 id="污点-taints-与容忍-tolerations" tabindex="-1"><a class="header-anchor" href="#污点-taints-与容忍-tolerations" aria-hidden="true">#</a> 污点（Taints）与容忍（tolerations）</h6><p>对于<code>nodeAffinity</code>无论是硬策略还是软策略方式,都是调度 Pod 到预期节点上,而<code>Taints</code>恰好与之相反,如果一个节点标记为 Taints ,除非 Pod 也被标识为可以容忍污点节点,否则该 Taints 节点不会被调度Pod。</p><p>Taints(污点)是Node的一个属性,设置了Taints(污点)后,因为有了污点,所以Kubernetes是不会将Pod调度到这个Node上的。于是Kubernetes就给Pod设置了个属性Tolerations(容忍),只要Pod能够容忍Node上的污点,那么Kubernetes就会忽略Node上的污点,就能够(不是必须)把Pod调度过去。</p><p>场景一：私有云服务中,某业务使用GPU进行大规模并行计算。为保证性能,希望确保该业务对服务器的专属性,避免将普通业务调度到部署GPU的服务器。</p><p>场景二：用户希望把 Master 节点保留给 Kubernetes 系统组件使用,或者把一组具有特殊资源预留给某些 Pod,则污点就很有用了,Pod 不会再被调度到 taint 标记过的节点。taint 标记节点举例如下：</p><p>设置污点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl taint node <span class="token namespace">[node_name]</span> key=value:<span class="token namespace">[effect]</span>   
      其中<span class="token namespace">[effect]</span> 可取值： <span class="token punctuation">[</span> NoSchedule <span class="token punctuation">|</span> PreferNoSchedule <span class="token punctuation">|</span> NoExecute <span class="token punctuation">]</span>
       NoSchedule：一定不能被调度。
       PreferNoSchedule：尽量不要调度。
       NoExecute：不仅不会调度<span class="token punctuation">,</span>还会驱逐Node上已有的Pod。
  示例：kubectl taint node k8s-worder1 smoke=true:NoSchedule

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>去除污点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>去除指定key及其effect：
     kubectl taint nodes <span class="token namespace">[node_name]</span> key:<span class="token namespace">[effect]</span><span class="token operator">-</span>    <span class="token comment">#这里的key不用指定value</span>
                
 去除指定key所有的effect: 
     kubectl taint nodes node_name key-
 
 示例：
     kubectl taint node k8s-master smoke=true:NoSchedule
     kubectl taint node k8s-master smoke:NoExecute-
     kubectl taint node k8s-master smoke-

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>污点演示：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 给k8s-worder1打上污点,smoke=true:NoSchedule</span>
$ kubectl taint node k8s-worder1 smoke=true:NoSchedule
$ kubectl taint node k8s-worker2 drunk=true:NoSchedule


<span class="token comment">## 扩容myblog的Pod,观察新Pod的调度情况</span>
$ kuebctl <span class="token operator">-</span>n nohi scale deploy myblog <span class="token operator">--</span>replicas=3
$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>w    <span class="token comment">## pending</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Pod容忍污点示例：<code>myblog/deployment/deploy-myblog-taint.yaml</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
spec:
      containers:
      <span class="token operator">-</span> name: demo
        image: 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>10:5000/demo/myblog:v1
      tolerations: <span class="token comment">#设置容忍性</span>
      <span class="token operator">-</span> key: <span class="token string">&quot;smoke&quot;</span> 
        operator: <span class="token string">&quot;Equal&quot;</span>  <span class="token comment">#如果操作符为Exists,那么value属性可省略,不指定operator,默认为Equal</span>
        value: <span class="token string">&quot;true&quot;</span>
        effect: <span class="token string">&quot;NoSchedule&quot;</span>
      <span class="token operator">-</span> key: <span class="token string">&quot;drunk&quot;</span> 
        operator: <span class="token string">&quot;Exists&quot;</span>  <span class="token comment">#如果操作符为Exists,那么value属性可省略,不指定operator,默认为Equal</span>
	  <span class="token comment">#意思是这个Pod要容忍的有污点的Node的key是smoke Equal true,效果是NoSchedule,</span>
      <span class="token comment">#tolerations属性下各值必须使用引号,容忍的值都是设置Node的taints时给的值。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl apply <span class="token operator">-</span>f deploy-myblog-taint<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>spec:
      containers:
      <span class="token operator">-</span> name: demo
        image: 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>10:5000/demo/myblog
      tolerations:
        <span class="token operator">-</span> operator: <span class="token string">&quot;Exists&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证NoExecute效果</p><h4 id="kubernetes集群的网络实现" tabindex="-1"><a class="header-anchor" href="#kubernetes集群的网络实现" aria-hidden="true">#</a> Kubernetes集群的网络实现</h4><h5 id="cni介绍及集群网络选型" tabindex="-1"><a class="header-anchor" href="#cni介绍及集群网络选型" aria-hidden="true">#</a> CNI介绍及集群网络选型,</h5><p>CSI</p><p>容器网络接口（Container Network Interface）,实现kubernetes集群的Pod网络通信及管理。包括：</p><ul><li>CNI Plugin负责给容器配置网络,它包括两个基本的接口： 配置网络: AddNetwork(net NetworkConfig, rt RuntimeConf) (types.Result, error) 清理网络: DelNetwork(net NetworkConfig, rt RuntimeConf) error</li><li>IPAM Plugin负责给容器分配IP地址,主要实现包括host-local和dhcp。</li></ul><p>以上两种插件的支持,使得k8s的网络可以支持各式各样的管理模式,当前在业界也出现了大量的支持方案,其中比较流行的比如flannel、calico等。</p><p>kubernetes配置了cni网络插件后,其容器网络创建流程为：</p>`,76),W=n("li",null,"kubelet先创建pause容器生成对应的network namespace",-1),U=n("li",null,"调用网络driver,因为配置的是CNI,所以会调用CNI相关代码,识别CNI的配置目录为/etc/cni/net.d",-1),O={href:"https://github.com/containernetworking/plugins",target:"_blank",rel:"noopener noreferrer"},L=n("li",null,"CNI插件给pause容器配置正确的网络,pod中其他的容器都是用pause的网络",-1),Z=t(`<p>可以在此查看社区中的CNI实现,https://github.com/containernetworking/cni</p><p>通用类型：flannel、calico等,部署使用简单</p><p>其他：根据具体的网络环境及网络需求选择,比如</p><ul><li>公有云机器,可以选择厂商与网络插件的定制Backend,如AWS、阿里、腾讯针对flannel均有自己的插件,也有AWS ECS CNI</li><li>私有云厂商,比如Vmware NSX-T等</li><li>网络性能等,MacVlan</li></ul><h5 id="flannel网络模型实现剖析" tabindex="-1"><a class="header-anchor" href="#flannel网络模型实现剖析" aria-hidden="true">#</a> Flannel网络模型实现剖析</h5><p>flannel实现overlay,underlay网络通常有多种实现：</p><ul><li>udp</li><li>vxlan</li><li>host-gw</li><li>...</li></ul><p>不特殊指定的话,默认会使用vxlan技术作为Backend,可以通过如下查看：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-system exec  kube-flannel-ds-amd64-cb7hs <span class="token function">cat</span> <span class="token operator">/</span>etc/kube-flannel/net-conf<span class="token punctuation">.</span>json
<span class="token punctuation">{</span>
  <span class="token string">&quot;Network&quot;</span>: <span class="token string">&quot;10.244.0.0/16&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;Backend&quot;</span>: <span class="token punctuation">{</span>
    <span class="token string">&quot;Type&quot;</span>: <span class="token string">&quot;vxlan&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="vxlan介绍及点对点通信的实现" tabindex="-1"><a class="header-anchor" href="#vxlan介绍及点对点通信的实现" aria-hidden="true">#</a> vxlan介绍及点对点通信的实现</h6><p>VXLAN 全称是虚拟可扩展的局域网（ Virtual eXtensible Local Area Network）,它是一种 overlay 技术,通过三层的网络来搭建虚拟的二层网络。</p><p><img src="`+y+'" alt=""></p><p>它创建在原来的 IP 网络（三层）上,只要是三层可达（能够通过 IP 互相通信）的网络就能部署 vxlan。在每个端点上都有一个 vtep 负责 vxlan 协议报文的封包和解包,也就是在虚拟报文上封装 vtep 通信的报文头部。物理网络上可以创建多个 vxlan 网络,这些 vxlan 网络可以认为是一个隧道,不同节点的虚拟机能够通过隧道直连。每个 vxlan 网络由唯一的 VNI 标识,不同的 vxlan 可以不相互影响。</p><ul><li>VTEP（VXLAN Tunnel Endpoints）：vxlan 网络的边缘设备,用来进行 vxlan 报文的处理（封包和解包）。vtep 可以是网络设备（比如交换机）,也可以是一台机器（比如虚拟化集群中的宿主机）</li><li>VNI（VXLAN Network Identifier）：VNI 是每个 vxlan 的标识,一共有 2^24 = 16,777,216,一般每个 VNI 对应一个租户,也就是说使用 vxlan 搭建的公有云可以理论上可以支撑千万级别的租户</li></ul><p>演示：在k8s-worder1和k8s-worker2两台机器间,利用vxlan的点对点能力,实现虚拟二层网络的通信</p><p><img src="'+f+`" alt=""></p><p>k8s-worder1节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建vTEP设备,对端指向k8s-worker2节点,指定VNI及underlay网络使用的网卡</span>
$ ip link add vxlan20 <span class="token function">type</span> vxlan id 20 remote 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>183 dstport 4789 dev ens192

$ ip <span class="token operator">-</span>d link show vxlan20

<span class="token comment"># 启动设备</span>
$ ip link <span class="token function">set</span> vxlan20 up 

<span class="token comment"># 设置ip地址</span>
ip addr add 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>136<span class="token punctuation">.</span>11/24 dev vxlan20

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>k8s-worker2节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建VTEP设备,对端指向k8s-worder1节点,指定VNI及underlay网络使用的网卡</span>
$ ip link add vxlan20 <span class="token function">type</span> vxlan id 20 remote 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182 dstport 4789 dev ens192

<span class="token comment"># 启动设备</span>
$ ip link <span class="token function">set</span> vxlan20 up 

<span class="token comment"># 设置ip地址</span>
$ ip addr add 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>136<span class="token punctuation">.</span>12/24 dev vxlan20

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在k8s-worder1节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ ping 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>136<span class="token punctuation">.</span>12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+x+`" alt=""></p><p>隧道是一个逻辑上的概念,在 vxlan 模型中并没有具体的物理实体想对应。隧道可以看做是一种虚拟通道,vxlan 通信双方（图中的虚拟机）认为自己是在直接通信,并不知道底层网络的存在。从整体来说,每个 vxlan 网络像是为通信的虚拟机搭建了一个单独的通信通道,也就是隧道。</p><p>实现的过程：</p><p>虚拟机的报文通过 vtep 添加上 vxlan 以及外部的报文层,然后发送出去,对方 vtep 收到之后拆除 vxlan 头部然后根据 VNI 把原始报文发送到目的虚拟机。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 查看k8s-worder1主机路由</span>
$ route <span class="token operator">-</span>n
10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>136<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 vxlan20

<span class="token comment"># 到了vxlan的设备后,</span>
$ ip <span class="token operator">-</span>d link show vxlan20
    vxlan id 20 remote 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>183 dev ens192 srcport 0 0 dstport 4789 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 查看fdb地址表,主要由MAC地址、VLAN号、端口号和一些标志域等信息组成,vtep 对端地址为 10.0.0.183,换句话说,如果接收到的报文添加上 vxlan 头部之后都会发到 10.0.0.183</span>
$ bridge fdb show<span class="token punctuation">|</span>grep vxlan20
00:00:00:00:00:00 dev vxlan20 dst 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>183 via ens192 self permanent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在k8s-worker2机器抓包,查看vxlan封装后的包:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 在k8s-worker2机器执行</span>
$ tcpdump <span class="token operator">-</span>i ens192 host 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182 <span class="token operator">-</span>w vxlan<span class="token punctuation">.</span>cap

<span class="token comment"># 在k8s-worder1机器执行</span>
$ ping 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>136<span class="token punctuation">.</span>12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用wireshark分析ICMP类型的数据包</p><h6 id="跨主机容器网络的通信" tabindex="-1"><a class="header-anchor" href="#跨主机容器网络的通信" aria-hidden="true">#</a> 跨主机容器网络的通信</h6><p><img src="`+q+'" alt=""></p><p>思考：容器网络模式下,vxlan设备该接在哪里？</p><p>基本的保证：目的容器的流量要通过vtep设备进行转发！</p><p><img src="'+w+`" alt=""></p><p>演示：利用vxlan实现跨主机容器网络通信</p><p>为了不影响已有的网络,因此创建一个新的网桥,创建容器接入到新的网桥来演示效果</p><p>在k8s-worder1节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker network <span class="token function">ls</span>

<span class="token comment"># 创建新网桥,指定cidr段</span>
$ docker network create <span class="token operator">--</span>subnet 172<span class="token punctuation">.</span>18<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16  network-nohi
$ docker network <span class="token function">ls</span>

<span class="token comment"># 新建容器,接入到新网桥</span>
$ docker run <span class="token operator">-</span>d <span class="token operator">--</span>name vxlan-test <span class="token operator">--</span>net network-nohi <span class="token operator">--</span>ip 172<span class="token punctuation">.</span>18<span class="token punctuation">.</span>0<span class="token punctuation">.</span>2 nginx:alpine

$ docker exec vxlan-test ifconfig

$ brctl show network-nohi

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在k8s-worker2节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建新网桥,指定cidr段</span>
$ docker network create <span class="token operator">--</span>subnet 172<span class="token punctuation">.</span>18<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16  network-nohi

<span class="token comment"># 新建容器,接入到新网桥</span>
$ docker run <span class="token operator">-</span>d <span class="token operator">--</span>name vxlan-test <span class="token operator">--</span>net network-nohi <span class="token operator">--</span>ip 172<span class="token punctuation">.</span>18<span class="token punctuation">.</span>0<span class="token punctuation">.</span>3 nginx:alpine


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时执行ping测试：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker exec vxlan-test ping 172<span class="token punctuation">.</span>18<span class="token punctuation">.</span>0<span class="token punctuation">.</span>3

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：数据到了网桥后,出不去。结合前面的示例,因此应该将流量由vtep设备转发,联想到网桥的特性,接入到桥中的端口,会由网桥负责转发数据,因此,相当于所有容器发出的数据都会经过到vxlan的端口,vxlan将流量转到对端的vtep端点,再次由网桥负责转到容器中。</p><p><img src="`+P+`" alt=""></p><p>k8s-worder1节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 删除旧的vtep</span>
$ ip link <span class="token function">del</span> vxlan20

<span class="token comment"># 新建vtep</span>
$ ip link add vxlan_docker <span class="token function">type</span> vxlan id 100 remote 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>183 dstport 4789 dev ens192
$ ip link <span class="token function">set</span> vxlan_docker up
<span class="token comment"># 不用设置ip,因为目标是可以转发容器的数据即可</span>

<span class="token comment"># 接入到网桥中</span>
$ brctl addif br-904603a72dcd vxlan_docker

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>k8s-worker2节点：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 删除旧的vtep</span>
$ ip link <span class="token function">del</span> vxlan20

<span class="token comment"># 新建vtep</span>
$ ip link add vxlan_docker <span class="token function">type</span> vxlan id 100 remote 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182 dstport 4789 dev ens192
$ ip link <span class="token function">set</span> vxlan_docker up
<span class="token comment"># 不用设置ip,因为目标是可以转发容器的数据即可</span>

<span class="token comment"># 接入到网桥中</span>
$ brctl addif br-c6660fe2dc53 vxlan_docker

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次执行ping测试：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker exec vxlan-test ping 172<span class="token punctuation">.</span>18<span class="token punctuation">.</span>0<span class="token punctuation">.</span>3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h6 id="flannel的vxlan实现精讲" tabindex="-1"><a class="header-anchor" href="#flannel的vxlan实现精讲" aria-hidden="true">#</a> Flannel的vxlan实现精讲</h6><p>思考：k8s集群的网络环境和手动实现的跨主机的容器通信有哪些差别？</p><ol><li>CNI要求,集群中的每个Pod都必须分配唯一的Pod IP</li><li>k8s集群内的通信不是vxlan点对点通信,因为集群内的所有节点之间都需要互联 <ul><li>没法创建点对点的vxlan模型</li></ul></li></ol><p><img src="`+V+`" alt=""></p><p>flannel如何为每个节点分配Pod地址段：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-system exec kube-flannel-ds-amd64-cb7hs <span class="token function">cat</span> <span class="token operator">/</span>etc/kube-flannel/net-conf<span class="token punctuation">.</span>json
<span class="token punctuation">{</span>
  <span class="token string">&quot;Network&quot;</span>: <span class="token string">&quot;10.244.0.0/16&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;Backend&quot;</span>: <span class="token punctuation">{</span>
    <span class="token string">&quot;Type&quot;</span>: <span class="token string">&quot;vxlan&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">#查看节点的pod ip</span>
<span class="token namespace">[root@k8s-master bin]</span><span class="token comment"># kd get po -o wide</span>
NAME                      READY   STATUS    RESTARTS   AGE     IP            NODE        
myblog-5d9ff54d4b-4rftt   1/1     Running   1          33h     10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19   k8s-worker2  
myblog-5d9ff54d4b-n447p   1/1     Running   1          33h     10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>32   k8s-worder1

<span class="token comment">#查看k8s-worder1主机分配的地址段</span>
$ <span class="token function">cat</span> <span class="token operator">/</span>run/flannel/subnet<span class="token punctuation">.</span>env
FLANNEL_NETWORK=10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16
FLANNEL_SUBNET=10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1/24
FLANNEL_MTU=1450
FLANNEL_IPMASQ=true

<span class="token comment"># kubelet启动容器的时候就可以按照本机的网段配置来为pod设置IP地址</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vtep的设备在哪：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ ip <span class="token operator">-</span>d link show flannel<span class="token punctuation">.</span>1
<span class="token comment"># 没有remote ip,非点对点</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Pod的流量如何转到vtep设备中</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ brctl show cni0

<span class="token comment"># 每个Pod都会使用Veth pair来实现流量转到cni0网桥</span>

$ route <span class="token operator">-</span>n
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 flannel<span class="token punctuation">.</span>1
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 cni0
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 flannel<span class="token punctuation">.</span>1

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>vtep封包的时候,如何拿到目的vetp端的IP及MAC信息</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># flanneld启动的时候会需要配置--iface=ens192,通过该配置可以将网卡的ip及Mac信息存储到ETCD中,</span>
<span class="token comment"># 这样,flannel就知道所有的节点分配的IP段及vtep设备的IP和MAC信息,而且所有节点的flanneld都可以感知到节点的添加和删除操作,就可以动态的更新本机的转发配置</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>演示跨主机Pod通信的流量详细过程：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>o wide
myblog-5d9ff54d4b-4rftt   1/1     Running   1          25h    10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19   k8s-worker2
myblog-5d9ff54d4b-n447p   1/1     Running   1          25h    10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>32   k8s-worder1

$ kubectl <span class="token operator">-</span>n nohi exec myblog-5d9ff54d4b-n447p <span class="token operator">--</span> ping 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19 <span class="token operator">-</span>c 2
PING 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19 <span class="token punctuation">(</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19<span class="token punctuation">)</span> 56<span class="token punctuation">(</span>84<span class="token punctuation">)</span> bytes of <span class="token keyword">data</span><span class="token punctuation">.</span>
64 bytes <span class="token keyword">from</span> 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19: icmp_seq=1 ttl=62 time=0<span class="token punctuation">.</span>480 ms
64 bytes <span class="token keyword">from</span> 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19: icmp_seq=2 ttl=62 time=1<span class="token punctuation">.</span>44 ms

<span class="token operator">--</span><span class="token operator">-</span> 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>19 ping statistics <span class="token operator">--</span><span class="token operator">-</span>
2 packets transmitted<span class="token punctuation">,</span> 2 received<span class="token punctuation">,</span> 0% packet loss<span class="token punctuation">,</span> time 1001ms
rtt min/avg/max/mdev = 0<span class="token punctuation">.</span>480/0<span class="token punctuation">.</span>961/1<span class="token punctuation">.</span>443/0<span class="token punctuation">.</span>482 ms

<span class="token comment"># 查看路由</span>
$ kubectl <span class="token operator">-</span>n nohi exec myblog-5d9ff54d4b-n447p <span class="token operator">--</span> route <span class="token operator">-</span>n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         UG    0      0        0 ens192
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>1      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0     UG    0      0        0 ens192
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 ens192

<span class="token comment"># 查看k8s-worder1 的veth pair 和网桥</span>
$ brctl show
bridge name     bridge id               STP enabled     interfaces
cni0            8000<span class="token punctuation">.</span>6a9a0b341d88       no              vens19248cc253
                                                        veth76f8e4ce
                                                        vetha4c972e1
<span class="token comment"># 流量到了cni0后,查看slave1节点的route</span>
$ route <span class="token operator">-</span>n
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>2   0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         UG    100    0        0 ens192
10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>136<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 vxlan20
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 flannel<span class="token punctuation">.</span>1
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 cni0
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 flannel<span class="token punctuation">.</span>1
172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0     U     0      0        0 docker0
192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>0   0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     100    0        0 ens192

<span class="token comment"># 流量转发到了flannel.1网卡,查看该网卡,其实是vtep设备</span>
$ ip <span class="token operator">-</span>d link show flannel<span class="token punctuation">.</span>1
4: flannel<span class="token punctuation">.</span>1: &lt;BROADCAST<span class="token punctuation">,</span>MULTICAST<span class="token punctuation">,</span>UP<span class="token punctuation">,</span>LOWER_UP&gt; mtu 1450 qdisc noqueue state UNKNOWN mode DEFAULT <span class="token function">group</span> default
    link/ether 8a:2a:89:4d:b0:31 brd ff:ff:ff:ff:ff:ff promiscuity 0
    vxlan id 1 local 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182 dev ens192 srcport 0 0 dstport 8472 nolearning ageing 300 noudpcsum noudp6zerocsumtx noudp6zerocsumrx addrgenmode eui64 numtxqueues 1 numrxqueues 1 gso_max_size 65536 gso_max_segs 65535

<span class="token comment"># 该转发到哪里,通过etcd查询数据,然后本地缓存,流量不用走多播发送</span>
$ bridge fdb show dev flannel<span class="token punctuation">.</span>1
a6:64:a0:a5:83:55 dst 192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>10 self permanent
86:c2:ad:4e:47:20 dst 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>183 self permanent

<span class="token comment"># 对端的vtep设备接收到请求后做解包,取出源payload内容,查看k8s-worker2的路由</span>
$ route <span class="token operator">-</span>n
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>2   0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         UG    100    0        0 ens192
10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>136<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 vxlan20
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 flannel<span class="token punctuation">.</span>1
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 flannel<span class="token punctuation">.</span>1
10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 cni0
172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0     U     0      0        0 docker0
192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>0   0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     100    0        0 ens192

<span class="token comment">#根据路由规则转发到cni0网桥,然后由网桥转到具体的Pod中</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实际的请求图：</p><p><img src="`+c+'" alt=""></p><ul><li>k8s-worder1 节点中的 pod-a（10.244.2.19）当中的 IP 包通过 pod-a 内的路由表被发送到ens192,进一步通过veth pair转到宿主机中的网桥 <code>cni0</code></li><li>到达 <code>cni0</code> 当中的 IP 包通过匹配节点 k8s-worder1 的路由表发现通往 10.244.2.19 的 IP 包应该交给 <code>flannel.1</code> 接口</li><li><code>flannel.1</code> 作为一个 VTEP 设备,收到报文后将按照 <code>VTEP</code> 的配置进行封包,第一次会查询ETCD,知道10.244.2.19的vtep设备是k8s-worker2机器,IP地址是10.0.0.183,拿到MAC 地址进行 VXLAN 封包。</li><li>通过节点 k8s-worker2 跟 k8s-worder1之间的网络连接,VXLAN 包到达 k8s-worker2 的 ens192 接口</li><li>通过端口 8472,VXLAN 包被转发给 VTEP 设备 <code>flannel.1</code> 进行解包</li><li>解封装后的 IP 包匹配节点 k8s-worker2 当中的路由表（10.244.2.0）,内核将 IP 包转发给<code>cni0</code></li><li><code>cni0</code>将 IP 包转发给连接在 <code>cni0</code> 上的 pod-b</li></ul><h6 id="利用host-gw模式提升集群网络性能" tabindex="-1"><a class="header-anchor" href="#利用host-gw模式提升集群网络性能" aria-hidden="true">#</a> 利用host-gw模式提升集群网络性能</h6><p>vxlan模式适用于三层可达的网络环境,对集群的网络要求很宽松,但是同时由于会通过VTEP设备进行额外封包和解包,因此给性能带来了额外的开销。</p><p>网络插件的目的其实就是将本机的cni0网桥的流量送到目的主机的cni0网桥。实际上有很多集群是部署在同一二层网络环境下的,可以直接利用二层的主机当作流量转发的网关。这样的话,可以不用进行封包解包,直接通过路由表去转发流量。</p><p><img src="'+N+`" alt=""></p><p>为什么三层可达的网络不直接利用网关转发流量？</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>内核当中的路由规则<span class="token punctuation">,</span>网关必须在跟主机当中至少一个 IP 处于同一网段。
由于k8s集群内部各节点均需要实现Pod互通<span class="token punctuation">,</span>因此<span class="token punctuation">,</span>也就意味着host-gw模式需要整个集群节点都在同一二层网络内。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>整个集群节点都在同一二层网络内,使用host-gw,处理更快</strong></p><p>修改flannel的网络后端：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-flannel edit cm kube-flannel-cfg
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
net-conf<span class="token punctuation">.</span>json: <span class="token punctuation">|</span>
    <span class="token punctuation">{</span>
      <span class="token string">&quot;Network&quot;</span>: <span class="token string">&quot;10.244.0.0/16&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;Backend&quot;</span>: <span class="token punctuation">{</span>
        <span class="token string">&quot;Type&quot;</span>: <span class="token string">&quot;host-gw&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
kind: ConfigMap
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重建Flannel的Pod</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-flannel get po <span class="token punctuation">|</span>grep flannel
kube-flannel-ds-2kmtp   1/1     Running   3 <span class="token punctuation">(</span>5d9h ago<span class="token punctuation">)</span>    7d5h
kube-flannel-ds-hzf7t   1/1     Running   22 <span class="token punctuation">(</span>5d9h ago<span class="token punctuation">)</span>   7d7h
kube-flannel-ds-qz76g   1/1     Running   0               5d6h

$ kubectl <span class="token operator">-</span>n kube-flannel delete po kube-flannel-ds-1<span class="token punctuation">.</span><span class="token punctuation">.</span> kube-flannel-ds-2<span class="token punctuation">.</span><span class="token punctuation">.</span> kube-flannel-ds-3<span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 等待Pod新启动后,查看日志,出现Backend type: host-gw字样</span>
$  kubectl <span class="token operator">-</span>n kube-system logs <span class="token operator">-</span>f kube-flannel-ds-amd64-4hjdw
I0704 01:18:11<span class="token punctuation">.</span>916374       1 kube<span class="token punctuation">.</span>go:126<span class="token punctuation">]</span> Waiting 10m0s <span class="token keyword">for</span> node controller to sync
I0704 01:18:11<span class="token punctuation">.</span>916579       1 kube<span class="token punctuation">.</span>go:309<span class="token punctuation">]</span> Starting kube subnet manager
I0704 01:18:12<span class="token punctuation">.</span>917339       1 kube<span class="token punctuation">.</span>go:133<span class="token punctuation">]</span> Node controller sync successful
I0704 01:18:12<span class="token punctuation">.</span>917848       1 main<span class="token punctuation">.</span>go:247<span class="token punctuation">]</span> Installing signal handlers
I0704 01:18:12<span class="token punctuation">.</span>918569       1 main<span class="token punctuation">.</span>go:386<span class="token punctuation">]</span> Found network config <span class="token operator">-</span> Backend <span class="token function">type</span>: host-gw
I0704 01:18:13<span class="token punctuation">.</span>017841       1 main<span class="token punctuation">.</span>go:317<span class="token punctuation">]</span> Wrote subnet file to <span class="token operator">/</span>run/flannel/subnet<span class="token punctuation">.</span>env

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看节点路由表：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token namespace">[root@k8s-master ~]</span><span class="token comment"># route -n</span>
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1        0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         UG    100    0        0 ens192
10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0        0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     100    0        0 ens192
10<span class="token punctuation">.</span>224<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   U     0      0        0 cni0
10<span class="token punctuation">.</span>224<span class="token punctuation">.</span>1<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 ens192
10<span class="token punctuation">.</span>224<span class="token punctuation">.</span>2<span class="token punctuation">.</span>0      10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>183      255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0   UG    0      0        0 ens192
172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0     U     0      0        0 docker0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>k8s-worder1 节点中的 pod-a（10.244.2.19）当中的 IP 包通过 pod-a 内的路由表被发送到ens192,进一步通过veth pair转到宿主机中的网桥 <code>cni0</code></li><li>到达 <code>cni0</code> 当中的 IP 包通过匹配节点 k8s-worder1 的路由表发现通往 10.244.2.19 的 IP 包应该使用10.0.0.183这个网关进行转发</li><li>包到达k8s-worker2节点（10.0.0.183）节点的ens192网卡,根据该节点的路由规则,转发给cni0网卡</li><li><code>cni0</code>将 IP 包转发给连接在 <code>cni0</code> 上的 pod-b</li></ul><h4 id="kubernetes认证与授权" tabindex="-1"><a class="header-anchor" href="#kubernetes认证与授权" aria-hidden="true">#</a> Kubernetes认证与授权</h4><h6 id="apiserver安全控制" tabindex="-1"><a class="header-anchor" href="#apiserver安全控制" aria-hidden="true">#</a> APIServer安全控制</h6><p><img src="`+_+'" alt=""></p>',85),D=t("<li><p>Authentication：身份认证</p><ol><li><p>这个环节它面对的输入是整个<code>http request</code>,负责对来自client的请求进行身份校验,支持的方法包括:</p><ul><li><p><code>basic auth</code></p></li><li><p>client证书验证（https双向验证）</p></li><li><p><code>jwt token</code>(用于serviceaccount)</p></li></ul></li><li><p>APIServer启动时,可以指定一种Authentication方法,也可以指定多种方法。如果指定了多种方法,那么APIServer将会逐个使用这些方法对客户端请求进行验证, 只要请求数据通过其中一种方法的验证,APIServer就会认为Authentication成功；</p></li><li><p>使用kubeadm引导启动的k8s集群,apiserver的初始配置中,默认支持<code>client证书</code>验证和<code>serviceaccount</code>两种身份验证方式。 证书认证通过设置<code>--client-ca-file</code>根证书以及<code>--tls-cert-file</code>和<code>--tls-private-key-file</code>来开启。</p></li><li><p>在这个环节,apiserver会通过client证书或 <code>http header</code>中的字段(比如serviceaccount的<code>jwt token</code>)来识别出请求的<code>用户身份</code>,包括”user”、”group”等,这些信息将在后面的<code>authorization</code>环节用到。</p></li></ol></li><li><p>Authorization：鉴权,你可以访问哪些资源</p><ol><li><p>这个环节面对的输入是<code>http request context</code>中的各种属性,包括：<code>user</code>、<code>group</code>、<code>request path</code>（比如：<code>/api/v1</code>、<code>/healthz</code>、<code>/version</code>等）、 <code>request verb</code>(比如：<code>get</code>、<code>list</code>、<code>create</code>等)。</p></li><li><p>APIServer会将这些属性值与事先配置好的访问策略(<code>access policy</code>）相比较。APIServer支持多种<code>authorization mode</code>,包括<code>Node、RBAC、Webhook</code>等。</p></li><li><p>APIServer启动时,可以指定一种<code>authorization mode</code>,也可以指定多种<code>authorization mode</code>,如果是后者,只要Request通过了其中一种mode的授权, 那么该环节的最终结果就是授权成功。在较新版本kubeadm引导启动的k8s集群的apiserver初始配置中,<code>authorization-mode</code>的默认配置是<code>”Node,RBAC”</code>。</p></li></ol></li>",2),j={href:"http://docs.kubernetes.org.cn/144.html",target:"_blank",rel:"noopener noreferrer"},H=t(`<ul><li><p>为什么需要？</p><p>认证与授权获取 http 请求 header 以及证书,无法通过body内容做校验。</p><p>Admission 运行在 API Server 的增删改查 handler 中,可以自然地操作 API resource</p></li><li><p>举个栗子</p><ul><li><p>以NamespaceLifecycle为例, 该插件确保处于Termination状态的Namespace不再接收新的对象创建请求,并拒绝请求不存在的Namespace。该插件还可以防止删除系统保留的Namespace:default,kube-system,kube-public。</p></li><li><p>LimitRanger,若集群的命名空间设置了LimitRange对象,若Pod声明时未设置资源值,则按照LimitRange的定义来未Pod添加默认值</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> LimitRange
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mem<span class="token punctuation">-</span>limit<span class="token punctuation">-</span>range
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">limits</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">default</span><span class="token punctuation">:</span>
      <span class="token key atrule">memory</span><span class="token punctuation">:</span> 512Mi
    <span class="token key atrule">defaultRequest</span><span class="token punctuation">:</span>
      <span class="token key atrule">memory</span><span class="token punctuation">:</span> 256Mi
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Container
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>mem<span class="token punctuation">-</span>demo<span class="token punctuation">-</span><span class="token number">2</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>mem<span class="token punctuation">-</span>demo<span class="token punctuation">-</span>2<span class="token punctuation">-</span>ctr
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>NodeRestriction, 此插件限制kubelet修改Node和Pod对象,这样的kubelets只允许修改绑定到Node的Pod API对象,以后版本可能会增加额外的限制 。开启Node授权策略后,默认会打开该项</p></li></ul></li><li><p>怎么用？</p><p>APIServer启动时通过 <code>--enable-admission-plugins --disable-admission-plugins</code> 指定需要打开或者关闭的 Admission Controller</p></li><li><p>场景</p><ul><li>自动注入sidecar容器或者initContainer容器</li><li>webhook admission,实现业务自定义的控制需求</li></ul></li></ul>`,1),Y=t(`<h6 id="kubectl的认证授权" tabindex="-1"><a class="header-anchor" href="#kubectl的认证授权" aria-hidden="true">#</a> kubectl的认证授权</h6><p>kubectl的日志调试级别：</p><table><thead><tr><th style="text-align:left;">信息</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">v=0</td><td style="text-align:left;">通常,这对操作者来说总是可见的。</td></tr><tr><td style="text-align:left;">v=1</td><td style="text-align:left;">当您不想要很详细的输出时,这个是一个合理的默认日志级别。</td></tr><tr><td style="text-align:left;">v=2</td><td style="text-align:left;">有关服务和重要日志消息的有用稳定状态信息,这些信息可能与系统中的重大更改相关。这是大多数系统推荐的默认日志级别。</td></tr><tr><td style="text-align:left;">v=3</td><td style="text-align:left;">关于更改的扩展信息。</td></tr><tr><td style="text-align:left;">v=4</td><td style="text-align:left;">调试级别信息。</td></tr><tr><td style="text-align:left;">v=6</td><td style="text-align:left;">显示请求资源。</td></tr><tr><td style="text-align:left;">v=7</td><td style="text-align:left;">显示 HTTP 请求头。</td></tr><tr><td style="text-align:left;">v=8</td><td style="text-align:left;">显示 HTTP 请求内容。</td></tr><tr><td style="text-align:left;">v=9</td><td style="text-align:left;">显示 HTTP 请求内容,并且不截断内容。</td></tr></tbody></table><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl get nodes <span class="token operator">-</span>v=7
I0329 20:20:08<span class="token punctuation">.</span>633065    3979 loader<span class="token punctuation">.</span>go:359<span class="token punctuation">]</span> Config loaded <span class="token keyword">from</span> file <span class="token operator">/</span>root/<span class="token punctuation">.</span>kube/config
I0329 20:20:08<span class="token punctuation">.</span>633797    3979 round_trippers<span class="token punctuation">.</span>go:416<span class="token punctuation">]</span> GET https:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>10:6443/api/v1/nodes?limit=500


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>kubeadm init</code>启动完master节点后,会默认输出类似下面的提示内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">..</span>. <span class="token punctuation">..</span>.
Your Kubernetes master has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:
  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
<span class="token punctuation">..</span>. <span class="token punctuation">..</span>.


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些信息是在告知我们如何配置<code>kubeconfig</code>文件。按照上述命令配置后,master节点上的<code>kubectl</code>就可以直接使用<code>$HOME/.kube/config</code>的信息访问<code>k8s cluster</code>了。 并且,通过这种配置方式,<code>kubectl</code>也拥有了整个集群的管理员(root)权限。</p><p>很多K8s初学者在这里都会有疑问：</p><ul><li>当<code>kubectl</code>使用这种<code>kubeconfig</code>方式访问集群时,<code>Kubernetes</code>的<code>kube-apiserver</code>是如何对来自<code>kubectl</code>的访问进行身份验证(<code>authentication</code>)和授权(<code>authorization</code>)的呢？</li><li>为什么来自<code>kubectl</code>的请求拥有最高的管理员权限呢？</li></ul><p>查看<code>/root/.kube/config</code>文件：</p><p>前面提到过apiserver的authentication支持通过<code>tls client certificate、basic auth、token</code>等方式对客户端发起的请求进行身份校验, 从kubeconfig信息来看,kubectl显然在请求中使用了<code>tls client certificate</code>的方式,即客户端的证书。</p><p>证书base64解码：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxxxxxxxxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d &gt; kubectl<span class="token punctuation">.</span>crt

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>说明在认证阶段,<code>apiserver</code>会首先使用<code>--client-ca-file</code>配置的CA证书去验证kubectl提供的证书的有效性,基本的方式 ：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$  openssl verify <span class="token operator">-</span>CAfile <span class="token operator">/</span>etc/kubernetes/pki/ca<span class="token punctuation">.</span>crt kubectl<span class="token punctuation">.</span>crt
kubectl<span class="token punctuation">.</span>crt: OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>除了认证身份,还会取出必要的信息供授权阶段使用,文本形式查看证书内容：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ openssl x509 <span class="token operator">-in</span> kubectl<span class="token punctuation">.</span>crt <span class="token operator">-</span>text
Certificate:
    <span class="token keyword">Data</span>:
        Version: 3 <span class="token punctuation">(</span>0x2<span class="token punctuation">)</span>
        Serial Number: 4736260165981664452 <span class="token punctuation">(</span>0x41ba9386f52b74c4<span class="token punctuation">)</span>
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN=kubernetes
        Validity
            Not Before: Feb 10 07:33:39 2020 GMT
            Not After : Feb  9 07:33:40 2021 GMT
        Subject: O=system:masters<span class="token punctuation">,</span> CN=kubernetes-admin
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>认证通过后,提取出签发证书时指定的CN(Common Name),<code>kubernetes-admin</code>,作为请求的用户名 (User Name), 从证书中提取O(Organization)字段作为请求用户所属的组 (Group),<code>group = system:masters</code>,然后传递给后面的授权模块。</p><p>kubeadm在init初始引导集群启动过程中,创建了许多默认的RBAC规则, 在k8s有关RBAC的官方文档中,我们看到下面一些<code>default clusterrole</code>列表:</p><p>其中第一个cluster-admin这个cluster role binding绑定了system:masters group,这和authentication环节传递过来的身份信息不谋而合。 沿着system:masters group对应的cluster-admin clusterrolebinding“追查”下去,真相就会浮出水面。</p><p>我们查看一下这一binding：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>$ kubectl describe clusterrolebinding cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Name</span><span class="token punctuation">:</span>         cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Labels</span><span class="token punctuation">:</span>       kubernetes.io/bootstrapping=rbac<span class="token punctuation">-</span>defaults
<span class="token key atrule">Annotations</span><span class="token punctuation">:</span>  <span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">Role</span><span class="token punctuation">:</span>
  <span class="token key atrule">Kind</span><span class="token punctuation">:</span>  ClusterRole
  <span class="token key atrule">Name</span><span class="token punctuation">:</span>  cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">Subjects</span><span class="token punctuation">:</span>
  Kind   Name            Namespace
  <span class="token punctuation">---</span><span class="token punctuation">-</span>   <span class="token punctuation">---</span><span class="token punctuation">-</span>            <span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span>
  Group  system<span class="token punctuation">:</span>masters



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到在kube-system名字空间中,一个名为cluster-admin的clusterrolebinding将cluster-admin cluster role与system:masters Group绑定到了一起, 赋予了所有归属于system:masters Group中用户cluster-admin角色所拥有的权限。</p><p>我们再来查看一下cluster-admin这个role的具体权限信息：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl describe clusterrole cluster-admin
Name:         cluster-admin
Labels:       kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations:  rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
  Resources  Non-Resource URLs  Resource Names  Verbs
  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
  <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span>        <span class="token punctuation">[</span><span class="token punctuation">]</span>                 <span class="token punctuation">[</span><span class="token punctuation">]</span>              <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>
             <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>                <span class="token punctuation">[</span><span class="token punctuation">]</span>              <span class="token punctuation">[</span><span class="token operator">*</span><span class="token punctuation">]</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非资源类,如查看集群健康状态。</p><p><img src="`+C+'" alt=""></p><h6 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h6>',28),B={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/",target:"_blank",rel:"noopener noreferrer"},F=t(`<p>查看开启：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># master节点查看apiserver进程</span>
$ <span class="token function">ps</span> aux <span class="token punctuation">|</span>grep apiserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>RBAC模式引入了4个资源类型：</p><ul><li><p>Role,角色</p><p>一个Role只能授权访问单个namespace</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 示例定义一个名为pod-reader的角色,该角色具有读取default这个命名空间下的pods的权限</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span> <span class="token comment"># &quot;&quot; indicates the core API group</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;pods&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>
  
<span class="token comment">## apiGroups: &quot;&quot;,&quot;apps&quot;, &quot;autoscaling&quot;, &quot;batch&quot;, kubectl api-versions</span>
<span class="token comment">## resources: &quot;services&quot;, &quot;pods&quot;,&quot;deployments&quot;... kubectl api-resources</span>
<span class="token comment">## verbs: &quot;get&quot;, &quot;list&quot;, &quot;watch&quot;, &quot;create&quot;, &quot;update&quot;, &quot;patch&quot;, &quot;delete&quot;, &quot;exec&quot;</span>

<span class="token comment">## https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ClusterRole</p><p>一个ClusterRole能够授予和Role一样的权限,但是它是集群范围内的。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 定义一个集群角色,名为secret-reader,该角色可以读取所有的namespace中的secret资源</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token comment"># &quot;namespace&quot; omitted since ClusterRoles are not namespaced</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;secrets&quot;</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">]</span>

<span class="token comment"># User,Group,ServiceAccount</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>Rolebinding</p><p>将role中定义的权限分配给用户和用户组。RoleBinding包含主题（users,groups,或service accounts）和授予角色的引用。对于namespace内的授权使用RoleBinding,集群范围内使用ClusterRoleBinding。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 定义一个角色绑定,将pod-reader这个role的权限授予给jane这个User,使得jane可以在读取default这个命名空间下的所有的pod数据</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>pods
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount <span class="token comment">#这里可以是User,Group,ServiceAccount</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>pod<span class="token punctuation">-</span>reader
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>  <span class="token comment"># 20230218 不支持 rbac.authorization.k8s.io</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role <span class="token comment">#这里可以是Role或者ClusterRole,若是ClusterRole,则权限也仅限于rolebinding的内部</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader <span class="token comment"># match the name of the Role or ClusterRole you wish to bind to</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>注意：rolebinding既可以绑定role,也可以绑定clusterrole,当绑定clusterrole的时候,subject的权限也会被限定于rolebinding定义的namespace内部,若想跨namespace,需要使用clusterrolebinding</em></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 定义一个角色绑定,将dave这个用户和secret-reader这个集群角色绑定,虽然secret-reader是集群角色,但是因为是使用rolebinding绑定的,因此dave的权限也会被限制在development这个命名空间内</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This role binding allows &quot;dave&quot; to read secrets in the &quot;development&quot; namespace.</span>
<span class="token comment"># You need to already have a ClusterRole named &quot;secret-reader&quot;.</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets
  <span class="token comment">#</span>
  <span class="token comment"># The namespace of the RoleBinding determines where the permissions are granted.</span>
  <span class="token comment"># This only grants permissions within the &quot;development&quot; namespace.</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> development
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dave <span class="token comment"># Name is case sensitive</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dave <span class="token comment"># Name is case sensitive</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>考虑一个场景： 如果集群中有多个namespace分配给不同的管理员,每个namespace的权限是一样的,就可以只定义一个clusterrole,然后通过rolebinding将不同的namespace绑定到管理员身上,否则就需要每个namespace定义一个Role,然后做一次rolebinding。</p></li><li><p>ClusterRolebingding</p><p>允许跨namespace进行授权</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token comment"># This cluster role binding allows anyone in the &quot;manager&quot; group to read secrets in any namespace.</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets<span class="token punctuation">-</span>global
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> Group
  <span class="token key atrule">name</span><span class="token punctuation">:</span> manager <span class="token comment"># Name is case sensitive</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p><img src="`+u+`" alt=""></p><h6 id="kubelet的认证授权" tabindex="-1"><a class="header-anchor" href="#kubelet的认证授权" aria-hidden="true">#</a> kubelet的认证授权</h6><p>查看kubelet进程</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ systemctl status kubelet
● kubelet<span class="token punctuation">.</span>service <span class="token operator">-</span> kubelet: The Kubernetes Node Agent
   Loaded: loaded <span class="token punctuation">(</span><span class="token operator">/</span>usr/lib/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">;</span> enabled<span class="token punctuation">;</span> vendor preset: disabled<span class="token punctuation">)</span>
  Drop-In: <span class="token operator">/</span>usr/lib/systemd/system/kubelet<span class="token punctuation">.</span>service<span class="token punctuation">.</span>d
           └─10-kubeadm<span class="token punctuation">.</span>conf
   Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Sun 2020-07-05 19:33:36 EDT<span class="token punctuation">;</span> 1 day 12h ago
     Docs: https:<span class="token operator">/</span><span class="token operator">/</span>kubernetes<span class="token punctuation">.</span>io/docs/
 Main PID: 10622 <span class="token punctuation">(</span>kubelet<span class="token punctuation">)</span>
    Tasks: 24
   Memory: 60<span class="token punctuation">.</span>5M
   CGroup: <span class="token operator">/</span>system<span class="token punctuation">.</span>slice/kubelet<span class="token punctuation">.</span>service
           └─851 <span class="token operator">/</span>usr/bin/kubelet <span class="token operator">--</span>bootstrap-kubeconfig=<span class="token operator">/</span>etc/kubernetes/bootstrap-kubelet<span class="token punctuation">.</span>conf <span class="token operator">--</span>kubeconfig=<span class="token operator">/</span>etc/kubernetes/kubelet<span class="token punctuation">.</span>conf



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看<code>/etc/kubernetes/kubelet.conf</code>,解析证书：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">echo</span> xxxxx <span class="token punctuation">|</span>base64 <span class="token operator">-</span>d &gt;kubelet<span class="token punctuation">.</span>crt
$ openssl x509 <span class="token operator">-in</span> kubelet<span class="token punctuation">.</span>crt <span class="token operator">-</span>text
Certificate:
    <span class="token keyword">Data</span>:
        Version: 3 <span class="token punctuation">(</span>0x2<span class="token punctuation">)</span>
        Serial Number: 9059794385454520113 <span class="token punctuation">(</span>0x7dbadafe23185731<span class="token punctuation">)</span>
    Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN=kubernetes
        Validity
            Not Before: Feb 10 07:33:39 2020 GMT
            Not After : Feb  9 07:33:40 2021 GMT
        Subject: O=system:nodes<span class="token punctuation">,</span> CN=system:node:master-1



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得到我们期望的内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Subject: <span class="token assign-left variable">O</span><span class="token operator">=</span>system:nodes, <span class="token assign-left variable">CN</span><span class="token operator">=</span>system:node:k8s-master

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们知道,k8s会把O作为Group来进行请求,因此如果有权限绑定给这个组,肯定在clusterrolebinding的定义中可以找得到。因此尝试去找一下绑定了system:nodes组的clusterrolebinding</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl get clusterrolebinding<span class="token punctuation">|</span>awk <span class="token string">&#39;NR&gt;1{print $1}&#39;</span><span class="token punctuation">|</span>xargs kubectl get clusterrolebinding <span class="token operator">-</span>oyaml<span class="token punctuation">|</span>grep <span class="token operator">-</span>n10 system:nodes
98-  roleRef:
99-    apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
100-    kind: ClusterRole
101-    name: system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
102-  subjects:
103-  <span class="token operator">-</span> apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
104-    kind: <span class="token function">Group</span>
105:    name: system:nodes
106-<span class="token operator">-</span> apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
107-  kind: ClusterRoleBinding
108-  metadata:
109-    creationTimestamp: <span class="token string">&quot;2020-02-10T07:34:02Z&quot;</span>
110-    name: kubeadm:node-proxier
111-    resourceVersion: <span class="token string">&quot;213&quot;</span>
112-    selfLink: <span class="token operator">/</span>apis/rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1/clusterrolebindings/kubeadm%3Anode-proxier

$ kubectl describe clusterrole system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Name:         system:certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io:certificatesigningrequests:selfnodeclient
Labels:       kubernetes<span class="token punctuation">.</span>io/bootstrapping=rbac-defaults
Annotations:  rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: true
PolicyRule:
  Resources                                                      Non-Resource URLs  Resource Names  Verbs
  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>                                                      <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>  <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
  certificatesigningrequests<span class="token punctuation">.</span>certificates<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/selfnodeclient  <span class="token punctuation">[</span><span class="token punctuation">]</span>                 <span class="token punctuation">[</span><span class="token punctuation">]</span>              <span class="token namespace">[create]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),J=n("code",null,"system:certificates.k8s.io:certificatesigningrequests:selfnodeclient",-1),X={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/#core-component-roles",target:"_blank",rel:"noopener noreferrer"},K=n("thead",null,[n("tr",null,[n("th",{style:{"text-align":"left"}},"Default ClusterRole"),n("th",{style:{"text-align":"left"}},"Default ClusterRoleBinding"),n("th",{style:{"text-align":"left"}},"Description")])],-1),Q=n("td",{style:{"text-align":"left"}},"system:kube-scheduler",-1),nn=n("td",{style:{"text-align":"left"}},"system:kube-scheduler user",-1),sn={style:{"text-align":"left"}},an={href:"https://kubernetes.io/docs/reference/generated/kube-scheduler/",target:"_blank",rel:"noopener noreferrer"},en=n("tr",null,[n("td",{style:{"text-align":"left"}},"system:volume-scheduler"),n("td",{style:{"text-align":"left"}},"system:kube-scheduler user"),n("td",{style:{"text-align":"left"}},"Allows access to the volume resources required by the kube-scheduler component.")],-1),tn=n("td",{style:{"text-align":"left"}},"system:kube-controller-manager",-1),ln=n("td",{style:{"text-align":"left"}},"system:kube-controller-manager user",-1),pn={style:{"text-align":"left"}},on={href:"https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/",target:"_blank",rel:"noopener noreferrer"},cn={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/#controller-roles",target:"_blank",rel:"noopener noreferrer"},un=n("td",{style:{"text-align":"left"}},"system:node",-1),rn=n("td",{style:{"text-align":"left"}},"None",-1),dn={style:{"text-align":"left"}},vn=n("strong",null,"including read access to all secrets, and write access to all pod status objects",-1),mn={href:"https://kubernetes.io/docs/reference/access-authn-authz/node/",target:"_blank",rel:"noopener noreferrer"},kn={href:"https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction",target:"_blank",rel:"noopener noreferrer"},bn=n("code",null,"system:node",-1),hn=n("code",null,"system:node",-1),gn=n("td",{style:{"text-align":"left"}},"system:node-proxier",-1),yn=n("td",{style:{"text-align":"left"}},"system:kube-proxy user",-1),fn={style:{"text-align":"left"}},xn={href:"https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/",target:"_blank",rel:"noopener noreferrer"},qn={href:"https://kubernetes.io/docs/reference/access-authn-authz/node/",target:"_blank",rel:"noopener noreferrer"},wn={href:"https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction",target:"_blank",rel:"noopener noreferrer"},Pn=t(`<p>我们目前使用1.16,查看一下授权策略：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">ps</span> axu<span class="token punctuation">|</span>grep apiserver
kube-apiserver <span class="token operator">--</span>authorization-mode=Node<span class="token punctuation">,</span>RBAC  <span class="token operator">--</span><span class="token function">enable-admission</span><span class="token operator">-</span>plugins=NodeRestriction


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看一下官网对Node authorizer的介绍：</p><p><em>Node authorization is a special-purpose authorization mode that specifically authorizes API requests made by kubelets.</em></p><p><em>In future releases, the node authorizer may add or remove permissions to ensure kubelets have the minimal set of permissions required to operate correctly.</em></p><p><em>In order to be authorized by the Node authorizer, kubelets must use a credential that identifies them as being in the <code>system:nodes</code> group, with a username of <code>system:node:&lt;nodeName&gt;</code></em></p><h6 id="service-account及k8s-api调用" tabindex="-1"><a class="header-anchor" href="#service-account及k8s-api调用" aria-hidden="true">#</a> Service Account及K8S Api调用</h6><p>前面说,认证可以通过证书,也可以通过使用ServiceAccount（服务账户）的方式来做认证。大多数时候,我们在基于k8s做二次开发时都是选择通过ServiceAccount + RBAC 的方式。我们之前访问dashboard的时候,是如何做的？</p><ul><li><p>20230225 笔记中未建dashboard,建政的脚本见原文件/第三天 Kubernetes进阶实践.md</p><p>以下内容做修改</p></li><li><p>20230225 操作后,发现环境并无 secrets</p></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">## 新建一个名为admin的serviceaccount,并且把名为cluster-admin的这个集群角色的权限授予新建的</span>
<span class="token comment">#serviceaccount</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">rbac.authorization.kubernetes.io/autoupdate</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们查看一下：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n default get sa admin <span class="token operator">-</span>o yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: <span class="token string">&quot;2020-04-01T11:59:21Z&quot;</span>
  name: admin
  namespace: kubernetes-dashboard
  resourceVersion: <span class="token string">&quot;1988878&quot;</span>
  selfLink: <span class="token operator">/</span>api/v1/namespaces/kubernetes-dashboard/serviceaccounts/admin
  uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f
secrets:
<span class="token operator">-</span> name: admin-token-lfsrf

<span class="token comment"># 20230218 kubectl -n default get sa admin -o yaml 命令结果如下：</span>
<span class="token comment"># 并无secrets</span>
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: <span class="token string">&quot;2023-02-18T02:46:20Z&quot;</span>
  name: admin
  namespace: default
  resourceVersion: <span class="token string">&quot;1312019&quot;</span>
  uid: c0ab742c-f791-46e2-b5bd-ee581735824f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意到serviceaccount上默认绑定了一个名为admin-token-lfsrf的secret,我们查看一下secret</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n default describe secret admin-token-lfsrf
Name:         admin-token-lfsrf
Namespace:    kubernetes-dashboard
Labels:       &lt;none&gt;
Annotations:  kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>name: admin
              kubernetes<span class="token punctuation">.</span>io/service-account<span class="token punctuation">.</span>uid: 639ecc3e-74d9-11ea-a59b-000c29dfd73f

<span class="token function">Type</span>:  kubernetes<span class="token punctuation">.</span>io/service-account-token
<span class="token keyword">Data</span>
====
ca<span class="token punctuation">.</span>crt:     1025 bytes
namespace:  4 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IiJ9<span class="token punctuation">.</span>eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZW1vIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFkbWluLXRva2VuLWxmc3JmIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiNjM5ZWNjM2UtNzRkOS0xMWVhLWE1OWItMDAwYzI5ZGZkNzNmIiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlbW86YWRtaW4ifQ<span class="token punctuation">.</span>ffGCU4L5LxTsMx3NcNixpjT6nLBi-pmstb4I-W61nLOzNaMmYSEIwAaugKMzNR-2VwM14WbuG04dOeO67niJeP6n8-ALkl-vineoYCsUjrzJ09qpM3TNUPatHFqyjcqJ87h4VKZEqk2qCCmLxB6AGbEHpVFkoge40vHs56cIymFGZLe53JZkhu3pwYuS4jpXytV30Ad-HwmQDUu_Xqcifni6tDYPCfKz2CZlcOfwqHeGIHJjDGVBKqhEeo8PhStoofBU6Y4OjObP7HGuTY-Foo4QindNnpp0QU6vSb7kiOiQ4twpayybH8PTf73dtdFt46UF6mGjskWgevgolvmO8A


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>演示role的权限：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> <span class="token function">test-sa</span><span class="token punctuation">.</span>yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: test

<span class="token operator">--</span><span class="token operator">-</span>
kind: ClusterRoleBinding
apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
metadata:
  name: test
  annotations:
    rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>kubernetes<span class="token punctuation">.</span>io/autoupdate: <span class="token string">&quot;true&quot;</span>
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
subjects:
<span class="token operator">-</span> kind: ServiceAccount
  name: test
  namespace: default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>curl演示</p><p>查看：token:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ curl <span class="token operator">-</span>k  <span class="token operator">-</span>H <span class="token string">&quot;Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InhXcmtaSG5ZODF1TVJ6dUcycnRLT2c4U3ZncVdoVjlLaVRxNG1wZ0pqVmcifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi1xNXBueiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImViZDg2ODZjLWZkYzAtNDRlZC04NmZlLTY5ZmE0ZTE1YjBmMCIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.iEIVMWg2mHPD88GQ2i4uc_60K4o17e39tN0VI_Q_s3TrRS8hmpi0pkEaN88igEKZm95Qf1qcN9J5W5eqOmcK2SN83Dd9dyGAGxuNAdEwi0i73weFHHsjDqokl9_4RGbHT5lRY46BbIGADIphcTeVbCggI6T_V9zBbtl8dcmsd-lD_6c6uC2INtPyIfz1FplynkjEVLapp_45aXZ9IMy76ljNSA8Uc061Uys6PD3IXsUD5JJfdm7lAt0F7rn9SdX1q10F2lIHYCMcCcfEpLr4Vkymxb4IU4RCR8BsMOPIO_yfRVeYZkG4gU2C47KwxpLsJRrTUcUXJktSEPdeYYXf9w&quot;</span> https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:6443/api/v1/namespaces/nohi/pods?limit=500


<span class="token comment"># curl -k https://10.0.0.181:6443/api/v1/namespaces/nohi/pods?limit=500</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>url查找</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get no -v=7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="通过hpa实现业务应用的动态扩缩容" tabindex="-1"><a class="header-anchor" href="#通过hpa实现业务应用的动态扩缩容" aria-hidden="true">#</a> 通过HPA实现业务应用的动态扩缩容</h4><h5 id="hpa控制器介绍" tabindex="-1"><a class="header-anchor" href="#hpa控制器介绍" aria-hidden="true">#</a> HPA控制器介绍</h5><p>当系统资源过高的时候,我们可以使用如下命令来实现 Pod 的扩缩容功能</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n nohi scale deployment myblog <span class="token operator">--</span>replicas=2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,24),Vn={href:"https://v1-14.docs.kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",target:"_blank",rel:"noopener noreferrer"},Nn=t('<p><img src="'+r+`" alt=""></p><p>基本原理：HPA 通过监控分析控制器控制的所有 Pod 的负载变化情况来确定是否需要调整 Pod 的副本数量</p><p>HPA的实现有两个版本：</p><ul><li>autoscaling/v1,只包含了根据CPU指标的检测,稳定版本</li><li>autoscaling/v2beta1,支持根据memory或者用户自定义指标进行伸缩</li></ul><p>如何获取Pod的监控数据？</p><ul><li>k8s 1.8以下：使用heapster,1.11版本完全废弃</li><li>k8s 1.8以上：使用metric-server</li></ul><p>思考：为什么之前用 heapster ,现在废弃了项目,改用 metric-server ？</p><p>heapster时代,apiserver 会直接将metric请求通过apiserver proxy 的方式转发给集群内的 hepaster 服务,采用这种 proxy 方式是有问题的：</p><ul><li><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code>http://kubernetes_master_address/api/v1/namespaces/namespace_name/services/service_name[:port_name]/proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>proxy只是代理请求,一般用于问题排查,不够稳定,且版本不可控</p></li><li><p>heapster的接口不能像apiserver一样有完整的鉴权以及client集成</p></li><li><p>pod 的监控数据是核心指标（HPA调度）,应该和 pod 本身拥有同等地位,即 metric应该作为一种资源存在,如metrics.k8s.io 的形式,称之为 Metric Api</p></li></ul><p>于是官方从 1.8 版本开始逐步废弃 heapster,并提出了上边 Metric api 的概念,而 metrics-server 就是这种概念下官方的一种实现,用于从 kubelet获取指标,替换掉之前的 heapster。</p><p><code>Metrics Server</code> 可以通过标准的 Kubernetes API 把监控数据暴露出来,比如获取某一Pod的监控数据：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:6443/apis/metrics<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1beta1/namespaces/&lt;namespace-name&gt;<span class="token operator">/</span>pods/&lt;pod-name&gt;

<span class="token comment"># https://192.168.136.10:6443/api/v1/namespaces/nohi/pods?limit=500</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前的采集流程：</p><p><img src="`+R+'" alt=""></p><h5 id="metric-server" tabindex="-1"><a class="header-anchor" href="#metric-server" aria-hidden="true">#</a> Metric Server</h5>',15),_n={href:"https://v1-14.docs.kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/#metrics-server",target:"_blank",rel:"noopener noreferrer"},Cn=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>...
Metric server collects metrics from the Summary API, exposed by Kubelet on each node.

Metrics Server registered in the main API server through Kubernetes aggregator, which was introduced in Kubernetes 1.7
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h6><p>官方代码仓库地址：https://github.com/kubernetes-sigs/metrics-server</p><p>Depending on your cluster setup, you may also need to change flags passed to the Metrics Server container. Most useful flags:</p><ul><li><code>--kubelet-preferred-address-types</code> - The priority of node address types used when determining an address for connecting to a particular node (default [Hostname,InternalDNS,InternalIP,ExternalDNS,ExternalIP])</li><li><code>--kubelet-insecure-tls</code> - Do not verify the CA of serving certificates presented by Kubelets. For testing purposes only.</li><li><code>--requestheader-client-ca-file</code> - Specify a root certificate bundle for verifying client certificates on incoming requests.</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ wget https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/kubernetes-sigs/metrics-server/releases/download/v0<span class="token punctuation">.</span>6<span class="token punctuation">.</span>2/components<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>视频中为v0.3.6版本,k8s 1.18。本次环境使用k8s v1.26 v0.6.2</li></ul><p>修改args参数：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
 84       containers:
 85       <span class="token operator">-</span> name: metrics-server
 86         image: registry<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com/google_containers/metrics-server:v0<span class="token punctuation">.</span>6<span class="token punctuation">.</span>2
 87         imagePullPolicy: IfNotPresent
 88         args:
 89           <span class="token operator">-</span> <span class="token operator">--</span>cert-<span class="token function">dir</span>=<span class="token operator">/</span>tmp
 90           <span class="token operator">-</span> <span class="token operator">--</span>secure-port=4443
 91          
 							<span class="token comment"># 0.6.2 增加如下</span>
 							<span class="token operator">-</span> <span class="token operator">--</span>kubelet-preferred-address-types=InternalIP<span class="token punctuation">,</span>ExternalIP<span class="token punctuation">,</span>Hostname
        			<span class="token operator">-</span> <span class="token operator">--</span>kubelet-<span class="token function">use-node</span><span class="token operator">-</span>status-port
        			<span class="token operator">-</span> <span class="token operator">--</span>metric-resolution=15s
        			<span class="token operator">-</span> <span class="token operator">--</span>kubelet-insecure-tls
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行安装：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 删除 kubectl delete -f components.yaml</span>
$ kubectl create <span class="token operator">-</span>f components<span class="token punctuation">.</span>yaml

$ kubectl <span class="token operator">-</span>n kube-system get pods

$ kubectl top nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="kubelet的指标采集" tabindex="-1"><a class="header-anchor" href="#kubelet的指标采集" aria-hidden="true">#</a> kubelet的指标采集</h6><p>无论是 heapster还是 metric-server,都只是数据的中转和聚合,两者都是调用的 kubelet 的 api 接口获取的数据,而 kubelet 代码中实际采集指标的是 cadvisor 模块,你可以在 node 节点访问 10250 端口获取监控数据：</p><ul><li>Kubelet Summary metrics: https://127.0.0.1:10250/metrics,暴露 node、pod 汇总数据</li><li>Cadvisor metrics: https://127.0.0.1:10250/metrics/cadvisor,暴露 container 维度数据</li></ul><p>调用示例：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ curl <span class="token operator">-</span>k  <span class="token operator">-</span>H <span class="token string">&quot;Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InhXcmtaSG5ZODF1TVJ6dUcycnRLT2c4U3ZncVdoVjlLaVRxNG1wZ0pqVmcifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi10b2tlbi1xNXBueiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJhZG1pbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50LnVpZCI6ImViZDg2ODZjLWZkYzAtNDRlZC04NmZlLTY5ZmE0ZTE1YjBmMCIsInN1YiI6InN5c3RlbTpzZXJ2aWNlYWNjb3VudDprdWJlcm5ldGVzLWRhc2hib2FyZDphZG1pbiJ9.iEIVMWg2mHPD88GQ2i4uc_60K4o17e39tN0VI_Q_s3TrRS8hmpi0pkEaN88igEKZm95Qf1qcN9J5W5eqOmcK2SN83Dd9dyGAGxuNAdEwi0i73weFHHsjDqokl9_4RGbHT5lRY46BbIGADIphcTeVbCggI6T_V9zBbtl8dcmsd-lD_6c6uC2INtPyIfz1FplynkjEVLapp_45aXZ9IMy76ljNSA8Uc061Uys6PD3IXsUD5JJfdm7lAt0F7rn9SdX1q10F2lIHYCMcCcfEpLr4Vkymxb4IU4RCR8BsMOPIO_yfRVeYZkG4gU2C47KwxpLsJRrTUcUXJktSEPdeYYXf9w&quot;</span> https:<span class="token operator">/</span><span class="token operator">/</span>localhost:10250/metrics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>kubelet虽然提供了 metric 接口,但实际监控逻辑由内置的cAdvisor模块负责,早期的时候,cadvisor是单独的组件,从k8s 1.12开始,cadvisor 监听的端口在k8s中被删除,所有监控数据统一由Kubelet的API提供。</p><p>cadvisor获取指标时实际调用的是 runc/libcontainer库,而libcontainer是对 cgroup文件 的封装,即 cadvsior也只是个转发者,它的数据来自于cgroup文件。</p><p>cgroup文件中的值是监控数据的最终来源,如</p><ul><li><p>mem usage的值,</p><ul><li><p>对于docker容器来讲,来源于<code>/sys/fs/cgroup/memory/docker/[containerId]/memory.usage_in_bytes</code></p></li><li><p>对于pod来讲,<code>/sys/fs/cgroup/memory/kubepods/besteffort/pod[podId]/memory.usage_in_bytes</code>或者</p><p><code>/sys/fs/cgroup/memory/kubepods/burstable/pod[podId]/memory.usage_in_bytes</code></p></li></ul></li><li><p>如果没限制内存,Limit = machine_mem,否则来自于 <code>/sys/fs/cgroup/memory/docker/[id]/memory.limit_in_bytes</code></p></li><li><p>内存使用率 = memory.usage_in_bytes/memory.limit_in_bytes</p></li></ul><p>Metrics数据流：</p><p><img src="`+I+'" alt=""></p><p>思考：</p><p>Metrics Server是独立的一个服务,只能服务内部实现自己的api,是如何做到通过标准的kubernetes 的API格式暴露出去的？</p>',24),Rn={href:"https://github.com/kubernetes/kube-aggregator",target:"_blank",rel:"noopener noreferrer"},In=t('<h6 id="kube-aggregator聚合器及metric-server的实现" tabindex="-1"><a class="header-anchor" href="#kube-aggregator聚合器及metric-server的实现" aria-hidden="true">#</a> kube-aggregator聚合器及Metric-Server的实现</h6><p>kube-aggregator是对 apiserver 的api的一种拓展机制,它允许开发人员编写一个自己的服务,并把这个服务注册到k8s的api里面,即扩展 API 。</p><p><img src="'+S+`" alt=""></p><p>定义一个APIService对象：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiregistration.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> APIService
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> v1beta1.nohi.k8s.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> nohi.k8s.io
  <span class="token key atrule">groupPriorityMinimum</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">insecureSkipTLSVerify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>A       <span class="token comment"># 必须https访问</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>   
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">versionPriority</span><span class="token punctuation">:</span> <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>k8s会自动帮我们代理如下url的请求：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>proxyPath := <span class="token string">&quot;/apis/&quot;</span> <span class="token operator">+</span> apiService<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span><span class="token function">Group</span> <span class="token operator">+</span> <span class="token string">&quot;/&quot;</span> <span class="token operator">+</span> apiService<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即：https://192.168.136.10:6443/apis/nohi.k8s.io/v1beta1/xxxx转到我们的service-A服务中,service-A中只需要实现 <code>https://service-A/nohi.k8s.io/v1beta1/xxxx</code> 即可。</p><p>看下metric-server的实现：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl get apiservice 
NAME                       SERVICE                      AVAILABLE                      
v1beta1<span class="token punctuation">.</span>metrics<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io   kube-system/metrics-server		True

$ kubectl get apiservice v1beta1<span class="token punctuation">.</span>metrics<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io <span class="token operator">-</span>oyaml
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
spec:
  <span class="token function">group</span>: metrics<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
  groupPriorityMinimum: 100
  insecureSkipTLSVerify: true
  service:
    name: metrics-server
    namespace: kube-system
    port: 443
  version: v1beta1
  versionPriority: 100
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

$ kubectl <span class="token operator">-</span>n kube-system get svc metrics-server
NAME             <span class="token function">TYPE</span>        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
metrics-server   ClusterIP   10<span class="token punctuation">.</span>110<span class="token punctuation">.</span>111<span class="token punctuation">.</span>146   &lt;none&gt;        443/TCP   11h

$ curl <span class="token operator">-</span>k  <span class="token operator">-</span>H <span class="token string">&quot;Authorization: Bearer xxxx&quot;</span> https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>110<span class="token punctuation">.</span>111<span class="token punctuation">.</span>146
<span class="token punctuation">{</span>
  <span class="token string">&quot;paths&quot;</span>: <span class="token punctuation">[</span>
    <span class="token string">&quot;/apis&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/apis/metrics.k8s.io&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/apis/metrics.k8s.io/v1beta1&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/healthz&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/healthz/healthz&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/healthz/log&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/healthz/ping&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/healthz/poststarthook/generic-apiserver-start-informers&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/metrics&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/openapi/v2&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/version&quot;</span>
  <span class="token punctuation">]</span>

<span class="token comment"># https://192.168.136.10:6443/apis/metrics.k8s.io/v1beta1/namespaces/&lt;namespace-name&gt;/pods/&lt;pod-name&gt;</span>
<span class="token comment"># </span>
$ curl <span class="token operator">-</span>k  <span class="token operator">-</span>H <span class="token string">&quot;Authorization: Bearer xxxx&quot;</span> https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>110<span class="token punctuation">.</span>111<span class="token punctuation">.</span>146/apis/metrics<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1beta1/namespaces/nohi/pods/myblog-5d9ff54d4b-4rftt

$ curl <span class="token operator">-</span>k  <span class="token operator">-</span>H <span class="token string">&quot;Authorization: Bearer xxxx&quot;</span> https:<span class="token operator">/</span><span class="token operator">/</span>192<span class="token punctuation">.</span>168<span class="token punctuation">.</span>136<span class="token punctuation">.</span>10:6443/apis/metrics<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1beta1/namespaces/nohi/pods/myblog-5d9ff54d4b-4rftt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="hpa实践" tabindex="-1"><a class="header-anchor" href="#hpa实践" aria-hidden="true">#</a> HPA实践</h5><h6 id="基于cpu的动态伸缩" tabindex="-1"><a class="header-anchor" href="#基于cpu的动态伸缩" aria-hidden="true">#</a> 基于CPU的动态伸缩</h6><p><img src="`+r+`" alt=""></p><p>创建hpa对象：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 方式一</span>
$ <span class="token function">cat</span> hpa-myblog<span class="token punctuation">.</span>yaml
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-myblog-cpu
  namespace: nohi
spec:
  maxReplicas: 3
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myblog
  targetCPUUtilizationPercentage: 10

<span class="token comment"># 方式二</span>
$ kubectl <span class="token operator">-</span>n nohi autoscale deployment myblog <span class="token operator">--</span>cpu-percent=10 <span class="token operator">--</span>min=1 <span class="token operator">--</span>max=3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Deployment对象必须配置requests的参数,不然无法获取监控数据,也无法通过HPA进行动态伸缩</p></blockquote><p>验证：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ yum <span class="token operator">-</span>y install httpd-tools
$ kubectl <span class="token operator">-</span>n nohi get svc myblog
myblog   ClusterIP   10<span class="token punctuation">.</span>107<span class="token punctuation">.</span>180<span class="token punctuation">.</span>114   &lt;none&gt;        80/TCP    6d18h

<span class="token comment"># 为了更快看到效果,先调整副本数为1</span>
$ kubectl <span class="token operator">-</span>n nohi scale deploy myblog <span class="token operator">--</span>replicas=1

<span class="token comment"># 模拟1000个用户并发访问页面10万次</span>
$ ab <span class="token operator">-</span>n 100000 <span class="token operator">-</span>c 1000 http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>107<span class="token punctuation">.</span>180<span class="token punctuation">.</span>114/blog/index/

$ kubectl get hpa
$ kubectl <span class="token operator">-</span>n nohi get pods

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>压力降下来后,会有默认5分钟的scaledown的时间,可以通过controller-manager的如下参数设置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--horizontal-pod-autoscaler-downscale-stabilization

The value for this option is a duration that specifies how long the autoscaler has to wait before another downscale operation can be performed after the current one has completed. The default value is 5 minutes (5m0s).
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是一个逐步的过程,当前的缩放完成后,下次缩放的时间间隔,比如从3个副本降低到1个副本,中间大概会等待2*5min = 10分钟</p><h6 id="基于内存的动态伸缩" tabindex="-1"><a class="header-anchor" href="#基于内存的动态伸缩" aria-hidden="true">#</a> 基于内存的动态伸缩</h6><p>创建hpa对象</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> hpa-demo-mem<span class="token punctuation">.</span>yaml
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name: hpa-demo-mem
  namespace: nohi
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hpa-demo-mem
  minReplicas: 1
  maxReplicas: 3
  metrics:
  <span class="token operator">-</span> <span class="token function">type</span>: Resource
    resource:
      name: memory
      targetAverageUtilization: 30
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加压演示脚本：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> increase-mem-config<span class="token punctuation">.</span>yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: increase-mem-config
  namespace: nohi
<span class="token keyword">data</span>:
  increase-mem<span class="token punctuation">.</span>sh: <span class="token punctuation">|</span>
    <span class="token comment">#!/bin/bash  </span>
    mkdir <span class="token operator">/</span>tmp/memory  
    <span class="token function">mount</span> <span class="token operator">-</span>t tmpfs <span class="token operator">-</span>o size=40M tmpfs <span class="token operator">/</span>tmp/memory  
    dd <span class="token keyword">if</span>=<span class="token operator">/</span>dev/zero of=<span class="token operator">/</span>tmp/memory/block  
    <span class="token function">sleep</span> 60 
    <span class="token function">rm</span> <span class="token operator">/</span>tmp/memory/block  
    umount <span class="token operator">/</span>tmp/memory  
    <span class="token function">rmdir</span> <span class="token operator">/</span>tmp/memory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试deployment：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> hpa-demo-mem-deploy<span class="token punctuation">.</span>yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hpa-demo-mem
  namespace: nohi
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      volumes:
      <span class="token operator">-</span> name: increase-mem-script
        configMap:
          name: increase-mem-config
      containers:
      <span class="token operator">-</span> name: nginx
        image: nginx:alpine
        ports:
        <span class="token operator">-</span> containerPort: 80
        volumeMounts:
        <span class="token operator">-</span> name: increase-mem-script
          mountPath: <span class="token operator">/</span>etc/script
        resources:
          requests:
            memory: 50Mi
            cpu: 50m
        securityContext:
          privileged: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f increase-mem-config<span class="token punctuation">.</span>yaml
$ kubectl create <span class="token operator">-</span>f hpa-demo-mem<span class="token punctuation">.</span>yaml
$ kubectl create <span class="token operator">-</span>f hpa-demo-mem-deploy<span class="token punctuation">.</span>yaml

$ kubectl <span class="token operator">-</span>n nohi exec <span class="token operator">-</span>ti hpa-demo-mem-7fc75bf5c8-xx424 sh
<span class="token comment">#/ sh /etc/script/increase-mem.sh</span>


<span class="token comment"># 观察hpa及pod</span>
$ kubectl <span class="token operator">-</span>n nohi get hpa
$ kubectl <span class="token operator">-</span>n nohi get po
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="基于自定义指标的动态伸缩" tabindex="-1"><a class="header-anchor" href="#基于自定义指标的动态伸缩" aria-hidden="true">#</a> 基于自定义指标的动态伸缩</h6><p>除了基于 CPU 和内存来进行自动扩缩容之外,我们还可以根据自定义的监控指标来进行。这个我们就需要使用 <code>Prometheus Adapter</code>,Prometheus 用于监控应用的负载和集群本身的各种指标,<code>Prometheus Adapter</code> 可以帮我们使用 Prometheus 收集的指标并使用它们来制定扩展策略,这些指标都是通过 APIServer 暴露的,而且 HPA 资源对象也可以很轻易的直接使用。</p><p><img src="`+A+'" alt=""></p><p>架构图：</p><p><img src="'+l+`" alt=""></p><h4 id="kubernetes对接分布式存储" tabindex="-1"><a class="header-anchor" href="#kubernetes对接分布式存储" aria-hidden="true">#</a> kubernetes对接分布式存储</h4><h5 id="pv与pvc快速入门" tabindex="-1"><a class="header-anchor" href="#pv与pvc快速入门" aria-hidden="true">#</a> PV与PVC快速入门</h5><p>k8s存储的目的就是保证Pod重建后,数据不丢失。简单的数据持久化的下述方式：</p><ul><li><p>emptyDir</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>pd
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> k8s.gcr.io/test<span class="token punctuation">-</span>webserver
    <span class="token key atrule">name</span><span class="token punctuation">:</span> webserver
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /cache
      <span class="token key atrule">name</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>volume
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> k8s.gcr.io/test<span class="token punctuation">-</span>redis
    <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
      <span class="token key atrule">name</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>volume
<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>volume
    <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Pod内的容器共享卷的数据</li><li>存在于Pod的生命周期,Pod销毁,数据丢失</li><li>Pod内的容器自动重建后,数据不会丢失</li></ul></li><li><p>hostPath</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>pd
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> k8s.gcr.io/test<span class="token punctuation">-</span>webserver
    <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>container
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /test<span class="token punctuation">-</span>pd
      <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>volume
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>volume
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
      <span class="token comment"># directory location on host</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /data
      <span class="token comment"># this field is optional</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> Directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常配合nodeSelector使用</p></li><li><p>nfs存储</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">...</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redisdata             <span class="token comment">#卷名称</span>
    <span class="token key atrule">nfs</span><span class="token punctuation">:</span>                        <span class="token comment">#使用NFS网络存储卷</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.31.241    <span class="token comment">#NFS服务器地址</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/redis         <span class="token comment">#NFS服务器共享的目录</span>
      <span class="token key atrule">readOnly</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>           <span class="token comment">#是否为只读</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>volume支持的种类众多（参考 https://kubernetes.io/docs/concepts/storage/volumes/#types-of-volumes ）,每种对应不同的存储后端实现,因此为了屏蔽后端存储的细节,同时使得Pod在使用存储的时候更加简洁和规范,k8s引入了两个新的资源类型,PV和PVC。</p><p>PersistentVolume（持久化卷）,是对底层的存储的一种抽象,它和具体的底层的共享存储技术的实现方式有关,比如 Ceph、GlusterFS、NFS 等,都是通过插件机制完成与共享存储的对接。如使用PV对接NFS存储：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>pv
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span> 
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">persistentVolumeReclaimPolicy</span><span class="token punctuation">:</span> Retain
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /data/k8s
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.0.0.182

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>capacity,存储能力, 目前只支持存储空间的设置, 就是我们这里的 storage=1Gi,不过未来可能会加入 IOPS、吞吐量等指标的配置。</li><li>accessModes,访问模式, 是用来对 PV 进行访问模式的设置,用于描述用户应用对存储资源的访问权限,访问权限包括下面几种方式： <ul><li>ReadWriteOnce（RWO）：读写权限,但是只能被单个节点挂载</li><li>ReadOnlyMany（ROX）：只读权限,可以被多个节点挂载</li><li>ReadWriteMany（RWX）：读写权限,可以被多个节点挂载</li></ul></li></ul><p><img src="`+$+`" alt=""></p><ul><li>persistentVolumeReclaimPolicy,pv的回收策略, 目前只有 NFS 和 HostPath 两种类型支持回收策略 <ul><li>Retain（保留）- 保留数据,需要管理员手工清理数据</li><li>Recycle（回收）- 清除 PV 中的数据,效果相当于执行 rm -rf /thevolume/*</li><li>Delete（删除）- 与 PV 相连的后端存储完成 volume 的删除操作,当然这常见于云服务商的存储服务,比如 ASW EBS。</li></ul></li></ul><p>因为PV是直接对接底层存储的,就像集群中的Node可以为Pod提供计算资源（CPU和内存）一样,PV可以为Pod提供存储资源。因此PV不是namespaced的资源,属于集群层面可用的资源。Pod如果想使用该PV,需要通过创建PVC挂载到Pod中。</p><p>PVC全写是PersistentVolumeClaim（持久化卷声明）,PVC 是用户存储的一种声明,创建完成后,可以和PV实现一对一绑定。对于真正使用存储的用户不需要关心底层的存储实现细节,只需要直接使用 PVC 即可。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pvc<span class="token punctuation">-</span>nfs
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后Pod中通过如下方式去使用：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">...</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> web
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>                        <span class="token comment">#挂载容器中的目录到pvc nfs中的目录</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> www
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> www
        <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>              <span class="token comment">#指定pvc</span>
          <span class="token key atrule">claimName</span><span class="token punctuation">:</span> pvc<span class="token punctuation">-</span>nfs
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="pv与pvc管理nfs存储卷实践" tabindex="-1"><a class="header-anchor" href="#pv与pvc管理nfs存储卷实践" aria-hidden="true">#</a> PV与PVC管理NFS存储卷实践</h5><h6 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h6><p>服务端：10.0.0.182</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ yum <span class="token operator">-</span>y install nfs-utils rpcbind

<span class="token comment"># 共享目录</span>
$ mkdir <span class="token operator">-</span>p <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>k8s &amp;&amp; chmod 755 <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>k8s

$ <span class="token function">echo</span> <span class="token string">&#39;/data/k8s  *(insecure,rw,sync,no_root_squash)&#39;</span>&gt;&gt;<span class="token operator">/</span>etc/exports

$ systemctl enable rpcbind &amp;&amp; systemctl <span class="token function">start</span> rpcbind
$ systemctl enable nfs-server &amp;&amp; systemctl <span class="token function">start</span> nfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端：k8s集群slave节点</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ yum <span class="token operator">-</span>y install nfs-utils rpcbind
$ mkdir <span class="token operator">/</span>nfsdata
$ <span class="token function">mount</span> <span class="token operator">-</span>t nfs 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182:<span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>k8s <span class="token operator">/</span>nfsdata
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="pv与pvc演示" tabindex="-1"><a class="header-anchor" href="#pv与pvc演示" aria-hidden="true">#</a> PV与PVC演示</h6><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> 01-pv-nfs<span class="token punctuation">.</span>yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv
spec:
  capacity: 
    storage: 1Gi
  accessModes:
  <span class="token operator">-</span> ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: <span class="token operator">/</span><span class="token keyword">data</span><span class="token operator">/</span>k8s
    server: 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182

$ kubectl create <span class="token operator">-</span>f 01-pv-nfs<span class="token punctuation">.</span>yaml

$ kubectl get pv
NAME     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS  
nfs-pv   1Gi        RWO            Retain           Available
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 PV 的生命周期中,可能会处于4中不同的阶段：</p><ul><li>Available（可用）：表示可用状态,还未被任何 PVC 绑定</li><li>Bound（已绑定）：表示 PV 已经被 PVC 绑定</li><li>Released（已释放）：PVC 被删除,但是资源还未被集群重新声明</li><li>Failed（失败）： 表示该 PV 的自动回收失败</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> 02-pvc<span class="token punctuation">.</span>yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-nfs
  namespace: default
spec:
  accessModes:
  <span class="token operator">-</span> ReadWriteOnce
  resources:
    requests:
      storage: 1Gi

$ kubectl create <span class="token operator">-</span>f 02-pvc<span class="token punctuation">.</span>yaml
$ kubectl get pvc
NAME      STATUS   VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS   AGE
pvc-nfs   Bound    nfs-pv   1Gi        RWO                           3s
$ kubectl get pv
NAME     CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM             
nfs-pv   1Gi        RWO            Retain           Bound    default/pvc-nfs             

<span class="token comment">#访问模式,storage大小（pvc大小需要小于pv大小）,以及 PV 和 PVC 的 storageClassName 字段必须一样,这样才能够进行绑定。</span>

<span class="token comment">#PersistentVolumeController会不断地循环去查看每一个 PVC,是不是已经处于 Bound（已绑定）状态。如果不是,那它就会遍历所有的、可用的 PV,并尝试将其与未绑定的 PVC 进行绑定,这样,Kubernetes 就可以保证用户提交的每一个 PVC,只要有合适的 PV 出现,它就能够很快进入绑定状态。而所谓将一个 PV 与 PVC 进行“绑定”,其实就是将这个 PV 对象的名字,填在了 PVC 对象的 spec.volumeName 字段上。</span>

<span class="token comment"># 查看nfs数据目录</span>
$ <span class="token function">ls</span> <span class="token operator">/</span>nfsdata

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建Pod挂载pvc</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> 03-deployment<span class="token punctuation">.</span>yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nfs-pvc
spec:
  replicas: 1
  selector:		<span class="token comment">#指定Pod的选择器</span>
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      <span class="token operator">-</span> name: nginx
        image: nginx:alpine
        imagePullPolicy: IfNotPresent
        ports:
        <span class="token operator">-</span> containerPort: 80
          name: web
        volumeMounts:                        <span class="token comment">#挂载容器中的目录到pvc nfs中的目录</span>
        <span class="token operator">-</span> name: www
          mountPath: <span class="token operator">/</span>usr/share/nginx/html
      volumes:
      <span class="token operator">-</span> name: www
        persistentVolumeClaim:              <span class="token comment">#指定pvc</span>
          claimName: pvc-nfs
          
          
$ kubectl create <span class="token operator">-</span>f 03-deployment<span class="token punctuation">.</span>yaml

<span class="token comment"># 查看容器/usr/share/nginx/html目录</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="storageclass实现动态挂载" tabindex="-1"><a class="header-anchor" href="#storageclass实现动态挂载" aria-hidden="true">#</a> storageClass实现动态挂载</h6><p>创建pv及pvc过程是手动,且pv与pvc一一对应,手动创建很繁琐。因此,通过storageClass + provisioner的方式来实现通过PVC自动创建并绑定PV。</p><p><img src="`+i+`" alt=""></p><p>部署： https://github.com/kubernetes-retired/external-storage</p><ul><li><p>20230220 一直按此视频内文档一直不成功,改为 「21_StoreClass.md」内容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. 版本不同此视频中v1.18前版本,我使用的是centos8.5 + v1.26.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>20230221 根据<code>21_StoreClass.md</code>内容,修改以下配置,可以正常安装使用</p></li></ul><p><code>provisioner.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token comment"># replace with namespace where provisioner is deployed</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>provisioner
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Recreate
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">serviceAccountName</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
          <span class="token comment"># 20230221 修改为不需要selink方式</span>
          <span class="token comment"># image: quay.io/external_storage/nfs-client-provisioner:latest</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> easzlab/nfs<span class="token punctuation">-</span>subdir<span class="token punctuation">-</span>external<span class="token punctuation">-</span>provisioner<span class="token punctuation">:</span>v4.0.1
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
              <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /persistentvolumes
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PROVISIONER_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> nohi.com/nfs2
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_SERVER
              <span class="token key atrule">value</span><span class="token punctuation">:</span> 10.0.0.203
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> NFS_PATH  
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /mnt/truenas/share/nfs/nfs2
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>root
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> 10.0.0.203
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /mnt/truenas/share/nfs/nfs2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>rbac.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>provisioner
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumes&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumeclaims&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storage.k8s.io&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;storageclasses&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;events&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> run<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>provisioner
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner<span class="token punctuation">-</span>runner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>provisioner
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;endpoints&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>provisioner
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
    <span class="token comment"># replace with namespace where provisioner is deployed</span>
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>provisioner
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> leader<span class="token punctuation">-</span>locking<span class="token punctuation">-</span>nfs<span class="token punctuation">-</span>client<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>storage-class.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nfs2
<span class="token comment"># 存储分配器的名称</span>
<span class="token comment"># 对应“provisioner.yaml”文件中env.PROVISIONER_NAME.value</span>
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> nohi.com/nfs2
<span class="token comment"># 允许pvc创建后扩容</span>
<span class="token key atrule">allowVolumeExpansion</span><span class="token punctuation">:</span> <span class="token boolean important">True</span>
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
  <span class="token comment"># 资源删除策略,“true”表示删除PVC时,同时删除绑定的PV</span>
  <span class="token key atrule">archiveOnDelete</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>pvc.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nfs<span class="token punctuation">-</span>provisioner
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>claim2
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Mi
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>增加Nginx pod: <code>nginx-pod.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata:
  name: nginx-storageclass
  namespace: nfs-provisioner
spec:
  containers:
  - name: alpine
    image: alpine
    args:
    - sh
    - -c
    - &quot;touch /mnt/SECCESS &amp;&amp; exit || exit 1&quot;
    volumeMounts:
    - name: pvc
      mountPath: /mnt
  volumes:
  - name: pvc
    persistentVolumeClaim:
      claimName: test-claim2 ## 这是上面创建的pvc

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="对接ceph存储实践" tabindex="-1"><a class="header-anchor" href="#对接ceph存储实践" aria-hidden="true">#</a> 对接Ceph存储实践</h5><blockquote><p>20230221 edit by nohi</p><p>由于已经采用nfs,所以路过此章节</p></blockquote><p>ceph的安装及使用参考 http://docs.ceph.org.cn/start/intro/</p><p><img src="`+z+`" alt=""></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># CephFS需要使用两个Pool来分别存储数据和元数据</span>
ceph osd pool create cephfs_data 128
ceph osd pool create cephfs_meta 128
ceph osd lspools

<span class="token comment"># 创建一个CephFS</span>
ceph fs new cephfs cephfs_meta cephfs_data

<span class="token comment"># 查看</span>
ceph fs <span class="token function">ls</span>

<span class="token comment">#</span>
rados <span class="token operator">-</span>p cephfs_meta <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="storageclass实现动态挂载-1" tabindex="-1"><a class="header-anchor" href="#storageclass实现动态挂载-1" aria-hidden="true">#</a> storageClass实现动态挂载</h6><p>创建pv及pvc过程是手动,且pv与pvc一一对应,手动创建很繁琐。因此,通过storageClass + provisioner的方式来实现通过PVC自动创建并绑定PV。</p><p><img src="`+i+`" alt=""></p><p>比如,针对cephfs,可以创建如下类型的storageclass：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> StorageClass
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> storage.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dynamic<span class="token punctuation">-</span>cephfs
<span class="token key atrule">provisioner</span><span class="token punctuation">:</span> ceph.com/cephfs
<span class="token key atrule">parameters</span><span class="token punctuation">:</span>
    <span class="token key atrule">monitors</span><span class="token punctuation">:</span> 10.0.0.182<span class="token punctuation">:</span><span class="token number">6789</span>
    <span class="token key atrule">adminId</span><span class="token punctuation">:</span> admin
    <span class="token key atrule">adminSecretName</span><span class="token punctuation">:</span> ceph<span class="token punctuation">-</span>admin<span class="token punctuation">-</span>secret
    <span class="token key atrule">adminSecretNamespace</span><span class="token punctuation">:</span> <span class="token string">&quot;kube-system&quot;</span>
    <span class="token key atrule">claimRoot</span><span class="token punctuation">:</span> /volumes/kubernetes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>NFS,ceph-rbd,cephfs均提供了对应的provisioner</p><p>部署cephfs-provisioner</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> external-storage-cephfs-provisioner<span class="token punctuation">.</span>yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: cephfs-provisioner
  namespace: kube-system
<span class="token operator">--</span><span class="token operator">-</span>
kind: ClusterRole
apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
metadata:
  name: cephfs-provisioner
rules:
  <span class="token operator">-</span> apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumes&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
  <span class="token operator">-</span> apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;persistentvolumeclaims&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">]</span>
  <span class="token operator">-</span> apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;storage.k8s.io&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;storageclasses&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">]</span>
  <span class="token operator">-</span> apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;events&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
  <span class="token operator">-</span> apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;endpoints&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;list&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;watch&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;update&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;patch&quot;</span><span class="token punctuation">]</span>
  <span class="token operator">-</span> apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;secrets&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
<span class="token operator">--</span><span class="token operator">-</span>
kind: ClusterRoleBinding
apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
metadata:
  name: cephfs-provisioner
subjects:
  <span class="token operator">-</span> kind: ServiceAccount
    name: cephfs-provisioner
    namespace: kube-system
roleRef:
  kind: ClusterRole
  name: cephfs-provisioner
  apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io

<span class="token operator">--</span><span class="token operator">-</span>
apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
kind: Role
metadata:
  name: cephfs-provisioner
  namespace: kube-system
rules:
  <span class="token operator">-</span> apiGroups: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span>
    resources: <span class="token punctuation">[</span><span class="token string">&quot;secrets&quot;</span><span class="token punctuation">]</span>
    verbs: <span class="token punctuation">[</span><span class="token string">&quot;create&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;get&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;delete&quot;</span><span class="token punctuation">]</span>
<span class="token operator">--</span><span class="token operator">-</span>
apiVersion: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
kind: RoleBinding
metadata:
  name: cephfs-provisioner
  namespace: kube-system
roleRef:
  apiGroup: rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io
  kind: Role
  name: cephfs-provisioner
subjects:
<span class="token operator">-</span> kind: ServiceAccount
  name: cephfs-provisioner
  namespace: kube-system

<span class="token operator">--</span><span class="token operator">-</span>
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cephfs-provisioner
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cephfs-provisioner
  strategy:
    <span class="token function">type</span>: Recreate
  template:
    metadata:
      labels:
        app: cephfs-provisioner
    spec:
      containers:
      <span class="token operator">-</span> name: cephfs-provisioner
        image: <span class="token string">&quot;quay.io/external_storage/cephfs-provisioner:latest&quot;</span>
        env:
        <span class="token operator">-</span> name: PROVISIONER_NAME
          value: ceph<span class="token punctuation">.</span>com/cephfs
        imagePullPolicy: IfNotPresent
        command:
        <span class="token operator">-</span> <span class="token string">&quot;/usr/local/bin/cephfs-provisioner&quot;</span>
        args:
        <span class="token operator">-</span> <span class="token string">&quot;-id=cephfs-provisioner-1&quot;</span>
        <span class="token operator">-</span> <span class="token string">&quot;-disable-ceph-namespace-isolation=true&quot;</span>
      serviceAccount: cephfs-provisioner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在ceph monitor机器中查看admin账户的key</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ ceph auth <span class="token function">ls</span>
$ ceph auth <span class="token function">get-key</span> client<span class="token punctuation">.</span>admin
AQAejeJbowvgMhAAsuloUOvepcj/TXEIoSrd7A==

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建secret</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">echo</span> <span class="token operator">-</span>n AQAejeJbowvgMhAAsuloUOvepcj/TXEIoSrd7A==<span class="token punctuation">|</span>base64
QVFBZWplSmJvd3ZnTWhBQXN1bG9VT3ZlcGNqL1RYRUlvU3JkN0E9PQ==
$ <span class="token function">cat</span> ceph-admin-secret<span class="token punctuation">.</span>yaml
apiVersion: v1
<span class="token keyword">data</span>:
  key: QVFBZWplSmJvd3ZnTWhBQXN1bG9VT3ZlcGNqL1RYRUlvU3JkN0E9PQ==
kind: Secret
metadata:
  name: ceph-admin-secret
  namespace: kube-system
<span class="token function">type</span>: Opaque

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建storageclass</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> cephfs-storage-<span class="token keyword">class</span><span class="token punctuation">.</span>yaml
kind: StorageClass
apiVersion: storage<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io/v1
metadata:
  name: dynamic-cephfs
provisioner: ceph<span class="token punctuation">.</span>com/cephfs
parameters:
    monitors: 36<span class="token punctuation">.</span>111<span class="token punctuation">.</span>140<span class="token punctuation">.</span>31:6789
    adminId: admin
    adminSecretName: ceph-admin-secret
    adminSecretNamespace: <span class="token string">&quot;kube-system&quot;</span>
    claimRoot: <span class="token operator">/</span>volumes/kubernetes

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="动态pvc验证及实现分析" tabindex="-1"><a class="header-anchor" href="#动态pvc验证及实现分析" aria-hidden="true">#</a> 动态pvc验证及实现分析</h6><p>使用流程： 创建pvc,指定storageclass和存储大小,即可实现动态存储。</p><p>创建pvc测试自动生成pv</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> cephfs-pvc-test<span class="token punctuation">.</span>yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: cephfs-claim
spec:
  accessModes:     
    <span class="token operator">-</span> ReadWriteOnce
  storageClassName: dynamic-cephfs
  resources:
    requests:
      storage: 2Gi

$ kubectl create <span class="token operator">-</span>f cephfs-pvc-test<span class="token punctuation">.</span>yaml

$ kubectl get pv
pvc-2abe427e-7568-442d-939f-2c273695c3db   2Gi        RWO            Delete           Bound      default/cephfs-claim   dynamic-cephfs            1s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建Pod使用pvc挂载cephfs数据盘</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">cat</span> test-pvc-cephfs.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    name: nginx-pod
spec:
  containers:
  - name: nginx-pod
    image: nginx:alpine
    ports:
    - name: web
      containerPort: <span class="token number">80</span>
    volumeMounts:
    - name: cephfs
      mountPath: /usr/share/nginx/html
  volumes:
  - name: cephfs
    persistentVolumeClaim:
      claimName: cephfs-claim
      
$ kubectl create <span class="token parameter variable">-f</span> test-pvc-cephfs.yaml

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们所说的容器的持久化,实际上应该理解为宿主机中volume的持久化,因为Pod是支持销毁重建的,所以只能通过宿主机volume持久化,然后挂载到Pod内部来实现Pod的数据持久化。</p><p>宿主机上的volume持久化,因为要支持数据漂移,所以通常是数据存储在分布式存储中,宿主机本地挂载远程存储（NFS,Ceph,OSS）,这样即使Pod漂移也不影响数据。</p><p>k8s的pod的挂载盘通常的格式为：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/kubelet/pods/&lt;Pod的ID&gt;<span class="token operator">/</span>volumes/kubernetes<span class="token punctuation">.</span>io~&lt;Volume类型&gt;<span class="token operator">/</span>&lt;Volume名字&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看nginx-pod的挂载盘,</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ df <span class="token operator">-</span>TH
<span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/kubelet/pods/61ba43c5-d2e9-4274-ac8c-008854e4fa8e/volumes/kubernetes<span class="token punctuation">.</span>io~cephfs/pvc-2abe427e-7568-442d-939f-2c273695c3db/

$ findmnt <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/kubelet/pods/61ba43c5-d2e9-4274-ac8c-008854e4fa8e/volumes/kubernetes<span class="token punctuation">.</span>io~cephfs/pvc-2abe427e-7568-442d-939f-2c273695c3db/

36<span class="token punctuation">.</span>111<span class="token punctuation">.</span>140<span class="token punctuation">.</span>31:6789:<span class="token operator">/</span>volumes/kubernetes/kubernetes/kubernetes-dynamic-pvc-ffe3d84d-c433-11ea-b347-6acc3cf3c15f

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用helm3管理复杂应用的部署" tabindex="-1"><a class="header-anchor" href="#使用helm3管理复杂应用的部署" aria-hidden="true">#</a> 使用Helm3管理复杂应用的部署</h4><h5 id="认识helm" tabindex="-1"><a class="header-anchor" href="#认识helm" aria-hidden="true">#</a> 认识Helm</h5><ol><li><p>为什么有helm？</p></li><li><p>Helm是什么？</p><p>kubernetes的包管理器,“可以将Helm看作Linux系统下的apt-get/yum”。</p><ul><li><p>对于应用发布者而言,可以通过Helm打包应用,管理应用依赖关系,管理应用版本并发布应用到软件仓库。</p></li><li><p>对于使用者而言,使用Helm后不用需要了解Kubernetes的Yaml语法并编写应用部署文件,可以通过Helm下载并在kubernetes上安装需要的应用。</p></li></ul><p>除此以外,Helm还提供了kubernetes上的软件部署,删除,升级,回滚应用的强大功能。</p></li><li><p>Helm的版本</p><ul><li><p>helm2</p><p><img src="`+G+'" alt=""></p><p>C/S架构,helm通过Tiller与k8s交互</p></li><li><p>helm3</p><p><img src="'+p+`" alt=""></p><ul><li><p>从安全性和易用性方面考虑,移除了Tiller服务端,helm3直接使用kubeconfig文件鉴权访问APIServer服务器</p></li><li><p>由二路合并升级成为三路合并补丁策略（ 旧的配置,线上状态,新的配置 ）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm install very_important_app ./very_important_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个应用的副本数量设置为 3 。现在,如果有人不小心执行了 <code>kubectl edit</code> 或：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl scale -replicas=0 deployment/very_important_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后,团队中的某个人发现 very_important_app 莫名其妙宕机了,尝试执行命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm rollback very_important_app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Helm 2 中,这个操作将比较旧的配置与新的配置,然后生成一个更新补丁。由于,误操作的人仅修改了应用的线上状态（旧的配置并未更新）。Helm 在回滚时,什么事情也不会做。因为旧的配置与新的配置没有差别（都是 3 个副本）。然后,Helm 不执行回滚,副本数继续保持为 0</p></li><li><p>移除了helm serve本地repo仓库</p></li><li><p>创建应用时必须指定名字（或者<code>--generate-name</code>随机生成）</p></li></ul></li></ul></li><li><p>Helm的重要概念</p><ul><li>chart,应用的信息集合,包括各种对象的配置模板、参数定义、依赖关系、文档说明等</li><li>Repoistory,chart仓库,存储chart的地方,并且提供了一个该 Repository 的 Chart 包的清单文件以供查询。Helm 可以同时管理多个不同的 Repository。</li><li>release, 当 chart 被安装到 kubernetes 集群,就生成了一个 release , 是 chart 的运行实例,代表了一个正在运行的应用</li></ul></li></ol><p>helm 是包管理工具,包就是指 chart,helm 能够：</p><ul><li>从零创建chart</li><li>与仓库交互,拉取、保存、更新 chart</li><li>在kubernetes集群中安装、卸载 release</li><li>更新、回滚、测试 release</li></ul><h5 id="安装与快速入门实践" tabindex="-1"><a class="header-anchor" href="#安装与快速入门实践" aria-hidden="true">#</a> 安装与快速入门实践</h5><p>下载最新的稳定版本：<code>https://get.helm.sh/helm-v3.2.4-linux-amd64.tar.gz</code></p><p>更多版本可以参考： <code>https://github.com/helm/helm/releases</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># k8s-master节点</span>
$ wget https:<span class="token operator">/</span><span class="token operator">/</span>get<span class="token punctuation">.</span>helm<span class="token punctuation">.</span>sh/helm-v3<span class="token punctuation">.</span>2<span class="token punctuation">.</span>4-linux-amd64<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz
$ tar <span class="token operator">-</span>zxf helm-v3<span class="token punctuation">.</span>2<span class="token punctuation">.</span>4-linux-amd64<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz

$ <span class="token function">cp</span> linux-amd64/helm <span class="token operator">/</span>usr/local/bin/

<span class="token comment"># 验证安装</span>
$ helm version
version<span class="token punctuation">.</span>BuildInfo<span class="token punctuation">{</span>Version:<span class="token string">&quot;v3.2.4&quot;</span><span class="token punctuation">,</span> GitCommit:<span class="token string">&quot;0ad800ef43d3b826f31a5ad8dfbb4fe05d143688&quot;</span><span class="token punctuation">,</span> GitTreeState:<span class="token string">&quot;clean&quot;</span><span class="token punctuation">,</span> GoVersion:<span class="token string">&quot;go1.13.12&quot;</span><span class="token punctuation">}</span>
$ helm env

<span class="token comment"># 添加仓库</span>
$ helm repo add stable http:<span class="token operator">/</span><span class="token operator">/</span>mirror<span class="token punctuation">.</span>azure<span class="token punctuation">.</span>cn/kubernetes/charts/
<span class="token comment"># 同步最新charts信息到本地</span>
$ helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>快速入门实践：</p><p>示例一：使用helm安装mysql应用</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># helm 搜索chart包</span>
$ helm search repo mysql

<span class="token comment"># 从仓库安装</span>
$ helm install mysql stable/mysql

$ helm <span class="token function">ls</span>
$ kubectl get all 

<span class="token comment"># 从chart仓库中把chart包下载到本地</span>
$ helm pull stable/mysql
$ tree mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例二：新建nginx的chart并安装</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ helm create nginx

<span class="token comment"># 从本地安装</span>
$ helm install nginx <span class="token punctuation">.</span><span class="token operator">/</span>nginx

<span class="token comment"># 安装到别的命名空间nohi</span>
$ helm <span class="token operator">-</span>n nohi install nginx <span class="token punctuation">.</span><span class="token operator">/</span>nginx

<span class="token comment"># 查看</span>
$ helm <span class="token function">ls</span>
$ helm <span class="token operator">-</span>n nohi <span class="token function">ls</span>

<span class="token comment">#</span>
$ kubectl get all 
$ kubectl <span class="token operator">-</span>n nohi get all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="chart的模板语法及开发" tabindex="-1"><a class="header-anchor" href="#chart的模板语法及开发" aria-hidden="true">#</a> Chart的模板语法及开发</h5><h6 id="nginx的chart实现分析" tabindex="-1"><a class="header-anchor" href="#nginx的chart实现分析" aria-hidden="true">#</a> nginx的chart实现分析</h6><p>格式：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ tree nginx/
nginx/
├── charts						<span class="token comment"># 存放子chart</span>
├── Chart<span class="token punctuation">.</span>yaml					<span class="token comment"># 该chart的全局定义信息</span>
├── templates					<span class="token comment"># chart运行所需的资源清单模板,用于和values做渲染</span>
│   ├── deployment<span class="token punctuation">.</span>yaml
│   ├── _helpers<span class="token punctuation">.</span>tpl			<span class="token comment"># 定义全局的命名模板,方便在其他模板中引入使用</span>
│   ├── hpa<span class="token punctuation">.</span>yaml
│   ├── ingress<span class="token punctuation">.</span>yaml
│   ├── NOTES<span class="token punctuation">.</span>txt				<span class="token comment"># helm安装完成后终端的提示信息</span>
│   ├── serviceaccount<span class="token punctuation">.</span>yaml
│   ├── service<span class="token punctuation">.</span>yaml
│   └── tests
│       └── <span class="token function">test-connection</span><span class="token punctuation">.</span>yaml
└── values<span class="token punctuation">.</span>yaml					<span class="token comment"># 模板使用的默认值信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显,资源清单都在templates中,数据来源于values.yaml,安装的过程就是将模板与数据融合成k8s可识别的资源清单,然后部署到k8s环境中。</p><p>分析模板文件的实现：</p><ul><li><p>引用命名模板并传递作用域</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span> include <span class="token string">&quot;nginx.fullname&quot;</span> <span class="token punctuation">.</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>include从_helpers.tpl中引用命名模板,并传递顶级作用域.</p></li><li><p>内置对象</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">.</span>Values
<span class="token punctuation">.</span>Release<span class="token punctuation">.</span>Name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>Release</code>：该对象描述了 release 本身的相关信息,它内部有几个对象： <ul><li><code>Release.Name</code>：release 名称</li><li><code>Release.Namespace</code>：release 安装到的命名空间</li><li><code>Release.IsUpgrade</code>：如果当前操作是升级或回滚,则该值为 true</li><li><code>Release.IsInstall</code>：如果当前操作是安装,则将其设置为 true</li><li><code>Release.Revision</code>：release 的 revision 版本号,在安装的时候,值为1,每次升级或回滚都会增加</li><li><code>Reelase.Service</code>：渲染当前模板的服务,在 Helm 上,实际上该值始终为 Helm</li></ul></li><li><code>Values</code>：从 <code>values.yaml</code> 文件和用户提供的 values 文件传递到模板的 Values 值</li><li><code>Chart</code>：获取 <code>Chart.yaml</code> 文件的内容,该文件中的任何数据都可以访问,例如 <code>{{ .Chart.Name }}-{{ .Chart.Version}}</code> 可以渲染成 <code>mychart-0.1.0</code></li></ul></li><li><p>模板定义</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> define <span class="token string">&quot;nginx.fullname&quot;</span> <span class="token operator">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">if</span> <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>fullnameOverride <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>fullnameOverride <span class="token operator">|</span> trunc <span class="token number">63</span> <span class="token operator">|</span> trimSuffix <span class="token string">&quot;-&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">else</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> $name <span class="token operator">:=</span> <span class="token keyword">default</span> <span class="token punctuation">.</span>Chart<span class="token punctuation">.</span>Name <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>nameOverride <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">if</span> contains $name <span class="token punctuation">.</span>Release<span class="token punctuation">.</span>Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token punctuation">.</span>Release<span class="token punctuation">.</span>Name <span class="token operator">|</span> trunc <span class="token number">63</span> <span class="token operator">|</span> trimSuffix <span class="token string">&quot;-&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">else</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> printf <span class="token string">&quot;%s-%s&quot;</span> <span class="token punctuation">.</span>Release<span class="token punctuation">.</span>Name $name <span class="token operator">|</span> trunc <span class="token number">63</span> <span class="token operator">|</span> trimSuffix <span class="token string">&quot;-&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><code>{{- 去掉左边的空格及换行,-}} </code> 去掉右侧的空格及换行</p></li><li><p>示例</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>configmap
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">myvalue</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello World&quot;</span>
  <span class="token key atrule">drink</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.favorite.drink <span class="token punctuation">|</span> default &quot;tea&quot; <span class="token punctuation">|</span> quote <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">food</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.favorite.food <span class="token punctuation">|</span> upper <span class="token punctuation">|</span> quote <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span> if eq .Values.favorite.drink &quot;coffee&quot; <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">mug</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>渲染完后是：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mychart<span class="token punctuation">-</span>1575971172<span class="token punctuation">-</span>configmap
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">myvalue</span><span class="token punctuation">:</span> <span class="token string">&quot;Hello World&quot;</span>
  <span class="token key atrule">drink</span><span class="token punctuation">:</span> <span class="token string">&quot;coffee&quot;</span>
  <span class="token key atrule">food</span><span class="token punctuation">:</span> <span class="token string">&quot;PIZZA&quot;</span>

  <span class="token key atrule">mug</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>管道及方法</p><ul><li><p>trunc表示字符串截取,63作为参数传递给trunc方法,trimSuffix表示去掉<code>-</code>后缀</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>fullnameOverride <span class="token operator">|</span> trunc <span class="token number">63</span> <span class="token operator">|</span> trimSuffix <span class="token string">&quot;-&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>nindent表示前面的空格数</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>  selector<span class="token punctuation">:</span>
    matchLabels<span class="token punctuation">:</span>
      <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> include <span class="token string">&quot;nginx.selectorLabels&quot;</span> <span class="token punctuation">.</span> <span class="token operator">|</span> nindent <span class="token number">6</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>lower表示将内容小写,quote表示用双引号引起来</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>value<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> include <span class="token string">&quot;mytpl&quot;</span> <span class="token punctuation">.</span> <span class="token operator">|</span> lower <span class="token operator">|</span> quote <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>条件判断语句每个if对应一个end</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">if</span> <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>fullnameOverride <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">...</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">else</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">...</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常用来根据values.yaml中定义的开关来控制模板中的显示：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">if</span> not <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>autoscaling<span class="token punctuation">.</span>enabled <span class="token punctuation">}</span><span class="token punctuation">}</span>
  replicas<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>replicaCount <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>定义变量,模板中可以通过变量名字去引用</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> $name <span class="token operator">:=</span> <span class="token keyword">default</span> <span class="token punctuation">.</span>Chart<span class="token punctuation">.</span>Name <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>nameOverride <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>遍历values的数据</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>      <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> with <span class="token punctuation">.</span>Values<span class="token punctuation">.</span>nodeSelector <span class="token punctuation">}</span><span class="token punctuation">}</span>
      nodeSelector<span class="token punctuation">:</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> toYaml <span class="token punctuation">.</span> <span class="token operator">|</span> nindent <span class="token number">8</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>toYaml处理值中的转义及特殊字符, <code>kubernetes.io/role&quot;=master , name=&quot;value1\\,value2</code> 类似的情况</p></li><li><p>default设置默认值</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>image<span class="token punctuation">:</span> <span class="token string">&quot;{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p>Helm template</p><p>hpa.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if .Values.autoscaling.enabled <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> autoscaling/v2beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HorizontalPodAutoscaler
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> include &quot;nginx.fullname&quot; . <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> include &quot;nginx.labels&quot; . <span class="token punctuation">|</span> nindent 4 <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">scaleTargetRef</span><span class="token punctuation">:</span>
    <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
    <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> include &quot;nginx.fullname&quot; . <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">minReplicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.autoscaling.minReplicas <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">maxReplicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.autoscaling.maxReplicas <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">metrics</span><span class="token punctuation">:</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if .Values.autoscaling.targetCPUUtilizationPercentage <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> Resource
      <span class="token key atrule">resource</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> cpu
        <span class="token key atrule">targetAverageUtilization</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.autoscaling.targetCPUUtilizationPercentage <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if .Values.autoscaling.targetMemoryUtilizationPercentage <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> Resource
      <span class="token key atrule">resource</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> memory
        <span class="token key atrule">targetAverageUtilization</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.autoscaling.targetMemoryUtilizationPercentage <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="创建应用的时候赋值" tabindex="-1"><a class="header-anchor" href="#创建应用的时候赋值" aria-hidden="true">#</a> 创建应用的时候赋值</h6><ul><li>set的方式</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 改变副本数和resource值</span>
$ helm install nginx-2 <span class="token punctuation">.</span><span class="token operator">/</span>nginx <span class="token operator">--</span><span class="token function">set</span> replicaCount=2 <span class="token operator">--</span><span class="token function">set</span> resources<span class="token punctuation">.</span>limits<span class="token punctuation">.</span>cpu=200m <span class="token operator">--</span><span class="token function">set</span> resources<span class="token punctuation">.</span>limits<span class="token punctuation">.</span>memory=256Mi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>value文件的方式</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> nginx-values<span class="token punctuation">.</span>yaml
resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128Mi
autoscaling:
  enabled: true
  minReplicas: 1
  maxReplicas: 3
  targetCPUUtilizationPercentage: 80
ingress:
  enabled: true
  hosts:
    <span class="token operator">-</span> host: chart-example<span class="token punctuation">.</span>nohi<span class="token punctuation">.</span>com
      paths:
      <span class="token operator">-</span> path: <span class="token operator">/</span>
        pathType: Prefix

$ helm install <span class="token operator">-</span>f nginx-values<span class="token punctuation">.</span>yaml nginx-3 <span class="token punctuation">.</span><span class="token operator">/</span>nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>可能需要修改版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ vi ./nginx/templates/hpa.yaml
#apiVersion: autoscaling/v2beta1
apiVersion: autoscaling/v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><p>更多语法参考：</p><p>https://helm.sh/docs/topics/charts/</p><p>部署mysql失败的问题</p><h5 id="实战-使用helm部署harbor镜像及chart仓库" tabindex="-1"><a class="header-anchor" href="#实战-使用helm部署harbor镜像及chart仓库" aria-hidden="true">#</a> 实战：使用Helm部署Harbor镜像及chart仓库</h5><blockquote><p>20230219 参照： https://www.jianshu.com/p/9df9ae97db39</p><p>0219 仍未完成,/root/k8s-app/helm/harbor</p></blockquote><h6 id="harbor踩坑部署" tabindex="-1"><a class="header-anchor" href="#harbor踩坑部署" aria-hidden="true">#</a> harbor踩坑部署</h6><p>架构 <code>https://github.com/goharbor/harbor/wiki/Architecture-Overview-of-Harbor</code></p><p><img src="`+M+`" alt=""></p><ul><li>Core,核心组件 <ul><li>API Server,接收处理用户请求</li><li>Config Manager ：所有系统的配置,比如认证、邮件、证书配置等</li><li>Project Manager：项目管理</li><li>Quota Manager ：配额管理</li><li>Chart Controller：chart管理</li><li>Replication Controller ：镜像副本控制器,可以与不同类型的仓库实现镜像同步 <ul><li>Distribution (docker registry)</li><li>Docker Hub</li></ul></li><li>Scan Manager ：扫描管理,引入第三方组件,进行镜像安全扫描</li><li>Registry Driver ：镜像仓库驱动,目前使用docker registry</li></ul></li><li>Job Service,执行异步任务,如同步镜像信息</li><li>Log Collector,统一日志收集器,收集各模块日志</li><li>GC Controller</li><li>Chart Museum,chart仓库服务,第三方</li><li>Docker Registry,镜像仓库服务</li><li>kv-storage,redis缓存服务,job service使用,存储job metadata</li><li>local/remote storage,存储服务,比较镜像存储</li><li>SQL Database,postgresl,存储用户、项目等元数据</li></ul><ul><li><p>重要说明</p><ul><li><p>原视频中存在缺失,无法安装</p></li><li><p>参考了： <code>https://www.jianshu.com/p/9df9ae97db39</code> 和<code> https://blog.51cto.com/lidabai/5195706</code> 两遍博文</p></li><li><p>结合之前安装的storageclass 和 ingress,完成部署安装,具体配置见如下</p><p>如遇到问题,多describe 和 logs 查看pod详细情况</p></li></ul></li><li><p>参见：PV与PVC管理NFS存储卷实践,storageclass,创建provider、storageclass</p></li></ul><h6 id="_01-provider-yaml" tabindex="-1"><a class="header-anchor" href="#_01-provider-yaml" aria-hidden="true">#</a> <code>01-provider.yaml</code></h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nfs-client-provisioner
  labels:
    app: nfs-client-provisioner
  namespace: harbor
spec:
  replicas: 1
  strategy:
    type: Recreate
  selector:
    matchLabels:
      app: nfs-client-provisioner
  template:
    metadata:
      labels:
        app: nfs-client-provisioner
    spec:
      serviceAccountName: nfs-client-provisioner
      containers:
        - name: nfs-client-provisioner
          image: easzlab/nfs-subdir-external-provisioner:v4.0.1
          volumeMounts:
            - name: nfs-client-root
              mountPath: /persistentvolumes
          env:
            # 存储分配器名称
            - name: PROVISIONER_NAME
              value: nohi.com/harbor
            # NFS服务器地址,设置为自己的IP
            - name: NFS_SERVER
              value: 10.0.0.203
            # NFS共享目录地址
            - name: NFS_PATH
              value: /mnt/truenas/share/nfs/harbor
      volumes:
        - name: nfs-client-root
          nfs:
            # 设置为自己的IP
            server: 10.0.0.203
            # 对应NFS上的共享目录
            path: /mnt/truenas/share/nfs/harbor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_02-rbac-yaml" tabindex="-1"><a class="header-anchor" href="#_02-rbac-yaml" aria-hidden="true">#</a> <code>02-rbac.yaml</code></h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kind: ServiceAccount
apiVersion: v1
metadata:
  name: nfs-client-provisioner
  namespace: harbor
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: nfs-client-provisioner-runner
rules:
  - apiGroups: [&quot;&quot;]
    resources: [&quot;persistentvolumes&quot;]
    verbs: [&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;, &quot;create&quot;, &quot;delete&quot;]
  - apiGroups: [&quot;&quot;]
    resources: [&quot;persistentvolumeclaims&quot;]
    verbs: [&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;, &quot;update&quot;]
  - apiGroups: [&quot;storage.k8s.io&quot;]
    resources: [&quot;storageclasses&quot;]
    verbs: [&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;]
  - apiGroups: [&quot;&quot;]
    resources: [&quot;events&quot;]
    verbs: [&quot;create&quot;, &quot;update&quot;, &quot;patch&quot;]
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: run-nfs-client-provisioner
subjects:
  - kind: ServiceAccount
    name: nfs-client-provisioner
    namespace: harbor
roleRef:
  kind: ClusterRole
  name: nfs-client-provisioner-runner
  apiGroup: rbac.authorization.k8s.io
---
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: leader-locking-nfs-client-provisioner
  namespace: harbor
rules:
  - apiGroups: [&quot;&quot;]
    resources: [&quot;endpoints&quot;]
    verbs: [&quot;get&quot;, &quot;list&quot;, &quot;watch&quot;, &quot;create&quot;, &quot;update&quot;, &quot;patch&quot;]
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: leader-locking-nfs-client-provisioner

  namespace: harbor
subjects:
  - kind: ServiceAccount
    name: nfs-client-provisioner
    # replace with namespace where provisioner is deployed
    namespace: harbor
roleRef:
  kind: Role
  name: leader-locking-nfs-client-provisioner
  apiGroup: rbac.authorization.k8s.io

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_03-nfs-storage-class-yaml" tabindex="-1"><a class="header-anchor" href="#_03-nfs-storage-class-yaml" aria-hidden="true">#</a> <code>03-nfs-storage-class.yaml</code></h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nfs-storage-harbor
# 存储分配器的名称
# 对应“provisioner.yaml”文件中env.PROVISIONER_NAME.value
provisioner: nohi.com/harbor
# 允许pvc创建后扩容
allowVolumeExpansion: True
parameters:
  # 资源删除策略,“true”表示删除PVC时,同时删除绑定的PV
  archiveOnDelete: &quot;true&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_04-harbor-pvc" tabindex="-1"><a class="header-anchor" href="#_04-harbor-pvc" aria-hidden="true">#</a> <code>04-harbor-pvc</code></h6><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: nfs-pvc-harbor
  namespace: harbor
spec:
  accessModes:
  <span class="token operator">-</span> ReadWriteMany
  resources:
    requests:
      storage: 20Gi
  storageClassName: nfs-storage-harbor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_05-nginx-harbor-yaml" tabindex="-1"><a class="header-anchor" href="#_05-nginx-harbor-yaml" aria-hidden="true">#</a> <code>05-nginx-harbor.yaml</code></h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata:
  name: nginx-harbor
  namespace: harbor
spec:
  containers:
  - name: alpine
    image: alpine
    args:
    - sh
    - -c
    - &quot;touch /mnt/SECCESS-harbor &amp;&amp; exit || exit 1&quot;
    volumeMounts:
    - name: pvc
      mountPath: /mnt
  volumes:
  - name: pvc
    persistentVolumeClaim:
      claimName: nfs-pvc-harbor ## 这是上面创建的pvc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>20230222 验证成功</strong></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 添加harbor chart仓库</span>
$ helm repo add harbor https:<span class="token operator">/</span><span class="token operator">/</span>helm<span class="token punctuation">.</span>goharbor<span class="token punctuation">.</span>io

<span class="token comment"># 搜索harbor的chart</span>
$ helm search repo harbor

<span class="token comment"># 不知道如何部署,因此拉到本地 20230219 1.11.0</span>
$ helm pull harbor/harbor <span class="token operator">--</span>version 1<span class="token punctuation">.</span>11<span class="token punctuation">.</span>0
<span class="token comment"># 解压</span>
$ tar xzvf harbor-1<span class="token punctuation">.</span>11<span class="token punctuation">.</span>0<span class="token punctuation">.</span>tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="修改配置文件-harbor-values-yaml" tabindex="-1"><a class="header-anchor" href="#修改配置文件-harbor-values-yaml" aria-hidden="true">#</a> 修改配置文件 harbor/values.yaml</h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>expose:
  tls:
    enabled: true
    certSource: secret
    secret:
      secretName: &quot;harbor-tls&quot;
      notarySecretName: &quot;harbor-tls&quot;
....
persistence:
  enabled: true
  resourcePolicy: &quot;keep&quot;
  persistentVolumeClaim:
    registry:    
      existingClaim: &quot;&quot;
      storageClass: &quot;nfs-storage-harbor&quot;
      subPath: &quot;&quot;
      accessMode: ReadWriteOnce
      size: 5Gi
      annotations: {}
    chartmuseum:
      existingClaim: &quot;&quot;
      storageClass: &quot;nfs-storage-harbor&quot;
      subPath: &quot;&quot;
      accessMode: ReadWriteOnce
      size: 5Gi
      annotations: {}
    jobservice:
      jobLog:
        existingClaim: &quot;&quot;
        storageClass: &quot;nfs-storage-harbor&quot;
        subPath: &quot;&quot;
        accessMode: ReadWriteOnce
        size: 1Gi
        annotations: {}
      scanDataExports:
        existingClaim: &quot;&quot;
        storageClass: &quot;nfs-storage-harbor&quot;
        subPath: &quot;&quot;
        accessMode: ReadWriteOnce
        size: 1Gi
        annotations: {}   
    database:
      existingClaim: &quot;&quot;
      storageClass: &quot;nfs-storage-harbor&quot;
      subPath: &quot;&quot;
      accessMode: ReadWriteOnce
      size: 1Gi
      annotations: {}
    redis:
      existingClaim: &quot;&quot;
      storageClass: &quot;nfs-storage-harbor&quot;
      subPath: &quot;&quot;
      accessMode: ReadWriteOnce
      size: 1Gi
      annotations: {}
    trivy:
      existingClaim: &quot;&quot;
      storageClass: &quot;nfs-storage-harbor&quot;
      subPath: &quot;&quot;
      accessMode: ReadWriteOnce
      size: 5Gi
      annotations: {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="证书" tabindex="-1"><a class="header-anchor" href="#证书" aria-hidden="true">#</a> 证书</h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 获得证书
openssl req -newkey rsa:4096 -nodes -sha256 -keyout ca.key -x509 -days 3650 -out ca.crt  -subj  &quot;/C=CN/ST=JS/L=NJ/O=nohi/OU=nohi/CN=10.0.0.181&quot;

## 生成证书签名请求
openssl req -newkey rsa:4096 -nodes -sha256 -keyout tls.key -out tls.csr  -subj  &quot;/C=CN/ST=JS/L=NJ/O=nohi/OU=nohi/CN=10.0.0.181&quot;

## 通过IP连接时,CN貌似是不生效的,会被忽略,因此需要创建一个配置文件来指定IP地址：
vim extfile.cnf
#填入以下内容
subjectAltName = IP:10.0.0.181

## 生成证书
$ openssl x509 -req -days 3650 -in tls.csr -CA ca.crt -CAkey ca.key -CAcreateserial  -extfile extfile.cnf -out tls.crt

②生成secret资源
创建 Kubernetes 的 Secret 资源,且将证书文件导入：

kubectl create secret generic harbor-tls --from-file=tls.crt --from-file=tls.key --from-file=ca.crt -n harbor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="安装harbor" tabindex="-1"><a class="header-anchor" href="#安装harbor" aria-hidden="true">#</a> 安装harbor</h6><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 使用本地chart安装
$ helm install harbor ./harbor -n harbor 
## 指定配置文件、在线安装
helm install harbor harbor/harbor -f 02-harbor-helm-values.yaml -n harbor
# 修改配置后,更新
$ helm upgrade harbor -n harbor ./
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>卸载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-master harbor]# helm -n harbor ls
NAME  	NAMESPACE	REVISION	UPDATED                              	STATUS  	CHART        	APP VERSION
harbor	harbor   	1       	2023-02-23 13:34:20.0135317 +0800 CST	deployed	harbor-1.11.0	2.7.0
[root@k8s-master harbor]# helm -n harbor uninstall harbor
These resources were kept due to the resource policy:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h6 id="推送镜像到harbor仓库" tabindex="-1"><a class="header-anchor" href="#推送镜像到harbor仓库" aria-hidden="true">#</a> 推送镜像到Harbor仓库</h6><p>配置hosts及docker非安全仓库：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> <span class="token operator">/</span>etc/hosts
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181 k8s-master core<span class="token punctuation">.</span>harbor<span class="token punctuation">.</span>domain
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

$ <span class="token function">cat</span> <span class="token operator">/</span>etc/docker/daemon<span class="token punctuation">.</span>json
<span class="token punctuation">{</span>                                            
  <span class="token string">&quot;insecure-registries&quot;</span>: <span class="token punctuation">[</span>                   
    <span class="token string">&quot;192.168.136.10:5000&quot;</span><span class="token punctuation">,</span>                   
    <span class="token string">&quot;core.harbor.domain&quot;</span>                     
  <span class="token punctuation">]</span><span class="token punctuation">,</span>                                         
  <span class="token string">&quot;registry-mirrors&quot;</span> : <span class="token punctuation">[</span>                     
    <span class="token string">&quot;https://8xpk5wnt.mirror.aliyuncs.com&quot;</span>   
  <span class="token punctuation">]</span>                                          
<span class="token punctuation">}</span>                           

<span class="token comment">#</span>
$ systemctl restart docker

<span class="token comment"># 使用账户密码登录admin/Harbor12345</span>
$ docker login core<span class="token punctuation">.</span>harbor<span class="token punctuation">.</span>domain

$ docker tag nginx:alpine core<span class="token punctuation">.</span>harbor<span class="token punctuation">.</span>domain/library/nginx:alpine
$ docker push core<span class="token punctuation">.</span>harbor<span class="token punctuation">.</span>domain/library/nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="推送chart到harbor仓库" tabindex="-1"><a class="header-anchor" href="#推送chart到harbor仓库" aria-hidden="true">#</a> 推送chart到Harbor仓库</h6><p>helm3默认没有安装helm push插件,需要手动安装。插件地址 https://github.com/chartmuseum/helm-push</p><p>安装插件：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ helm plugin install https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/chartmuseum/helm-push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>离线安装：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ helm plugin install <span class="token punctuation">.</span><span class="token operator">/</span>helm-push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>添加repo</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ helm repo add myharbor https:<span class="token operator">/</span><span class="token operator">/</span>core<span class="token punctuation">.</span>harbor<span class="token punctuation">.</span>domain/chartrepo/library 
<span class="token comment"># x509错误</span>

<span class="token comment"># 添加证书信任,根证书为配置给ingress使用的证书</span>
$ kubectl get secret harbor-harbor-ingress <span class="token operator">-</span>n harbor <span class="token operator">-</span>o jsonpath=<span class="token string">&quot;{.data.ca\\.crt}&quot;</span> <span class="token punctuation">|</span> base64 <span class="token operator">-</span>d &gt;harbor<span class="token punctuation">.</span>ca<span class="token punctuation">.</span>crt

$ <span class="token function">cp</span> harbor<span class="token punctuation">.</span>ca<span class="token punctuation">.</span>crt <span class="token operator">/</span>etc/pki/ca-trust/source/anchors
$ <span class="token function">update-ca</span><span class="token operator">-</span>trust enable<span class="token punctuation">;</span> <span class="token function">update-ca</span><span class="token operator">-</span>trust extract

<span class="token comment"># 再次添加</span>
$ helm repo add myharbor https:<span class="token operator">/</span><span class="token operator">/</span>core<span class="token punctuation">.</span>harbor<span class="token punctuation">.</span>domain/chartrepo/library <span class="token operator">--</span>ca-file=harbor<span class="token punctuation">.</span>ca<span class="token punctuation">.</span>crt

$ helm repo <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>推送chart到仓库：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ helm push harbor myharbor <span class="token operator">--</span>ca-file=harbor<span class="token punctuation">.</span>ca<span class="token punctuation">.</span>crt <span class="token operator">-</span>u admin <span class="token operator">-</span>p Harbor12345
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看harbor仓库的chart</p><h4 id="课程小结" tabindex="-1"><a class="header-anchor" href="#课程小结" aria-hidden="true">#</a> 课程小结</h4><p>使用k8s的进阶内容。</p><ol><li><p>学习k8s在etcd中数据的存储,掌握etcd的基本操作命令</p></li><li><p>理解k8s调度的过程,预选及优先。影响调度策略的设置</p><p><img src="`+o+'" alt=""></p></li><li><p>Flannel网络的原理学习,了解网络的流向,帮助定位问题</p><p><img src="'+c+'" alt=""></p></li><li><p>认证与授权,掌握kubectl、kubelet、rbac及二次开发如何调度API</p><p><img src="'+u+'" alt=""></p></li><li><p>利用HPA进行业务动态扩缩容,通过metrics-server了解整个k8s的监控体系</p><p><img src="'+l+'" alt=""></p></li><li><p>PV + PVC</p><p><img src="'+i+'" alt=""></p></li><li><p>Helm</p><p><img src="'+p+'" alt=""></p></li></ol>',182);function Sn(An,$n){const a=v("ExternalLinkIcon");return m(),k("div",null,[E,n("ul",null,[W,U,n("li",null,[s("CNI driver根据配置调用具体的CNI插件,二进制调用,可执行文件目录为/opt/cni/bin,"),n("a",O,[s("项目"),e(a)])]),L]),Z,n("ul",null,[D,n("li",null,[n("p",null,[s("Admission Control："),n("a",j,[s("准入控制"),e(a)]),s(",一个控制链(层层关卡),用于拦截请求的一种方式。偏集群安全控制、管理方面。")]),H])]),Y,n("p",null,[s("Role-Based Access Control,基于角色的访问控制, apiserver启动参数添加--authorization-mode=RBAC 来启用RBAC认证模式,kubeadm安装的集群默认已开启。"),n("a",B,[s("官方介绍"),e(a)])]),F,n("p",null,[s("结局有点意外,除了"),J,s("外,没有找到system相关的rolebindings,显然和我们的理解不一样。 尝试去找"),n("a",X,[s("资料"),e(a)]),s(",发现了这么一段 :")]),n("table",null,[K,n("tbody",null,[n("tr",null,[Q,nn,n("td",sn,[s("Allows access to the resources required by the "),n("a",an,[s("scheduler"),e(a)]),s("component.")])]),en,n("tr",null,[tn,ln,n("td",pn,[s("Allows access to the resources required by the "),n("a",on,[s("controller manager"),e(a)]),s(" component. The permissions required by individual controllers are detailed in the "),n("a",cn,[s("controller roles"),e(a)]),s(".")])]),n("tr",null,[un,rn,n("td",dn,[s("Allows access to resources required by the kubelet, "),vn,s(". You should use the "),n("a",mn,[s("Node authorizer"),e(a)]),s(" and "),n("a",kn,[s("NodeRestriction admission plugin"),e(a)]),s(" instead of the "),bn,s(" role, and allow granting API access to kubelets based on the Pods scheduled to run on them. The "),hn,s(" role only exists for compatibility with Kubernetes clusters upgraded from versions prior to v1.8.")])]),n("tr",null,[gn,yn,n("td",fn,[s("Allows access to the resources required by the "),n("a",xn,[s("kube-proxy"),e(a)]),s("component.")])])])]),n("p",null,[s("大致意思是说：之前会定义system:node这个角色,目的是为了kubelet可以访问到必要的资源,包括所有secret的读权限及更新pod状态的写权限。如果1.8版本后,是建议使用 "),n("a",qn,[s("Node authorizer"),e(a)]),s(" and "),n("a",wn,[s("NodeRestriction admission plugin"),e(a)]),s(" 来代替这个角色的。")]),Pn,n("p",null,[s("但是这个过程是手动操作的。在实际项目中,我们需要做到是的是一个自动化感知并自动扩容的操作。Kubernetes 也为提供了这样的一个资源对象：Horizontal Pod Autoscaling（Pod 水平自动伸缩）,简称"),n("a",Vn,[s("HPA"),e(a)])]),Nn,n("p",null,[n("a",_n,[s("官方介绍"),e(a)])]),Cn,n("p",null,[n("a",Rn,[s("kube-aggregator"),e(a)])]),In])}const Gn=d(T,[["render",Sn],["__file","14_Docker_k8s教程-03进阶.html.vue"]]);export{Gn as default};

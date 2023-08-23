import{_ as e,p as n,q as s,a1 as a}from"./framework-449724a9.js";const i={},l=a(`<h1 id="kubeadm安装部署1-22" tabindex="-1"><a class="header-anchor" href="#kubeadm安装部署1-22" aria-hidden="true">#</a> kubeadm安装部署1.22</h1><blockquote><p>见：K8S安装</p><p>https://www.bilibili.com/video/BV1cR4y1f7Ac/?spm_id_from=333.337.search-card.all.click&amp;vd_source=9004ce053a52d5930f71e230579961e7</p></blockquote><h2 id="_1环境" tabindex="-1"><a class="header-anchor" href="#_1环境" aria-hidden="true">#</a> 1环境</h2><table><thead><tr><th>主机名</th><th>ip地址</th><th>角色</th></tr></thead><tbody><tr><td>k8s-master</td><td>10.0.0.212</td><td>master，node</td></tr><tr><td>k8s-node1</td><td>10.0.0.213</td><td>node</td></tr><tr><td>K8s-node2</td><td>10.0.0.214</td><td>node</td></tr></tbody></table><p>分别设置主机名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>hostnamectl  set-hostname k8s-master
hostnamectl  set-hostname k8s-node1
hostnamectl  set-hostname k8s-node2
或者修改 vi /etc/hostname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10.0.0.212	k8s-master
10.0.0.213	k8s-node1
10.0.0.214	k8s-node2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>master</p><ul><li><p>etcd</p></li><li><p>Api-server</p></li><li><p>controller-manager</p></li><li><p>scheduler</p></li><li><p>kubelet</p></li><li><p>Kube-proxy</p></li></ul></li><li><p>node</p><ul><li>kubelet</li><li>Kube-proxy</li><li>Docker</li></ul></li></ul><h1 id="_2-环境设置" tabindex="-1"><a class="header-anchor" href="#_2-环境设置" aria-hidden="true">#</a> 2 环境设置</h1><ul><li><p>主机名 <code>/etc/hosts</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10.0.0.212	k8s-master
10.0.0.213	k8s-node1
10.0.0.214	k8s-node2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>关闭防火墙</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 关闭防火墙
systemctl stop firewalld
# 开机不启动
systemctl disable firewalld 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>禁用selinux</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>setenforce 0  # 临时关闭
getenforce 		# 查看selinux状态
vi /etc/selinux/config  # 永久关闭
SELINUX=disabled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>关闭swap分区</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>swapoff -a  # 禁用swap
free -h # 查看分区
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>时间同步</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl start chronyd
systemctl enable chronyd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>桥接IPV4流量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt;&gt; /etc/sysctl.d/k8s.conf &lt;&lt;EOF
net.bridge.bridge-nf-call-ip6tables=1
net.bridge.bridge-nf-call-iptables=1
net.ipv4.ip_forward=1
vm.swappiness=0
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>应用sysctl参数而不重新启动： <code>sysctl --system</code></li></ul></li></ul><h1 id="_3安装k8s" tabindex="-1"><a class="header-anchor" href="#_3安装k8s" aria-hidden="true">#</a> 3安装K8S</h1><h2 id="_3-1-安装docker" tabindex="-1"><a class="header-anchor" href="#_3-1-安装docker" aria-hidden="true">#</a> 3.1 安装docker</h2><h3 id="_3-1-1-删除旧docker版本" tabindex="-1"><a class="header-anchor" href="#_3-1-1-删除旧docker版本" aria-hidden="true">#</a> 3.1.1 删除旧docker版本</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum remove docker docker-client \\
   docker-client-latest \\
   docker-common \\
   docker-latest \\
   docker-latest-logrotate \\
   docker-logrotate \\
   docker-engine 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-2-安装并启动docker" tabindex="-1"><a class="header-anchor" href="#_3-1-2-安装并启动docker" aria-hidden="true">#</a> 3.1.2 安装并启动Docker</h3><ul><li><p>安装yum-utils,主要提供yum-config-manager命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y yum-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装docker的repo仓库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装指定版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum -y install docker-ce-20.10.9 docker-ce-cli-20.10.9 containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>设置开机自启动、启动docker</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable docker
systemctl start docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-1-3-设置镜像加速器" tabindex="-1"><a class="header-anchor" href="#_3-1-3-设置镜像加速器" aria-hidden="true">#</a> 3.1.3 设置镜像加速器</h3><ul><li><p><code>vi /etc/docker/daemon.json</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
 <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://c07oywfn.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
 <span class="token property">&quot;exec-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_3-2-配置kubernetes的阿里云yum源-所有节点执行" tabindex="-1"><a class="header-anchor" href="#_3-2-配置kubernetes的阿里云yum源-所有节点执行" aria-hidden="true">#</a> 3.2 配置kubernetes的阿里云yum源（所有节点执行）</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/yum.repos.d/kubernetes.repo  &lt;&lt; EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-3-yum安装kubeadm、kubelet、kubectl-所有节点都执行" tabindex="-1"><a class="header-anchor" href="#_3-3-yum安装kubeadm、kubelet、kubectl-所有节点都执行" aria-hidden="true">#</a> 3.3 yum安装kubeadm、kubelet、kubectl（所有节点都执行）</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum list --showduplicates | grep kubeadm  ## 查看yum可获取的kubeadm版本，这里选择1.22.6
# 卸载之前安装版本
yum remove kubelet kubeadm kubectl
# 安装指定版本
yum -y install kubelet-1.22.6 kubeadm-1.22.6 kubectl-1.22.6
# 开机自启
systemctl enable kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-4-初始化master节点" tabindex="-1"><a class="header-anchor" href="#_3-4-初始化master节点" aria-hidden="true">#</a> 3.4 初始化master节点</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm init <span class="token punctuation">\\</span>
--apiserver-advertise-address<span class="token operator">=</span><span class="token number">10.0</span>.0.212 <span class="token punctuation">\\</span>
--image-repository registry.aliyuncs.com/google_containers <span class="token punctuation">\\</span>
--kubernetes-version v1.22.6 <span class="token punctuation">\\</span>
--service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/12 <span class="token punctuation">\\</span>
--pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16 <span class="token punctuation">\\</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化成功后出现如下提示</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>addons<span class="token punctuation">]</span> Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:

  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

Alternatively, <span class="token keyword">if</span> you are the root user, you can run:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run <span class="token string">&quot;kubectl apply -f [podnetwork].yaml&quot;</span> with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can <span class="token function">join</span> any number of worker nodes by running the following on each as root:

kubeadm <span class="token function">join</span> <span class="token number">10.0</span>.0.212:6443 <span class="token parameter variable">--token</span> oha8m0.wo4a62msnuw95z4f <span class="token punctuation">\\</span>
	--discovery-token-ca-cert-hash sha256:1021c5ef14ee4811d185c4df78a56731cfce0e0b03d54dc90e59fc14bfc581f1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><h2 id="如果因之前安装、启动报错-可执行重置-kubeadm-reset" tabindex="-1"><a class="header-anchor" href="#如果因之前安装、启动报错-可执行重置-kubeadm-reset" aria-hidden="true">#</a> 如果因之前安装、启动报错，可执行重置：<code>kubeadm reset</code></h2></li><li><p>按提示操作</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>列出所有pods</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-A</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-5-将node节点加入k8s集群" tabindex="-1"><a class="header-anchor" href="#_3-5-将node节点加入k8s集群" aria-hidden="true">#</a> 3.5 将node节点加入k8s集群</h2><ul><li><p>在另两台机器上执行 （3.4提示信息）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">10.0</span>.0.212:6443 <span class="token parameter variable">--token</span> oha8m0.wo4a62msnuw95z4f <span class="token punctuation">\\</span>
	--discovery-token-ca-cert-hash sha256:1021c5ef14ee4811d185c4df78a56731cfce0e0b03d54dc90e59fc14bfc581f1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看节点状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-master manifests]# kubectl get nodes -A
NAME         STATUS     ROLES                  AGE   VERSION
k8s-master   NotReady   control-plane,master   11m   v1.22.6
k8s-node1    NotReady   &lt;none&gt;                 41s   v1.22.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h1 id="_4-部署容器网络-cni网络插件-在master上执行" tabindex="-1"><a class="header-anchor" href="#_4-部署容器网络-cni网络插件-在master上执行" aria-hidden="true">#</a> 4 部署容器网络，CNI网络插件（在Master上执行)</h1><h2 id="_4-1-在master节点配置pod网络创建" tabindex="-1"><a class="header-anchor" href="#_4-1-在master节点配置pod网络创建" aria-hidden="true">#</a> 4.1 在master节点配置pod网络创建</h2><p>​ node节点加入k8s集群后，在master上执行kubectl get nodes 发现状态是NotReady，因为还没有部署CNI网络插件，其实在步骤四初始化。</p><p>​ 著名的有flannel、calico、canal和kube-router等</p><h2 id="_4-2-下载kube-flannel-yml" tabindex="-1"><a class="header-anchor" href="#_4-2-下载kube-flannel-yml" aria-hidden="true">#</a> 4.2 下载kube-flannel.yml</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

修改network与执行kubeadm init一致
net-conf.json: |
    {
      &quot;Network&quot;: &quot;10.244.0.0/16&quot;,
      &quot;Backend&quot;: {
        &quot;Type&quot;: &quot;vxlan&quot;
      }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-3-安装flannel插件" tabindex="-1"><a class="header-anchor" href="#_4-3-安装flannel插件" aria-hidden="true">#</a> 4.3 安装flannel插件</h2><ul><li><p>拉取镜像(所有节点)</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull rancher/mirrored-flannelcni-flannel-cni-plugin:v1.1.0
<span class="token function">docker</span> pull rancher/mirrored-flannelcni-flannel:v0.20.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>主机节点执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h1 id="_5-设置角色" tabindex="-1"><a class="header-anchor" href="#_5-设置角色" aria-hidden="true">#</a> 5 设置角色</h1><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl label node k8s-node1 node-role.kubernetes.io/worker=worker
kubectl label node k8s-node2 node-role.kubernetes.io/worker=worker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_6-测试" tabindex="-1"><a class="header-anchor" href="#_6-测试" aria-hidden="true">#</a> 6 测试</h1><ul><li><p>创建目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir hello &amp;&amp; cd hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>vi server.js</code></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token char">&#39;http&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token char">&#39;hello...&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> handleRequest <span class="token operator">=</span> <span class="token function">function</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>&#39;Received request <span class="token keyword">for</span> URL<span class="token punctuation">:</span>&#39; <span class="token operator">+</span> request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
  response<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  response<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>&#39;Hello World&#39;<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> www <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span>handleRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
www<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token char">&#39;Listening&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>vi Dockerfile</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM node:6.14.2
EXPOSE 8080
COPY server.js .
CMD node server.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> hello_world:v2 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>打包镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master hello<span class="token punctuation">]</span><span class="token comment"># docker images</span>
REPOSITORY                                                        TAG       IMAGE ID       CREATED         SIZE
hello_world                                                       v2        fd37ca142433   <span class="token number">3</span> minutes ago   660MB
<span class="token function">node</span>                                                              <span class="token number">6.14</span>.2    00165cd5d0c0   <span class="token number">4</span> years ago     660MB
<span class="token punctuation">[</span>root@k8s-master hello<span class="token punctuation">]</span><span class="token comment"># docker save fd37ca142433 &gt; hello.tar</span>
<span class="token function">docker</span> save <span class="token parameter variable">-o</span> hello.tar hello_world:v2 <span class="token comment"># 指定镜像名称版本</span>

<span class="token comment">## 测试镜像是否可用</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> hello-world <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 hello_world:v2
访问http://127.0.0.1:8080是否可以出现Hello world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>导入镜像(其他节点)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker load &lt; hello.tar

[root@k8s-node2 ~]# docker images
REPOSITORY                                           TAG       IMAGE ID       CREATED         SIZE
&lt;none&gt;                                               &lt;none&gt;    fd37ca142433   7 minutes ago   660MB
[root@k8s-node2 ~]# docker tag fd37ca142433 hello_world:v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>vi hello_world.yaml</code> （主节点）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Service
metadata:
 name: hello-world
spec:
 type: NodePort
 ports:
 - port: 80
   targetPort: 8080
   nodePort: 31611
 selector:
  app: hello-world
---
apiVersion: apps/v1
kind: Deployment
metadata:
 name: hello-world
spec:
 replicas: 3
 selector:
  matchLabels:
   app: hello-world
 template:
  metadata:
   labels:
    app: hello-world
  spec:
   containers:
   - name: hello-world
     image: hello_world:v2
     ports:
     - containerPort: 8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>部署</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl apply -f hello_world.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pods -A 
kubectl get svc -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pods -A 
kubectl get svc -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,46),d=[l];function t(c,r){return n(),s("div",null,d)}const u=e(i,[["render",t],["__file","10_kubeadm安装部署k8s1.22.html.vue"]]);export{u as default};

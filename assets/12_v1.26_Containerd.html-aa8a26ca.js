import{_ as r,M as l,p as t,q as c,R as e,t as i,N as s,U as o,a1 as n}from"./framework-449724a9.js";const u={},v=e("h1",{id:"_1-v1-26-containerd",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-v1-26-containerd","aria-hidden":"true"},"#"),i(" 1 v1.26+Containerd")],-1),m=e("p",null,"create by nohi 20230106",-1),b={href:"https://blog.frognew.com/2023/01/kubeadm-install-kubernetes-1.26.html#22-%E4%BD%BF%E7%94%A8kubeadm-init%E5%88%9D%E5%A7%8B%E5%8C%96%E9%9B%86%E7%BE%A4",target:"_blank",rel:"noopener noreferrer"},p=n(`<h2 id="环境配置-所有节点操作" tabindex="-1"><a class="header-anchor" href="#环境配置-所有节点操作" aria-hidden="true">#</a> 环境配置（所有节点操作）</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># vi /etc/hosts
10.0.0.216 k8s-m1
10.0.0.217 k8s-n1
10.0.0.218 k8s-n2

# 修改网卡配置，关闭ipv6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="防火墙配置" tabindex="-1"><a class="header-anchor" href="#防火墙配置" aria-hidden="true">#</a> 防火墙配置</h4><blockquote><p>所有主机均需要操作。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>关闭现有防火墙firewalld
<span class="token comment"># systemctl disable firewalld</span>
<span class="token comment"># systemctl stop firewalld</span>
<span class="token comment"># firewall-cmd --state</span>
not running
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="selinux配置" tabindex="-1"><a class="header-anchor" href="#selinux配置" aria-hidden="true">#</a> SELINUX配置</h4><blockquote><p>所有主机均需要操作。修改SELinux配置需要重启操作系统。</p><p>setenforce 0 #临时生效，下方命令为永久生效</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># sed -ri &#39;s/SELINUX=enforcing/SELINUX=disabled/&#39; /etc/selinux/config</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="时间同步配置" tabindex="-1"><a class="header-anchor" href="#时间同步配置" aria-hidden="true">#</a> 时间同步配置</h4><blockquote><p>所有主机均需要操作。最小化安装系统需要安装ntpdate软件。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>systemctl <span class="token function">start</span> chronyd
systemctl enable chronyd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建-etc-modules-load-d-containerd-conf配置文件" tabindex="-1"><a class="header-anchor" href="#创建-etc-modules-load-d-containerd-conf配置文件" aria-hidden="true">#</a> 创建/etc/modules-load.d/containerd.conf配置文件:</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &lt;&lt; EOF &gt; /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF


# 执行以下命令使配置生效:
modprobe overlay
modprobe br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建-etc-sysctl-d-99-kubernetes-cri-conf配置文件" tabindex="-1"><a class="header-anchor" href="#创建-etc-sysctl-d-99-kubernetes-cri-conf配置文件" aria-hidden="true">#</a> 创建/etc/sysctl.d/99-kubernetes-cri.conf配置文件：</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &lt;&lt; EOF &gt; /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
user.max_user_namespaces=28633
vm.swappiness=0
EOF

# 执行以下命令使配置生效:
sysctl -p /etc/sysctl.d/99-kubernetes-cri.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>centos8.5 关闭ipv6 修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &lt;&lt; EOF &gt; /etc/sysctl.d/99-kubernetes-cri.conf
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv4.ip_forward = 1
user.max_user_namespaces=28633
vm.swappiness=0
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># IPV6 配置全部no
vi /etc/sysconfig/network-scripts/ifcfg-ens192
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=none
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=no
IPV6_AUTOCONF=no
IPV6_DEFROUTE=no
IPV6_FAILURE_FATAL=no
NAME=ens192
UUID=35cc807a-2de1-453c-984d-94a33ec11431
DEVICE=ens192
ONBOOT=yes
IPV6_PRIVACY=no
IPADDR=10.0.0.216
PREFIX=24
GATEWAY=10.0.0.1

# 重启网卡nmcli c reload +网卡名
nmcli c reload ens192
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="配置服务器支持开启ipvs的前提条件" tabindex="-1"><a class="header-anchor" href="#配置服务器支持开启ipvs的前提条件" aria-hidden="true">#</a> 配置服务器支持开启ipvs的前提条件</h4><blockquote><p>所有主机均需要操作。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># centos8.5 nf_conntrack_ipv4 修改为 nf_conntrack, 下同</span>
<span class="token function">cat</span> &gt; <span class="token operator">/</span>etc/sysconfig/modules/ipvs<span class="token punctuation">.</span>modules &lt;&lt;EOF
<span class="token comment">#!/bin/bash</span>
modprobe <span class="token operator">--</span> ip_vs
modprobe <span class="token operator">--</span> ip_vs_rr
modprobe <span class="token operator">--</span> ip_vs_wrr
modprobe <span class="token operator">--</span> ip_vs_sh
modprobe <span class="token operator">--</span> nf_conntrack_ipv4
EOF


<span class="token comment"># 赋权、执行生效</span>
chmod 755 <span class="token operator">/</span>etc/sysconfig/modules/ipvs<span class="token punctuation">.</span>modules &amp;&amp; bash <span class="token operator">/</span>etc/sysconfig/modules/ipvs<span class="token punctuation">.</span>modules &amp;&amp; lsmod <span class="token punctuation">|</span> grep <span class="token operator">-</span>e ip_vs <span class="token operator">-</span>e nf_conntrack_ipv4

<span class="token comment"># 查看是否生效</span>
lsmod <span class="token punctuation">|</span> grep <span class="token operator">-</span>e ip_vs <span class="token operator">-</span>e nf_conntrack_ipv4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),g=n(`<p>####安装ipvsadm</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum install -y ipset ipvsadm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="关闭swap分区" tabindex="-1"><a class="header-anchor" href="#关闭swap分区" aria-hidden="true">#</a> 关闭SWAP分区</h4><blockquote><p>修改完成后需要重启操作系统，如不重启，可临时关闭，命令为swapoff -a</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>永远关闭swap分区，需要重启操作系统
<span class="token comment"># cat /etc/fstab</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># /dev/mapper/centos-swap swap                    swap    defaults        0 0</span>
在上一行中行首添加<span class="token comment">#</span>
<span class="token comment"># 临时关闭</span>
swapoff <span class="token operator">-</span>a  <span class="token comment"># 禁用swap</span>
free <span class="token operator">-</span>h <span class="token comment"># 查看分区</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-1-containerd安装" tabindex="-1"><a class="header-anchor" href="#_1-1-containerd安装" aria-hidden="true">#</a> 1.1 Containerd安装</h2><h3 id="_1-1-1-下载二进制包" tabindex="-1"><a class="header-anchor" href="#_1-1-1-下载二进制包" aria-hidden="true">#</a> 1.1.1 下载二进制包</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://github.com/containerd/containerd/releases/download/v1.6.14/cri-containerd-cni-1.6.14-linux-amd64.tar.gz
# 解压
tar -zxvf cri-containerd-cni-1.6.14-linux-amd64.tar.gz -C /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意经测试cri-containerd-cni-1.6.4-linux-amd64.tar.gz包中包含的runc在CentOS 7下的动态链接有问题，这里从runc的github上单独下载runc，并替换上面安装的containerd中的runc:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://github.com/opencontainers/runc/releases/download/v1.1.2/runc.amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-1-2-生成containerd的配置文件" tabindex="-1"><a class="header-anchor" href="#_1-1-2-生成containerd的配置文件" aria-hidden="true">#</a> 1.1.2 生成containerd的配置文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p /etc/containerd
containerd config default &gt; /etc/containerd/config.toml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>修改前面生成的配置文件<code>/etc/containerd/config.toml</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc]  
...  
[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc.options]    
SystemdCgroup = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>再修改<code>/etc/containerd/config.toml</code>中的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[plugins.&quot;io.containerd.grpc.v1.cri&quot;]  
 ...  
 # sandbox_image = &quot;k8s.gcr.io/pause:3.6&quot;  
 sandbox_image = &quot;registry.aliyuncs.com/google_containers/pause:3.9&quot; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>配置containerd开机启动，并启动containerd</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable containerd --now
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>使用crictl测试一下，确保可以打印出版本信息并且没有错误信息输出:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crictl version

Version:  0.1.0
RuntimeName:  containerd
RuntimeVersion:  v1.6.14
RuntimeApiVersion:  v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>出现：<code>unknown service runtime.v1alpha2.RuntimeService</code>错误</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rm /etc/containerd/config.toml
systemctl restart containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_1-2-k8s-1-26-使用kubeadm部署kubernetes" tabindex="-1"><a class="header-anchor" href="#_1-2-k8s-1-26-使用kubeadm部署kubernetes" aria-hidden="true">#</a> 1.2 K8s 1.26 使用kubeadm部署Kubernetes</h2><h3 id="_1-2-1-阿里云yum源" tabindex="-1"><a class="header-anchor" href="#_1-2-1-阿里云yum源" aria-hidden="true">#</a> 1.2.1 阿里云yum源</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/yum.repos.d/kubernetes.repo  &lt;&lt; EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看是否在最新版本k8s: <code>yum list kubeadm.x86_64 --showduplicates | sort -f</code></p><h3 id="_1-2-2-安装" tabindex="-1"><a class="header-anchor" href="#_1-2-2-安装" aria-hidden="true">#</a> 1.2.2 安装</h3><p>安装最新版本/指定版本 二选一</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum makecache
# 安装最新版本
yum -y install kubelet kubeadm kubectl
# 安装指定版本
yum -y install kubelet-1.26.X kubeadm-1.26.X kubectl-1.26.X
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-3-集群初始化" tabindex="-1"><a class="header-anchor" href="#_1-2-3-集群初始化" aria-hidden="true">#</a> 1.2.3 集群初始化</h3><ul><li><p>在各节点开机启动kubelet服务：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable kubelet.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>生成配置文件：kubeadm.yaml</p><p><code>kubeadm config print init-defaults --component-configs KubeletConfiguration</code>可以打印集群初始化默认的使用的配置</p><p>Kubeadm.yaml如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: kubeadm.k8s.io/v1beta3
kind: InitConfiguration
localAPIEndpoint:
  # 此处为master节点IP
  advertiseAddress: 10.0.0.216
  bindPort: 6443
nodeRegistration:
  criSocket: unix:///run/containerd/containerd.sock
  taints:
  - effect: PreferNoSchedule
    key: node-role.kubernetes.io/master
---
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: 1.26.0
# 镜像地址
imageRepository: registry.aliyuncs.com/google_containers
networking:
  podSubnet: 10.243.0.0/16
---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
cgroupDriver: systemd
failSwapOn: false
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: ipvs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>imageRepository</code>为阿里云的registry</li><li>advertiseAddress: 10.0.0.216 对应master节点ip</li></ul></li><li><p>初始化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm init --config kubeadm.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>重置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm reset --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>成功</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-m1 ~]# kubeadm init --config kubeadm.yaml
W0109 13:46:19.711370   52328 common.go:84] your configuration file uses a deprecated API spec: &quot;kubeadm.k8s.io/v1beta2&quot;. Please use &#39;kubeadm config migrate --old-config old.yaml --new-config new.yaml&#39;, which will write the new, similar spec using a newer API version.
[init] Using Kubernetes version: v1.26.0
[preflight] Running pre-flight checks
	[WARNING FileExisting-tc]: tc not found in system path
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using &#39;kubeadm config images pull&#39;
[certs] Using certificateDir folder &quot;/etc/kubernetes/pki&quot;
[certs] Generating &quot;ca&quot; certificate and key
[certs] Generating &quot;apiserver&quot; certificate and key
[certs] apiserver serving cert is signed for DNS names [k8s-m1 kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 10.0.0.216]
[certs] Generating &quot;apiserver-kubelet-client&quot; certificate and key
[certs] Generating &quot;front-proxy-ca&quot; certificate and key
[certs] Generating &quot;front-proxy-client&quot; certificate and key
[certs] Generating &quot;etcd/ca&quot; certificate and key
[certs] Generating &quot;etcd/server&quot; certificate and key
[certs] etcd/server serving cert is signed for DNS names [k8s-m1 localhost] and IPs [10.0.0.216 127.0.0.1 ::1]
[certs] Generating &quot;etcd/peer&quot; certificate and key
[certs] etcd/peer serving cert is signed for DNS names [k8s-m1 localhost] and IPs [10.0.0.216 127.0.0.1 ::1]
[certs] Generating &quot;etcd/healthcheck-client&quot; certificate and key
[certs] Generating &quot;apiserver-etcd-client&quot; certificate and key
[certs] Generating &quot;sa&quot; key and public key
[kubeconfig] Using kubeconfig folder &quot;/etc/kubernetes&quot;
[kubeconfig] Writing &quot;admin.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;kubelet.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;controller-manager.conf&quot; kubeconfig file
[kubeconfig] Writing &quot;scheduler.conf&quot; kubeconfig file
[kubelet-start] Writing kubelet environment file with flags to file &quot;/var/lib/kubelet/kubeadm-flags.env&quot;
[kubelet-start] Writing kubelet configuration to file &quot;/var/lib/kubelet/config.yaml&quot;
[kubelet-start] Starting the kubelet
[control-plane] Using manifest folder &quot;/etc/kubernetes/manifests&quot;
[control-plane] Creating static Pod manifest for &quot;kube-apiserver&quot;
[control-plane] Creating static Pod manifest for &quot;kube-controller-manager&quot;
[control-plane] Creating static Pod manifest for &quot;kube-scheduler&quot;
[etcd] Creating static Pod manifest for local etcd in &quot;/etc/kubernetes/manifests&quot;
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory &quot;/etc/kubernetes/manifests&quot;. This can take up to 4m0s
[apiclient] All control plane components are healthy after 6.002364 seconds
[upload-config] Storing the configuration used in ConfigMap &quot;kubeadm-config&quot; in the &quot;kube-system&quot; Namespace
[kubelet] Creating a ConfigMap &quot;kubelet-config&quot; in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node k8s-m1 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node k8s-m1 as control-plane by adding the taints [node-role.kubernetes.io/master:PreferNoSchedule]
[bootstrap-token] Using token: c7t582.f1g50dlhliwmvr9a
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] Configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] Configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] Configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the &quot;cluster-info&quot; ConfigMap in the &quot;kube-public&quot; namespace
[kubelet-finalize] Updating &quot;/etc/kubernetes/kubelet.conf&quot; to point to a rotatable kubelet client certificate and key
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.0.0.216:6443 --token c7t582.f1g50dlhliwmvr9a \\
	--discovery-token-ca-cert-hash sha256:3c55755a429e2057793afedef0dd4faf878d4df3727ff464365d43264428a679
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>上面记录了完成的初始化输出的内容，根据输出的内容基本上可以看出手动初始化安装一个Kubernetes集群所需要的关键步骤。 其中有以下关键内容：</p><ul><li>[certs]生成相关的各种证书</li><li>[kubeconfig]生成相关的kubeconfig文件</li><li>[kubelet-start] 生成kubelet的配置文件&quot;/var/lib/kubelet/config.yaml&quot;</li><li>[control-plane]使用/etc/kubernetes/manifests目录中的yaml文件创建apiserver、controller-manager、scheduler的静态pod</li><li>[bootstraptoken]生成token记录下来，后边使用kubeadm join往集群中添加节点时会用到</li><li>[addons]安装基本插件:CoreDNS, kube-proxy 下面的命令是配置常规用户如何使用kubectl访问集群：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>其他节点加入集群：（集群初始化成功后输出）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm join 10.0.0.216:6443 --token c7t582.f1g50dlhliwmvr9a \\
	--discovery-token-ca-cert-hash sha256:3c55755a429e2057793afedef0dd4faf878d4df3727ff464365d43264428a679
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看一下集群状态，确认个组件都处于healthy状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get cs

Warning: v1 ComponentStatus is deprecated in v1.19+
NAME                 STATUS    MESSAGE                         ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-0               Healthy   {&quot;health&quot;:&quot;true&quot;,&quot;reason&quot;:&quot;&quot;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_1-3-安装包管理器helm3" tabindex="-1"><a class="header-anchor" href="#_1-3-安装包管理器helm3" aria-hidden="true">#</a> 1.3 安装包管理器helm3</h2><p>Helm是Kubernetes的包管理器，后续流程也将使用Helm安装Kubernetes的常用组件。 这里先在master节点上安装helm。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://get.helm.sh/helm-v3.10.3-linux-amd64.tar.gz
tar -zxvf helm-v3.10.3-linux-amd64.tar.gz
mv linux-amd64/helm  /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行<code>helm list</code>确认没有错误输出。</p><h2 id="_1-4-部署pod-network组件calico" tabindex="-1"><a class="header-anchor" href="#_1-4-部署pod-network组件calico" aria-hidden="true">#</a> 1.4 部署Pod Network组件Calico</h2><p>选择calico作为k8s的Pod网络组件，下面使用helm在k8s集群中安装calico。</p><p>下载<code>tigera-operator</code>的helm chart:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://github.com/projectcalico/calico/releases/download/v3.24.5/tigera-operator-v3.24.5.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看这个chart的中可定制的配置:</p><div class="language-fallback line-numbers-mode" data-ext="fallback"><pre class="language-fallback"><code>helm show values tigera-operator-v3.24.5.tgz

imagePullSecrets: {}

installation:
  enabled: true
  kubernetesProvider: &quot;&quot;

apiServer:
  enabled: true

certs:
  node:
    key:
    cert:
    commonName:
  typha:
    key:
    cert:
    commonName:
    caBundle:

# Resource requests and limits for the tigera/operator pod.
resources: {}

# Tolerations for the tigera/operator pod.
tolerations:
- effect: NoExecute
  operator: Exists
- effect: NoSchedule
  operator: Exists

# NodeSelector for the tigera/operator pod.
nodeSelector:
  kubernetes.io/os: linux

# Custom annotations for the tigera/operator pod.
podAnnotations: {}

# Custom labels for the tigera/operator pod.
podLabels: {}

# Image and registry configuration for the tigera/operator pod.
tigeraOperator:
  image: tigera/operator
  version: v1.28.5
  registry: quay.io
calicoctl:
  image: docker.io/calico/ctl
  tag: v3.24.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>定制的<code>calico_values.yaml</code>如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 可针对上面的配置进行定制,例如calico的镜像改成从私有库拉取。
# 这里只是个人本地环境测试k8s新版本，这里只有下面几行配置
apiServer:
  enabled: false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用helm安装calico：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm install calico tigera-operator-v3.24.5.tgz -n kube-system  --create-namespace -f calico_values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>等待并确认所有pod处于Running状态:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get pod -n kube-system | grep tigera-operator
tigera-operator-5fb55776df-wxbph   1/1     Running   0             5m10s

kubectl get pods -n calico-system
NAME                                       READY   STATUS    RESTARTS   AGE
calico-kube-controllers-68884f975d-5d7p9   1/1     Running   0          5m24s
calico-node-twbdh                          1/1     Running   0          5m24s
calico-typha-7b4bdd99c5-ssdn2              1/1     Running   0          5m24s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看一下calico向k8s中添加的api资源:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl api-resources | grep calico
bgpconfigurations                              crd.projectcalico.org/v1               false        BGPConfiguration
bgppeers                                       crd.projectcalico.org/v1               false        BGPPeer
blockaffinities                                crd.projectcalico.org/v1               false        BlockAffinity
caliconodestatuses                             crd.projectcalico.org/v1               false        CalicoNodeStatus
clusterinformations                            crd.projectcalico.org/v1               false        ClusterInformation
felixconfigurations                            crd.projectcalico.org/v1               false        FelixConfiguration
globalnetworkpolicies                          crd.projectcalico.org/v1               false        GlobalNetworkPolicy
globalnetworksets                              crd.projectcalico.org/v1               false        GlobalNetworkSet
hostendpoints                                  crd.projectcalico.org/v1               false        HostEndpoint
ipamblocks                                     crd.projectcalico.org/v1               false        IPAMBlock
ipamconfigs                                    crd.projectcalico.org/v1               false        IPAMConfig
ipamhandles                                    crd.projectcalico.org/v1               false        IPAMHandle
ippools                                        crd.projectcalico.org/v1               false        IPPool
ipreservations                                 crd.projectcalico.org/v1               false        IPReservation
kubecontrollersconfigurations                  crd.projectcalico.org/v1               false        KubeControllersConfiguration
networkpolicies                                crd.projectcalico.org/v1               true         NetworkPolicy
networksets                                    crd.projectcalico.org/v1               true         NetworkSet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>这些api资源是属于calico的，因此不建议使用kubectl来管理，推荐按照calicoctl来管理这些api资源。 将calicoctl安装为kubectl的插件:</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /usr/local/bin curl -o kubectl-calico -O -L  &quot;https://github.com/projectcalico/calicoctl/releases/download/v3.21.5/calicoctl-linux-amd64&quot;  
chmod +x kubectl-calico 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>验证插件正常工作:</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl calico -h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_1-5-验证k8s-dns是否可用" tabindex="-1"><a class="header-anchor" href="#_1-5-验证k8s-dns是否可用" aria-hidden="true">#</a> 1.5 验证k8s DNS是否可用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl run curl --image=radial/busyboxplus:curl -it
If you don&#39;t see a command prompt, try pressing enter.
[ root@curl:/ ]$

# 已运行进入
kubectl exec -it curl -- /bin/sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>进入后执行<code>nslookup kubernetes.default</code>确认解析正常:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ nslookup kubernetes.default
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      kubernetes.default
Address 1: 10.96.0.1 kubernetes.default.svc.cluster.local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>20230108</p><p>修改centos8.5 ipv6关闭后重新 kubeadm init后成功</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[ root@curl:/ ]$ nslookup kubernetes.default
Server:    10.96.0.10
Address 1: 10.96.0.10

nslookup: can&#39;t resolve &#39;kubernetes.default&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h1 id="_2-kubernetes常用组件部署" tabindex="-1"><a class="header-anchor" href="#_2-kubernetes常用组件部署" aria-hidden="true">#</a> 2 Kubernetes常用组件部署</h1><h2 id="_1使用helm部署ingress-nginx" tabindex="-1"><a class="header-anchor" href="#_1使用helm部署ingress-nginx" aria-hidden="true">#</a> 1使用Helm部署ingress-nginx</h2><p>为了便于将集群中的服务暴露到集群外部，需要使用Ingress。接下来使用Helm将ingress-nginx部署到Kubernetes上。 Nginx Ingress Controller被部署在Kubernetes的边缘节点上。</p><ul><li><p><code>kubectl get node</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>NAME     STATUS   ROLES           AGE     VERSION
k8s-m1   Ready    control-plane   6h39m   v1.26.0
k8s-n1   Ready    &lt;none&gt;          6h28m   v1.26.0
k8s-n2   Ready    &lt;none&gt;          6h27m   v1.26.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>这里将k8s-m1(10.0.0.216)作为边缘节点，打上Label：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl label node k8s-m1 node-role.kubernetes.io/edge=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>下载ingress-nginx的helm chart:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://github.com/kubernetes/ingress-nginx/releases/download/helm-chart-4.4.2/ingress-nginx-4.4.2.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看<code>ingress-nginx-4.4.2.tgz</code>这个chart的可定制配置:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm show values ingress-nginx-4.4.2.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>对ingress_values.yaml配置定制如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>controller:
  ingressClassResource:
    name: nginx
    enabled: true
    default: true
    controllerValue: &quot;k8s.io/ingress-nginx&quot;
  admissionWebhooks:
    enabled: false
  replicaCount: 1
  image:
    # registry: registry.k8s.io
    # image: ingress-nginx/controller
    # tag: &quot;v1.5.1&quot;
    registry: docker.io
    image: unreachableg/registry.k8s.io_ingress-nginx_controller
    tag: &quot;v1.5.1&quot;
    digest: sha256:97fa1ff828554ff4ee1b0416e54ae2238b27d1faa6d314d5a94a92f1f99cf767
  hostNetwork: true
  nodeSelector:
    node-role.kubernetes.io/edge: &#39;&#39;
  affinity:
    podAntiAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector:
            matchExpressions:
            - key: app
              operator: In
              values:
              - nginx-ingress
            - key: component
              operator: In
              values:
              - controller
          topologyKey: kubernetes.io/hostname
  tolerations:
      - key: node-role.kubernetes.io/master
        operator: Exists
        effect: NoSchedule
      - key: node-role.kubernetes.io/master
        operator: Exists
        effect: PreferNoSchedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx ingress controller的副本数replicaCount为1，将被调度到k8s-m1这个边缘节点上。这里并没有指定nginx ingress controller service的externalIPs，而是通过<code>hostNetwork: true</code>设置nginx ingress controller使用宿主机网络。 因为k8s.gcr.io被墙，这里替换成unreachableg/registry.k8s.io_ingress-nginx_controller提前拉取一下镜像:</p></li><li><p>拉取镜像</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crictl pull unreachableg/registry.k8s.io_ingress-nginx_controller:v1.5.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm install ingress-nginx ingress-nginx-4.4.2.tgz --create-namespace -n ingress-nginx -f ingress_values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看运行状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get pod -n ingress-nginx
NAME                                       READY   STATUS    RESTARTS   AGE
ingress-nginx-controller-7c96f857f-8f5ls   1/1     Running   0          2m3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>访问：http://10.0.0.216 （k8s-ms）返回 nginx404页</p></li></ul><h2 id="_2-使用helm部署dashboard" tabindex="-1"><a class="header-anchor" href="#_2-使用helm部署dashboard" aria-hidden="true">#</a> 2 使用Helm部署dashboard</h2><h3 id="先部署metrics-serve" tabindex="-1"><a class="header-anchor" href="#先部署metrics-serve" aria-hidden="true">#</a> 先部署metrics-serve</h3><ul><li><p>先部署metrics-server：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://github.com/kubernetes-sigs/metrics-server/releases/download/metrics-server-helm-chart-3.8.3/components.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改components.yaml中的image为<code>docker.io/unreachableg/k8s.gcr.io_metrics-server_metrics-server:v0.6.2</code>。 修改components.yaml中容器的启动参数，加入<code>--kubelet-insecure-tls</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    spec:
      containers:
      - args:
        - --cert-dir=/tmp
        - --secure-port=4443
        - --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
        - --kubelet-use-node-status-port
        - --metric-resolution=15s
        # 新增启动参数 注意空格缩进，不要用tab键，此行需要删除
        - --kubelet-insecure-tls  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl apply -f components.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>metrics-server的pod正常启动后，等一段时间就可以使用<code>kubectl top</code>查看集群和pod的metrics信息:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-m1 ~]# kubectl top node
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="dashboard" tabindex="-1"><a class="header-anchor" href="#dashboard" aria-hidden="true">#</a> dashboard</h3>`,47),h=n(`<li><p>使用helm部署k8s的dashboard，添加chart repo:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-m1 ~]# helm repo add kubernetes-dashboard https://kubernetes.github.io/dashboard/
&quot;kubernetes-dashboard&quot; has been added to your repositories
[root@k8s-m1 ~]# helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the &quot;kubernetes-dashboard&quot; chart repository
Update Complete. ⎈Happy Helming!⎈
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看chart的可定制配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm show values kubernetes-dashboard/kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>`,2),k=n(`<p>定制dashboard_values.yaml配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>image:
  repository: kubernetesui/dashboard
  tag: v2.7.0
ingress:
  enabled: true
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: &quot;true&quot;
    nginx.ingress.kubernetes.io/backend-protocol: &quot;HTTPS&quot;
  hosts:
  - k8s.thisisnohi.com
  tls:
    - secretName: example-com-tls-secret
      hosts:
      - k8s.example.com
metricsScraper:
  enabled: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上配置中, 部署的dashboard将通过ingress以域名<code>k8s.example.com</code>暴露出来, 并为此域名开启HTTPS。</p><p>为了开启HTTPS，需要为此域名申请SSL证书或使用自签证书，这里使用的证书和私钥文件分别为<code>cert.pem</code>和<code>key.pem</code>。</p>`,4),f=e("strong",null,"配置TLS证书",-1),x={href:"https://help.aliyun.com/document_detail/206616.html",target:"_blank",rel:"noopener noreferrer"},y=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 1 执行以下命令，生成TLS证书。
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout thisisnohi.key -out thisisnohi.crt -subj &quot;/CN=k8s.thisisnohi.com/O=k8s.thisisnohi.com&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),_=n(`<li><p>先创建存放<code>k8s.thisisnohi.com</code>ssl证书的secret:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create secret tls example-com-tls-secret \\
  --cert=thisisnohi.crt \\
  --key=thisisnohi.key \\
  -n kube-system
# kubectl create secret tls cert-example --key tls.key --cert tls.crt  
# 查看新建TLS证书配置
kubectl get secret -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用helm部署dashboard:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm install kubernetes-dashboard kubernetes-dashboard/kubernetes-dashboard \\
-n kube-system \\
-f dashboard_values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,2),q=n(`<p>** 确认上面命令部署成功**</p><ul><li><p>创建管理员sa:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create serviceaccount kube-dashboard-admin-sa -n kube-system

kubectl create clusterrolebinding kube-dashboard-admin-sa \\
--clusterrole=cluster-admin --serviceaccount=kube-system:kube-dashboard-admin-sa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建集群管理员登录dashboard所需token:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create token kube-dashboard-admin-sa -n kube-system --duration=87600h

eyJhbGciOiJSUzI1NiIsImtpZCI6IlFKZzhKeVJQVFFXb2l1XzZLWE41V2JNR0R5WGx4dEZoZE5UVmtvNS1OQ3MifQ.eyJhdWQiOlsiaHR0cHM6Ly9rdWJlcm5ldGVzLmRlZmF1bHQuc3ZjLmNsdXN0ZXIubG9jYWwiXSwiZXhwIjoxOTg4Njg4NTI2LCJpYXQiOjE2NzMzMjg1MjYsImlzcyI6Imh0dHBzOi8va3ViZXJuZXRlcy5kZWZhdWx0LnN2Yy5jbHVzdGVyLmxvY2FsIiwia3ViZXJuZXRlcy5pbyI6eyJuYW1lc3BhY2UiOiJrdWJlLXN5c3RlbSIsInNlcnZpY2VhY2NvdW50Ijp7Im5hbWUiOiJrdWJlLWRhc2hib2FyZC1hZG1pbi1zYSIsInVpZCI6ImY4NmI0MjdlLTljZjQtNDk5MS04MmU5LWYxYWRhNDUyZDg5ZSJ9fSwibmJmIjoxNjczMzI4NTI2LCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZS1zeXN0ZW06a3ViZS1kYXNoYm9hcmQtYWRtaW4tc2EifQ.wQg7_3BV_jtDUyjFaTqs6ekSu3iBOwLGT5BDp6YaRwMdebotcUE2OYyTthKsjyKs9WEXGDPEE5fwPDtlHq7f2UUbF1s2vt9suHJKEvVhNvCS4TbBKRJljy0G4DbsLenAo9Cf3acNVH_ES_fRBTpoiRRuBBrW5_qUUY1320-LnR-7h_YGvdbSwdNtkZa3KELQsdEhlkvYgC34_JOUONWw6-xGPJ02WjKWzIBtfYlNNPTKC8C23676m67JTn7zMhEKJ-aMCXvA_CLSoq0hlui0PBOO6mpv0SeIgy-uG8XqSSbHOiOO_VMwOJVinVDVanaf_7FOp3JxdKdCE30nghJqtg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用上面的token登录k8s dashboard。</p></li></ul>`,2);function w(E,S){const a=l("ExternalLinkIcon"),d=l("font");return t(),c("div",null,[v,e("blockquote",null,[m,e("p",null,[i("参见："),e("a",b,[i("使用kubeadm部署Kubernetes 1.26"),s(a)])])]),p,e("p",null,[e("strong",null,[s(d,{color:"red"},{default:o(()=>[i("CentOS8.5 nf_conntrack_ipv4 修改为 nf_conntrack")]),_:1})])]),g,e("ul",null,[h,e("li",null,[k,e("ul",null,[e("li",null,[e("p",null,[f,i(),e("a",x,[i("参考"),s(a)])]),y])])]),_]),q])}const C=r(u,[["render",w],["__file","12_v1.26_Containerd.html.vue"]]);export{C as default};

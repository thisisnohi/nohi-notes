import{_ as i,M as a,p as l,q as d,R as e,t as n,N as r,a1 as t}from"./framework-449724a9.js";const c={},o=e("h1",{id:"_1-v1-26-安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_1-v1-26-安装","aria-hidden":"true"},"#"),n(" 1 v1.26 安装")],-1),u={href:"https://www.bilibili.com/video/BV1Vg411b7sB/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=9004ce053a52d5930f71e230579961e7",target:"_blank",rel:"noopener noreferrer"},v=e("p",null,"20220106 未安装成功，改为 v1.26+containerd方式",-1),m=t(`<h2 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># vi /etc/hosts
10.0.0.216 k8s-m1
10.0.0.217 k8s-n1
10.0.0.218 k8s-n2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="防火墙配置" tabindex="-1"><a class="header-anchor" href="#防火墙配置" aria-hidden="true">#</a> 防火墙配置</h4><blockquote><p>所有主机均需要操作。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>关闭现有防火墙firewalld
<span class="token comment"># systemctl disable firewalld</span>
<span class="token comment"># systemctl stop firewalld</span>
<span class="token comment"># firewall-cmd --state</span>
not running
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="selinux配置" tabindex="-1"><a class="header-anchor" href="#selinux配置" aria-hidden="true">#</a> SELINUX配置</h4><blockquote><p>所有主机均需要操作。修改SELinux配置需要重启操作系统。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># sed -ri &#39;s/SELINUX=enforcing/SELINUX=disabled/&#39; /etc/selinux/config</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="时间同步配置" tabindex="-1"><a class="header-anchor" href="#时间同步配置" aria-hidden="true">#</a> 时间同步配置</h4><blockquote><p>所有主机均需要操作。最小化安装系统需要安装ntpdate软件。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>systemctl <span class="token function">start</span> chronyd
systemctl enable chronyd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="升级操作系统内核" tabindex="-1"><a class="header-anchor" href="#升级操作系统内核" aria-hidden="true">#</a> 升级操作系统内核</h4><blockquote><p>所有主机均需要操作。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>导入elrepo gpg key
<span class="token comment"># rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>安装elrepo YUM源仓库
<span class="token comment"># yum -y install https://www.elrepo.org/elrepo-release-7.0-4.el7.elrepo.noarch.rpm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>安装kernel-ml版本，ml为长期稳定版本，lt为长期维护版本
<span class="token comment"># yum --enablerepo=&quot;elrepo-kernel&quot; -y install kernel-lt.x86_64</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>设置grub2默认引导为0
<span class="token comment"># grub2-set-default 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>重新生成grub2引导文件
<span class="token comment"># grub2-mkconfig -o /boot/grub2/grub.cfg</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>更新后，需要重启，使用升级的内核生效。
<span class="token comment"># reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>重启后，需要验证内核是否为更新对应的版本
<span class="token comment"># uname -r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置内核转发及网桥过滤" tabindex="-1"><a class="header-anchor" href="#配置内核转发及网桥过滤" aria-hidden="true">#</a> 配置内核转发及网桥过滤</h4><blockquote><p>所有主机均需要操作。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>添加网桥过滤及内核转发配置文件
<span class="token comment"># cat c</span>
net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-ip6tables = 1
net<span class="token punctuation">.</span>bridge<span class="token punctuation">.</span>bridge-nf-call-iptables = 1
net<span class="token punctuation">.</span>ipv4<span class="token punctuation">.</span>ip_forward = 1
vm<span class="token punctuation">.</span>swappiness = 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>加载br_netfilter模块
<span class="token comment"># modprobe br_netfilter</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>查看是否加载
<span class="token comment"># lsmod | grep br_netfilter</span>
br_netfilter           22256  0
bridge                151336  1 br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="安装ipset及ipvsadm" tabindex="-1"><a class="header-anchor" href="#安装ipset及ipvsadm" aria-hidden="true">#</a> 安装ipset及ipvsadm</h4><blockquote><p>所有主机均需要操作。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>安装ipset及ipvsadm
<span class="token comment"># yum -y install ipset ipvsadm</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>配置ipvsadm模块加载方式
添加需要加载的模块
<span class="token comment"># cat &gt; /etc/sysconfig/modules/ipvs.modules &lt;&lt;EOF</span>
<span class="token comment">#!/bin/bash</span>
modprobe <span class="token operator">--</span> ip_vs
modprobe <span class="token operator">--</span> ip_vs_rr
modprobe <span class="token operator">--</span> ip_vs_wrr
modprobe <span class="token operator">--</span> ip_vs_sh
modprobe <span class="token operator">--</span> nf_conntrack
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>授权、运行、检查是否加载
<span class="token comment"># chmod 755 /etc/sysconfig/modules/ipvs.modules &amp;&amp; bash /etc/sysconfig/modules/ipvs.modules &amp;&amp; lsmod | grep -e ip_vs -e nf_conntrack</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="关闭swap分区" tabindex="-1"><a class="header-anchor" href="#关闭swap分区" aria-hidden="true">#</a> 关闭SWAP分区</h4><blockquote><p>修改完成后需要重启操作系统，如不重启，可临时关闭，命令为swapoff -a</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>永远关闭swap分区，需要重启操作系统
<span class="token comment"># cat /etc/fstab</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment"># /dev/mapper/centos-swap swap                    swap    defaults        0 0</span>
在上一行中行首添加<span class="token comment">#</span>
<span class="token comment"># 临时关闭</span>
swapoff <span class="token operator">-</span>a  <span class="token comment"># 禁用swap</span>
free <span class="token operator">-</span>h <span class="token comment"># 查看分区</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-1-docker准备" tabindex="-1"><a class="header-anchor" href="#_1-1-docker准备" aria-hidden="true">#</a> 1.1 DOCKER准备</h2><h3 id="_1-1-1-docker安装源准备" tabindex="-1"><a class="header-anchor" href="#_1-1-1-docker安装源准备" aria-hidden="true">#</a> 1.1.1 docker安装源准备</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-1-2-安装docker-ce" tabindex="-1"><a class="header-anchor" href="#_1-1-2-安装docker-ce" aria-hidden="true">#</a> 1.1.2 安装docker-ce</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>yum -y install docker-ce --allowerasing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-1-3-启动docker" tabindex="-1"><a class="header-anchor" href="#_1-1-3-启动docker" aria-hidden="true">#</a> 1.1.3 启动docker</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable docker
systemctl start docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-4-修改cgroup方式" tabindex="-1"><a class="header-anchor" href="#_1-1-4-修改cgroup方式" aria-hidden="true">#</a> 1.1.4 修改cgroup方式</h3><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>vi /etc/docker/daemon.json
<span class="token punctuation">{</span>
 <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://c07oywfn.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
 <span class="token property">&quot;exec-opts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;native.cgroupdriver=systemd&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
# 重启docker
systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-5-cri-dockerd" tabindex="-1"><a class="header-anchor" href="#_1-1-5-cri-dockerd" aria-hidden="true">#</a> 1.1.5 cri-dockerd</h3><ul><li><p>clone cri-dockerd源码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git clone https://github.com/Mirantis/cri-dockerd.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装go环境</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://storage.googleapis.com/golang/getgo/installer_linux
chmod +x ./installer_linux
# 安装可能出现： Getting current Go version failed: Get https://golang.org/VERSION?m=text: dial tcp 142.251.43.17:443: i/o timeout
# 访问不了google网址
./installer_linux
source ~/.bash_profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>自行安装：https://golang.google.cn/doc/install</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 删除之前版本，解压最新的安装包（go1.19.4.linux-amd64.tar.gz）至 /usr/local目录下
rm -rf /usr/local/go &amp;&amp; tar -C /usr/local -xzf go1.19.4.linux-amd64.tar.gz
# 配置环境变量
vi .bash_profile
export PATH=$PATH:/usr/local/go/bin
# 刷新环境变量
source $HOME/.bash_profile
# 查看版本
go version

# 配置 GOPROXY 环境变量, .bash_profile 或者 命令行
export GOPROXY=https://proxy.golang.com.cn,direct
# 还可以设置不走 proxy 的私有仓库或组，多个用逗号相隔（可选）
export GOPRIVATE=git.mycompany.com,github.com/my/private
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>cri-dockerd</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd cri-dockerd
mkdir bin
go build -o bin/cri-dockerd
mkdir -p /usr/local/bin
install -o root -g root -m 0755 bin/cri-dockerd /usr/local/bin/cri-dockerd
cp -a packaging/systemd/* /etc/systemd/system
sed -i -e &#39;s,/usr/bin/cri-dockerd,/usr/local/bin/cri-dockerd,&#39; /etc/systemd/system/cri-docker.service
systemctl daemon-reload
systemctl enable cri-docker.service
systemctl enable --now cri-docker.socket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_1-2-k8s-1-26-集群部署" tabindex="-1"><a class="header-anchor" href="#_1-2-k8s-1-26-集群部署" aria-hidden="true">#</a> 1.2 K8s 1.26 集群部署</h2><h3 id="_1-2-1-阿里云yum源" tabindex="-1"><a class="header-anchor" href="#_1-2-1-阿里云yum源" aria-hidden="true">#</a> 1.2.1 阿里云yum源</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/yum.repos.d/kubernetes.repo  &lt;&lt; EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看是否在最新版本k8s: <code>yum list kubeadm.x86_64 --showduplicates | sort -f</code></p><h3 id="_1-2-2-安装" tabindex="-1"><a class="header-anchor" href="#_1-2-2-安装" aria-hidden="true">#</a> 1.2.2 安装</h3><p>安装最新版本/指定版本 二选一</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 安装最新版本
yum -y install kubelet kubeadm kubectl
# 安装指定版本
yum -y install kubelet-1.26.X kubeadm-1.26.X kubectl-1.26.X
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-3-配置kubelet" tabindex="-1"><a class="header-anchor" href="#_1-2-3-配置kubelet" aria-hidden="true">#</a> 1.2.3 配置kubelet</h3><blockquote><p>为了实现docker使用的cgroupdriver与kubelet使用的cgroup的一致性，建议修改如下文件内容。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># vim /etc/sysconfig/kubelet</span>
KUBELET_EXTRA_ARGS=<span class="token string">&quot;--cgroup-driver=systemd&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>设置kubelet为开机自启动即可，由于没有生成配置文件，集群初始化后自动启动
<span class="token comment"># systemctl enable kubelet</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-4-集群初始化" tabindex="-1"><a class="header-anchor" href="#_1-2-4-集群初始化" aria-hidden="true">#</a> 1.2.4 集群初始化</h3><ul><li><p>离线环境可以提前准备镜像</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># kubeadm config images list --kubernetes-version=v1.26.X

# cat image_download.sh
#!/bin/bash
images_list=&#39;
镜像列表&#39;

for i in $images_list
do
        docker pull $i
done

docker save -o k8s-1-24-X.tar $images_list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>直接初始化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm init --image-repository registry.aliyuncs.com/google_containers --kubernetes-version v1.26.0 --pod-network-cidr=10.224.0.0/16 --apiserver-advertise-address=10.0.0.216  --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>重置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm reset --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li></ul><h4 id="_20230106-cri-dockerd-方式-k8s初始化失败" tabindex="-1"><a class="header-anchor" href="#_20230106-cri-dockerd-方式-k8s初始化失败" aria-hidden="true">#</a> 20230106 cri-dockerd 方式，k8s初始化失败</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Unfortunately, an error has occurred:
	timed out waiting for the condition

This error is likely caused by:
	- The kubelet is not running
	- The kubelet is unhealthy due to a misconfiguration of the node in some way (required cgroups disabled)

If you are on a systemd-powered system, you can try to troubleshoot the error with the following commands:
	- &#39;systemctl status kubelet&#39;
	- &#39;journalctl -xeu kubelet&#39;

Additionally, a control plane component may have crashed or exited when started by the container runtime.
To troubleshoot, list all containers using your preferred container runtimes CLI.
Here is one example how you may list all running Kubernetes containers by using crictl:
	- &#39;crictl --runtime-endpoint unix:///var/run/cri-dockerd.sock ps -a | grep kube | grep -v pause&#39;
	Once you have found the failing container, you can inspect its logs with:
	- &#39;crictl --runtime-endpoint unix:///var/run/cri-dockerd.sock logs CONTAINERID&#39;
error execution phase wait-control-plane: couldn&#39;t initialize a Kubernetes cluster
To see the stack trace of this error execute with --v=5 or higher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>systemctl status kubelet</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-m1 cri-dockerd]# systemctl status kubelet
● kubelet.service - kubelet: The Kubernetes Node Agent
   Loaded: loaded (/usr/lib/systemd/system/kubelet.service; enabled; vendor preset: disabled)
  Drop-In: /usr/lib/systemd/system/kubelet.service.d
           └─10-kubeadm.conf
   Active: active (running) since Fri 2023-01-06 12:47:51 CST; 6min ago
     Docs: https://kubernetes.io/docs/
 Main PID: 12073 (kubelet)
    Tasks: 12 (limit: 11379)
   Memory: 91.0M
   CGroup: /system.slice/kubelet.service
           └─12073 /usr/bin/kubelet --bootstrap-kubeconfig=/etc/kubernetes/bootstrap-kubelet.conf --kubeconfig=/etc/kubernetes/kubelet.conf --config=/var/lib/kubelet/config.yam&gt;

1月 06 12:54:34 k8s-m1 kubelet[12073]: W0106 12:54:34.137616   12073 reflector.go:424] vendor/k8s.io/client-go/informers/factory.go:150: failed to list *v1.Node: Get &quot;https://1&gt;
1月 06 12:54:34 k8s-m1 kubelet[12073]: E0106 12:54:34.137764   12073 reflector.go:140] vendor/k8s.io/client-go/informers/factory.go:150: Failed to watch *v1.Node: failed to lis&gt;
1月 06 12:54:36 k8s-m1 kubelet[12073]: E0106 12:54:36.164912   12073 remote_runtime.go:176] &quot;RunPodSandbox from runtime service failed&quot; err=&quot;rpc error: code = Unknown desc = fa&gt;
1月 06 12:54:36 k8s-m1 kubelet[12073]: E0106 12:54:36.165029   12073 kuberuntime_sandbox.go:72] &quot;Failed to create sandbox for pod&quot; err=&quot;rpc error: code = Unknown desc = failed &gt;
1月 06 12:54:36 k8s-m1 kubelet[12073]: E0106 12:54:36.165122   12073 kuberuntime_manager.go:782] &quot;CreatePodSandbox for pod failed&quot; err=&quot;rpc error: code = Unknown desc = failed &gt;
1月 06 12:54:36 k8s-m1 kubelet[12073]: E0106 12:54:36.165274   12073 pod_workers.go:965] &quot;Error syncing pod, skipping&quot; err=&quot;failed to \\&quot;CreatePodSandbox\\&quot; for \\&quot;etcd-k8s-m1_kub&gt;
1月 06 12:54:37 k8s-m1 kubelet[12073]: E0106 12:54:37.116565   12073 controller.go:146] failed to ensure lease exists, will retry in 7s, error: Get &quot;https://10.0.0.216:6443/api&gt;
1月 06 12:54:38 k8s-m1 kubelet[12073]: I0106 12:54:38.313197   12073 kubelet_node_status.go:70] &quot;Attempting to register node&quot; node=&quot;k8s-m1&quot;
1月 06 12:54:38 k8s-m1 kubelet[12073]: E0106 12:54:38.313949   12073 kubelet_node_status.go:92] &quot;Unable to register node with API server&quot; err=&quot;Post \\&quot;https://10.0.0.216:6443/ap&gt;
1月 06 12:54:39 k8s-m1 kubelet[12073]: E0106 12:54:39.215592   12073 event.go:276] Unable to write event: &#39;&amp;v1.Event{TypeMeta:v1.TypeMeta{Kind:&quot;&quot;, APIVersion:&quot;&quot;}, ObjectMeta:v1&gt;
lin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_20230207-cri-dockerd-方式-k8s安装成功" tabindex="-1"><a class="header-anchor" href="#_20230207-cri-dockerd-方式-k8s安装成功" aria-hidden="true">#</a> 20230207 cri-dockerd 方式,k8s安装成功</h4><blockquote><p>参见：14_Docker+k8s教程.md</p></blockquote><ul><li>cri-dockerd 改为二进制安装</li></ul>`,64);function p(b,h){const s=a("ExternalLinkIcon");return l(),d("div",null,[o,e("blockquote",null,[e("p",null,[n("安装视频参见："),e("a",u,[n("kubernetes 1.26版本上线，90分钟入门精讲"),r(s)])]),v]),m])}const k=i(c,[["render",p],["__file","11_v1.26 安装.html.vue"]]);export{k as default};

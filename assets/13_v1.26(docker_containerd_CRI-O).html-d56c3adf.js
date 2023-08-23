import{_ as d,M as s,p as a,q as l,R as e,t as n,N as t,a1 as r}from"./framework-449724a9.js";const u="/assets/image-20230118210957848-04693398.png",c="/assets/image-20230131210051893-23594c00.png",o="/assets/image-20230131211024895-77410710.png",v="/assets/image-20230131212056640-0d4dc7e5.png",b={},m=e("h1",{id:"_13-kubeadm安装k8s-1-26-0-docker-containerd-cri-o",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_13-kubeadm安装k8s-1-26-0-docker-containerd-cri-o","aria-hidden":"true"},"#"),n(" 13 Kubeadm安装K8s-1.26.0(docker+containerd+CRI-O)")],-1),g=e("p",null,"create by nohi 20230112",-1),p={href:"https://www.bilibili.com/video/BV1V8411N78a/?spm_id_from=333.788&vd_source=9004ce053a52d5930f71e230579961e7",target:"_blank",rel:"noopener noreferrer"},k=e("p",null,"视频章节顺序有点乱，按数据自行播放",-1),h=r(`<h2 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2><ul><li><p>机器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10.0.0.231 ubuntk8s-m1
10.0.0.232 ubuntk8s-n1
10.0.0.233 ubuntk8s-n2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改ip</p><p><code>vi /etc/netplan/00-installer-config.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>默认安装后为：
network:
  ethernets:
    ens160:
      addresses:
      - 10.0.0.233/24
      gateway4: 255.255.255.0
      nameservers:
        addresses: []
        search:
        - 10.0.0.1
  version: 2
  
# 修改为如下：addresses为每台机器Ip 
network:
  ethernets:
    ens160:
      dhcp4: false
      addresses:
        - 10.0.0.231/24
      routes:
        - to: default
          via: 10.0.0.1
      nameservers:
        addresses: [10.0.0.1]
  version: 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ip生效<code>sudo netplan apply</code></p></li></ul><h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2><p>需要用root执行下列命令，sudo xxx 为其他用户下以root身份运行命令</p><p>以下操作如果没有sudo 建议切换为root后操作</p><h3 id="_1-hosts" tabindex="-1"><a class="header-anchor" href="#_1-hosts" aria-hidden="true">#</a> 1 hosts</h3><ul><li><p>hostname设置: <code>vi /etc/hostname</code></p><p>10.0.0.231 设置为：ubuntk8s-m1 10.0.0.232 设置为：ubuntk8s-n1 10.0.0.233 设置为：ubuntk8s-n3</p></li><li><p><code>vi /etc/hosts</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10.0.0.231 ubuntk8s-m1
10.0.0.232 ubuntk8s-n1
10.0.0.233 ubuntk8s-n2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_2-关闭swap" tabindex="-1"><a class="header-anchor" href="#_2-关闭swap" aria-hidden="true">#</a> 2 关闭swap</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>临时关闭: sudo swapoff -a
永久关闭：
sudo vi /etc/fstab 注释 swap所在行，即swap所在行前增加 # 即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-关闭防火墙" tabindex="-1"><a class="header-anchor" href="#_3-关闭防火墙" aria-hidden="true">#</a> 3 关闭防火墙</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ufw disable  / sudo ufw disable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-加载ipvs模块" tabindex="-1"><a class="header-anchor" href="#_4-加载ipvs模块" aria-hidden="true">#</a> 4 加载ipvs模块</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack
lsmod | grep ip_vs
lsmod | grep nf_conntrack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-内核参数修改" tabindex="-1"><a class="header-anchor" href="#_5-内核参数修改" aria-hidden="true">#</a> 5 内核参数修改</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/sysctl.d/k8s.conf &lt;&lt; EOF
net.bridge.bridge-nf-call-ip6tables=1
net.bridge.bridge-nf-call-iptables=1
net.ipv4.ip_forward=1
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ip_forward 转发功能</p><ul><li><p>生效</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>modprobe br_netfilter
sysctl -p /etc/sysctl.d/k8s.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>配置模块加载永久生效(重启之后也生效)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &lt;&lt;EOF | tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_6-增加一些工具软件" tabindex="-1"><a class="header-anchor" href="#_6-增加一些工具软件" aria-hidden="true">#</a> 6 增加一些工具软件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt install -y ipvsadm ipset
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-1-docker安装" tabindex="-1"><a class="header-anchor" href="#_4-1-docker安装" aria-hidden="true">#</a> 4-1 Docker安装</h2><h3 id="_1-docker安装" tabindex="-1"><a class="header-anchor" href="#_1-docker安装" aria-hidden="true">#</a> 1. Docker安装</h3><h4 id="_1-环境准备" tabindex="-1"><a class="header-anchor" href="#_1-环境准备" aria-hidden="true">#</a> 1 环境准备</h4><ul><li><p>查看可用docker-ce版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt-cache madison docker-ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有出现，执行2、3步骤</p></li></ul><h4 id="_2-更新docker源" tabindex="-1"><a class="header-anchor" href="#_2-更新docker源" aria-hidden="true">#</a> 2 更新docker源</h4><ul><li><p>卸载原有docker以及containerd</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt-get remove docker docker-engine docker.io containerd runc
apt remove docker-ce docker-ce-cli containerd.io -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>安装系统工具</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common curl gnupg lsb-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>添加Docker官方GPG密钥</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>使用以下命令设置稳定存储库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo &quot;deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg]  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable&quot; | sudo tee /etc/apt/sources.list.d/container.list &gt; /dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>更新apt包索引</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt-get update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="_3-安装最新版本" tabindex="-1"><a class="header-anchor" href="#_3-安装最新版本" aria-hidden="true">#</a> 3 安装最新版本</h4><ul><li><p>最新版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt-get install docker-ce docker-ce-cli containerd.io -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>安装指定版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt-get install docker-ce=5:20.10.21~3-0~ubuntu-jammy docker-ce-cli=5:20.10.21~3-0~ubuntu-jammy containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>启动docker</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl start docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看版本等</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker version
docker info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改docker配置，适应kubelet <code>vi /etc/docker/daemon.json</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
 &quot;registry-mirrors&quot;: [&quot;https://registry.cn-hangzhou.aliyuncs.com&quot;],
 &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>生效配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="_2-安装cri-dockerd" tabindex="-1"><a class="header-anchor" href="#_2-安装cri-dockerd" aria-hidden="true">#</a> 2 安装cri-dockerd</h3><blockquote><p>v1.24 后, k8s连接docker需要，cri-dockerd: https://github.com/Mirantis/cri-dockerd</p></blockquote><h4 id="_1-下载安装启动" tabindex="-1"><a class="header-anchor" href="#_1-下载安装启动" aria-hidden="true">#</a> 1 下载安装启动</h4><ul><li><p>下载最新包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.0/cri-dockerd_0.3.0.3-0.ubuntu-jammy_amd64.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>dpkg -i cri-dockerd_0.3.0.3-0.ubuntu-jammy_amd64.deb

root@ubuntk8s-m1:~# dpkg -i cri-dockerd_0.3.0.3-0.ubuntu-jammy_amd64.deb
Selecting previously unselected package cri-dockerd.
(Reading database ... 109132 files and directories currently installed.)
Preparing to unpack cri-dockerd_0.3.0.3-0.ubuntu-jammy_amd64.deb ...
Unpacking cri-dockerd (0.3.0~3-0~ubuntu-jammy) ...
Setting up cri-dockerd (0.3.0~3-0~ubuntu-jammy) ...
Created symlink /etc/systemd/system/multi-user.target.wants/cri-docker.service → /lib/systemd/system/cri-docker.service.
Created symlink /etc/systemd/system/sockets.target.wants/cri-docker.socket → /lib/systemd/system/cri-docker.socket.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> systemctl start cri-docker.service cri-docker.socket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>查看服务状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl status cri-docker.service

root@ubuntk8s-m1:~# systemctl status cri-docker.service
● cri-docker.service - CRI Interface for Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/cri-docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Sun 2023-01-15 13:42:21 UTC; 4min 44s ago
TriggeredBy: ● cri-docker.socket
       Docs: https://docs.mirantis.com
   Main PID: 23114 (cri-dockerd)
      Tasks: 9
     Memory: 10.0M
        CPU: 157ms
     CGroup: /system.slice/cri-docker.service
             └─23114 /usr/bin/cri-dockerd --container-runtime-endpoint fd://

Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;The binary conntrack is not installed, this can cause failures in network&gt;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;The binary conntrack is not installed, this can cause failures in network&gt;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;Loaded network plugin cni&quot;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;Docker cri networking managed by network plugin cni&quot;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;Docker Info: &amp;{ID:5ETS:4EQ5:KUAI:AXA6:5CZO:PSIS:G73L:DCOJ:X4C5:2EMN:5W2G:&gt;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;Setting cgroupDriver systemd&quot;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;Docker cri received runtime config &amp;RuntimeConfig{NetworkConfig:&amp;NetworkC&gt;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;Starting the GRPC backend for the Docker CRI interface.&quot;
Jan 15 13:42:21 ubuntk8s-m1 cri-dockerd[23114]: time=&quot;2023-01-15T13:42:21Z&quot; level=info msg=&quot;Start cri-dockerd grpc backend&quot;
Jan 15 13:42:21 ubuntk8s-m1 systemd[1]: Started CRI Interface for Docker Application Container Engine.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h4 id="_2-设置和启动" tabindex="-1"><a class="header-anchor" href="#_2-设置和启动" aria-hidden="true">#</a> 2 设置和启动</h4><ul><li><p>修改配置文件<code>vi /usr/lib/systemd/system/cri-docker.service</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ExecStart=/usr/bin/cri-dockerd --container-runtime-endpoint=unix:///var/run/cri-dockerd.sock --network-plugin=cni --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>重新启动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl start cri-docker.service cri-docker.socket
systemctl restart cri-docker
systemctl restart cri-docker.socket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>设置开机启动</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable cri-docker.service cri-docker.socket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看启动状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl status cri-docker.service cri-docker.socket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>启动服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl enable cri-docker.service cri-docker.socket
systemctl enable --now cri-docker.service cri-docker.socket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-cri-o安装" tabindex="-1"><a class="header-anchor" href="#_3-cri-o安装" aria-hidden="true">#</a> 3 CRI-O安装</h3><p>使用第三种容器运行时，cri-o</p><p><strong>说明</strong>：视频中使用新镜像安装，我使用了ubuntk8s-n1节点安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 卸载docker、containerd
apt remove docker-ce docker-ce-cli containerd -y
# 卸载cri-dockerd
dpkg -P cri-dockerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参考：https://cri-o.io/</p><h4 id="_1-启用内核模块" tabindex="-1"><a class="header-anchor" href="#_1-启用内核模块" aria-hidden="true">#</a> 1 启用内核模块</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>modprobe overlay
modprobe br_netfilter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-在线安装-见https-cri-o-io" tabindex="-1"><a class="header-anchor" href="#_2-在线安装-见https-cri-o-io" aria-hidden="true">#</a> 2. 在线安装（见https://cri-o.io/）</h4><p><code>Ubuntu 20.04 xUbuntu_20.04</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export OS=xUbuntu_20.04
export VERSION=1.26
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>安装源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>echo &quot;deb http://deb.debian.org/debian buster-backports main&quot; &gt; /etc/apt/sources.list.d/backports.list
apt update
apt install -y -t buster-backports libseccomp2 || apt update -y -t buster-backports libseccomp2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>运行报错：未解决</li></ul></li><li><p>root身份运行</p><p>一起拷贝执行可能报错，按条执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/<span class="token variable">$OS</span>/ /&quot;</span> <span class="token operator">&gt;</span> /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list

<span class="token builtin class-name">echo</span> <span class="token string">&quot;deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/<span class="token variable">$VERSION</span>/<span class="token variable">$OS</span>/ /&quot;</span> <span class="token operator">&gt;</span> /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:<span class="token variable">$VERSION</span>.list

<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/<span class="token variable">$VERSION</span>/<span class="token variable">$OS</span>/Release.key <span class="token operator">|</span> apt-key <span class="token function">add</span> -

<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/<span class="token variable">$OS</span>/Release.key <span class="token operator">|</span> apt-key <span class="token function">add</span> -

<span class="token function">apt-get</span> update
<span class="token function">apt-get</span> <span class="token function">install</span> cri-o cri-o-runc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改cri-o配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /etc/crio/crio.conf

增加/修改pause_image
pause_image = &quot;registry.aliyuncs.com/google_containers/pause:3.9&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动、查看运行情况</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl enable crio
systemctl restart crio
systemctl status crio

root@ubuntk8s-n1:~# crictl version
Version:  0.1.0
RuntimeName:  cri-o
RuntimeVersion:  1.26.1
RuntimeApiVersion:  v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-修改kubelet配置" tabindex="-1"><a class="header-anchor" href="#_3-修改kubelet配置" aria-hidden="true">#</a> 3 修改kubelet配置</h4><p>CRI-O运行时使用cgroup driver为systemd，因此需要设置kubelet参数保持一致</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-n1:~# cat /etc/default/kubelet
KUBELET_EXTRA_ARGS=--cgroup-driver=systemd --fail-swap-on=false

# 在kubelet启动文件 / 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>kubelet设置容器运行时</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /var/lib/kubelet/kubeadm-flags.env

KUBELET_KUBEADM_ARGS=&quot;--container-runtime=remote --container-runtime-endpoint=unix:///var/run/crio/crio.sock --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重启</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl enable kubelet
systemctl restart kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这时<code>systemctl status kubelet</code>，服务是未运行的，需要使用kubeadm join后使用</li></ul></li></ul><h4 id="_4-节点加入集群" tabindex="-1"><a class="header-anchor" href="#_4-节点加入集群" aria-hidden="true">#</a> 4 节点加入集群</h4><ul><li><p>master节点，通过<code>kubeadm token create --print-join-command</code>获取加入的token及命令，在需要加入的节点上执行</p><p>增加<code>--cri-socket unix:///var/run/crio/crio.sock</code></p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm join 10.0.0.231:6443 --token o0x4pl.gnik30ytnhoq68yp \\
	--discovery-token-ca-cert-hash sha256:860106236c8db3945b567c88f69f518ad0c2543e6bd9e430f121757fbda0d7a6 --cri-socket unix:///var/run/crio/crio.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-kubeadm-kubelet-kubectl安装-master-and-node" tabindex="-1"><a class="header-anchor" href="#_5-kubeadm-kubelet-kubectl安装-master-and-node" aria-hidden="true">#</a> 5 Kubeadm Kubelet Kubectl安装(master and node)</h2><h3 id="_1-kubeadm-简介" tabindex="-1"><a class="header-anchor" href="#_1-kubeadm-简介" aria-hidden="true">#</a> 1 kubeadm 简介</h3><p>kubeadm 是K8s的集群安装工具，能够快速安装k8s。能完成下面的拓扑安装</p><ul><li>单节点k8s</li><li>单master和多node</li><li>Master HA 和 多node （m*1 + n)</li></ul><h3 id="_2-kubeamd常用命令" tabindex="-1"><a class="header-anchor" href="#_2-kubeamd常用命令" aria-hidden="true">#</a> 2 kubeamd常用命令</h3><ul><li><code>kubeadm init</code> 启动一个k8s主节点</li><li><code>kubeadm join</code>启动一个K8s工作节点并且将加入到集群</li><li><code>kubeadm upgrade</code> 更新一个k8s集群到新版本</li><li><code>kubeadm config</code></li><li><code>kubeadm token</code> 使用kubeadm join来管理令牌 https</li><li><code>kubeadm reset</code> 还原之前使用kubeadm init 或者 kubeadm join对节点产生的改变</li><li><code>kubeadm version</code> 打印出版本</li><li><code>kubeadm alpha</code>预览一组可用的新功能以便从社区搜集反馈</li></ul><h3 id="_3-kubeadm-kubelet-and-kubectl-安装" tabindex="-1"><a class="header-anchor" href="#_3-kubeadm-kubelet-and-kubectl-安装" aria-hidden="true">#</a> 3 Kubeadm kubelet and kubectl 安装</h3><ul><li><p>添加阿里云k8s源</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -fsSL https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | sudo apt-key add - 

vi /etc/apt/sources.list
deb https://mirrors.aliyun.com/kubernetes/apt/  kubernetes-xenial main
apt update -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看可用版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt-cache madison kubeadm 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>安装最新版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt -y install kubectl kubelet kubeadm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>安装指定版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apt install -y kubelet=1.23.2-00 kubeadm=1.23.2-00 kubectl=1.23.2-00
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>使用命令</p><ul><li>查看版本<code>kubectl version</code></li></ul></li></ul><h3 id="_4-启动kubelet" tabindex="-1"><a class="header-anchor" href="#_4-启动kubelet" aria-hidden="true">#</a> 4 启动kubelet</h3><ul><li><p>修改cgroup</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/default/kubelet &lt;&lt;EOF
KUBELET_EXTRA_ARGS=--cgroup-driver=systemd --fail-swap-on=false
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>重新加载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl start kubelet.service
systemctl enable kubelet.service
systemctl status kubelet.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>查看出错日志<code>journalctl -xefu kubelet</code></p><ul><li>-x --catalog</li><li>-e --pageer-end</li><li>-f --follow</li><li>-u --unit=UNIT</li></ul></li></ul><h2 id="_6-集群安装" tabindex="-1"><a class="header-anchor" href="#_6-集群安装" aria-hidden="true">#</a> 6 集群安装</h2><ul><li>命令行直接安装</li><li>配置文件安装</li></ul><h3 id="_1-命令行直接安装" tabindex="-1"><a class="header-anchor" href="#_1-命令行直接安装" aria-hidden="true">#</a> 1. 命令行直接安装</h3><ul><li><p>kubelet设置容器运行时</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /var/lib/kubelet/kubeadm-flags.env

KUBELET_KUBEADM_ARGS=&quot;--container-runtime=remote --container-runtime-endpoint=unix:///var/run/cri-dockerd.sock --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重启</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl restart kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>拉镜像</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm config images pull --image-repository registry.aliyuncs.com/google_containers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>init</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 早期写法 v1.24前，不需要cri-dockerd
kubeadm init --image-repository registry.aliyuncs.com/google_containers --pod-network-cidr=10.10.0.0/16 --service-cidr=10.20.0.0/16 --apiserver-advertise-address=10.0.0.231 --kubernetes-version=v1.26.0

# 指定cri-dockerd 连接 docker
kubeadm init --image-repository registry.aliyuncs.com/google_containers --pod-network-cidr=10.10.0.0/16 --service-cidr=10.20.0.0/16 --apiserver-advertise-address=10.0.0.231 --kubernetes-version=v1.26.0 --cri-socket unix:///var/run/cri-dockerd.sock

# 指定containerd
kubeadm init --image-repository registry.aliyuncs.com/google_containers --pod-network-cidr=/16 --service-cidr=10.20.0.0/16 --apiserver-advertise-address=10.0.0.231 --kubernetes-version=v1.26.0 --cri-socket unix:///var/containerd/containerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>本次使用<code>指定cri-dockerd 连接 docker</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm init --image-repository registry.aliyuncs.com/google_containers --pod-network-cidr=10.10.0.0/16 --service-cidr=10.20.0.0/16 --apiserver-advertise-address=10.0.0.231 --kubernetes-version=v1.26.0 --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>pod-network-cidr 窗口ip地址，默认10.224.0.0</li><li>apiserver-advertise-address masterip</li></ul></li><li><p>输出</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubeadm init --image-repository registry.aliyuncs.com/google_containers --pod-network-cidr=10.10.0.0/16 --service-cidr=10.20.0.0/16 --apiserver-advertise-address=10.0.0.231 --kubernetes-version=v1.26.0 --cri-socket unix:///var/run/cri-dockerd.sock
[init] Using Kubernetes version: v1.26.0
[preflight] Running pre-flight checks
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using &#39;kubeadm config images pull&#39;
[certs] Using certificateDir folder &quot;/etc/kubernetes/pki&quot;
[certs] Generating &quot;ca&quot; certificate and key
[certs] Generating &quot;apiserver&quot; certificate and key
[certs] apiserver serving cert is signed for DNS names [kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local ubuntk8s-m1] and IPs [10.20.0.1 10.0.0.231]
[certs] Generating &quot;apiserver-kubelet-client&quot; certificate and key
[certs] Generating &quot;front-proxy-ca&quot; certificate and key
[certs] Generating &quot;front-proxy-client&quot; certificate and key
[certs] Generating &quot;etcd/ca&quot; certificate and key
[certs] Generating &quot;etcd/server&quot; certificate and key
[certs] etcd/server serving cert is signed for DNS names [localhost ubuntk8s-m1] and IPs [10.0.0.231 127.0.0.1 ::1]
[certs] Generating &quot;etcd/peer&quot; certificate and key
[certs] etcd/peer serving cert is signed for DNS names [localhost ubuntk8s-m1] and IPs [10.0.0.231 127.0.0.1 ::1]
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
[apiclient] All control plane components are healthy after 5.503836 seconds
[upload-config] Storing the configuration used in ConfigMap &quot;kubeadm-config&quot; in the &quot;kube-system&quot; Namespace
[kubelet] Creating a ConfigMap &quot;kubelet-config&quot; in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node ubuntk8s-m1 as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node ubuntk8s-m1 as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]
[bootstrap-token] Using token: o0x4pl.gnik30ytnhoq68yp
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

kubeadm join 10.0.0.231:6443 --token o0x4pl.gnik30ytnhoq68yp \\
	--discovery-token-ca-cert-hash sha256:860106236c8db3945b567c88f69f518ad0c2543e6bd9e430f121757fbda0d7a6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="_2-配置文件安装" tabindex="-1"><a class="header-anchor" href="#_2-配置文件安装" aria-hidden="true">#</a> 2 配置文件安装</h3><ul><li><p>生成文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm config print
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="_3-kubectl准备" tabindex="-1"><a class="header-anchor" href="#_3-kubectl准备" aria-hidden="true">#</a> 3 kubectl准备</h3><ul><li><p>下面的命令是配置xxx,用kubectl访问集群的方式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>检查状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get cs/node/pod
cs: ComponentStatus
node 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>nodes notReady</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl get nodes
NAME          STATUS     ROLES           AGE   VERSION
ubuntk8s-m1   NotReady   control-plane   29m   v1.26.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这里notReady别急，继续安装 4 pod，成功后即可</li></ul></li></ul><h3 id="_4-安装pod-network-flannel" tabindex="-1"><a class="header-anchor" href="#_4-安装pod-network-flannel" aria-hidden="true">#</a> 4 安装POD network flannel</h3><ul><li><p>下载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

修改network与执行kubeadm init一致
net-conf.json: |
    {
      &quot;Network&quot;: &quot;10.10.0.0/16&quot;,
      &quot;Backend&quot;: {
        &quot;Type&quot;: &quot;vxlan&quot;
      }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl apply -f kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="_5-卸载安装" tabindex="-1"><a class="header-anchor" href="#_5-卸载安装" aria-hidden="true">#</a> 5 卸载安装</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm reset --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ip link delete cni0
ip link delete flannel.1
rm -rf /var/lib/cni
rm -rf /etc/kubernetes
rm -rf /root/.kube/config
rm -rf /var/lib/etcd
ipvsadm -C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-测试集群" tabindex="-1"><a class="header-anchor" href="#_6-测试集群" aria-hidden="true">#</a> 6 测试集群</h3><ul><li>创建pod</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl create deployment demo1 --image=nginx:1.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>查看pod状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
demo1-74564bd775-2qfj6   0/1     Pending   0          23s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>status pending</p><ul><li><p>查看pod描述信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl describe pod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Events:
  Type     Reason            Age   From               Message
  ----     ------            ----  ----               -------
  Warning  FailedScheduling  3m5s  default-scheduler  0/1 nodes are available: 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }. preemption: 0/1 nodes are available: 1 Preemption is not helpful for scheduling..
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>nodes描述信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl describe node

Taints:             node-role.kubernetes.io/control-plane:NoSchedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改key</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl taint node ubuntk8s-m1 node-role.kubernetes.io/control-plane-
root@ubuntk8s-m1:~# kubectl taint node ubuntk8s-m1 node-role.kubernetes.io/control-plane-
node/ubuntk8s-m1 untainted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>再查看pod状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl get pod
NAME                     READY   STATUS    RESTARTS   AGE
demo1-74564bd775-2qfj6   1/1     Running   0          13m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看pod描述信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl describe pod demo1-74564bd775-2qfj6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+u+`" alt="image-20230118210957848"></p><ul><li><p>查看pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl get pod -owide
NAME                     READY   STATUS    RESTARTS   AGE   IP          NODE          NOMINATED NODE   READINESS GATES
demo1-74564bd775-2qfj6   1/1     Running   0          18m   10.10.0.4   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul></li></ul><h2 id="_7-master-node配置" tabindex="-1"><a class="header-anchor" href="#_7-master-node配置" aria-hidden="true">#</a> 7 Master node配置</h2><h3 id="_1-master节点参与工作负载" tabindex="-1"><a class="header-anchor" href="#_1-master节点参与工作负载" aria-hidden="true">#</a> 1 master节点参与工作负载</h3><blockquote><p>6集群安装 6测试集群出现的问题</p></blockquote><p>使用kubeadm 初始化的集群，Pod不会被调度到Master Node上，也就是说Master Node不参与工作负载。这是因为当前的master节点node1被打上了node-role.kubernetes.io/master:NoSchedule的污点：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl describe node ubuntk8s-m1 | grep Taints
Taints:             node-role.kubernetes.io/control-plane:NoSchedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>测试环境，去掉这个污点，使node1参与负载：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl taint node ubuntk8s-m1 node-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="_2-修改使用ipvs转发流量" tabindex="-1"><a class="header-anchor" href="#_2-修改使用ipvs转发流量" aria-hidden="true">#</a> 2 修改使用ipvs转发流量</h3><blockquote><p>负载均衡通常采用ipvs、iptables</p><p>iptables很难支持上万级的service，因为iptables纯粹是为防火墙而设计的，并且底层数据结构是内核规则的列表。</p><p>1 IPVS为大型集群提供了更好的可扩展性和性能。 2 IPVS支持比iptables更复杂的负载平衡算法（最小负载，最少连接，位置，加权等）。 3 IPVS支持服务器健康检查和连接重试等</p></blockquote><ul><li><p>修改kube-proxy模式为ipvs</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl edit cm -n kube-system kube-proxy
修改mode: &quot;ipvs&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除旧pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl delete pod -n kube-system kube-proxy-2kwmz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>kube-proxy-2kwmz</code>，可能通过<code>kubectl get pods -A</code>查看</p></li></ul><h3 id="_3-node加入集群" tabindex="-1"><a class="header-anchor" href="#_3-node加入集群" aria-hidden="true">#</a> 3 node加入集群</h3><ul><li><p>获取tocken</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm init 成功后输出的 kubeadm join 内容。或者下方master节点执行
root@ubuntk8s-m1:~# kubeadm token create --print-join-command
kubeadm join 10.0.0.231:6443 --token tyzflc.j3up0lsuutnm4jeq --discovery-token-ca-cert-hash sha256:860106236c8db3945b567c88f69f518ad0c2543e6bd9e430f121757fbda0d7a6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>节点执行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm join 10.0.0.231:6443 --token tyzflc.j3up0lsuutnm4jeq --discovery-token-ca-cert-hash sha256:860106236c8db3945b567c88f69f518ad0c2543e6bd9e430f121757fbda0d7a6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>直接执行会报错，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-n1:~# kubeadm join 10.0.0.231:6443 --token tyzflc.j3up0lsuutnm4jeq --discovery-token-ca-cert-hash sha256:860106236c8db3945b567c88f69f518ad0c2543e6bd9e430f121757fbda0d7a6
Found multiple CRI endpoints on the host. Please define which one do you wish to use by setting the &#39;criSocket&#39; field in the kubeadm configuration file: unix:///var/run/containerd/containerd.sock, unix:///var/run/cri-dockerd.sock
To see the stack trace of this error execute with --v=5 or higher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改参数：增加--cri-socket及后面内容，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm join 10.0.0.231:6443 --token tyzflc.j3up0lsuutnm4jeq --discovery-token-ca-cert-hash sha256:860106236c8db3945b567c88f69f518ad0c2543e6bd9e430f121757fbda0d7a6 --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>node1查看节点情况</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-n1:~# kubectl get nodes
E0118 14:09:05.366882  234276 memcache.go:238] couldn&#39;t get current server API group list: Get &quot;http://localhost:8080/api?timeout=32s&quot;: dial tcp 127.0.0.1:8080: connect: connection refused
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>因为node1没有kubenetes配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># node1节点执行
mkdir -p $HOME/.kube
# 拷贝master节点 ./kube/config 至node1节点机器  root用户目录下，再授权
sudo chown $(id -u):$(id -g) $HOME/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="_4-kubectl-准备" tabindex="-1"><a class="header-anchor" href="#_4-kubectl-准备" aria-hidden="true">#</a> 4 kubectl 准备</h3><ul><li><p>安装POD network flannel</p><ul><li><p>下载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

修改network与执行kubeadm init一致
net-conf.json: |
    {
      &quot;Network&quot;: &quot;10.10.0.0/16&quot;,
      &quot;Backend&quot;: {
        &quot;Type&quot;: &quot;vxlan&quot;
      }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl apply -f kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>启动kubelet</p><ul><li><p>修改cgroup</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/default/kubelet &lt;&lt;EOF
KUBELET_EXTRA_ARGS=--cgroup-driver=systemd --fail-swap-on=false
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>重新加载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl start kubelet.service
systemctl enable kubelet.service
systemctl status kubelet.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>查看出错日志<code>journalctl -xefu kubelet</code></p><ul><li>-x --catalog</li><li>-e --pageer-end</li><li>-f --follow</li><li>-u --unit=UNIT</li></ul></li></ul></li></ul><h3 id="_5-状态检查" tabindex="-1"><a class="header-anchor" href="#_5-状态检查" aria-hidden="true">#</a> 5 状态检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@ubuntk8s-n1:~<span class="token comment"># kubectl get node</span>
NAME          STATUS   ROLES           AGE   VERSION
ubuntk8s-m1   Ready    control-plane   2d    v1.26.0
ubuntk8s-n1   Ready    <span class="token function">node</span>            40m   v1.26.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>如果node节点为notready,则从头到尾检查配置，重新启动、加载服务</p><p>特别注意：<code>cri-docker.service cri-docker.socket</code></p><p>查看服务状态为：<code>systemctl status cri-docker.service cri-docker.socket</code>，不应出现异常 EROR</p><p>否则一一排查</p></li></ul><h3 id="_6-node-角色设置" tabindex="-1"><a class="header-anchor" href="#_6-node-角色设置" aria-hidden="true">#</a> 6 node 角色设置</h3><p><code>kubectl label nodes &lt;节点名称&gt; node-role.kubernetes.io/node=</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl label nodes ubuntk8s-n1 node-role.kubernetes.io/node1=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-扩容nginx" tabindex="-1"><a class="header-anchor" href="#_7-扩容nginx" aria-hidden="true">#</a> 7 扩容nginx</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl scale deployment demo1 --replicas 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>查看分布情况<code>kubectl get pod -owide</code></p><blockquote><p>由scheduler控制分配</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-n1:~# kubectl get pod -owide
NAME                     READY   STATUS    RESTARTS   AGE    IP          NODE          NOMINATED NODE   READINESS GATES
demo1-74564bd775-2qfj6   1/1     Running   0          120m   10.10.0.4   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-6zxqd   1/1     Running   0          50s    10.10.1.4   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-dljmf   1/1     Running   0          50s    10.10.1.2   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-fnrl9   1/1     Running   0          50s    10.10.0.5   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-wf6nx   1/1     Running   0          50s    10.10.1.3   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
root@ubuntk8s-n1:~#
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="_8-node切换cri到containerd" tabindex="-1"><a class="header-anchor" href="#_8-node切换cri到containerd" aria-hidden="true">#</a> 8 node切换CRI到containerd</h2><h3 id="_1-查看节点后-剥离" tabindex="-1"><a class="header-anchor" href="#_1-查看节点后-剥离" aria-hidden="true">#</a> 1 查看节点后，剥离</h3><ul><li>剥离节点n2 <code>kubectl drain ubuntk8s-n2 --ignore-daemonsets</code></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl get pod -owide
NAME                     READY   STATUS    RESTARTS        AGE   IP           NODE          NOMINATED NODE   READINESS GATES
demo1-74564bd775-2qfj6   1/1     Running   2 (8m3s ago)    23h   10.10.0.10   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-7crpd   1/1     Running   0               31s   10.10.1.7    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-fnrl9   1/1     Running   1 (8m14s ago)   21h   10.10.0.8    ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-rrsh7   1/1     Running   0               31s   10.10.2.2    ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
demo1-74564bd775-v8v67   1/1     Running   1 (8m38s ago)   21h   10.10.1.6    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
root@ubuntk8s-m1:~# kubectl get pod -A
NAMESPACE      NAME                                  READY   STATUS    RESTARTS      AGE
default        demo1-74564bd775-2qfj6                1/1     Running   2 (11m ago)   23h
default        demo1-74564bd775-7crpd                1/1     Running   0             4m5s
default        demo1-74564bd775-fnrl9                1/1     Running   1 (11m ago)   21h
default        demo1-74564bd775-rrsh7                1/1     Running   0             4m5s
default        demo1-74564bd775-v8v67                1/1     Running   1 (12m ago)   21h
kube-flannel   kube-flannel-ds-8fc46                 1/1     Running   1 (12m ago)   22h
kube-flannel   kube-flannel-ds-vbcjv                 1/1     Running   0             21m
kube-flannel   kube-flannel-ds-wrrgb                 1/1     Running   1 (11m ago)   2d22h
kube-system    coredns-5bbd96d687-k48rd              1/1     Running   1 (11m ago)   2d22h
kube-system    coredns-5bbd96d687-x292j              1/1     Running   2 (11m ago)   2d22h
kube-system    etcd-ubuntk8s-m1                      1/1     Running   1 (11m ago)   2d22h
kube-system    kube-apiserver-ubuntk8s-m1            1/1     Running   1 (11m ago)   2d22h
kube-system    kube-controller-manager-ubuntk8s-m1   1/1     Running   1 (11m ago)   2d22h
kube-system    kube-proxy-7hc8h                      1/1     Running   0             21m
kube-system    kube-proxy-df8fq                      1/1     Running   1 (11m ago)   23h
kube-system    kube-proxy-px75c                      1/1     Running   1 (12m ago)   22h
kube-system    kube-scheduler-ubuntk8s-m1            1/1     Running   3 (66s ago)   2d22h
root@ubuntk8s-m1:~# kubectl get pod -A -owide
NAMESPACE      NAME                                  READY   STATUS    RESTARTS      AGE     IP           NODE          NOMINATED NODE   READINESS GATES
default        demo1-74564bd775-2qfj6                1/1     Running   2 (11m ago)   23h     10.10.0.10   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-7crpd                1/1     Running   0             4m8s    10.10.1.7    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-fnrl9                1/1     Running   1 (11m ago)   21h     10.10.0.8    ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-rrsh7                1/1     Running   0             4m8s    10.10.2.2    ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-v8v67                1/1     Running   1 (12m ago)   21h     10.10.1.6    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-8fc46                 1/1     Running   1 (12m ago)   22h     10.0.0.232   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-vbcjv                 1/1     Running   0             21m     10.0.0.233   ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-wrrgb                 1/1     Running   1 (11m ago)   2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    coredns-5bbd96d687-k48rd              1/1     Running   1 (11m ago)   2d22h   10.10.0.9    ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    coredns-5bbd96d687-x292j              1/1     Running   2 (11m ago)   2d22h   10.10.0.12   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    etcd-ubuntk8s-m1                      1/1     Running   1 (11m ago)   2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-apiserver-ubuntk8s-m1            1/1     Running   1 (11m ago)   2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-controller-manager-ubuntk8s-m1   1/1     Running   1 (11m ago)   2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-7hc8h                      1/1     Running   0             21m     10.0.0.233   ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-df8fq                      1/1     Running   1 (11m ago)   23h     10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-px75c                      1/1     Running   1 (12m ago)   22h     10.0.0.232   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-scheduler-ubuntk8s-m1            1/1     Running   3 (69s ago)   2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
root@ubuntk8s-m1:~# kubectl get pod -A -owide | grep node1
root@ubuntk8s-m1:~# kubectl get pod -A -owide | grep n1
default        demo1-74564bd775-7crpd                1/1     Running   0             4m29s   10.10.1.7    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-v8v67                1/1     Running   1 (12m ago)   21h     10.10.1.6    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-8fc46                 1/1     Running   1 (12m ago)   22h     10.0.0.232   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-px75c                      1/1     Running   1 (12m ago)   22h     10.0.0.232   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
root@ubuntk8s-m1:~# kubectl get pod -A -owide | grep n2
default        demo1-74564bd775-rrsh7                1/1     Running   0               7m11s   10.10.2.2    ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-vbcjv                 1/1     Running   0               24m     10.0.0.233   ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-7hc8h                      1/1     Running   0               24m     10.0.0.233   ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
root@ubuntk8s-m1:~# kubectl get node
NAME          STATUS   ROLES           AGE     VERSION
ubuntk8s-m1   Ready    control-plane   2d22h   v1.26.0
ubuntk8s-n1   Ready    node,node1      22h     v1.26.0
ubuntk8s-n2   Ready    node            26m     v1.26.0

### 删除ubuntk8s-n2节点
root@ubuntk8s-m1:~# kubectl drain ubuntk8s-n2
node/ubuntk8s-n2 cordoned
error: unable to drain node &quot;ubuntk8s-n2&quot; due to error:cannot delete DaemonSet-managed Pods (use --ignore-daemonsets to ignore): kube-flannel/kube-flannel-ds-vbcjv, kube-system/kube-proxy-7hc8h, continuing command...
There are pending nodes to be drained:
 ubuntk8s-n2
cannot delete DaemonSet-managed Pods (use --ignore-daemonsets to ignore): kube-flannel/kube-flannel-ds-vbcjv, kube-system/kube-proxy-7hc8h
root@ubuntk8s-m1:~# kubectl drain ubuntk8s-n2  --ignore-daemonsets
node/ubuntk8s-n2 already cordoned
Warning: ignoring DaemonSet-managed Pods: kube-flannel/kube-flannel-ds-vbcjv, kube-system/kube-proxy-7hc8h
evicting pod default/demo1-74564bd775-rrsh7
pod/demo1-74564bd775-rrsh7 evicted
node/ubuntk8s-n2 drained
root@ubuntk8s-m1:~# kubectl get node
NAME          STATUS                     ROLES           AGE     VERSION
ubuntk8s-m1   Ready                      control-plane   2d22h   v1.26.0
ubuntk8s-n1   Ready                      node,node1      22h     v1.26.0
ubuntk8s-n2   Ready,SchedulingDisabled   node            28m     v1.26.0
root@ubuntk8s-m1:~# kubectl get pod -A -owide
NAMESPACE      NAME                                  READY   STATUS    RESTARTS       AGE     IP           NODE          NOMINATED NODE   READINESS GATES
default        demo1-74564bd775-25vp8                1/1     Running   0              64s     10.10.1.8    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-2qfj6                1/1     Running   2 (19m ago)    24h     10.10.0.10   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-7crpd                1/1     Running   0              12m     10.10.1.7    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-fnrl9                1/1     Running   1 (19m ago)    22h     10.10.0.8    ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
default        demo1-74564bd775-v8v67                1/1     Running   1 (20m ago)    22h     10.10.1.6    ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-8fc46                 1/1     Running   1 (20m ago)    22h     10.0.0.232   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-vbcjv                 1/1     Running   0              29m     10.0.0.233   ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
kube-flannel   kube-flannel-ds-wrrgb                 1/1     Running   1 (19m ago)    2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    coredns-5bbd96d687-k48rd              1/1     Running   1 (19m ago)    2d22h   10.10.0.9    ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    coredns-5bbd96d687-x292j              1/1     Running   2 (19m ago)    2d22h   10.10.0.12   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    etcd-ubuntk8s-m1                      1/1     Running   1 (19m ago)    2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-apiserver-ubuntk8s-m1            1/1     Running   1 (19m ago)    2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-controller-manager-ubuntk8s-m1   1/1     Running   1 (19m ago)    2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-7hc8h                      1/1     Running   0              29m     10.0.0.233   ubuntk8s-n2   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-df8fq                      1/1     Running   1 (19m ago)    23h     10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-proxy-px75c                      1/1     Running   1 (20m ago)    22h     10.0.0.232   ubuntk8s-n1   &lt;none&gt;           &lt;none&gt;
kube-system    kube-scheduler-ubuntk8s-m1            1/1     Running   3 (9m1s ago)   2d22h   10.0.0.231   ubuntk8s-m1   &lt;none&gt;           &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2切换引擎至containerd" tabindex="-1"><a class="header-anchor" href="#_2切换引擎至containerd" aria-hidden="true">#</a> 2切换引擎至containerd</h3><ul><li><p>停止docker、cri-docker</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl stop docker
systemctl stop docker.socket
systemctl disable docker
systemctl stop cri-docker.service cri-docker.socket
systemctl disable cri-docker.service cri-docker.socket
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>检查containerd</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl status containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="_3-修改配置文件" tabindex="-1"><a class="header-anchor" href="#_3-修改配置文件" aria-hidden="true">#</a> 3 修改配置文件</h3><p>pause镜像设置阿里云镜像仓库地址</p><p>cgroups驱动设置为systemd</p><p>拉取docker-hub镜像配置加速地址设置为阿里云镜像仓库地址</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p /etc/containerd
containerd config default &gt; /etc/containerd/config.toml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>修改前面生成的配置文件<code>/etc/containerd/config.toml</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc]  
...  
[plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc.options]    
SystemdCgroup = true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>再修改<code>/etc/containerd/config.toml</code>中的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[plugins.&quot;io.containerd.grpc.v1.cri&quot;]  
 ...  
 # sandbox_image = &quot;k8s.gcr.io/pause:3.6&quot;  
 sandbox_image = &quot;registry.aliyuncs.com/google_containers/pause:3.9&quot; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>未按视频配置如下</p><p><img src="`+c+`" alt="image-20230131210051893"></p></li></ul><h3 id="_4-配置containerd开机启动-并启动containerd" tabindex="-1"><a class="header-anchor" href="#_4-配置containerd开机启动-并启动containerd" aria-hidden="true">#</a> 4 配置containerd开机启动，并启动containerd</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable containerd --now
systemctl daemon-reload
systemctl restart containerd.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>使用crictl测试一下，确保可以打印出版本信息并且没有错误信息输出:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crictl version

Version:  0.1.0
RuntimeName:  containerd
RuntimeVersion:  v1.6.14
RuntimeApiVersion:  v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>出现如下错误「runtime connect using default endpoints」</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-n2:/etc/containerd# crictl pods
WARN[0000] runtime connect using default endpoints: [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead.
ERRO[0000] unable to determine runtime API version: rpc error: code = Unavailable desc = connection error: desc = &quot;transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>解决</p><p><code>crictl config runtime-endpoint unix:///var/run/containerd/containerd.sock</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>参考：https://www.orchome.com/16616

kubernetes 1.24+ 之后，如果dockershim已经变成了cri-docker，所以你需要执行：
crictl config runtime-endpoint unix:///var/run/cri-dockerd.sock
如果你的容器运行时，已经换成了containerd，则换成containerd的，如：
crictl config runtime-endpoint unix:///var/run/containerd/containerd.sock
之后，你在执行就好了。
另外：生成的配置在cat /etc/crictl.yaml，可以随时修改。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h3 id="_5-配置kubelet使用containerd" tabindex="-1"><a class="header-anchor" href="#_5-配置kubelet使用containerd" aria-hidden="true">#</a> 5 配置kubelet使用containerd</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /var/lib/kubelet/kubeadm-flags.env

# 文件内容，主要修改endpoint为containerd
KUBELET_KUBEADM_ARGS=&quot;--container-runtime-endpoint=unix:///var/run/containerd/containerd.sock --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>重启</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl restart kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_6-恢复节点" tabindex="-1"><a class="header-anchor" href="#_6-恢复节点" aria-hidden="true">#</a> 6 恢复节点</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># kubectl uncordon ubuntk8s-n2
root@ubuntk8s-n2:/etc/containerd# kubectl uncordon ubuntk8s-n2
node/ubuntk8s-n2 uncordoned
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果如下：</p><p><img src="`+o+'" alt="image-20230131211024895"></p><ul><li>查看结点情况<code>kubectl get node -owide</code></li><li>查看pod情况<code>kubectl get pod -owide</code></li></ul><h3 id="_7-扩容" tabindex="-1"><a class="header-anchor" href="#_7-扩容" aria-hidden="true">#</a> 7 扩容</h3><p><img src="'+v+'" alt="image-20230131212056640"></p><ul><li>扩容3份<code>kubectl scale deployment demo1 --replicas 3</code></li></ul>',126);function x(f,y){const i=s("ExternalLinkIcon");return a(),l("div",null,[m,e("blockquote",null,[g,e("p",null,[n("👉 "),e("a",p,[n("Kubeadm安装K8s-1.26.0（docker+containerd+CRI-O)"),t(i)])]),k]),h])}const q=d(b,[["render",x],["__file","13_v1.26(docker_containerd_CRI-O).html.vue"]]);export{q as default};

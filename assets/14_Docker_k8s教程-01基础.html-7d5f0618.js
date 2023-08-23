import{_ as t,M as p,p as o,q as c,R as n,t as s,N as e,a1 as i}from"./framework-449724a9.js";const r="/assets/containerd1-cf993d18.png",d="/assets/docker架构-30b9e549.png",u="/assets/常用命令-3edc1bcb.jpg",v="/assets/Dockerfile解释-5d72fe0a.png",m="/assets/container-layers-eaaa2dff.jpg",k="/assets/sharing-layers-d5736e2b.jpg",b="/assets/aufs-e14993ea.png",g="/assets/exchange1-7d0871e3.png",h="/assets/exchange2-396434ca.png",l="/assets/docker-bridge-37d42913.jpeg",y="/assets/bridge-network-a4cef0ef.png",x="/assets/iptables-846223e1.png",f="/assets/docker-dnat-25d1d192.jpeg",w="/assets/docker-snat-051fbb87.jpeg",P="/assets/docker-network-container-ebb10456.jpeg",S="/assets/pod-demo-91121163.png",q="/assets/configmap-60b68653.png",_="/assets/fcachl-24c012d1.jpg",E="/assets/AOQgQj-c548510a.jpg",R="/assets/workload-b21b5569.png",N="/assets/update-015d836d.png",T="/assets/services-iptables-overview-32140133.svg",A="/assets/ingress-f2a534cd.webp",$="/assets/image-20230213124437901-d6cb1b62.png",C={},D=n("h1",{id:"_14-01【docker-k8s教程】",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_14-01【docker-k8s教程】","aria-hidden":"true"},"#"),s(" 14-01【Docker+k8s教程】")],-1),O=n("p",null,"create by nohi 20230204",-1),I={href:"https://www.bilibili.com/video/BV1Fv4y1v7CE/?t=639.8&vd_source=9004ce053a52d5930f71e230579961e7",target:"_blank",rel:"noopener noreferrer"},M={href:"https://pan.baidu.com/s/1-bGAHDmt9F8gO5cngaNn7w",target:"_blank",rel:"noopener noreferrer"},L=i('<h2 id="一、docker" tabindex="-1"><a class="header-anchor" href="#一、docker" aria-hidden="true">#</a> 一、Docker</h2><h3 id="_1-认识docker" tabindex="-1"><a class="header-anchor" href="#_1-认识docker" aria-hidden="true">#</a> 1 认识docker</h3><p><img src="'+r+`" alt="containerd1"></p><p>也就是说</p><ul><li>runC（libcontainer）是符合OCI标准的一个实现，与底层系统交互</li><li>containerd是实现了OCI之上的容器的高级功能，比如镜像管理、容器执行的调用等</li><li>Dockerd目前是最上层与CLI交互的进程，接收cli的请求并与containerd协作</li></ul><h4 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h4><ol><li>为了提供一种更加轻量的虚拟化技术，docker出现了</li><li>借助于docker容器的轻、快等特性，解决了软件交付过程中的环境依赖问题，使得docker得以快速发展</li><li>Docker是一种CS架构的软件产品，可以把代码及依赖打包成镜像，作为交付介质，并且把镜像启动成为容器，提供容器生命周期的管理</li><li>docker-ce，每季度发布stable版本。18.06，18.09，19.03</li><li>发展至今，docker已经通过制定OCI标准对最初的项目做了拆分，其中runC和containerd是docker的核心项目，理解docker整个请求的流程，对我们深入理解docker有很大的帮助</li></ol><h3 id="_2-配置宿主机网卡转发" tabindex="-1"><a class="header-anchor" href="#_2-配置宿主机网卡转发" aria-hidden="true">#</a> 2 配置宿主机网卡转发</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 若未配置，需要执行如下
$ cat &lt;&lt;EOF &gt;  /etc/sysctl.d/docker.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
EOF

# 加载配置生效
$ sysctl -p /etc/sysctl.d/docker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>出现如下错误</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@centos8 ~]# sysctl -p /etc/sysctl.d/docker.conf
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-ip6tables: 没有那个文件或目录
sysctl: cannot stat /proc/sys/net/bridge/bridge-nf-call-iptables: 没有那个文件或目录

# 执行
modprobe br_netfilter
# 再执行 sysctl -p /etc/sysctl.d/docker.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="_3-yum安装配置docker" tabindex="-1"><a class="header-anchor" href="#_3-yum安装配置docker" aria-hidden="true">#</a> 3 Yum安装配置docker</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 下载阿里源repo文件
# centos8.5 运行以下命令下载最新的repo文件。
wget http://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo -O /etc/yum.repos.d/Centos-vault-8.5.2111.repo
wget http://mirrors.aliyun.com/repo/epel-archive-8.repo -O /etc/yum.repos.d/epel-archive-8.repo

wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo

$ yum clean all &amp;&amp; yum makecache
## yum安装最新版本
$ yum install docker-ce -y --allowerasing
## 查看源中可用版本
$ yum list docker-ce --showduplicates | sort -r
	## 安装指定版本
	##yum install -y docker-ce-18.09.9

## 配置源加速
## https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors
mkdir -p /etc/docker
vi /etc/docker/daemon.json
{
  &quot;registry-mirrors&quot; : [
    &quot;https://registry.cn-hangzhou.aliyuncs.com&quot;
  ]
}

## 设置开机自启
systemctl enable docker  
systemctl daemon-reload

## 启动docker
systemctl start docker 

## 查看docker信息
docker info

## docker-client
which docker
## docker daemon
ps aux |grep docker
## containerd
ps aux|grep containerd
systemctl status containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4核心要素及常用操作详解" tabindex="-1"><a class="header-anchor" href="#_4核心要素及常用操作详解" aria-hidden="true">#</a> 4核心要素及常用操作详解</h3><p><img src="`+d+`" alt=""></p><h4 id="三大核心要素-镜像-image-、容器-container-、仓库-registry" tabindex="-1"><a class="header-anchor" href="#三大核心要素-镜像-image-、容器-container-、仓库-registry" aria-hidden="true">#</a> 三大核心要素：镜像(Image)、容器(Container)、仓库(Registry)</h4><h6 id="镜像-image" tabindex="-1"><a class="header-anchor" href="#镜像-image" aria-hidden="true">#</a> 镜像（Image）</h6><p>打包了业务代码及运行环境的包，是静态的文件，不能直接对外提供服务。</p><h6 id="容器-container" tabindex="-1"><a class="header-anchor" href="#容器-container" aria-hidden="true">#</a> 容器（Container）</h6><p>镜像的运行时，可以对外提供服务。</p><h6 id="仓库-registry" tabindex="-1"><a class="header-anchor" href="#仓库-registry" aria-hidden="true">#</a> 仓库（Registry）</h6><p>存放镜像的地方</p><ul><li>公有仓库，Docker Hub，阿里，网易...</li><li>私有仓库，企业内部搭建 <ul><li>Docker Registry，Docker官方提供的镜像仓库存储服务</li><li>Harbor, 是Docker Registry的更高级封装，它除了提供友好的Web UI界面，角色和用户权限管理，用户操作审计等功能</li></ul></li><li>镜像访问地址形式 registry.devops.com/demo/hello:latest,若没有前面的url地址，则默认寻找Docker Hub中的镜像，若没有tag标签，则使用latest作为标签。 比如，docker pull nginx，会被解析成docker.io/library/nginx:latest</li><li>公有的仓库中，一般存在这么几类镜像 <ul><li>操作系统基础镜像（centos，ubuntu，suse，alpine）</li><li>中间件（nginx，redis，mysql，tomcat）</li><li>语言编译环境（python，java，golang）</li><li>业务镜像（django-demo...）</li></ul></li></ul><p>容器和仓库不会直接交互，都是以镜像为载体来操作。</p><h4 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> DEMO</h4><ol><li><p>查看镜像列表</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>如何获取镜像</p><ul><li><p>从远程仓库拉取</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker pull nginx:alpine
$ docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用tag命令</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker tag nginx:alpine 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx:alpine
$ docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>本地构建</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t my-nginx:ubuntu <span class="token operator">-</span>f Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>如何通过镜像启动容器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker run <span class="token operator">--</span>name my-nginx-alpine <span class="token operator">-</span>d nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>如何知道容器内部运行了什么程序？</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 进入容器内部,分配一个tty终端</span>
$ docker exec <span class="token operator">-</span>ti my-nginx-alpine <span class="token operator">/</span>bin/sh
<span class="token comment"># ps aux</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>docker怎么知道容器启动后该执行什么命令？</p><p>通过docker build来模拟构建一个nginx的镜像，</p><ul><li><p>创建Dockerfile</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># 告诉docker使用哪个基础镜像作为模板，后续命令都以这个镜像为基础 </span>
<span class="token instruction"><span class="token keyword">FROM</span> ubuntu</span>

<span class="token comment"># RUN命令会在上面指定的镜像里执行命令 </span>
<span class="token comment">#RUN sed -i &#39;s#http://archive.ubuntu.com/#http://mirrors.tuna.tsinghua.edu.cn/#&#39; /etc/apt/sources.list;</span>
<span class="token instruction"><span class="token keyword">RUN</span> cat <span class="token string">&#39;nameserver 8.8.8.8&#39;</span> &gt; /</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt install -y nginx</span>

<span class="token comment">#告诉docker，启动容器时执行如下命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;/usr/sbin/nginx&quot;</span>, <span class="token string">&quot;-g&quot;</span>,<span class="token string">&quot;daemon off;&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>构建本地镜像</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t my-nginx:ubuntu <span class="token operator">-</span>f Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>出现异常：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Temporary failure resolving &#39;archive.ubuntu.com&#39;
...
ERROR: failed to solve: process &quot;/bin/sh -c apt-get update &amp;&amp; apt install -y nginx&quot; did not complete successfully: exit code: 100
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>解决:（一般为dns问题）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@centos8 docker]# cat /etc/resolv.conf
# Generated by NetworkManager
search 5
#nameserver fe80::b239:56ff:fe96:ff09%ens192
nameserver 8.8.8.8
nameserver 10.0.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul></li></ol><ul><li><p>使用新镜像启动容器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker run <span class="token operator">--</span>name my-nginx-ubuntu <span class="token operator">-</span>d my-nginx:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>进入容器查看进程</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti my-nginx-ubuntu <span class="token operator">/</span>bin/sh
<span class="token comment"># ps aux </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><ol start="6"><li><p>如何访问容器内服务</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 进入容器内部</span>
$ docker exec <span class="token operator">-</span>ti my-nginx-alpine <span class="token operator">/</span>bin/sh
<span class="token comment"># ps aux|grep nginx</span>
<span class="token comment"># curl localhost:80</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>宿主机中如何访问容器服务</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 删掉旧服务,重新启动</span>
$ docker <span class="token function">rm</span> <span class="token operator">-</span>f my-nginx-alpine
$ docker run <span class="token operator">--</span>name my-nginx-alpine <span class="token operator">-</span>d <span class="token operator">-</span>p 8080:80 nginx:alpine
$ curl 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>docker client如何与daemon通信</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># /var/run/docker.sock</span>
$ docker run <span class="token operator">--</span>name portainer <span class="token operator">-</span>d <span class="token operator">-</span>p 9001:9000 <span class="token operator">-</span>v <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>run/docker<span class="token punctuation">.</span>sock:<span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>run/docker<span class="token punctuation">.</span>sock portainer/portainer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h4 id="操作演示" tabindex="-1"><a class="header-anchor" href="#操作演示" aria-hidden="true">#</a> 操作演示</h4><p><img src="`+u+`" alt=""></p><ol start="2"><li>查看所有镜像：</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>拉取镜像:</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker pull nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>如何唯一确定镜像:</li></ol><ul><li>image_id</li><li>repository:tag</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker images
REPOSITORY    TAG                 IMAGE ID            CREATED             SIZE
nginx         alpine              377c0837328f        2 weeks ago         19<span class="token punctuation">.</span>7MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li><p>导出镜像到文件中</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker save <span class="token operator">-</span>o nginx-alpine<span class="token punctuation">.</span>tar nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>从文件中加载镜像</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker load <span class="token operator">-</span>i nginx-alpine<span class="token punctuation">.</span>tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>部署镜像仓库</p><p>https://docs.docker.com/registry/</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 使用docker镜像启动镜像仓库服务</span>
$ docker run <span class="token operator">-</span>d <span class="token operator">-</span>p 5000:5000 <span class="token operator">--</span>restart always <span class="token operator">--</span>name registry registry:2

<span class="token comment">## 默认仓库不带认证，若需要认证，参考https://docs.docker.com/registry/deploying/#restricting-access</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>推送本地镜像到镜像仓库中</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 本地镜像打标签</span>
$ docker tag nginx:alpine 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx:alpine
<span class="token comment"># 推着镜像至localhost:5000镜像仓库</span>
$ docker push 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx:alpine

<span class="token comment">## 查看仓库内元数据</span>
$ curl <span class="token operator">-</span>X GET http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/v2/_catalog
$ curl <span class="token operator">-</span>X GET http:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/v2/nginx/tags/list

<span class="token comment">## 镜像仓库给外部访问，不能通过localhost，尝试使用内网地址10.0.0.181:5000/nginx:alpine</span>
$ docker tag nginx:alpine 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx:alpine
$ docker push 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx:alpine
The push refers to repository <span class="token punctuation">[</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx<span class="token punctuation">]</span>
Get https:<span class="token operator">/</span><span class="token operator">/</span>10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/v2/: http: server gave HTTP response to HTTPS client
<span class="token comment">## docker默认不允许向http的仓库地址推送，如何做成https的，参考：https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry</span>
<span class="token comment">## 我们没有可信证书机构颁发的证书和域名，自签名证书需要在每个节点中拷贝证书文件，比较麻烦，因此我们通过配置daemon的方式，来跳过证书的验证：</span>
$ <span class="token function">cat</span> <span class="token operator">/</span>etc/docker/daemon<span class="token punctuation">.</span>json
<span class="token punctuation">{</span>
  <span class="token string">&quot;registry-mirrors&quot;</span>: <span class="token punctuation">[</span>
    <span class="token string">&quot;https://8xpk5wnt.mirror.aliyuncs.com&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string">&quot;insecure-registries&quot;</span>: <span class="token punctuation">[</span>
     <span class="token string">&quot;10.0.0.181:5000&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
$ systemctl restart docker
$ docker push 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx:alpine
$ docker images	<span class="token comment"># IMAGE ID相同，等于起别名或者加快捷方式</span>
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/nginx   alpine              377c0837328f        4 weeks ago         
nginx                    alpine              377c0837328f        4 weeks ago         
localhost:5000/nginx     alpine              377c0837328f        4 weeks ago         
registry                 2                   708bc6af7e5e        2 months ago       

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>删除镜像</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>docker rmi nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看容器列表</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 查看运行状态的容器列表</span>
$ docker <span class="token function">ps</span>

<span class="token comment">## 查看全部状态的容器列表</span>
$ docker <span class="token function">ps</span> <span class="token operator">-</span>a

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动容器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 后台启动</span>
$ docker run <span class="token operator">--</span>name nginx <span class="token operator">-</span>d nginx:alpine

<span class="token comment">## 映射端口,把容器的端口映射到宿主机中,-p &lt;host_port&gt;:&lt;container_port&gt;</span>
$ docker run <span class="token operator">--</span>name nginx <span class="token operator">-</span>d <span class="token operator">-</span>p 8080:80 nginx:alpine

<span class="token comment">## 资源限制,最大可用内存500M</span>
$ docker run <span class="token operator">--</span>memory=500m nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>容器数据持久化</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 挂载主机目录</span>
$ docker run <span class="token operator">--</span>name nginx <span class="token operator">-</span>d  <span class="token operator">-</span>v <span class="token operator">/</span>opt:<span class="token operator">/</span>opt  nginx:alpine
$ docker run <span class="token operator">--</span>name mysql <span class="token operator">-</span>e MYSQL_ROOT_PASSWORD=123456  <span class="token operator">-</span>d <span class="token operator">-</span>v <span class="token operator">/</span>opt/mysql/:<span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/mysql mysql:5<span class="token punctuation">.</span>7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>进入容器或者执行容器内的命令</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti &lt;container_id_or_name&gt; <span class="token operator">/</span>bin/sh
$ docker exec &lt;container_id_or_name&gt; hostname
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>主机与容器之间拷贝数据</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 主机拷贝到容器</span>
$ <span class="token function">echo</span> <span class="token string">&#39;123&#39;</span>&gt;<span class="token operator">/</span>tmp/test<span class="token punctuation">.</span>txt
$ docker <span class="token function">cp</span> <span class="token operator">/</span>tmp/test<span class="token punctuation">.</span>txt nginx:<span class="token operator">/</span>tmp
$ docker exec <span class="token operator">-</span>ti nginx <span class="token function">cat</span> <span class="token operator">/</span>tmp/test<span class="token punctuation">.</span>txt
123

<span class="token comment">## 容器拷贝到主机</span>
$ docker <span class="token function">cp</span> nginx:<span class="token operator">/</span>tmp/test<span class="token punctuation">.</span>txt <span class="token punctuation">.</span><span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>挂载已有的数据，重新创建镜像仓库容器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 解压离线镜像文件</span>
$ tar zxf registry<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz <span class="token operator">-</span>C <span class="token operator">/</span>opt

<span class="token comment">## 删除当前镜像仓库容器</span>
$ docker <span class="token function">rm</span> <span class="token operator">-</span>f registry
<span class="token comment">## 使用docker镜像启动镜像仓库服务</span>
$ docker run <span class="token operator">-</span>d <span class="token operator">-</span>p 5000:5000 <span class="token operator">--</span>restart always <span class="token operator">-</span>v <span class="token operator">/</span>opt/registry:<span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/registry <span class="token operator">--</span>name registry registry:2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设启动镜像仓库服务的主机地址为10.0.0.181，该目录中已存在的镜像列表：</p><table><thead><tr><th>现镜像仓库地址</th><th>原镜像仓库地址</th></tr></thead><tbody><tr><td>10.0.0.181:5000/coreos/flannel:v0.11.0-amd64</td><td>quay.io/coreos/flannel:v0.11.0-amd64</td></tr><tr><td>10.0.0.181:5000/mysql:5.7</td><td>mysql:5.7</td></tr><tr><td>10.0.0.181:5000/nginx:alpine</td><td>nginx:alpine</td></tr><tr><td>10.0.0.181:5000/centos:centos7.5.1804</td><td>centos:centos7.5.1804</td></tr><tr><td>10.0.0.181:5000/elasticsearch/elasticsearch:7.4.2</td><td>docker.elastic.co/elasticsearch/elasticsearch:7.4.2</td></tr><tr><td>10.0.0.181:5000/fluentd-es-root:v1.6.2-1.0</td><td>quay.io/fluentd_elasticsearch/fluentd:v2.5.2</td></tr><tr><td>10.0.0.181:5000/kibana/kibana:7.4.2</td><td>docker.elastic.co/kibana/kibana:7.4.2</td></tr><tr><td>10.0.0.181:5000/kubernetesui/dashboard:v2.0.0-beta5</td><td>kubernetesui/dashboard:v2.0.0-beta5</td></tr><tr><td>10.0.0.181:5000/kubernetesui/metrics-scraper:v1.0.1</td><td>kubernetesui/metrics-scraper:v1.0.1</td></tr><tr><td>10.0.0.181:5000/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0</td><td>quay.io/kubernetes-ingress-controller/nginx-ingress-controller:0.30.0</td></tr><tr><td>10.0.0.181:5000/jenkinsci/blueocean:latest</td><td>jenkinsci/blueocean:latest</td></tr><tr><td>10.0.0.181:5000/sonarqube:7.9-community</td><td>sonarqube:7.9-community</td></tr><tr><td>10.0.0.181:5000/postgres:11.4</td><td>postgres:11.4</td></tr></tbody></table></li><li><p>查看容器日志</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 查看全部日志</span>
$ docker logs nginx

<span class="token comment">## 实时查看最新日志</span>
$ docker logs <span class="token operator">-</span>f nginx

<span class="token comment">## 从最新的100条开始查看</span>
$ docker logs <span class="token operator">--</span>tail=100 <span class="token operator">-</span>f nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>停止或者删除容器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 停止运行中的容器</span>
$ docker stop nginx

<span class="token comment">## 启动退出容器</span>
$ docker <span class="token function">start</span> nginx

<span class="token comment">## 删除非运行中状态的容器</span>
$ docker <span class="token function">rm</span> nginx

<span class="token comment">## 删除运行中的容器</span>
$ docker <span class="token function">rm</span> <span class="token operator">-</span>f nginx
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看容器或者镜像的明细</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 查看容器详细信息，包括容器IP地址等</span>
$ docker inspect nginx

<span class="token comment">## 查看镜像的明细信息</span>
$ docker inspect nginx:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h5 id="dockerfile使用" tabindex="-1"><a class="header-anchor" href="#dockerfile使用" aria-hidden="true">#</a> Dockerfile使用</h5><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t ImageName:ImageTag <span class="token operator">-</span>f Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Dockerfile是一堆指令，在docker build的时候，按照该指令进行操作，最终生成我们期望的镜像</p><ul><li><p>FROM 指定基础镜像，必须为第一个命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
	FROM &lt;image&gt;
	FROM &lt;image&gt;:&lt;tag&gt;
示例：
	FROM mysql:5.7
注意：
	tag是可选的，如果不使用tag时，会使用latest版本的基础镜像
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>MAINTAINER 镜像维护者的信息</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
	MAINTAINER &lt;name&gt;
示例：
	MAINTAINER Yongxin Li
    MAINTAINER inspur_lyx@hotmail.com
    MAINTAINER Yongxin Li &lt;inspur_lyx@hotmail.com&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>COPY|ADD 添加本地文件到镜像中</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
	COPY &lt;src&gt;... &lt;dest&gt;
示例：
    ADD hom* /mydir/          # 添加所有以&quot;hom&quot;开头的文件
    ADD test relativeDir/     # 添加 &quot;test&quot; 到 \`WORKDIR\`/relativeDir/
    ADD test /absoluteDir/    # 添加 &quot;test&quot; 到 /absoluteDir/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>WORKDIR 工作目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
	WORKDIR /path/to/workdir
示例：
    WORKDIR /a  (这时工作目录为/a)
注意：
	通过WORKDIR设置工作目录后，Dockerfile中其后的命令RUN、CMD、ENTRYPOINT、ADD、COPY等命令都会在该目录下执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>RUN 构建镜像过程中执行命令</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
	RUN &lt;command&gt;
示例：
    RUN yum install nginx
    RUN pip install django
    RUN mkdir test &amp;&amp; rm -rf /var/lib/unusedfiles
注意：
	RUN指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定--no-cache参数，如：docker build --no-cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>CMD 构建容器后调用，也就是在容器启动时才进行调用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
    CMD [&quot;executable&quot;,&quot;param1&quot;,&quot;param2&quot;] (执行可执行文件，优先)
    CMD [&quot;param1&quot;,&quot;param2&quot;] (设置了ENTRYPOINT，则直接调用ENTRYPOINT添加参数)
    CMD command param1 param2 (执行shell内部命令)
示例：
    CMD [&quot;/usr/bin/wc&quot;,&quot;--help&quot;]
    CMD ping www.baidu.com
注意：
	CMD不同于RUN，CMD用于指定在容器启动时所要执行的命令，而RUN用于指定镜像构建时所要执行的命令。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ENTRYPOINT 设置容器初始化命令，使其可执行化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
    ENTRYPOINT [&quot;executable&quot;, &quot;param1&quot;, &quot;param2&quot;] (可执行文件, 优先)
    ENTRYPOINT command param1 param2 (shell内部命令)
示例：
    ENTRYPOINT [&quot;/usr/bin/wc&quot;,&quot;--help&quot;]
注意：
	ENTRYPOINT与CMD非常类似，不同的是通过docker run执行的命令不会覆盖ENTRYPOINT，而docker run命令中指定的任何参数，都会被当做参数再次传递给ENTRYPOINT。Dockerfile中只允许有一个ENTRYPOINT命令，多指定时会覆盖前面的设置，而只执行最后的ENTRYPOINT指令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>ENV</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
    ENV &lt;key&gt; &lt;value&gt;
    ENV &lt;key&gt;=&lt;value&gt;
示例：
    ENV myName John
    ENV myCat=fnohi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>EXPOSE</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>格式：
    EXPOSE &lt;port&gt; [&lt;port&gt;...]
示例：
    EXPOSE 80 443
    EXPOSE 8080
    EXPOSE 11211/tcp 11211/udp
注意：
    EXPOSE并不会让容器的端口访问到主机。要使其可访问，需要在docker run运行容器时通过-p来发布这些端口，或通过-P参数来发布EXPOSE导出的所有端口

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+v+`" alt=""></p></li><li><p>基础环境镜像</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> java:8-alpine</span>

<span class="token instruction"><span class="token keyword">RUN</span> apk add --update ca-certificates &amp;&amp; rm -rf /var/cache/apk/* &amp;&amp; <span class="token operator">\\</span>
  find /usr/share/ca-certificates/mozilla/ -name <span class="token string">&quot;*.crt&quot;</span> -exec keytool -import -trustcacerts <span class="token operator">\\</span>
  -keystore /usr/lib/jvm/java-1.8-openjdk/jre/lib/security/cacerts -storepass changeit -noprompt <span class="token operator">\\</span>
  -file {} -alias {} \\; &amp;&amp; <span class="token operator">\\</span>
  keytool -list -keystore /usr/lib/jvm/java-1.8-openjdk/jre/lib/security/cacerts --storepass changeit</span>

<span class="token instruction"><span class="token keyword">ENV</span> MAVEN_VERSION 3.5.4</span>
<span class="token instruction"><span class="token keyword">ENV</span> MAVEN_HOME /usr/lib/mvn</span>
<span class="token instruction"><span class="token keyword">ENV</span> PATH <span class="token variable">$MAVEN_HOME</span>/bin:<span class="token variable">$PATH</span></span>

<span class="token instruction"><span class="token keyword">RUN</span> wget http://archive.apache.org/dist/maven/maven-3/<span class="token variable">$MAVEN_VERSION</span>/binaries/apache-maven-<span class="token variable">$MAVEN_VERSION</span>-bin.tar.gz &amp;&amp; <span class="token operator">\\</span>
  tar -zxvf apache-maven-<span class="token variable">$MAVEN_VERSION</span>-bin.tar.gz &amp;&amp; <span class="token operator">\\</span>
  rm apache-maven-<span class="token variable">$MAVEN_VERSION</span>-bin.tar.gz &amp;&amp; <span class="token operator">\\</span>
  mv apache-maven-<span class="token variable">$MAVEN_VERSION</span> /usr/lib/mvn</span>

<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /usr/src/app</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /usr/src/app</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>前端镜像</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> nginx:1.19.0-alpine</span>

<span class="token instruction"><span class="token keyword">LABEL</span> maintainer=<span class="token string">&quot;mritd &lt;mritd@linux.com&gt;&quot;</span></span>

<span class="token instruction"><span class="token keyword">ARG</span> TZ=<span class="token string">&#39;Asia/Shanghai&#39;</span></span>
<span class="token instruction"><span class="token keyword">ENV</span> TZ <span class="token variable">\${TZ}</span></span>

<span class="token instruction"><span class="token keyword">RUN</span> apk upgrade --update <span class="token operator">\\</span>
    &amp;&amp; apk add bash tzdata curl wget ca-certificates <span class="token operator">\\</span>
    &amp;&amp; ln -sf /usr/share/zoneinfo/<span class="token variable">\${TZ}</span> /etc/localtime <span class="token operator">\\</span>
    &amp;&amp; echo <span class="token variable">\${TZ}</span> &gt; /etc/timezone <span class="token operator">\\</span>
    &amp;&amp; rm -rf /usr/share/nginx/html /var/cache/apk/*</span>

<span class="token instruction"><span class="token keyword">COPY</span> landscape-animation-experiment /usr/share/nginx/html</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 80 443</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;nginx&quot;</span>, <span class="token string">&quot;-g&quot;</span>, <span class="token string">&quot;daemon off;&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>java镜像</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> java:8u111</span>

<span class="token instruction"><span class="token keyword">ENV</span> JAVA_OPTS <span class="token string">&quot;\\
-Xmx4096m \\
-XX:MetaspaceSize=256m \\
-XX:MaxMetaspaceSize=256m&quot;</span></span>
<span class="token instruction"><span class="token keyword">ENV</span> JAVA_HOME /usr/java/jdk</span>
<span class="token instruction"><span class="token keyword">ENV</span> PATH <span class="token variable">\${PATH}</span>:<span class="token variable">\${JAVA_HOME}</span>/bin</span>

<span class="token instruction"><span class="token keyword">COPY</span> target/myapp.jar myapp.jar</span>

<span class="token instruction"><span class="token keyword">RUN</span> ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span>
<span class="token instruction"><span class="token keyword">RUN</span> echo <span class="token string">&#39;Asia/Shanghai&#39;</span> &gt;/etc/timezone</span>

<span class="token instruction"><span class="token keyword">EXPOSE</span> 9000</span>
<span class="token instruction"><span class="token keyword">CMD</span> java <span class="token variable">\${JAVA_OPTS}</span> -jar myapp.jar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>golang镜像</p><p>多阶段构建</p></li></ul><h5 id="多阶构建" tabindex="-1"><a class="header-anchor" href="#多阶构建" aria-hidden="true">#</a> 多阶构建</h5><p>https://gitee.com/agagin/href-counter.git</p><p>原始构建：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:1.13</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/github.com/alexellis/href-counter/</span>

<span class="token instruction"><span class="token keyword">COPY</span> vendor vendor</span>
<span class="token instruction"><span class="token keyword">COPY</span> app.go .</span>
<span class="token instruction"><span class="token keyword">ENV</span> GOPROXY https://goproxy.cn</span>
<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t href-counter:v1 <span class="token operator">-</span>f Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>多阶构建：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang:1.13 <span class="token keyword">AS</span> builder</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/github.com/alexellis/href-counter/</span>

<span class="token instruction"><span class="token keyword">COPY</span> vendor vendor</span>
<span class="token instruction"><span class="token keyword">COPY</span> app.go	.</span>
<span class="token instruction"><span class="token keyword">ENV</span> GOPROXY https://goproxy.cn</span>

<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .</span>

<span class="token instruction"><span class="token keyword">FROM</span> alpine:3.10</span>
<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add ca-certificates</span>

<span class="token instruction"><span class="token keyword">WORKDIR</span> /root/</span>

<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span>  /go/src/github.com/alexellis/href-counter/app    .</span>

<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;./app&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t href-counter:v2 <span class="token operator">-</span>f Dockerfile<span class="token punctuation">.</span>multi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>原则：</p><ul><li>不必要的内容不要放在镜像中</li><li>减少不必要的层文件</li><li>减少网络传输操作</li><li>可以适当的包含一些调试命令</li></ul><h5 id="通过1号进程理解容器的本质" tabindex="-1"><a class="header-anchor" href="#通过1号进程理解容器的本质" aria-hidden="true">#</a> 通过1号进程理解容器的本质</h5><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti my-nginx-alpine <span class="token operator">/</span>bin/sh
<span class="token comment">#/ ps aux</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>容器启动的时候可以通过命令去覆盖默认的CMD</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker run <span class="token operator">-</span>d <span class="token operator">--</span>name xxx nginx:alpine &lt;自定义命令&gt;
<span class="token comment"># &lt;自定义命令&gt;会覆盖镜像中指定的CMD指令，作为容器的1号进程启动。</span>

$ docker run <span class="token operator">-</span>d <span class="token operator">--</span>name test-3 nginx:alpine <span class="token function">echo</span> 123

$ docker run <span class="token operator">-</span>d <span class="token operator">--</span>name test-4 nginx:alpine ping www<span class="token punctuation">.</span>nohicity<span class="token punctuation">.</span>com

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本质上讲容器是利用namespace和cgroup等技术在宿主机中创建的独立的虚拟空间，这个空间内的网络、进程、挂载等资源都是隔离的。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker exec <span class="token operator">-</span>ti my-nginx <span class="token operator">/</span>bin/sh
<span class="token comment">#/ ip addr</span>
<span class="token comment">#/ ls -l /</span>
<span class="token comment">#/ apt install xxx</span>
<span class="token comment">#/ #安装的软件对宿主机和其他容器没有任何影响，和虚拟机不同的是，容器间共享一个内核，所以容器内没法升级内核</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-django应用容器化实践" tabindex="-1"><a class="header-anchor" href="#_5-django应用容器化实践" aria-hidden="true">#</a> 5 Django应用容器化实践</h3><h4 id="django项目介绍" tabindex="-1"><a class="header-anchor" href="#django项目介绍" aria-hidden="true">#</a> django项目介绍</h4><ul><li><p>项目地址：https://gitee.com/agagin/python-demo.git</p></li><li><p>python3 + django + uwsgi + nginx + mysql</p></li><li><p>内部服务端口8002</p></li></ul><h4 id="容器化django项目" tabindex="-1"><a class="header-anchor" href="#容器化django项目" aria-hidden="true">#</a> 容器化Django项目</h4><p><em>dockerfiles/myblog/Dockerfile</em></p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token comment"># This my first django Dockerfile</span>
<span class="token comment"># Version 1.0</span>

<span class="token comment"># Base images 基础镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> centos:centos7.5.1804</span>

<span class="token comment">#MAINTAINER 维护者信息</span>
<span class="token instruction"><span class="token keyword">LABEL</span> maintainer=<span class="token string">&quot;inspur_lyx@hotmail.com&quot;</span></span>

<span class="token comment">#ENV 设置环境变量</span>
<span class="token instruction"><span class="token keyword">ENV</span> LANG en_US.UTF-8</span>
<span class="token instruction"><span class="token keyword">ENV</span> LC_ALL en_US.UTF-8</span>

<span class="token comment">#RUN 执行以下命令</span>
<span class="token instruction"><span class="token keyword">RUN</span> curl -so /etc/yum.repos.d/Centos-7.repo http://mirrors.aliyun.com/repo/Centos-7.repo &amp;&amp; rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm</span>
<span class="token instruction"><span class="token keyword">RUN</span> yum install -y  python36 python3-devel gcc pcre-devel zlib-devel make net-tools nginx</span>

<span class="token comment">#工作目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /opt/myblog</span>

<span class="token comment">#拷贝文件至工作目录， 宿主机到窗口</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>

<span class="token comment"># 拷贝nginx配置文件</span>
<span class="token instruction"><span class="token keyword">COPY</span> myblog.conf /etc/nginx</span>

<span class="token comment">#安装依赖的插件</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip3 install -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com -r requirements.txt</span>

<span class="token instruction"><span class="token keyword">RUN</span> chmod +x run.sh &amp;&amp; rm -rf ~/.cache/pip</span>

<span class="token comment">#EXPOSE 映射端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 8002</span>

<span class="token comment">#容器启动时执行命令</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;./run.sh&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行构建：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t myblog:v1 <span class="token operator">-</span>f Dockerfile∂
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="运行mysql" tabindex="-1"><a class="header-anchor" href="#运行mysql" aria-hidden="true">#</a> 运行mysql</h4><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker run <span class="token operator">-</span>d <span class="token operator">-</span>p 3306:3306 <span class="token operator">--</span>name mysql  <span class="token operator">-</span>v <span class="token operator">/</span>opt/mysql:<span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>lib/mysql <span class="token operator">-</span>e MYSQL_DATABASE=myblog <span class="token operator">-</span>e MYSQL_ROOT_PASSWORD=123456 mysql:5<span class="token punctuation">.</span>7 <span class="token operator">--</span>character-<span class="token function">set-server</span>=utf8mb4 <span class="token operator">--</span>collation-server=utf8mb4_unicode_ci

<span class="token comment">## 参数传递</span>
<span class="token comment">## 查看数据库</span>
$ docker exec <span class="token operator">-</span>ti mysql bash
<span class="token comment">#/ mysql -uroot -p123456</span>
<span class="token comment">#/ show databases;</span>

<span class="token comment">## navicator连接</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>自建utf-8 mysql</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># mysql 配置文件
[root@centos8 mysql]# cat my.cnf
[mysqld]
user=root
character-set-server=utf8
lower_case_table_names=1

[client]
default-character-set=utf8
[mysql]
default-character-set=utf8

!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/

# Dockerfile
[root@centos8 mysql]# cat Dockerfile
FROM mysql:5.7
COPY my.cnf /etc/mysql/my.cnf
# 构建
docker build . -t mysql:5.7-utf8 -f Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="启动django应用" tabindex="-1"><a class="header-anchor" href="#启动django应用" aria-hidden="true">#</a> 启动Django应用</h4><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 启动容器</span>
$ docker run <span class="token operator">-</span>d <span class="token operator">-</span>p 8002:8002 <span class="token operator">--</span>name myblog <span class="token operator">-</span>e MYSQL_HOST=10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181 <span class="token operator">-</span>e MYSQL_USER=root <span class="token operator">-</span>e MYSQL_PASSWD=123456  myblog:v1 

<span class="token comment">## migrate</span>
$ docker exec <span class="token operator">-</span>ti myblog bash
<span class="token comment">#/ python3 manage.py makemigrations</span>
<span class="token comment">#/ python3 manage.py migrate</span>
<span class="token comment">#/ python3 manage.py createsuperuser</span>

<span class="token comment">## 创建超级用户</span>
$ docker exec <span class="token operator">-</span>ti myblog python3 manage<span class="token punctuation">.</span>py createsuperuser

<span class="token comment">## 收集静态文件</span>
<span class="token comment">## $ docker exec -ti myblog python3 manage.py collectstatic</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问10.0.0.181:8002/admin</p><h3 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h3><p>docker优势：</p><ul><li><p>轻量级的虚拟化</p></li><li><p>容器快速启停</p></li></ul><p>虚拟化核心需要解决的问题：资源隔离与资源限制</p><ul><li>虚拟机硬件虚拟化技术， 通过一个 hypervisor 层实现对资源的彻底隔离。</li><li>容器则是操作系统级别的虚拟化，利用的是内核的 Cgroup 和 Namespace 特性，此功能完全通过软件实现。</li></ul><h4 id="namespace-资源隔离" tabindex="-1"><a class="header-anchor" href="#namespace-资源隔离" aria-hidden="true">#</a> Namespace 资源隔离</h4><p>命名空间是全局资源的一种抽象，将资源放到不同的命名空间中，各个命名空间中的资源是相互隔离的。</p>`,78),U=n("thead",null,[n("tr",null,[n("th",null,[n("strong",null,"分类")]),n("th",null,[n("strong",null,"系统调用参数")]),n("th",null,[n("strong",null,"相关内核版本")])])],-1),Y=n("td",null,"Mount namespaces",-1),G=n("td",null,"CLONE_NEWNS",-1),K={href:"http://lwn.net/2001/0301/a/namespaces.php3",target:"_blank",rel:"noopener noreferrer"},j=n("td",null,"UTS namespaces",-1),V=n("td",null,"CLONE_NEWUTS",-1),F={href:"http://lwn.net/Articles/179345/",target:"_blank",rel:"noopener noreferrer"},Q=n("td",null,"IPC namespaces",-1),B=n("td",null,"CLONE_NEWIPC",-1),W={href:"http://lwn.net/Articles/187274/",target:"_blank",rel:"noopener noreferrer"},H=n("td",null,"PID namespaces",-1),X=n("td",null,"CLONE_NEWPID",-1),z={href:"http://lwn.net/Articles/259217/",target:"_blank",rel:"noopener noreferrer"},Z=n("td",null,"Network namespaces",-1),J=n("td",null,"CLONE_NEWNET",-1),nn={href:"http://lwn.net/Articles/219794/",target:"_blank",rel:"noopener noreferrer"},sn=n("td",null,"User namespaces",-1),an=n("td",null,"CLONE_NEWUSER",-1),en={href:"http://lwn.net/Articles/528078/",target:"_blank",rel:"noopener noreferrer"},ln=i(`<p>我们知道，docker容器对于操作系统来讲其实是一个进程，我们可以通过原始的方式来模拟一下容器实现资源隔离的基本原理：</p><p>linux系统中，通常可以通过<code>clone()</code>实现进程创建的系统调用 ，原型如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>child_func<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>child_stack<span class="token punctuation">,</span> <span class="token keyword">int</span> flags<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>child_func</strong> : 传入子进程运行的程序主函数。</li><li><strong>child_stack</strong> : 传入子进程使用的栈空间。</li><li><strong>flags</strong> : 表示使用哪些 <code>CLONE_*</code> 标志位。</li><li><strong>args</strong> : 用于传入用户参数。</li></ul><p>示例一：实现进程独立的UTS空间</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_GNU_SOURCE</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/mount.h&gt;</span> </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sched.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STACK_SIZE</span> <span class="token expression"><span class="token punctuation">(</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span></span></span>
<span class="token keyword">static</span> <span class="token keyword">char</span> container_stack<span class="token punctuation">[</span>STACK_SIZE<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">char</span><span class="token operator">*</span> <span class="token keyword">const</span> container_args<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">NULL</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">container_main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Container - inside the container!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">sethostname</span><span class="token punctuation">(</span><span class="token string">&quot;container&quot;</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 设置hostname */</span>
  <span class="token function">execv</span><span class="token punctuation">(</span>container_args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> container_args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Something&#39;s wrong!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Parent - start a container!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> container_pid <span class="token operator">=</span> <span class="token function">clone</span><span class="token punctuation">(</span>container_main<span class="token punctuation">,</span> container_stack<span class="token operator">+</span>STACK_SIZE<span class="token punctuation">,</span> CLONE_NEWUTS <span class="token operator">|</span> SIGCHLD <span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">waitpid</span><span class="token punctuation">(</span>container_pid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Parent - container stopped!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行编译并测试：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ gcc <span class="token operator">-</span>o ns_uts ns_uts<span class="token punctuation">.</span>c
$ <span class="token punctuation">.</span><span class="token operator">/</span>ns_uts
$ hostname

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例二：实现容器独立的进程空间</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_GNU_SOURCE</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/mount.h&gt;</span> </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/wait.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sched.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;signal.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">STACK_SIZE</span> <span class="token expression"><span class="token punctuation">(</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span></span></span>
<span class="token keyword">static</span> <span class="token keyword">char</span> container_stack<span class="token punctuation">[</span>STACK_SIZE<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">char</span><span class="token operator">*</span> <span class="token keyword">const</span> container_args<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;/bin/bash&quot;</span><span class="token punctuation">,</span>
  <span class="token constant">NULL</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">container_main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Container [%5d] - inside the container!\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">sethostname</span><span class="token punctuation">(</span><span class="token string">&quot;container&quot;</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">/* 设置hostname */</span>
  <span class="token function">execv</span><span class="token punctuation">(</span>container_args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> container_args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Something&#39;s wrong!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Parent [%5d] - start a container!\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">getpid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">int</span> container_pid <span class="token operator">=</span> <span class="token function">clone</span><span class="token punctuation">(</span>container_main<span class="token punctuation">,</span> container_stack<span class="token operator">+</span>STACK_SIZE<span class="token punctuation">,</span> CLONE_NEWUTS <span class="token operator">|</span> CLONE_NEWPID <span class="token operator">|</span> SIGCHLD <span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">waitpid</span><span class="token punctuation">(</span>container_pid<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Parent - container stopped!\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行编译并测试：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ gcc <span class="token operator">-</span>o ns_pid ns_pid<span class="token punctuation">.</span>c
$ <span class="token punctuation">.</span><span class="token operator">/</span>ns_pid
$ <span class="token function">echo</span> $$

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何确定进程是否属于同一个namespace：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token punctuation">.</span><span class="token operator">/</span>ns_pid
Parent <span class="token punctuation">[</span> 8061<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token function">start</span> a container!
$ pstree <span class="token operator">-</span>p 8061
pid1<span class="token punctuation">(</span>8061<span class="token punctuation">)</span>───bash<span class="token punctuation">(</span>8062<span class="token punctuation">)</span>───pstree<span class="token punctuation">(</span>8816<span class="token punctuation">)</span>
$ <span class="token function">ls</span> <span class="token operator">-</span>l <span class="token operator">/</span>proc/8061/ns
lrwxrwxrwx 1 root root 0 Jun 24 12:51 ipc <span class="token operator">-</span>&gt; ipc:<span class="token punctuation">[</span>4026531839<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 mnt <span class="token operator">-</span>&gt; mnt:<span class="token punctuation">[</span>4026531840<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 net <span class="token operator">-</span>&gt; net:<span class="token punctuation">[</span>4026531968<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 pid <span class="token operator">-</span>&gt; pid:<span class="token punctuation">[</span>4026531836<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 user <span class="token operator">-</span>&gt; user:<span class="token punctuation">[</span>4026531837<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 uts <span class="token operator">-</span>&gt; uts:<span class="token punctuation">[</span>4026531838<span class="token punctuation">]</span>
$ <span class="token function">ls</span> <span class="token operator">-</span>l <span class="token operator">/</span>proc/8062/ns
lrwxrwxrwx 1 root root 0 Jun 24 12:51 ipc <span class="token operator">-</span>&gt; ipc:<span class="token punctuation">[</span>4026531839<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 mnt <span class="token operator">-</span>&gt; mnt:<span class="token punctuation">[</span>4026531840<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 net <span class="token operator">-</span>&gt; net:<span class="token punctuation">[</span>4026531968<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 pid <span class="token operator">-</span>&gt; pid:<span class="token punctuation">[</span>4026534845<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 user <span class="token operator">-</span>&gt; user:<span class="token punctuation">[</span>4026531837<span class="token punctuation">]</span>
lrwxrwxrwx 1 root root 0 Jun 24 12:51 uts <span class="token operator">-</span>&gt; uts:<span class="token punctuation">[</span>4026534844<span class="token punctuation">]</span>

<span class="token comment">## 发现pid和uts是和父进程使用了不同的ns，其他的则是继承了父进程的命名空间</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>综上：通俗来讲，docker在启动一个容器的时候，会调用Linux Kernel Namespace的接口，来创建一块虚拟空间，创建的时候，可以支持设置下面这几种（可以随意选择）,docker默认都设置。</p><ul><li>pid：用于进程隔离（PID：进程ID）</li><li>net：管理网络接口（NET：网络）</li><li>ipc：管理对 IPC 资源的访问（IPC：进程间通信（信号量、消息队列和共享内存））</li><li>mnt：管理文件系统挂载点（MNT：挂载）</li><li>uts：隔离主机名和域名</li><li>user：隔离用户和用户组</li></ul><h4 id="cgroup-资源限制" tabindex="-1"><a class="header-anchor" href="#cgroup-资源限制" aria-hidden="true">#</a> CGroup 资源限制</h4><p>通过namespace可以保证容器之间的隔离，但是无法控制每个容器可以占用多少资源， 如果其中的某一个容器正在执行 CPU 密集型的任务，那么就会影响其他容器中任务的性能与执行效率，导致多个容器相互影响并且抢占资源。如何对多个容器的资源使用进行限制就成了解决进程虚拟资源隔离之后的主要问题。</p><p>![](data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500"></svg>)</p><p>Control Groups（简称 CGroups）</p><blockquote><p>cgroups是Linux内核提供的一种机制，这种机制可以根据需求吧一系列系统任务及其子任务整合(或分隔)到按资源划分等级的不同组中，从而为系统资源管理提供一个统一的框架。</p></blockquote><p>CGroups能够隔离宿主机器上的物理资源，例如 CPU、内存、磁盘 I/O 。每一个 CGroup 都是一组被相同的标准和参数限制的进程。而我们需要做的，其实就是把容器这个进程加入到指定的Cgroup中。深入理解CGroup，请<a href="!%5Bimage-20200323195718300%5D(C:%5CUsers%5Cliyongxin%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20200323195718300.png)">点此</a>。</p><h4 id="unionfs-联合文件系统" tabindex="-1"><a class="header-anchor" href="#unionfs-联合文件系统" aria-hidden="true">#</a> UnionFS 联合文件系统</h4><p>Linux namespace和cgroup分别解决了容器的资源隔离与资源限制，那么容器是很轻量的，通常每台机器中可以运行几十上百个容器， 这些个容器是共用一个image，还是各自将这个image复制了一份，然后各自独立运行呢？ 如果每个容器之间都是全量的文件系统拷贝，那么会导致至少如下问题：</p><ul><li>运行容器的速度会变慢</li><li>容器和镜像对宿主机的磁盘空间的压力</li></ul><p>怎么解决这个问题------Docker的存储驱动</p><ul><li>镜像分层存储</li><li>UnionFS</li></ul><p>Docker 镜像是由一系列的层组成的，每层代表 Dockerfile 中的一条指令，比如下面的 Dockerfile 文件：</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> ubuntu:15.04</span>
<span class="token instruction"><span class="token keyword">COPY</span> . /app</span>
<span class="token instruction"><span class="token keyword">RUN</span> make /app</span>
<span class="token instruction"><span class="token keyword">CMD</span> python /app/app.py</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的 Dockerfile 包含4条命令，其中每一行就创建了一层，下面显示了上述Dockerfile构建出来的镜像运行的容器层的结构：</p><p><img src="`+m+'" alt=""></p><p>镜像就是由这些层一层一层堆叠起来的，镜像中的这些层都是只读的，当我们运行容器的时候，就可以在这些基础层至上添加新的可写层，也就是我们通常说的<code>容器层</code>，对于运行中的容器所做的所有更改（比如写入新文件、修改现有文件、删除文件）都将写入这个容器层。</p><p>对容器层的操作，主要利用了写时复制（CoW）技术。CoW就是copy-on-write，表示只在需要写时才去复制，这个是针对已有文件的修改场景。 CoW技术可以让所有的容器共享image的文件系统，所有数据都从image中读取，只有当要对文件进行写操作时，才从image里把要写的文件复制到自己的文件系统进行修改。所以无论有多少个容器共享同一个image，所做的写操作都是对从image中复制到自己的文件系统中的复本上进行，并不会修改image的源文件，且多个容器操作同一个文件，会在每个容器的文件系统里生成一个复本，每个容器修改的都是自己的复本，相互隔离，相互不影响。使用CoW可以有效的提高磁盘的利用率。</p><p><img src="'+k+'" alt=""></p><p><strong>镜像中每一层的文件都是分散在不同的目录中的，如何把这些不同目录的文件整合到一起呢？</strong></p><p>UnionFS 其实是一种为 Linux 操作系统设计的用于把多个文件系统联合到同一个挂载点的文件系统服务。 它能够将不同文件夹中的层联合（Union）到了同一个文件夹中，整个联合的过程被称为联合挂载（Union Mount）。</p><p><img src="'+b+'" alt=""></p><p>上图是AUFS的实现，AUFS是作为Docker存储驱动的一种实现，Docker 还支持了不同的存储驱动，包括 aufs、devicemapper、overlay2、zfs 和 Btrfs 等等，在最新的 Docker 中，overlay2 取代了 aufs 成为了推荐的存储驱动，但是在没有 overlay2 驱动的机器上仍然会使用 aufs 作为 Docker 的默认驱动。</p><h3 id="docker网络" tabindex="-1"><a class="header-anchor" href="#docker网络" aria-hidden="true">#</a> Docker网络</h3><p>docker容器是一块具有隔离性的虚拟系统，容器内可以有自己独立的网络空间，</p><ul><li>多个容器之间是如何实现通信的呢？</li><li>容器和宿主机之间又是如何实现的通信呢？</li><li>使用-p参数是怎么实现的端口映射?</li></ul><p>带着这些问题，我们来学习一下docker的网络模型，最后我会通过抓包的方式，给大家演示一下数据包在容器和宿主机之间的转换过程。</p><h5 id="网络模式" tabindex="-1"><a class="header-anchor" href="#网络模式" aria-hidden="true">#</a> 网络模式</h5><p>我们在使用docker run创建Docker容器时，可以用--net选项指定容器的网络模式，Docker有以下4种网络模式：</p><ul><li><p>bridge模式，使用--net=bridge指定，默认设置</p></li><li><p>host模式，使用--net=host指定，容器内部网络空间共享宿主机的空间，效果类似直接在宿主机上启动一个进程，端口信息和宿主机共用</p></li><li><p>container模式，使用--net=container:NAME_or_ID指定</p><p>指定容器与特定容器共享网络命名空间</p></li><li><p>none模式，使用--net=none指定</p><p>网络模式为空，即仅保留网络命名空间，但是不做任何网络相关的配置(网卡、IP、路由等)</p></li></ul><h5 id="bridge模式" tabindex="-1"><a class="header-anchor" href="#bridge模式" aria-hidden="true">#</a> bridge模式</h5><p>那我们之前在演示创建docker容器的时候其实是没有指定的网络模式的，如果不指定的话默认就会使用bridge模式，bridge本意是桥的意思，其实就是网桥模式。</p><p>那我们怎么理解网桥，如果需要做类比的话，我们可以把网桥看成一个二层的交换机设备，我们来看下这张图：</p><p>交换机通信简图</p><p><img src="'+g+'" alt=""></p><p>交换机网络通信流程：</p><p><img src="'+h+'" alt=""></p><p>网桥模式示意图</p><p><img src="'+l+`" alt=""></p><p>Linux 中，能够起到<strong>虚拟交换机作用</strong>的网络设备，是网桥（Bridge）。它是一个工作在<strong>数据链路层</strong>（Data Link）的设备，主要功能是<strong>根据 MAC 地址将数据包转发到网桥的不同端口上</strong>。 网桥在哪，查看网桥</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ yum install <span class="token operator">-</span>y bridge-utils
$ brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000<span class="token punctuation">.</span>0242b5fbe57b       no              veth3a496ed

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了网桥之后，那我们看下docker在启动一个容器的时候做了哪些事情才能实现容器间的互联互通</p><p>Docker 创建一个容器的时候，会执行如下操作：</p><ul><li>创建一对虚拟接口/网卡，也就是veth pair；</li><li>veth pair的一端桥接 到默认的 docker0 或指定网桥上，并具有一个唯一的名字，如 vethxxxxxx；</li><li>veth paid的另一端放到新启动的容器内部，并修改名字作为 ens192，这个网卡/接口只在容器的命名空间可见；</li><li>从网桥可用地址段中（也就是与该bridge对应的network）获取一个空闲地址分配给容器的 ens192</li><li>配置容器的默认路由</li></ul><p>那整个过程其实是docker自动帮我们完成的，清理掉所有容器，来验证。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 清掉所有容器</span>
$ docker <span class="token function">rm</span> <span class="token operator">-</span>f \`docker <span class="token function">ps</span> <span class="token operator">-</span>aq\`
$ docker <span class="token function">ps</span>
$ brctl show <span class="token comment"># 查看网桥中的接口，目前没有</span>

<span class="token comment">## 创建测试容器test1</span>
$ docker run <span class="token operator">-</span>d <span class="token operator">--</span>name test1 nginx:alpine
$ brctl show <span class="token comment"># 查看网桥中的接口，已经把test1的veth端接入到网桥中</span>
$ ip a <span class="token punctuation">|</span>grep veth <span class="token comment"># 已在宿主机中可以查看到</span>
$ docker exec <span class="token operator">-</span>ti test1 sh 
<span class="token operator">/</span> <span class="token comment"># ifconfig  # 查看容器的ens192网卡及分配的容器ip</span>

<span class="token comment"># 再来启动一个测试容器，测试容器间的通信</span>
$ docker run <span class="token operator">-</span>d <span class="token operator">--</span>name test2 nginx:alpine
$ docker exec <span class="token operator">-</span>ti test2 sh
<span class="token operator">/</span> <span class="token comment"># sed -i &#39;s/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g&#39; /etc/apk/repositories</span>
<span class="token operator">/</span> <span class="token comment"># apk add curl</span>
<span class="token operator">/</span> <span class="token comment"># curl 172.17.0.8:80</span>

<span class="token comment">## 为啥可以通信？</span>
<span class="token operator">/</span> <span class="token comment"># route -n  # </span>
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         UG    0      0        0 ens192
172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0      0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0         255<span class="token punctuation">.</span>255<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0     U     0      0        0 ens192

<span class="token comment"># ens192 网卡是这个容器里的默认路由设备；所有对 172.17.0.0/16 网段的请求，也会被交给 ens192 来处理（第二条 172.17.0.0 路由规则），这条路由规则的网关（Gateway）是 0.0.0.0，这就意味着这是一条直连规则，即：凡是匹配到这条规则的 IP 包，应该经过本机的 ens192 网卡，通过二层网络(数据链路层)直接发往目的主机。</span>

<span class="token comment"># 而要通过二层网络到达 test1 容器，就需要有 172.17.0.8 这个 IP 地址对应的 MAC 地址。所以test2容器的网络协议栈，就需要通过 ens192 网卡发送一个 ARP 广播，来通过 IP 地址查找对应的 MAC 地址。</span>

<span class="token comment">#这个 ens192 网卡，是一个 Veth Pair，它的一端在这个 test2 容器的 Network Namespace 里，而另一端则位于宿主机上（Host Namespace），并且被“插”在了宿主机的 docker0 网桥上。网桥设备的一个特点是插在桥上的网卡都会被当成桥上的一个端口来处理，而端口的唯一作用就是接收流入的数据包，然后把这些数据包的“生杀大权”（比如转发或者丢弃），全部交给对应的网桥设备处理。</span>

<span class="token comment"># 因此ARP的广播请求也会由docker0来负责转发，这样网桥就维护了一份端口与mac的信息表，因此针对test2的ens192拿到mac地址后发出的各类请求，同样走到docker0网桥中由网桥负责转发到对应的容器中。</span>

<span class="token comment"># 网桥会维护一份mac映射表，我们可以大概通过命令来看一下，</span>
$ brctl showmacs docker0
<span class="token comment">## 这些mac地址是主机端的veth网卡对应的mac，可以查看一下</span>
$ ip a 


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+y+`" alt=""></p><p>我们如何知道网桥上的这些虚拟网卡与容器端是如何对应？</p><p>通过ifindex，网卡索引号</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 查看test1容器的网卡索引</span>
$ docker exec <span class="token operator">-</span>ti test1 <span class="token function">cat</span> <span class="token operator">/</span>sys/<span class="token keyword">class</span><span class="token operator">/</span>net/ens192/ifindex

<span class="token comment">## 主机中找到虚拟网卡后面这个@ifxx的值，如果是同一个值，说明这个虚拟网卡和这个容器的ens192网卡是配对的。</span>
$ ip a <span class="token punctuation">|</span>grep @<span class="token keyword">if</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整理脚本，快速查看对应：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token keyword">for</span> container in $<span class="token punctuation">(</span>docker <span class="token function">ps</span> <span class="token operator">-</span>q<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    iflink=\`docker exec <span class="token operator">-</span>it <span class="token variable">$container</span> sh <span class="token operator">-</span>c <span class="token string">&#39;cat /sys/class/net/ens192/iflink&#39;</span>\`
    iflink=\`<span class="token function">echo</span> <span class="token variable">$iflink</span><span class="token punctuation">|</span>tr <span class="token operator">-</span>d <span class="token string">&#39;\\r&#39;</span>\`
    veth=\`grep <span class="token operator">-</span>l <span class="token variable">$iflink</span> <span class="token operator">/</span>sys/<span class="token keyword">class</span><span class="token operator">/</span>net/veth*<span class="token operator">/</span>ifindex\`
    veth=\`<span class="token function">echo</span> <span class="token variable">$veth</span><span class="token punctuation">|</span>sed <span class="token operator">-</span>e <span class="token string">&#39;s;^.*net/\\(.*\\)/ifindex$;\\1;&#39;</span>\`
    <span class="token function">echo</span> <span class="token variable">$container</span>:<span class="token variable">$veth</span>
done

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面我们讲解了容器之间的通信，那么容器与宿主机的通信是如何做的？</p><p>添加端口映射：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 启动容器的时候通过-p参数添加宿主机端口与容器内部服务端口的映射</span>
$ docker run <span class="token operator">--</span>name test <span class="token operator">-</span>d <span class="token operator">-</span>p 8088:80 nginx:alpine
$ curl localhost:8088

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+l+'" alt=""></p><p>端口映射如何实现的？先来回顾iptables链表图</p><p><img src="'+x+`" alt=""></p><p>访问本机的8088端口，数据包会从流入方向进入本机，因此涉及到PREROUTING和INPUT链，我们是通过做宿主机与容器之间加的端口映射，所以肯定会涉及到端口转换，那哪个表是负责存储端口转换信息的呢，就是nat表，负责维护网络地址转换信息的。因此我们来查看一下PREROUTING链的nat表：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ iptables <span class="token operator">-</span>t nat <span class="token operator">-</span>nvL PREROUTING
Chain PREROUTING <span class="token punctuation">(</span>policy ACCEPT 159 packets<span class="token punctuation">,</span> 20790 bytes<span class="token punctuation">)</span>
 pkts bytes target     prot opt in     out     source               destination
    3   156 DOCKER     all  <span class="token operator">--</span>  <span class="token operator">*</span>      <span class="token operator">*</span>       0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/0            0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/0            ADDRTYPE match dst-<span class="token function">type</span> LOCAL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>规则利用了iptables的addrtype拓展，匹配网络类型为本地的包，如何确定哪些是匹配本地，</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ ip route show table local <span class="token function">type</span> local
127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/8 dev lo proto kernel scope host src 127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1
127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1 dev lo proto kernel scope host src 127<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1
172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1 dev docker0 proto kernel scope host src 172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1
10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181 dev ens192 proto kernel scope host src 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说目标地址类型匹配到这些的，会转发到我们的TARGET中，TARGET是动作，意味着对符合要求的数据包执行什么样的操作，最常见的为ACCEPT或者DROP，此处的TARGET为DOCKER，很明显DOCKER不是标准的动作，那DOCKER是什么呢？我们通常会定义自定义的链，这样把某类对应的规则放在自定义链中，然后把自定义的链绑定到标准的链路中，因此此处DOCKER 是自定义的链。那我们现在就来看一下DOCKER这个自定义链上的规则。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ iptables <span class="token operator">-</span>t nat <span class="token operator">-</span>nvL DOCKER
Chain DOCKER <span class="token punctuation">(</span>2 references<span class="token punctuation">)</span>                                                                                                
 pkts bytes target     prot opt in     out     source               destination                                            
    0     0 <span class="token keyword">RETURN</span>     all  <span class="token operator">--</span>  docker0 <span class="token operator">*</span>       0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/0            0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/0                                             
    0     0 DNAT       tcp  <span class="token operator">--</span>  <span class="token operator">!</span>docker0 <span class="token operator">*</span>       0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/0            0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/0            tcp dpt:8088 to:172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>2:80 


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此条规则就是对主机收到的目的端口为8088的tcp流量进行DNAT转换，将流量发往172.17.0.2:80，172.17.0.2地址是不是就是我们上面创建的Docker容器的ip地址，流量走到网桥上了，后面就走网桥的转发就ok了。 所以，外界只需访问10.0.0.181:8088就可以访问到容器中的服务了。</p><p>数据包在出口方向走POSTROUTING链，我们查看一下规则：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ iptables <span class="token operator">-</span>t nat <span class="token operator">-</span>nvL POSTROUTING
Chain POSTROUTING <span class="token punctuation">(</span>policy ACCEPT 1099 packets<span class="token punctuation">,</span> 67268 bytes<span class="token punctuation">)</span>
 pkts bytes target     prot opt in     out     source               destination
   86  5438 MASQUERADE  all  <span class="token operator">--</span>  <span class="token operator">*</span>      <span class="token operator">!</span>docker0  172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16        0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/0
    0     0 MASQUERADE  tcp  <span class="token operator">--</span>  <span class="token operator">*</span>      <span class="token operator">*</span>       172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>4           172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>4           tcp dpt:80

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大家注意MASQUERADE这个动作是什么意思，其实是一种更灵活的SNAT，把源地址转换成主机的出口ip地址，那解释一下这条规则的意思:</p><p>这条规则会将源地址为172.17.0.0/16的包（也就是从Docker容器产生的包），并且不是从docker0网卡发出的，进行源地址转换，转换成主机网卡的地址。大概的过程就是ACK的包在容器里面发出来，会路由到网桥docker0，网桥根据宿主机的路由规则会转给宿主机网卡ens192，这时候包就从docker0网卡转到ens192网卡了，并从ens192网卡发出去，这时候这条规则就会生效了，把源地址换成了ens192的ip地址。</p><blockquote><p>注意一下，刚才这个过程涉及到了网卡间包的传递，那一定要打开主机的ip_forward转发服务，要不然包转不了，服务肯定访问不到。</p></blockquote><h6 id="抓包演示" tabindex="-1"><a class="header-anchor" href="#抓包演示" aria-hidden="true">#</a> 抓包演示</h6><p>我们先想一下，我们要抓哪个网卡的包</p><ul><li><p>首先访问宿主机的8088端口，我们抓一下宿主机的ens192</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ tcpdump <span class="token operator">-</span>i ens192 port 8088 <span class="token operator">-</span>w host<span class="token punctuation">.</span>cap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>然后最终包会流入容器内，那我们抓一下容器内的ens192网卡</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 容器内安装一下tcpdump</span>
$ sed <span class="token operator">-</span>i <span class="token string">&#39;s/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g&#39;</span> <span class="token operator">/</span>etc/apk/repositories
$ apk add tcpdump
$ tcpdump <span class="token operator">-</span>i ens192 port 80 <span class="token operator">-</span>w container<span class="token punctuation">.</span>cap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>到另一台机器访问一下，</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ curl 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:8088/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>停止抓包，拷贝容器内的包到宿主机</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker <span class="token function">cp</span> test:<span class="token operator">/</span>root/container<span class="token punctuation">.</span>cap <span class="token operator">/</span>root/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>把抓到的内容拷贝到本地，使用wireshark进行分析。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ scp root@10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:<span class="token operator">/</span>root/<span class="token operator">*</span><span class="token punctuation">.</span>cap <span class="token operator">/</span>d/packages
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（wireshark合并包进行分析）</p><p><img src="`+f+'" alt=""></p><p><img src="'+w+`" alt=""></p><p>进到容器内的包做DNAT，出去的包做SNAT，这样对外面来讲，根本就不知道机器内部是谁提供服务，其实这就和一个内网多个机器公用一个外网IP地址上网的效果是一样的，那这也属于NAT功能的一个常见的应用场景。</p><h5 id="host模式" tabindex="-1"><a class="header-anchor" href="#host模式" aria-hidden="true">#</a> Host模式</h5><p>容器内部不会创建网络空间，共享宿主机的网络空间。比如直接通过host模式创建mysql容器：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker run <span class="token operator">--</span>net host <span class="token operator">-</span>d <span class="token operator">--</span>name mysql <span class="token operator">-</span>e MYSQL_ROOT_PASSWORD=123456 mysql:5<span class="token punctuation">.</span>7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>容器启动后，会默认监听3306端口，由于网络模式是host，因为可以直接通过宿主机的3306端口进行访问服务，效果等同于在宿主机中直接启动mysqld的进程。</p><h5 id="conatiner模式" tabindex="-1"><a class="header-anchor" href="#conatiner模式" aria-hidden="true">#</a> Conatiner模式</h5><p>这个模式指定新创建的容器和已经存在的一个容器共享一个 Network Namespace，而不是和宿主机共享。新创建的容器不会创建自己的网卡，配置自己的 IP，而是和一个指定的容器共享 IP、端口范围等。同样，两个容器除了网络方面，其他的如文件系统、进程列表等还是隔离的。两个容器的进程可以通过 lo 网卡设备通信。</p><p><img src="`+P+`" alt=""></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 启动测试容器，共享mysql的网络空间</span>
$ docker run <span class="token operator">-</span>ti <span class="token operator">--</span><span class="token function">rm</span> <span class="token operator">--</span>net=container:mysql busybox sh
<span class="token operator">/</span> <span class="token comment"># ip a</span>
<span class="token operator">/</span> <span class="token comment"># netstat -tlp|grep 3306</span>
<span class="token operator">/</span> <span class="token comment"># telnet localhost 3306</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在一些特殊的场景中非常有用，例如，kubernetes的pod，kubernetes为pod创建一个基础设施容器，同一pod下的其他容器都以container模式共享这个基础设施容器的网络命名空间，相互之间以localhost访问，构成一个统一的整体。</p><h5 id="none模式" tabindex="-1"><a class="header-anchor" href="#none模式" aria-hidden="true">#</a> None模式</h5><p>只会创建对应的网络空间，不会配置网络堆栈（网卡、路由等）。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建none的容器</span>
$ docker run <span class="token operator">-</span>it  <span class="token operator">--</span>name=network-none <span class="token operator">--</span>net=none nginx:alpine sh
<span class="token comment"># ifconfig</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在宿主机中操作：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 创建虚拟网卡对</span>
$ ip link add A <span class="token function">type</span> veth peer name B
<span class="token comment"># A端插入到docker0网桥</span>
$ brctl addif docker0 A
$ ip link <span class="token function">set</span> A up

<span class="token comment"># B端插入到network-none容器中，需要借助ip netns,因此需要显示的创建命名network namespace</span>
$ PID=$<span class="token punctuation">(</span>docker inspect <span class="token operator">-</span>f <span class="token string">&#39;{{.State.Pid}}&#39;</span> network-none<span class="token punctuation">)</span>
$ mkdir <span class="token operator">-</span>p <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>run/netns
$ ln <span class="token operator">-</span>s <span class="token operator">/</span>proc/<span class="token variable">$PID</span><span class="token operator">/</span>ns/net <span class="token operator">/</span><span class="token keyword">var</span><span class="token operator">/</span>run/netns/<span class="token variable">$PID</span>

<span class="token comment"># B端放到容器的命名空间</span>
$ ip link <span class="token function">set</span> B netns <span class="token variable">$PID</span>
$ ip netns exec <span class="token variable">$PID</span> ip link <span class="token function">set</span> dev B name ens192  <span class="token comment"># 修改设备名称为ens192，和docker默认行为一致</span>
$ ip netns exec <span class="token variable">$PID</span> ip link <span class="token function">set</span> ens192 up

<span class="token comment"># 设置ip</span>
$ ip netns exec <span class="token variable">$PID</span> ip addr add 172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>100/16 dev ens192
<span class="token comment"># 添加默认路由，指定给docker0网桥</span>
$ ip netns exec <span class="token variable">$PID</span> ip route add default via 172<span class="token punctuation">.</span>17<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1

<span class="token comment"># 测试容器间通信</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前置知识：</p><ul><li>ip netns 命令用来管理 network namespace。它可以创建命名的 network namespace，然后通过名字来引用 network namespace</li><li>network namespace 在逻辑上是网络堆栈的一个副本，它有自己的路由、防火墙规则和网络设备。 默认情况下，子进程继承其父进程的 network namespace。也就是说，如果不显式创建新的 network namespace，所有进程都从 init 进程继承相同的默认 network namespace。</li><li>根据约定，命名的 network namespace 是可以打开的 <strong>/var/run/netns/</strong> 目录下的一个对象。比如有一个名称为 net1 的 network namespace 对象，则可以由打开 /var/run/netns/net1 对象产生的文件描述符引用 network namespace net1。通过引用该文件描述符，可以修改进程的 network namespace。</li></ul><h3 id="实用技巧" tabindex="-1"><a class="header-anchor" href="#实用技巧" aria-hidden="true">#</a> 实用技巧</h3><ol><li><p>清理主机上所有退出的容器</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ docker <span class="token function">rm</span>  $<span class="token punctuation">(</span>docker <span class="token function">ps</span> <span class="token operator">-</span>aq<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>调试或者排查容器启动错误</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 若有时遇到容器启动失败的情况，可以先使用相同的镜像启动一个临时容器，先进入容器</span>
$ docker run <span class="token operator">--</span><span class="token function">rm</span> <span class="token operator">-</span>ti &lt;image_id&gt; sh
<span class="token comment">## 进入容器后，手动执行该容器对应的ENTRYPOINT或者CMD命令，这样即使出错，容器也不会退出，因为bash作为1号进程，我们只要不退出容器，该容器就不会自动退出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="本章小结" tabindex="-1"><a class="header-anchor" href="#本章小结" aria-hidden="true">#</a> 本章小结</h3><ol><li><p>为了解决软件交付过程中的环境依赖，同时提供一种更加轻量的虚拟化技术，Docker出现了。</p></li><li><p>2013年诞生，15年开始迅速发展，从17.03月开始，使用时间日期管理版本，稳定版以每季度为准。</p></li><li><p>Docker是一种CS架构的软件产品，可以把代码及依赖打包成镜像，作为交付介质，并且把镜像启动成为容器，提供容器生命周期的管理。</p></li><li><p>使用yum部署docker，启动后通过操作docker这个命令行，自动调用docker daemon完成容器相关操作。</p></li><li><p>常用操作，围绕<code>镜像|容器|仓库</code>三大核心要素</p><ul><li>systemctl start|stop|restart docker</li><li>docker build | pull -&gt; docker tag -&gt; docker push</li><li>docker run --name my-demo -d -p 8080:80 -v /opt/data:/data demo:v20200327 ping xx.com</li><li>docker cp /path/a.txt mycontainer:/opt</li><li>docker exec -ti mycontainer /bin/sh</li><li>docker logs -f --tail=100 mycontainer</li></ul></li><li><p>通过dockerfile构建业务镜像，先使用基础镜像，然后通过一系列的指令把我们的业务应用所需要的运行环境和依赖都打包到镜像中，然后通过CMD或者ENTRYPOINT指令把镜像启动时的入口制定好，完成封装即可。有点类似于，先找来一个集装箱模板(基础镜像)，然后把项目依赖的服务都扔到集装箱中，然后设置好服务的启动入口，关闭箱门，即完成了业务镜像的制作。</p></li><li><p>容器的实现依赖于内核模块提供的namespace和control-group的功能，通过namespace创建一块虚拟空间，空间内实现了各类资源(进程、网络、文件系统)的隔离，提供control-group实现了对隔离的空间的资源使用的限制。</p></li><li><p>docker镜像使用分层的方式进行存储，根据主机的存储驱动的不同，实现方式会不同，kernel在3.10.0-514以上自动支持overlay2 存储驱动，也是目前Docker推荐的方式。</p></li><li><p>得益于分层存储的模式，多个容器可以通过copy-on-write的策略，在镜像的最上层加一个可写层，同时利用存储驱动的UnionFS的能力，实现一个镜像快速启动多个容器的场景。</p></li><li><p>docker的网络模式分为4种，最常用的为bridge和host模式。bridge模式通过docker0网桥，启动容器的时候通过创建一对虚拟网卡，将容器连接在桥上，同时维护了虚拟网卡与网桥端口的关系，实现容器间的通信。容器与宿主机之间的通信通过iptables端口映射的方式，docker利用iptables的PREROUTING和POSTROUTING的nat功能，实现了SNAT与DNAT，使得容器内部的服务被完美的保护起来。</p></li><li><p>本章重点内容是docker的核心要素及基础的操作，实现原理以及docker的网络模式为选修包，目的为了帮助有docker基础及经验的同学更好的进一步理解docker。</p></li></ol><h2 id="二、k8s安装" tabindex="-1"><a class="header-anchor" href="#二、k8s安装" aria-hidden="true">#</a> 二、K8S安装</h2>`,119),tn={href:"https://www.bilibili.com/video/BV1Fv4y1v7CE/?t=639.8&vd_source=9004ce053a52d5930f71e230579961e7",target:"_blank",rel:"noopener noreferrer"},pn=i(`<h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h3><ul><li><p>机器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>10.0.0.181 k8s-master
10.0.0.182 k8s-worker1
10.0.0.183 k8s-worker2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分配配置hostname: <code>vi /etc/hostname</code></p><p>添加 hosts： /etc/hosts</p></li><li><p>设置iptables</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>iptables -P FORWARD ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>关闭swap</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>永远关闭swap分区，需要重启操作系统
# cat /etc/fstab
......
# /dev/mapper/centos-swap swap                    swap    defaults        0 0
在上一行中行首添加#
# 临时关闭
swapoff -a  # 禁用swap
free -h # 查看分区
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>SELINUX配置</p></li></ul><blockquote><p>所有主机均需要操作。修改SELinux配置需要重启操作系统。</p><p>setenforce 0 #临时生效，下方命令为永久生效</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ sed <span class="token operator">-</span><span class="token function">ri</span> <span class="token string">&#39;s/SELINUX=enforcing/SELINUX=disabled/&#39;</span> <span class="token operator">/</span>etc/selinux/config
$ setenforce 0 
$ systemctl disable firewalld &amp;&amp; systemctl stop firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>修改内核参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &lt;&lt; EOF &gt; /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
vm.max_map_count=262144
EOF
modprobe br_netfilter
sysctl -p /etc/sysctl.d/k8s.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>设置yum源</p><p>如果网络不通：设置 /etc/resolv.conf 添加/修改：nameserver 10.0.0.1</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget http://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo -O /etc/yum.repos.d/Centos-vault-8.5.2111.repo
wget http://mirrors.aliyun.com/repo/epel-archive-8.repo -O /etc/yum.repos.d/epel-archive-8.repo

wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo

cat &gt; /etc/yum.repos.d/kubernetes.repo  &lt;&lt; EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

yum clean all &amp;&amp; yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装docker</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查看所有可用版本
yum list docker-ce --showduplicates | sort -r 
## 安装最新版本
yum install docker-ce --allowerasing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>修改docker配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p /etc/docker
vi /etc/docker/daemon.json
{
  &quot;registry-mirrors&quot; : [
    &quot;https://registry.cn-hangzhou.aliyuncs.com&quot;
  ],
  &quot;insecure-registries&quot;: [
     &quot;10.0.0.181:5000&quot;
  ]
}
## 如果没有私有镜像，不需要上述insecure-registries节点
## 此私有镜像没有开启https，会出现： http: server gave HTTP response to HTTPS client错误

## 设置开机自启
systemctl enable docker  
systemctl daemon-reload

## 启动docker
systemctl start docker 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="cri-dockerd" tabindex="-1"><a class="header-anchor" href="#cri-dockerd" aria-hidden="true">#</a> cri-dockerd</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 下载OS对应版本 cri-dockerd(centos8.5)
wget https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.1/cri-dockerd-0.3.1-3.el8.x86_64.rpm
# 安装
rpm -ivh cri-dockerd-0.3.1-3.el8.x86_64.rpm
# 修改配置文件\`vi /usr/lib/systemd/system/cri-docker.service\`

\`\`\`
ExecStart=/usr/bin/cri-dockerd --container-runtime-endpoint=unix:///var/run/cri-dockerd.sock --network-plugin=cni --pod-infra-container-image=registry.aliyuncs.com/google_containers/pause:3.9
\`\`\`

# 重新启动

\`\`\`
systemctl daemon-reload
systemctl start cri-docker.service cri-docker.socket
systemctl restart cri-docker
systemctl restart cri-docker.socket
\`\`\`
# 设置开机启动

\`\`\`
systemctl enable cri-docker.service cri-docker.socket
systemctl enable --now cri-docker.service cri-docker.socket
\`\`\`

# 查看启动状态
\`\`\`
systemctl status cri-docker.service cri-docker.socket
\`\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群安装" tabindex="-1"><a class="header-anchor" href="#集群安装" aria-hidden="true">#</a> 集群安装</h3><h4 id="阿里云yum源-各节点执行" tabindex="-1"><a class="header-anchor" href="#阿里云yum源-各节点执行" aria-hidden="true">#</a> 阿里云yum源 （各节点执行）</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/yum.repos.d/kubernetes.repo  &lt;&lt; EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看是否在最新版本k8s: <code>yum list kubeadm.x86_64 --showduplicates | sort -f</code></p><h4 id="安装-各节点执行" tabindex="-1"><a class="header-anchor" href="#安装-各节点执行" aria-hidden="true">#</a> 安装（各节点执行）</h4><p>安装最新版本/指定版本 二选一</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 安装最新版本
yum -y install kubelet kubeadm kubectl
# 安装指定版本
yum -y install kubelet-1.26.X kubeadm-1.26.X kubectl-1.26.X
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置kubelet-各节点执行" tabindex="-1"><a class="header-anchor" href="#配置kubelet-各节点执行" aria-hidden="true">#</a> 配置kubelet（各节点执行）</h4><blockquote><p>为了实现docker使用的cgroupdriver与kubelet使用的cgroup的一致性，建议修改如下文件内容。</p></blockquote><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># vim /etc/sysconfig/kubelet</span>
KUBELET_EXTRA_ARGS=<span class="token string">&quot;--cgroup-driver=systemd&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>设置kubelet为开机自启动即可，由于没有生成配置文件，集群初始化后自动启动
<span class="token comment"># systemctl enable kubelet</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="集群初始化-master节点" tabindex="-1"><a class="header-anchor" href="#集群初始化-master节点" aria-hidden="true">#</a> 集群初始化 (master节点)</h4><ul><li><p>离线环境可以提前准备镜像</p><p>可通过导出镜像、再导入方式初始化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker save -o k8s-1-24-X.tar $images_list
docker load k8s-1-24-X.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>直接初始化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm init --image-repository registry.aliyuncs.com/google_containers --kubernetes-version v1.26.0 --pod-network-cidr=10.224.0.0/16 --apiserver-advertise-address=10.0.0.181  --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-master ~]# kubeadm init --image-repository registry.aliyuncs.com/google_containers --kubernetes-version v1.26.0 --pod-network-cidr=10.224.0.0/16 --apiserver-advertise-address=10.0.0.181  --cri-socket unix:///var/run/cri-dockerd.sock
[init] Using Kubernetes version: v1.26.0
[preflight] Running pre-flight checks
	[WARNING FileExisting-tc]: tc not found in system path
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using &#39;kubeadm config images pull&#39;
[certs] Using certificateDir folder &quot;/etc/kubernetes/pki&quot;
[certs] Generating &quot;ca&quot; certificate and key
[certs] Generating &quot;apiserver&quot; certificate and key
[certs] apiserver serving cert is signed for DNS names [k8s-master kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local] and IPs [10.96.0.1 10.0.0.181]
[certs] Generating &quot;apiserver-kubelet-client&quot; certificate and key
[certs] Generating &quot;front-proxy-ca&quot; certificate and key
[certs] Generating &quot;front-proxy-client&quot; certificate and key
[certs] Generating &quot;etcd/ca&quot; certificate and key
[certs] Generating &quot;etcd/server&quot; certificate and key
[certs] etcd/server serving cert is signed for DNS names [k8s-master localhost] and IPs [10.0.0.181 127.0.0.1 ::1]
[certs] Generating &quot;etcd/peer&quot; certificate and key
[certs] etcd/peer serving cert is signed for DNS names [k8s-master localhost] and IPs [10.0.0.181 127.0.0.1 ::1]
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
[apiclient] All control plane components are healthy after 6.002527 seconds
[upload-config] Storing the configuration used in ConfigMap &quot;kubeadm-config&quot; in the &quot;kube-system&quot; Namespace
[kubelet] Creating a ConfigMap &quot;kubelet-config&quot; in namespace kube-system with the configuration for the kubelets in the cluster
[upload-certs] Skipping phase. Please see --upload-certs
[mark-control-plane] Marking the node k8s-master as control-plane by adding the labels: [node-role.kubernetes.io/control-plane node.kubernetes.io/exclude-from-external-load-balancers]
[mark-control-plane] Marking the node k8s-master as control-plane by adding the taints [node-role.kubernetes.io/control-plane:NoSchedule]
[bootstrap-token] Using token: y21u5e.hpht9dstwkp30old
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

kubeadm join 10.0.0.181:6443 --token y21u5e.hpht9dstwkp30old \\
	--discovery-token-ca-cert-hash sha256:2552ce0002ee5716c6d774077aff5afdb3630fa33186e0d0a070ab1d54ee5765
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm reset --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>下面的命令是配置xxx,用kubectl访问集群的方式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
export KUBECONFIG=/etc/kubernetes/admin.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>检查状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get cs/node/pod
cs: ComponentStatus
node 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>nodes notReady</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-m1:~# kubectl get nodes
NAME          STATUS     ROLES           AGE   VERSION
ubuntk8s-m1   NotReady   control-plane   29m   v1.26.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这里notReady别急，继续安装 POD network flannel，成功后即可</li></ul></li></ul><h3 id="安装pod-network-flannel" tabindex="-1"><a class="header-anchor" href="#安装pod-network-flannel" aria-hidden="true">#</a> 安装POD network flannel</h3><ul><li><p>下载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wget https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

修改network与执行kubeadm init一致，**确认Network是否一直**
net-conf.json: |
    {
      &quot;Network&quot; : &quot;10.224.0.0/16&quot;,
      &quot;Backend&quot;: {
        &quot;Type&quot;: &quot;vxlan&quot;
      }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>启动pod</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl apply -f kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h3 id="节点加入集群" tabindex="-1"><a class="header-anchor" href="#节点加入集群" aria-hidden="true">#</a> 节点加入集群</h3><ul><li><p>获取tocken</p><p>集群安装成功后，日志也有输出，这里重新生成</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm init 成功后输出的 kubeadm join 内容。或者下方master节点执行
root@ubuntk8s-m1:~# kubeadm token create --print-join-command
kubeadm join 10.0.0.181:6443 --token r4o3su.oot4hc5j0sb1gjye --discovery-token-ca-cert-hash sha256:2552ce0002ee5716c6d774077aff5afdb3630fa33186e0d0a070ab1d54ee5765
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>节点执行</p><p>相对上面命令，增加<code>--cri-socket unix:///var/run/cri-dockerd.sock</code>，因为采用cri-dockerd</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubeadm join 10.0.0.181:6443 --token r4o3su.oot4hc5j0sb1gjye --discovery-token-ca-cert-hash sha256:2552ce0002ee5716c6d774077aff5afdb3630fa33186e0d0a070ab1d54ee5765 --cri-socket unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>node1查看节点情况</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@ubuntk8s-n1:~# kubectl get nodes
E0118 14:09:05.366882  234276 memcache.go:238] couldn&#39;t get current server API group list: Get &quot;http://localhost:8080/api?timeout=32s&quot;: dial tcp 127.0.0.1:8080: connect: connection refused
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>因为node1没有kubenetes配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># node1节点执行
mkdir -p $HOME/.kube
# 拷贝master节点 ./kube/config 至node1节点机器  root用户目录下，再授权
sudo chown $(id -u):$(id -g) $HOME/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>节点pod network</p><p>参考：安装POD network flannel 配置</p></li><li><p>启动kubelet</p><ul><li><p>修改cgroup</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat &gt; /etc/default/kubelet &lt;&lt;EOF
KUBELET_EXTRA_ARGS=--cgroup-driver=systemd --fail-swap-on=false
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>重新加载</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl daemon-reload
systemctl start kubelet.service
systemctl enable kubelet.service
systemctl status kubelet.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>查看出错日志<code>journalctl -xefu kubelet</code></p><ul><li>-x --catalog</li><li>-e --pageer-end</li><li>-f --follow</li><li>-u --unit=UNIT</li></ul></li></ul></li></ul><h3 id="状态检查" tabindex="-1"><a class="header-anchor" href="#状态检查" aria-hidden="true">#</a> 状态检查</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-worker1 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get node</span>
NAME          STATUS   ROLES           AGE     VERSION
k8s-master    Ready    control-plane   146m    v1.26.1
k8s-worker1   Ready    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>          7m34s   v1.26.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>如果node节点为notready,则从头到尾检查配置，重新启动、加载服务</p><p>特别注意：<code>cri-docker.service cri-docker.socket</code></p><p>查看服务状态为：<code>systemctl status cri-docker.service cri-docker.socket</code>，不应出现异常 EROR</p><p>否则一一排查</p></li></ul><h3 id="node-角色设置" tabindex="-1"><a class="header-anchor" href="#node-角色设置" aria-hidden="true">#</a> node 角色设置</h3><p><code>kubectl label nodes &lt;节点名称&gt; node-role.kubernetes.io/node=</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@k8s-worker1 ~]# kubectl label nodes k8s-worker1 node-role.kubernetes.io/node1=
node/k8s-worker1 labeled
[root@k8s-worker1 ~]# kubectl get node
NAME          STATUS   ROLES           AGE     VERSION
k8s-master    Ready    control-plane   147m    v1.26.1
k8s-worker1   Ready    node1           8m37s   v1.26.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、基础概念" tabindex="-1"><a class="header-anchor" href="#三、基础概念" aria-hidden="true">#</a> 三、基础概念</h2><h3 id="最小调度单元-pod" tabindex="-1"><a class="header-anchor" href="#最小调度单元-pod" aria-hidden="true">#</a> 最小调度单元 Pod</h3><p>docker调度的是容器，在k8s集群中，最小的调度单元是Pod（豆荚）</p><p><img src="`+S+`" alt=""></p><ul><li><p>为什么引入POD</p><ul><li><p>与容器引擎解耦</p><p>Docker、Rkt。平台设计与引擎的具体的实现解耦</p></li><li><p>多容器共享网络|存储|进程 空间, 支持的业务场景更加灵活</p></li></ul></li></ul><h4 id="新增pod" tabindex="-1"><a class="header-anchor" href="#新增pod" aria-hidden="true">#</a> 新增POD</h4><ul><li><p>myblog/one-pod/pod.yaml</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata:
  name: myblog
  namespace: nohi
  labels:
    component: myblog
spec:
  containers:
  - name: myblog
    image: 10.0.0.181:5000/myblog:v1
    env:
    - name: MYSQL_HOST   #  指定root用户的用户名
      value: &quot;127.0.0.1&quot;
    - name: MYSQL_PASSWD
      value: &quot;123456&quot;
    ports:
    - containerPort: 8002
  - name: mysql
    image: 10.0.0.181:5000/mysql:5.7-utf8
    ports:
    - containerPort: 3306
    env:
    - name: MYSQL_ROOT_PASSWORD
      value: &quot;123456&quot;
    - name: MYSQL_DATABASE
      value: &quot;myblog&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>快速获得资源和版本</p></li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl explain pod
$ kubectl explain Pod<span class="token punctuation">.</span>apiVersion
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>创建和访问Pod</li></ul><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 创建namespace, namespace是逻辑上的资源池</span>
$ kubectl create namespace nohi

<span class="token comment">## 使用指定文件创建Pod</span>
$ kubectl create <span class="token operator">-</span>f pod<span class="token punctuation">.</span>yaml

<span class="token comment">## 查看pod，可以简写po</span>
<span class="token comment">## 所有的操作都需要指定namespace，如果是在default命名空间下，则可以省略</span>
$ kubectl <span class="token operator">-</span>n nohi get pods <span class="token operator">-</span>o wide
NAME     READY   STATUS    RESTARTS   AGE     IP            NODE          NOMINATED NODE   READINESS GATES
myblog   2/2     Running   0          3m17s   10<span class="token punctuation">.</span>224<span class="token punctuation">.</span>1<span class="token punctuation">.</span>10   k8s-worker1   &lt;none&gt;           &lt;none&gt;

<span class="token comment">## 使用Pod Ip访问服务,3306和8002</span>
$ curl 10<span class="token punctuation">.</span>224<span class="token punctuation">.</span>1<span class="token punctuation">.</span>10:8002/blog/index/

<span class="token comment">## 进入容器,执行初始化, 不必到对应的主机执行docker exec</span>
$ kubectl <span class="token operator">-</span>n nohi exec <span class="token operator">-</span>ti myblog <span class="token operator">-</span>c myblog bash
<span class="token operator">/</span> <span class="token comment"># env</span>
<span class="token operator">/</span> <span class="token comment"># python3 manage.py migrate</span>
$ kubectl <span class="token operator">-</span>n nohi exec <span class="token operator">-</span>ti myblog <span class="token operator">-</span>c mysql bash
<span class="token operator">/</span> <span class="token comment"># mysql -p123456</span>

<span class="token comment">## 再次访问服务,3306和8002</span>
$ curl 10<span class="token punctuation">.</span>224<span class="token punctuation">.</span>1<span class="token punctuation">.</span>10:8002/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="更新pod" tabindex="-1"><a class="header-anchor" href="#更新pod" aria-hidden="true">#</a> 更新pod</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl apply -f pod.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="删除pod" tabindex="-1"><a class="header-anchor" href="#删除pod" aria-hidden="true">#</a> 删除pod</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#根据文件删除
$ kubectl delete -f demo-pod.yaml

#根据pod_name删除
$ kubectl -n &lt;namespace&gt; delete pod &lt;pod_name&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="pod数据持久化" tabindex="-1"><a class="header-anchor" href="#pod数据持久化" aria-hidden="true">#</a> POD数据持久化</h4><blockquote><p>volumes</p></blockquote><h4 id="健康检查" tabindex="-1"><a class="header-anchor" href="#健康检查" aria-hidden="true">#</a> 健康检查</h4><ul><li><p>LivenessProbe探针</p><p>存活性探测：用于判断容器是否存活，即Pod是否为running状态，如果LivenessProbe探针探测到容器不健康，则kubelet将kill掉容器，并根据容器的重启策略是否重启，如果一个容器不包含LivenessProbe探针，则Kubelet认为容器的LivenessProbe探针的返回值永远成功。</p></li><li><p>ReadinessProbe探针</p><p>可用性探测：用于判断容器是否正常提供服务，即容器的Ready是否为True，是否可以接收请求，如果ReadinessProbe探测失败，则容器的Ready将为False， Endpoint Controller 控制器将此Pod的Endpoint从对应的service的Endpoint列表中移除，不再将任何请求调度此Pod上，直到下次探测成功。（剔除此pod不参与接收请求不会将流量转发给此Pod）。</p></li></ul><h4 id="重启策略" tabindex="-1"><a class="header-anchor" href="#重启策略" aria-hidden="true">#</a> 重启策略</h4><p>Pod的重启策略（RestartPolicy）应用于Pod内的所有容器，并且仅在Pod所处的Node上由kubelet进行判断和重启操作。当某个容器异常退出或者健康检查失败时，kubelet将根据RestartPolicy的设置来进行相应的操作。 Pod的重启策略包括Always、OnFailure和Never，默认值为Always。</p><ul><li>Always：当容器进程退出后，由kubelet自动重启该容器；</li><li>OnFailure：当容器终止运行且退出码不为0时，由kubelet自动重启该容器；</li><li>Never：不论容器运行状态如何，kubelet都不会重启该容器。</li></ul><h4 id="镜像拉取策略" tabindex="-1"><a class="header-anchor" href="#镜像拉取策略" aria-hidden="true">#</a> 镜像拉取策略</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.0.0.181<span class="token punctuation">:</span>5000/demo/myblog
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置镜像的拉取策略，默认为IfNotPresent</p><ul><li>Always，总是拉取镜像，即使本地有镜像也从仓库拉取</li><li>IfNotPresent ，本地有则使用本地镜像，本地没有则去仓库拉取</li><li>Never，只使用本地镜像，本地没有则报错</li></ul><h4 id="pod资源限制" tabindex="-1"><a class="header-anchor" href="#pod资源限制" aria-hidden="true">#</a> Pod资源限制</h4><p>为了保证充分利用集群资源，且确保重要容器在运行周期内能够分配到足够的资源稳定运行，因此平台需要具备</p><p>Pod的资源限制的能力。 对于一个pod来说，资源最基础的2个的指标就是：CPU和内存。</p><p>Kubernetes提供了个采用requests和limits 两种类型参数对资源进行预分配和使用限制。</p><p>requests(调度分配条件)：</p><ul><li>容器使用的最小资源需求,作用于schedule阶段，作为容器调度时资源分配的判断依赖</li><li>只有当前节点上可分配的资源量 &gt;= request 时才允许将容器调度到该节点</li><li>request参数不限制容器的最大可使用资源</li><li>requests.cpu被转成docker的--cpu-shares参数，与cgroup cpu.shares功能相同 (无论宿主机有多少个cpu或者内核，--cpu-shares选项都会按照比例分配cpu资源）</li><li>requests.memory没有对应的docker参数，仅作为k8s调度依据</li></ul><p>limits(资源占用、使用限制)：</p><ul><li>容器能使用资源的最大值</li><li>设置为0表示对使用的资源不做限制, 可无限的使用</li><li>当pod 内存超过limit时，会被oom</li><li>当cpu超过limit时，不会被kill，但是会限制不超过limit值</li><li>limits.cpu会被转换成docker的–cpu-quota参数。与cgroup cpu.cfs_quota_us功能相同</li><li>limits.memory会被转换成docker的–memory参数。用来限制容器使用的最大内存</li></ul><h4 id="yaml优化" tabindex="-1"><a class="header-anchor" href="#yaml优化" aria-hidden="true">#</a> yaml优化</h4><h5 id="pod-completed-yaml" tabindex="-1"><a class="header-anchor" href="#pod-completed-yaml" aria-hidden="true">#</a> pod-completed.yaml</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata:
  name: myblog
  namespace: nohi
  labels:
    component: myblog
spec:
  volumes: 
  - name: mysql-data
    hostPath: 
      path: /opt/mysql/data
  nodeSelector:   # 使用节点选择器将Pod调度到指定label的节点
    component: mysql
  containers:
  - name: myblog
    image: 10.0.0.181:5000/myblog:v1
    env:
    - name: MYSQL_HOST   #  指定root用户的用户名
      value: &quot;127.0.0.1&quot;
    - name: MYSQL_PASSWD
      value: &quot;123456&quot;
    ports:
    - containerPort: 8002
    resources:
      requests:
        memory: 100Mi
        cpu: 50m
      limits:
        memory: 500Mi
        cpu: 100m
    livenessProbe:
      httpGet:
        path: /blog/index/
        port: 8002
        scheme: HTTP
      initialDelaySeconds: 10  # 容器启动后第一次执行探测是需要等待多少秒
      periodSeconds: 15 	# 执行探测的频率
      timeoutSeconds: 2		# 探测超时时间
    readinessProbe: 
      httpGet: 
        path: /blog/index/
        port: 8002
        scheme: HTTP
      initialDelaySeconds: 10 
      timeoutSeconds: 2
      periodSeconds: 15
  - name: mysql
    image: 10.0.0.181:5000/mysql:5.7-utf8
    ports:
    - containerPort: 3306
    env:
    - name: MYSQL_ROOT_PASSWORD
      value: &quot;123456&quot;
    - name: MYSQL_DATABASE
      value: &quot;myblog&quot;
    resources:
      requests:
        memory: 100Mi
        cpu: 50m
      limits:
        memory: 500Mi
        cpu: 100m
    readinessProbe:
      tcpSocket:
        port: 3306
      initialDelaySeconds: 5
      periodSeconds: 10
    livenessProbe:
      tcpSocket:
        port: 3306
      initialDelaySeconds: 15
      periodSeconds: 20
    volumeMounts:
    - name: mysql-data
      mountPath: /var/lib/mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="为什么要优化" tabindex="-1"><a class="header-anchor" href="#为什么要优化" aria-hidden="true">#</a> 为什么要优化</h5><ul><li>考虑真实的使用场景，像数据库这类中间件，是作为公共资源，为多个项目提供服务，不适合和业务容器绑定在同一个Pod中，因为业务容器是经常变更的，而数据库不需要频繁迭代</li><li>yaml的环境变量中存在敏感信息（账号、密码），存在安全隐患</li></ul><h5 id="解决问题一-需要拆分yaml" tabindex="-1"><a class="header-anchor" href="#解决问题一-需要拆分yaml" aria-hidden="true">#</a> 解决问题一，需要拆分yaml</h5><h5 id="myblog-two-pod-mysql-yaml" tabindex="-1"><a class="header-anchor" href="#myblog-two-pod-mysql-yaml" aria-hidden="true">#</a> <code>myblog/two-pod/mysql.yaml</code></h5><p><strong>注意修改IP</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 为节点打标签,否则  nodeSelector.component 指定的mysql就无法调度
$ kubectl label node k8s-worker1 component=mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>	<span class="token comment"># 声明pod的网络模式为host模式，效果同docker run --net=host</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>   <span class="token comment"># 使用节点选择器将Pod调度到指定label的节点</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.0.0.181<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span>5.7<span class="token punctuation">-</span>utf8
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;myblog&quot;</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
      <span class="token key atrule">limits</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
    <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="myblog-yaml" tabindex="-1"><a class="header-anchor" href="#myblog-yaml" aria-hidden="true">#</a> myblog.yaml</h5><p>mysql ip 对应上面的node节点ip</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.0.0.181<span class="token punctuation">:</span>5000/myblog<span class="token punctuation">:</span>v1
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST   <span class="token comment">#  指定root用户的用户名</span>
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;10.0.0.182&quot;</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;123456&quot;</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
      <span class="token key atrule">limits</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>  <span class="token comment"># 容器启动后第一次执行探测是需要等待多少秒</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span> 	<span class="token comment"># 执行探测的频率</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>		<span class="token comment"># 探测超时时间</span>
    <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span> 
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span> 
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> 
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>如果数据未持久化，需要重建表、初始化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ docker exec -ti myblog bash
#/ python3 manage.py makemigrations
#/ python3 manage.py migrate
#/ python3 manage.py createsuperuser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h5 id="创建测试" tabindex="-1"><a class="header-anchor" href="#创建测试" aria-hidden="true">#</a> 创建测试</h5><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 先删除旧pod</span>
$ kubectl <span class="token operator">-</span>n nohi delete po myblog

<span class="token comment">## 分别创建mysql和myblog</span>
$ kubectl create <span class="token operator">-</span>f mysql<span class="token punctuation">.</span>yaml
$ kubectl create <span class="token operator">-</span>f myblog<span class="token punctuation">.</span>yaml

<span class="token comment">## 查看pod，注意mysqlIP为宿主机IP，因为网络模式为host</span>
$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>o wide 
NAME     READY   STATUS    RESTARTS   AGE   IP                NODE
myblog   1/1     Running   0          41s   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>152      k8s-worder1
mysql    1/1     Running   0          52s   10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182   k8s-worder1

<span class="token comment">## 访问myblog服务正常</span>
$ curl 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>152:8002/blog/index/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="解决问题二-环境变量中敏感信息带来的安全隐患" tabindex="-1"><a class="header-anchor" href="#解决问题二-环境变量中敏感信息带来的安全隐患" aria-hidden="true">#</a> 解决问题二，环境变量中敏感信息带来的安全隐患</h5><h6 id="为什么要统一管理环境变量" tabindex="-1"><a class="header-anchor" href="#为什么要统一管理环境变量" aria-hidden="true">#</a> 为什么要统一管理环境变量</h6><ul><li>环境变量中有很多敏感的信息，比如账号密码，直接暴漏在yaml文件中存在安全性问题</li><li>团队内部一般存在多个项目，这些项目直接存在配置相同环境变量的情况，因此可以统一维护管理</li><li>对于开发、测试、生产环境，由于配置均不同，每套环境部署的时候都要修改yaml，带来额外的开销</li></ul><p>k8s提供两类资源，configMap和Secret，可以用来实现业务配置的统一管理， 允许将配置文件与镜像文件分离，以使容器化的应用程序具有可移植性 。</p><p><img src="`+q+`" alt=""></p><h6 id="configmap" tabindex="-1"><a class="header-anchor" href="#configmap" aria-hidden="true">#</a> configMap</h6><p>通常用来管理应用的配置文件或者环境变量，<code>myblog/two-pod/configmap.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">&quot;10.0.0.182&quot;</span>
  <span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">&quot;3306&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建并查看configMap：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f configmap<span class="token punctuation">.</span>yaml
$ kubectl <span class="token operator">-</span>n nohi get cm myblog <span class="token operator">-</span>oyaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>或者可以使用命令的方式，从文件中创建，比如：</li></ul><p>​ configmap.txt</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ cat configmap.txt
MYSQL_HOST=10.0.0.182
MYSQL_PORT=3306
$ kubectl create configmap myblog --from-env-file=configmap.txt -n nohi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="secret" tabindex="-1"><a class="header-anchor" href="#secret" aria-hidden="true">#</a> Secret</h6><p>Secret，管理敏感类的信息，默认会base64编码存储，有三种类型</p><ul><li>Service Account ：用来访问Kubernetes API，由Kubernetes自动创建，并且会自动挂载到Pod的/run/secrets/kubernetes.io/serviceaccount目录中；创建ServiceAccount后，Pod中指定serviceAccount后，自动创建该ServiceAccount对应的secret；</li><li>Opaque ： base64编码格式的Secret，用来存储密码、密钥等；</li><li>kubernetes.io/dockerconfigjson ：用来存储私有docker registry的认证信息。</li></ul><p><code>myblog/two-pod/secret.yaml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>apiVersion: v1
kind: Secret
metadata:
  name: myblog
  namespace: nohi
type: Opaque
data:
  MYSQL_USER: cm9vdA==		#注意加-n参数， echo -n root|base64
  MYSQL_PASSWD: MTIzNDU2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建并查看：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f secret<span class="token punctuation">.</span>yaml
$ kubectl <span class="token operator">-</span>n nohi get secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不习惯这种方式，可以通过如下方式：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ <span class="token function">cat</span> secret<span class="token punctuation">.</span>txt
MYSQL_USER=root
MYSQL_PASSWD=123456
$ kubectl <span class="token operator">-</span>n nohi create secret generic myblog <span class="token operator">--</span><span class="token keyword">from</span><span class="token operator">-</span>env-file=secret<span class="token punctuation">.</span>txt 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改后的mysql的yaml，资源路径：<code>myblog/two-pod/mysql-with-config.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.0.0.181<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span>5.7<span class="token punctuation">-</span>utf8
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
          <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
          <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
      <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;myblog&quot;</span>
<span class="token punctuation">...</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整体修改后的myblog的yaml，资源路径：<code>myblog/two-pod/myblog-with-config.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> myblog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
    <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.0.0.181<span class="token punctuation">:</span>5000/myblog<span class="token punctuation">:</span>v1
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
          <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_HOST
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PORT
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
          <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PORT
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
          <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
          <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
      <span class="token key atrule">limits</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>  <span class="token comment"># 容器启动后第一次执行探测是需要等待多少秒</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span> 	<span class="token comment"># 执行探测的频率</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>		<span class="token comment"># 探测超时时间</span>
    <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span> 
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span> 
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> 
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在部署不同的环境时，pod的yaml无须再变化，只需要在每套环境中维护一套ConfigMap和Secret即可。但是注意configmap和secret不能跨namespace使用，且更新后，pod内的env不会自动更新，重建后方可更新。</p><h4 id="如何编写资源yaml" tabindex="-1"><a class="header-anchor" href="#如何编写资源yaml" aria-hidden="true">#</a> 如何编写资源yaml</h4><ol><li><p>拿来主义，从机器中已有的资源中拿</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-system get po<span class="token punctuation">,</span>deployment<span class="token punctuation">,</span>ds
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>学会在官网查找， https://kubernetes.io/docs/home/</p></li><li><p>从kubernetes-api文档中查找， https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16/#pod-v1-core</p></li><li><p>kubectl explain 查看具体字段含义</p></li></ol><h4 id="pod状态与生命周期" tabindex="-1"><a class="header-anchor" href="#pod状态与生命周期" aria-hidden="true">#</a> pod状态与生命周期</h4><p>Pod的状态如下表所示：</p><table><thead><tr><th>状态值</th><th>描述</th></tr></thead><tbody><tr><td>Pending</td><td>API Server已经创建该Pod，等待调度器调度</td></tr><tr><td>ContainerCreating</td><td>拉取镜像启动容器中</td></tr><tr><td>Running</td><td>Pod内容器均已创建，且至少有一个容器处于运行状态、正在启动状态或正在重启状态</td></tr><tr><td>Succeeded|Completed</td><td>Pod内所有容器均已成功执行退出，且不再重启</td></tr><tr><td>Failed|Error</td><td>Pod内所有容器均已退出，但至少有一个容器退出为失败状态</td></tr><tr><td>CrashLoopBackOff</td><td>Pod内有容器启动失败，比如配置文件丢失导致主进程启动失败</td></tr><tr><td>Unknown</td><td>由于某种原因无法获取该Pod的状态，可能由于网络通信不畅导致</td></tr></tbody></table><p>生命周期示意图：</p><p><img src="`+_+'" alt=""></p><p>启动和关闭示意：</p><p><img src="'+E+`" alt=""></p><p>初始化容器：</p><ul><li>验证业务应用依赖的组件是否均已启动</li><li>修改目录的权限</li><li>调整系统参数</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">...</span>
      <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">command</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> /sbin/sysctl
        <span class="token punctuation">-</span> <span class="token punctuation">-</span>w
        <span class="token punctuation">-</span> vm.max_map_count=262144
        <span class="token key atrule">image</span><span class="token punctuation">:</span> alpine<span class="token punctuation">:</span><span class="token number">3.6</span>
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">name</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">-</span>logging<span class="token punctuation">-</span>init
        <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
          <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> fix<span class="token punctuation">-</span>permissions
        <span class="token key atrule">image</span><span class="token punctuation">:</span> alpine<span class="token punctuation">:</span><span class="token number">3.6</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;sh&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;chown -R 1000:1000 /usr/share/elasticsearch/data&quot;</span><span class="token punctuation">]</span>
        <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
          <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">-</span>logging
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/elasticsearch/data
<span class="token punctuation">...</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证Pod生命周期：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>start<span class="token punctuation">-</span>stop
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">component</span><span class="token punctuation">:</span> demo<span class="token punctuation">-</span>start<span class="token punctuation">-</span>stop
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> init
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo $(date +%s): INIT &gt;&gt; /loap/timing&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /loap
      <span class="token key atrule">name</span><span class="token punctuation">:</span> timing
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> main
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> &#39;echo $(date +%s)<span class="token punctuation">:</span> START <span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span> /loap/timing;
<span class="token key atrule">sleep 10; echo $(date +%s)</span><span class="token punctuation">:</span> END <span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span> /loap/timing;&#39;<span class="token punctuation">]</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /loap 
      <span class="token key atrule">name</span><span class="token punctuation">:</span> timing
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo $(date +%s): LIVENESS &gt;&gt; /loap/timing&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo $(date +%s): READINESS &gt;&gt; /loap/timing&#39;</span><span class="token punctuation">]</span>
    <span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
      <span class="token key atrule">postStart</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo $(date +%s): POST-START &gt;&gt; /loap/timing&#39;</span><span class="token punctuation">]</span>
      <span class="token key atrule">preStop</span><span class="token punctuation">:</span>
        <span class="token key atrule">exec</span><span class="token punctuation">:</span>
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;sh&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;-c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;echo $(date +%s): PRE-STOP &gt;&gt; /loap/timing&#39;</span><span class="token punctuation">]</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> timing
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span>
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /tmp/loap


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建pod测试：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f demo-pod-<span class="token function">start</span><span class="token punctuation">.</span>yaml

<span class="token comment">## 查看demo状态</span>
$ kubectl <span class="token operator">-</span>n nohi get po <span class="token operator">-</span>o wide <span class="token operator">-</span>w

<span class="token comment">## 查看调度节点的/tmp/loap/timing</span>
$ <span class="token function">cat</span> <span class="token operator">/</span>tmp/loap/timing
1585424708: INIT
1585424746: <span class="token function">START</span>
1585424746: POST-<span class="token function">START</span>
1585424754: READINESS
1585424756: LIVENESS
1585424756: <span class="token keyword">END</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>须主动杀掉 Pod 才会触发 <code>pre-stop hook</code>，如果是 Pod 自己 Down 掉，则不会执行 <code>pre-stop hook</code></p></blockquote><h4 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h4><ol><li>实现k8s平台与特定的容器运行时解耦，提供更加灵活的业务部署方式，引入了Pod概念</li><li>k8s使用yaml格式定义资源文件，yaml中Map与List的语法，与json做类比</li><li>通过kubectl create | get | exec | logs | delete 等操作k8s资源，必须指定namespace</li><li>每启动一个Pod，为了实现网络空间共享，会先创建Infra容器，并把其他容器网络加入该容器</li><li>通过livenessProbe和readinessProbe实现Pod的存活性和就绪健康检查</li><li>通过requests和limit分别限定容器初始资源申请与最高上限资源申请</li><li>Pod通过initContainer和lifecycle分别来执行初始化、pod启动和删除时候的操作，使得功能更加全面和灵活</li><li>编写yaml讲究方法，学习k8s，养成从官方网站查询知识的习惯</li></ol><p>做了哪些工作：</p><ol><li>定义Pod.yaml，将myblog和mysql打包在同一个Pod中，使用myblog使用localhost访问mysql</li><li>mysql数据持久化，为myblog业务应用添加了健康检查和资源限制</li><li>将myblog与mysql拆分，使用独立的Pod管理</li><li>yaml文件中的环境变量存在账号密码明文等敏感信息，使用configMap和Secret来统一配置，优化部署</li></ol><p>只使用Pod, 面临的问题:</p><ol><li>业务应用启动多个副本</li><li>Pod重建后IP会变化，外部如何访问Pod服务</li><li>运行业务Pod的某个节点挂了，可以自动帮我把Pod转移到集群中的可用节点启动起来</li><li>我的业务应用功能是收集节点监控数据,需要把Pod运行在k8集群的各个节点上</li></ol><h3 id="pod控制器" tabindex="-1"><a class="header-anchor" href="#pod控制器" aria-hidden="true">#</a> POD控制器</h3><h4 id="workload-工作负载" tabindex="-1"><a class="header-anchor" href="#workload-工作负载" aria-hidden="true">#</a> Workload (工作负载)</h4><p>控制器又称工作负载是用于实现管理pod的中间层，确保pod资源符合预期的状态，pod的资源出现故障时，会尝试 进行重启，当根据重启策略无效，则会重新新建pod的资源。</p><p><img src="`+R+`" alt=""></p><ul><li>ReplicaSet: 代用户创建指定数量的pod副本数量，确保pod副本数量符合预期状态，并且支持滚动式自动扩容和缩容功能</li><li>Deployment：工作在ReplicaSet之上，用于管理无状态应用，目前来说最好的控制器。支持滚动更新和回滚功能，提供声明式配置</li><li>DaemonSet：用于确保集群中的每一个节点只运行特定的pod副本，通常用于实现系统级后台任务。比如EFK服务</li><li>Job：只要完成就立即退出，不需要重启或重建</li><li>Cronjob：周期性任务控制，不需要持续后台运行</li><li>StatefulSet：管理有状态应用</li></ul><h4 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h4><p><code>myblog/deployment/deploy-mysql.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>	<span class="token comment">#指定Pod副本数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>		<span class="token comment">#指定Pod的选择器</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>	<span class="token comment">#给Pod打label</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>   <span class="token comment"># 使用节点选择器将Pod调度到指定label的节点</span>
        <span class="token key atrule">component</span><span class="token punctuation">:</span> mysql
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
        <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.0.0.181<span class="token punctuation">:</span>5000/mysql<span class="token punctuation">:</span>5.7<span class="token punctuation">-</span>utf8
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
              <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_ROOT_PASSWORD
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
              <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_DATABASE
          <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;myblog&quot;</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
        <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /var/lib/mysql

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>deploy-myblog.yaml:</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>	<span class="token comment">#指定Pod副本数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>		<span class="token comment">#指定Pod的选择器</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>	<span class="token comment">#给Pod打label</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
        <span class="token key atrule">image</span><span class="token punctuation">:</span> 10.0.0.181<span class="token punctuation">:</span>5000/myblog<span class="token punctuation">:</span>v1
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_HOST
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
              <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_HOST
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PORT
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
              <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PORT
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_USER
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
              <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_USER
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> MYSQL_PASSWD
          <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
            <span class="token key atrule">secretKeyRef</span><span class="token punctuation">:</span>
              <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
              <span class="token key atrule">key</span><span class="token punctuation">:</span> MYSQL_PASSWD
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 50m
          <span class="token key atrule">limits</span><span class="token punctuation">:</span>
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 500Mi
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
        <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
            <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>  <span class="token comment"># 容器启动后第一次执行探测是需要等待多少秒</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span> 	<span class="token comment"># 执行探测的频率</span>
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>		<span class="token comment"># 探测超时时间</span>
        <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span> 
          <span class="token key atrule">httpGet</span><span class="token punctuation">:</span> 
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /blog/index/
            <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8002</span>
            <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
          <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">10</span> 
          <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
          <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">15</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="创建deployment" tabindex="-1"><a class="header-anchor" href="#创建deployment" aria-hidden="true">#</a> 创建Deployment</h5><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f deploy<span class="token punctuation">.</span>yaml


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="查看deployment" tabindex="-1"><a class="header-anchor" href="#查看deployment" aria-hidden="true">#</a> 查看Deployment</h5><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># kubectl api-resources</span>
$ kubectl <span class="token operator">-</span>n nohi get deploy
NAME     READY   UP-TO-DATE   AVAILABLE   AGE
myblog   1/1     1            1           2m22s
mysql    1/1     1            1           2d11h

  <span class="token operator">*</span> \`NAME\` 列出了集群中 Deployments 的名称。
  <span class="token operator">*</span> \`READY\`显示当前正在运行的副本数<span class="token operator">/</span>期望的副本数。
  <span class="token operator">*</span> \`UP-TO-DATE\`显示已更新以实现期望状态的副本数。
  <span class="token operator">*</span> \`AVAILABLE\`显示应用程序可供用户使用的副本数。
  <span class="token operator">*</span> \`AGE\` 显示应用程序运行的时间量。

<span class="token comment"># 查看pod</span>
$ kubectl <span class="token operator">-</span>n nohi get po
NAME                      READY   STATUS    RESTARTS   AGE
myblog-7c96c9f76b-qbbg7   1/1     Running   0          109s
mysql-85f4f65f99-w6jkj    1/1     Running   0          2m28s

<span class="token comment"># 查看replicaSet</span>
$ kubectl <span class="token operator">-</span>n nohi get rs

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="副本保障机制" tabindex="-1"><a class="header-anchor" href="#副本保障机制" aria-hidden="true">#</a> 副本保障机制</h5><p>controller实时检测pod状态，并保障副本数一直处于期望的值。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 删除pod，观察pod状态变化</span>
$ kubectl <span class="token operator">-</span>n nohi delete pod myblog-7c96c9f76b-qbbg7

<span class="token comment"># 观察pod</span>
$ kubectl get pods <span class="token operator">-</span>o wide

<span class="token comment">## 设置两个副本, 或者通过kubectl -n nohi edit deploy myblog的方式，最好通过修改文件，然后apply的方式，这样yaml文件可以保持同步</span>
$ kubectl <span class="token operator">-</span>n nohi scale deploy myblog <span class="token operator">--</span>replicas=2
deployment<span class="token punctuation">.</span>extensions/myblog scaled

<span class="token comment"># 观察pod</span>
$ kubectl get pods <span class="token operator">-</span>o wide
NAME                      READY   STATUS    RESTARTS   AGE
myblog-7c96c9f76b-qbbg7   1/1     Running   0          11m
myblog-7c96c9f76b-s6brm   1/1     Running   0          55s
mysql-85f4f65f99-w6jkj    1/1     Running   0          11m


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="pod驱逐策略" tabindex="-1"><a class="header-anchor" href="#pod驱逐策略" aria-hidden="true">#</a> Pod驱逐策略</h5><p>K8S 有个特色功能叫 pod eviction，它在某些场景下如节点 NotReady，或者资源不足时，把 pod 驱逐至其它节点，这也是出于业务保护的角度去考虑的。</p><ol><li>Kube-controller-manager: 周期性检查所有节点状态，当节点处于 NotReady 状态超过一段时间后，驱逐该节点上所有 pod。</li></ol>`,152),on=n("p",null,[n("code",null,"pod-eviction-timeout"),s("：NotReady 状态节点超过该时间后，执行驱逐，默认 5 min，适用于k8s 1.13版本之前")],-1),cn=n("code",null," TaintBasedEvictions 与TaintNodesByCondition",-1),rn={href:"https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",target:"_blank",rel:"noopener noreferrer"},dn=i(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>  <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoExecute
    <span class="token key atrule">key</span><span class="token punctuation">:</span> node.kubernetes.io/not<span class="token punctuation">-</span>ready
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
    <span class="token key atrule">tolerationSeconds</span><span class="token punctuation">:</span> <span class="token number">300</span>
  <span class="token punctuation">-</span> <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoExecute
    <span class="token key atrule">key</span><span class="token punctuation">:</span> node.kubernetes.io/unreachable
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> Exists
    <span class="token key atrule">tolerationSeconds</span><span class="token punctuation">:</span> <span class="token number">300</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即各pod可以独立设置驱逐容忍时间。</p>`,2),un=i(`<ol start="2"><li>Kubelet: 周期性检查本节点资源，当资源不足时，按照优先级驱逐部分 pod <ul><li><code>memory.available</code>：节点可用内存</li><li><code>nodefs.available</code>：节点根盘可用存储空间</li><li><code>nodefs.inodesFree</code>：节点inodes可用数量</li><li><code>imagefs.available</code>：镜像存储盘的可用空间</li><li><code>imagefs.inodesFree</code>：镜像存储盘的inodes可用数量</li></ul></li></ol><h5 id="服务更新" tabindex="-1"><a class="header-anchor" href="#服务更新" aria-hidden="true">#</a> 服务更新</h5><p>修改服务，重新打tag模拟服务更新。</p><p>更新方式：</p><ol><li><p>修改yaml文件，使用<code>kubectl apply -f deploy-myblog.yaml</code>来应用更新</p></li><li><p><code>kubectl -n nohi edit deploy myblog</code>在线更新</p></li><li><p><code>kubectl -n nohi set image deploy myblog myblog=10.0.0.181:5000/myblog:v2 --record</code></p></li></ol><p>修改文件测试：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ vi mybolg/blog/template/index<span class="token punctuation">.</span>html
<span class="token comment">## 随便编辑内容，页面显示 V2 或者其他可以区分之前版本的内容</span>
$ docker build <span class="token punctuation">.</span> <span class="token operator">-</span>t 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/myblog:v2 <span class="token operator">-</span>f Dockerfile
$ docker push 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/myblog:v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="更新策略" tabindex="-1"><a class="header-anchor" href="#更新策略" aria-hidden="true">#</a> 更新策略</h5><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>$ kubectl get deploy myblog <span class="token punctuation">-</span>n nohi <span class="token punctuation">-</span>oyaml <span class="token punctuation">|</span> grep <span class="token punctuation">-</span>n5 strategy
<span class="token punctuation">...</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>	<span class="token comment">#指定Pod副本数</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>		<span class="token comment">#指定Pod的选择器</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> <span class="token number">1</span>
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 25%
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate		<span class="token comment">#指定更新方式为滚动更新，默认策略，通过get deploy yaml查看</span>
    <span class="token punctuation">...</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+N+`" alt=""></p><p>策略控制：</p><ul><li>maxSurge：最大激增数, 指更新过程中, 最多可以比replicas预先设定值多出的pod数量, 可以为固定值或百分比,默认为desired Pods数的25%。计算时向上取整(比如3.4，取4)，更新过程中最多会有replicas + maxSurge个pod</li><li>maxUnavailable： 指更新过程中, 最多有几个pod处于无法服务状态 , 可以为固定值或百分比，默认为desired Pods数的25%。计算时向下取整(比如3.6，取3)</li></ul><p><em>在Deployment rollout时，需要保证Available(Ready) Pods数不低于 desired pods number - maxUnavailable; 保证所有的非异常状态Pods数不多于 desired pods number + maxSurge</em>。</p><p>replicas=3</p><p>running状态pod最大不超过3+1=4个，</p><p>running状态的Pod数不低于3-0=3个</p><ol><li>先新增一个v2版本的pod，目前3个v1版本+1个v2版本，共4个pod</li><li>删掉一个v1版本的pod，目前2个v1版本+1个v2版本，共3个pod</li><li>先新增一个v2版本的pod，目前2个v1版本+2个v2版本，共4个pod</li><li>删掉一个v1版本的pod，目前1个v1版本+2个v2版本，共3个pod</li><li>先新增一个v2版本的pod，目前1个v1版本+3个v2版本，共4个pod</li><li>删掉一个v1版本的pod，目前0个v1版本+3个v2版本，共3个pod</li></ol><p>以myblog为例，使用默认的策略，更新过程:</p><ol><li>maxSurge 25%，2个实例，向上取整，则maxSurge为1，意味着最多可以有2+1=3个Pod，那么此时会新创建1个ReplicaSet，RS-new，把副本数置为1，此时呢，副本控制器就去创建这个新的Pod</li><li>同时，maxUnavailable是25%，副本数2*25%，向下取整，则为0，意味着，滚动更新的过程中，不能有少于2个可用的Pod，因此，旧的Replica（RS-old）会先保持不动，等RS-new管理的Pod状态Ready后，此时已经有3个Ready状态的Pod了，那么由于只要保证有2个可用的Pod即可，因此，RS-old的副本数会有2个变成1个，此时，会删掉一个旧的Pod</li><li>删掉旧的Pod的时候，由于总的Pod数量又变成2个了，因此，距离最大的3个还有1个Pod可以创建，所以，RS-new把管理的副本数由1改成2，此时又会创建1个新的Pod，等RS-new管理了2个Pod都ready后，那么就可以把RS-old的副本数由1置为0了，这样就完成了滚动更新</li></ol><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#查看滚动更新事件</span>
$ kubectl <span class="token operator">-</span>n nohi describe deploy myblog
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
Events:
  <span class="token function">Type</span>    Reason             Age   <span class="token keyword">From</span>                   Message
  <span class="token operator">--</span><span class="token operator">--</span>    <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>             <span class="token operator">--</span><span class="token operator">--</span>  <span class="token operator">--</span><span class="token operator">--</span>                   <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
  Normal  ScalingReplicaSet  11s   deployment-controller  Scaled up replica <span class="token function">set</span> myblog-6cf56fc848 to 1
  Normal  ScalingReplicaSet  11s   deployment-controller  Scaled down replica <span class="token function">set</span> myblog-6fdcf98f9 to 1
  Normal  ScalingReplicaSet  11s   deployment-controller  Scaled up replica <span class="token function">set</span> myblog-6cf56fc848 to 2
  Normal  ScalingReplicaSet  6s    deployment-controller  Scaled down replica <span class="token function">set</span> myblog-6fdcf98f9 to 0
$ kubectl get rs
NAME                     DESIRED   CURRENT   READY   AGE
myblog-6cf56fc848   2         2         2       16h
myblog-6fdcf98f9    0         0         0       16h


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="服务回滚" tabindex="-1"><a class="header-anchor" href="#服务回滚" aria-hidden="true">#</a> 服务回滚</h5><p>通过滚动升级的策略可以平滑的升级Deployment，若升级出现问题，需要最快且最好的方式回退到上一次能够提供正常工作的版本。为此K8S提供了回滚机制。</p><p><strong>revision</strong>：更新应用时，K8S都会记录当前的版本号，即为revision，当升级出现问题时，可通过回滚到某个特定的revision，默认配置下，K8S只会保留最近的几个revision，可以通过Deployment配置文件中的spec.revisionHistoryLimit属性增加revision数量，默认是10。</p><p>查看当前：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n nohi rollout history deploy myblog <span class="token comment">##CHANGE-CAUSE为空</span>
$ kubectl delete <span class="token operator">-</span>f deploy-myblog<span class="token punctuation">.</span>yaml    <span class="token comment">## 方便演示到具体效果，删掉已有deployment</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>记录回滚：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl create <span class="token operator">-</span>f deploy-myblog<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record
$ kubectl <span class="token operator">-</span>n nohi <span class="token function">set</span> image deploy myblog myblog=10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/myblog:v2 <span class="token operator">--</span>record=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看deployment更新历史：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n nohi rollout history deploy myblog
deployment<span class="token punctuation">.</span>extensions/myblog
REVISION  CHANGE-CAUSE
1         kubectl create <span class="token operator">--</span>filename=deploy-myblog<span class="token punctuation">.</span>yaml <span class="token operator">--</span>record=true
2         kubectl <span class="token function">set</span> image deploy myblog myblog=10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:5000/demo/myblog:v1 <span class="token operator">--</span>record=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回滚到具体的REVISION:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n nohi rollout undo deploy myblog <span class="token operator">--</span>to-revision=1
deployment<span class="token punctuation">.</span>extensions/myblog rolled back

<span class="token comment"># 访问应用测试</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="kubernetes服务访问之service" tabindex="-1"><a class="header-anchor" href="#kubernetes服务访问之service" aria-hidden="true">#</a> Kubernetes服务访问之Service</h4><p>通过以前的学习，我们已经能够通过Deployment来创建一组Pod来提供具有高可用性的服务。虽然每个Pod都会分配一个单独的Pod IP，然而却存在如下两个问题：</p><ul><li>Pod IP仅仅是集群内可见的虚拟IP，外部无法访问。</li><li>Pod IP会随着Pod的销毁而消失，当ReplicaSet对Pod进行动态伸缩时，Pod IP可能随时随地都会变化，这样对于我们访问这个服务带来了难度。</li></ul><h6 id="service-负载均衡之cluster-ip" tabindex="-1"><a class="header-anchor" href="#service-负载均衡之cluster-ip" aria-hidden="true">#</a> Service 负载均衡之Cluster IP</h6><p>service是一组pod的服务抽象，相当于一组pod的LB，负责将请求分发给对应的pod。service会为这个LB提供一个IP，一般称为cluster IP 。使用Service对象，通过selector进行标签选择，找到对应的Pod:</p><p><code>myblog/deployment/svc-myblog.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8002</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作演示：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 别名</span>
$ alias kd=<span class="token string">&#39;kubectl -n nohi&#39;</span>

<span class="token comment">## 创建服务</span>
$ kd create <span class="token operator">-</span>f svc-myblog<span class="token punctuation">.</span>yaml
$ kd get po <span class="token operator">--</span><span class="token function">show-labels</span>
NAME                      READY   STATUS    RESTARTS   AGE    LABELS
myblog-5c97d79cdb-jn7km   1/1     Running   0          6m5s   app=myblog
mysql-85f4f65f99-w6jkj    1/1     Running   0          176m   app=mysql

$ kd get svc
NAME     <span class="token function">TYPE</span>        CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
myblog   ClusterIP   10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93   &lt;none&gt;        80/TCP    7m50s

$ kd describe svc myblog
Name:              myblog
Namespace:         demo
Labels:            &lt;none&gt;
Annotations:       &lt;none&gt;
Selector:          app=myblog
<span class="token function">Type</span>:              ClusterIP
IP:                10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93
Port:              &lt;unset&gt;  80/TCP
TargetPort:        8002/TCP
Endpoints:         10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002
Session Affinity:  None
Events:            &lt;none&gt;

<span class="token comment">## 扩容myblog服务</span>
$ kd scale deploy myblog <span class="token operator">--</span>replicas=2
deployment<span class="token punctuation">.</span>extensions/myblog scaled

<span class="token comment">## 再次查看</span>
$ kd describe svc myblog
Name:              myblog
Namespace:         demo
Labels:            &lt;none&gt;
Annotations:       &lt;none&gt;
Selector:          app=myblog
<span class="token function">Type</span>:              ClusterIP
IP:                10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93
Port:              &lt;unset&gt;  80/TCP
TargetPort:        8002/TCP
Endpoints:         10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002
Session Affinity:  None
Events:            &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Service与Pod如何关联:</p><p>service对象创建的同时，会创建同名的endpoints对象，若服务设置了readinessProbe, 当readinessProbe检测失败时，endpoints列表中会剔除掉对应的pod_ip，这样流量就不会分发到健康检测失败的Pod中</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kd get endpoints myblog
NAME     ENDPOINTS                            AGE
myblog   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>68:8002<span class="token punctuation">,</span>10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002   7m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Service Cluster-IP如何访问:</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kd get svc myblog
NAME   <span class="token function">TYPE</span>        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
myblog   ClusterIP   10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93   &lt;none&gt;        80/TCP    13m
$ curl 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/blog/index/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为mysql服务创建service：svc-mysql.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">3306</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> mysql
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问mysql：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kd get svc mysql
mysql    ClusterIP   10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84   &lt;none&gt;        3306/TCP   3s
$ curl 10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84:3306
$ kubectl describe <span class="token operator">-</span>n nohi svc mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目前使用hostNetwork部署，通过宿主机ip+port访问，弊端：</p><ul><li>服务使用hostNetwork，使得宿主机的端口大量暴漏，存在安全隐患</li><li>容易引发端口冲突</li></ul><p>服务均属于k8s集群，尽可能使用k8s的网络访问，因此可以对目前myblog访问mysql的方式做改造：</p><ul><li>为mysql创建一个固定clusterIp的Service，把clusterIp配置在myblog的环境变量中</li><li>利用集群服务发现的能力，组件之间通过service name来访问</li></ul><h6 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h6><p>在k8s集群中，组件之间可以通过定义的Service名称实现通信。</p><p>演示服务发现：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">## 演示思路：在myblog的容器中直接通过service名称访问服务，观察是否可以访问通</span>

<span class="token comment"># 先查看服务</span>
$ kd get svc
NAME     <span class="token function">TYPE</span>        CLUSTER-IP      EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>    AGE
myblog   ClusterIP   10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93    &lt;none&gt;        80/TCP     59m
mysql    ClusterIP   10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84   &lt;none&gt;        3306/TCP   35m

<span class="token comment"># 进入myblog容器</span>
$ kd exec <span class="token operator">-</span>ti myblog-5c97d79cdb-j485f bash
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># curl mysql:3306</span>
5<span class="token punctuation">.</span>7<span class="token punctuation">.</span>29 <span class="token punctuation">)</span>→  <span class="token punctuation">(</span>mysql_native_password ot packets out of order
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># curl myblog/blog/index/</span>
我的博客列表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然podip和clusterip都不固定，但是service name是固定的，而且具有完全的跨集群可移植性，因此组件之间调用的同时，完全可以通过service name去通信，这样避免了大量的ip维护成本，使得服务的yaml模板更加简单。因此可以对mysql和myblog的部署进行优化改造：</p><ol><li>mysql可以去掉hostNetwork部署，使得服务只暴漏在k8s集群内部网络</li><li>configMap中数据库地址可以换成Service名称，这样跨环境的时候，配置内容基本上可以保持不用变化</li></ol><p>修改deploy-mysql.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>	<span class="token comment"># 去掉此行</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mysql<span class="token punctuation">-</span>data
        <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
          <span class="token key atrule">path</span><span class="token punctuation">:</span> /opt/mysql/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改configmap.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">MYSQL_HOST</span><span class="token punctuation">:</span> <span class="token string">&quot;mysql&quot;</span>	<span class="token comment"># 此处替换为mysql</span>
  <span class="token key atrule">MYSQL_PORT</span><span class="token punctuation">:</span> <span class="token string">&quot;3306&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用修改：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl delete -f deployment-mysql.yaml

## myblog不用动，会自动因健康检测不过而重启
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务发现实现：</p><p><code>CoreDNS</code>是一个<code>Go</code>语言实现的链式插件<code>DNS服务端</code>，是CNCF成员，是一个高性能、易扩展的<code>DNS服务端</code>。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kubectl <span class="token operator">-</span>n kube-system get po <span class="token operator">-</span>o wide<span class="token punctuation">|</span>grep dns
coredns-d4475785-2w4hk             1/1     Running   0          4d22h   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>64       
coredns-d4475785-s49hq             1/1     Running   0          4d22h   10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>65

<span class="token comment"># 查看myblog的pod解析配置</span>
$ kubectl <span class="token operator">-</span>n nohi exec <span class="token operator">-</span>ti myblog-5c97d79cdb-j485f bash
<span class="token namespace">[root@myblog-5c97d79cdb-j485f myblog]</span><span class="token comment"># cat /etc/resolv.conf</span>
nameserver 10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>10
search nohi<span class="token punctuation">.</span>svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local svc<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>local cluster<span class="token punctuation">.</span>local
options ndots:5

<span class="token comment">## 10.96.0.10 从哪来</span>
$ kubectl <span class="token operator">-</span>n kube-system get svc
NAME       <span class="token function">TYPE</span>        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>         AGE
kube-dns   ClusterIP   10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>10   &lt;none&gt;        53/UDP<span class="token punctuation">,</span>53/TCP   51d

<span class="token comment">## 启动pod的时候，会把kube-dns服务的cluster-ip地址注入到pod的resolve解析配置中，同时添加对应的namespace的search域。 因此跨namespace通过service name访问的话，需要添加对应的namespace名称，</span>
service_name<span class="token punctuation">.</span>namespace
$ kubectl get svc
NAME         <span class="token function">TYPE</span>        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
kubernetes   ClusterIP   10<span class="token punctuation">.</span>96<span class="token punctuation">.</span>0<span class="token punctuation">.</span>1    &lt;none&gt;        443/TCP   26h

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="service负载均衡之nodeport" tabindex="-1"><a class="header-anchor" href="#service负载均衡之nodeport" aria-hidden="true">#</a> Service负载均衡之NodePort</h6><p>cluster-ip为虚拟地址，只能在k8s集群内部进行访问，集群外部如果访问内部服务，实现方式之一为使用NodePort方式。NodePort会默认在 30000-32767 ，不指定的会随机使用其中一个。</p><p><code>myblog/deployment/svc-myblog-nodeport.yaml</code></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>apiVersion: v1
kind: Service
metadata:
  name: myblog-np
  namespace: nohi
spec:
  ports:
  <span class="token operator">-</span> port: 80
    protocol: TCP
    targetPort: 8002
  selector:
    app: myblog
  <span class="token function">type</span>: NodePort


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看并访问服务：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ kd create <span class="token operator">-</span>f svc-myblog-nodeport<span class="token punctuation">.</span>yaml
service/myblog-np created
$ kd get svc
NAME        <span class="token function">TYPE</span>        CLUSTER-IP       EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
myblog      ClusterIP   10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93     &lt;none&gt;        80/TCP         102m
myblog-np   NodePort    10<span class="token punctuation">.</span>105<span class="token punctuation">.</span>228<span class="token punctuation">.</span>101   &lt;none&gt;        80:30647/TCP   4s
mysql       ClusterIP   10<span class="token punctuation">.</span>108<span class="token punctuation">.</span>214<span class="token punctuation">.</span>84    &lt;none&gt;        3306/TCP       77m

<span class="token comment">#集群内每个节点的NodePort端口都会进行监听</span>
$ curl 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>181:30647/blog/index/
我的博客列表
$ curl 10<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0<span class="token punctuation">.</span>182:30647/blog/index/
我的博客列表
<span class="token comment">## 浏览器访问</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思考：</p><ol><li><p>NodePort的端口监听如何转发到对应的Pod服务？</p></li><li><p>CLUSTER-IP为虚拟IP，集群内如何通过虚拟IP访问到具体的Pod服务？</p></li></ol><h6 id="kube-proxy" tabindex="-1"><a class="header-anchor" href="#kube-proxy" aria-hidden="true">#</a> kube-proxy</h6>`,77),vn={href:"https://kubernetes.io/docs/concepts/services-networking/service/#virtual-ips-and-service-proxies",target:"_blank",rel:"noopener noreferrer"},mn=i('<p>有三种模式：</p><ul><li>User space, 让 Kube-Proxy 在用户空间监听一个端口，所有的 Service 都转发到这个端口，然后 Kube-Proxy 在内部应用层对其进行转发 ， 所有报文都走一遍用户态，性能不高，k8s v1.2版本后废弃。</li><li>Iptables， 当前默认模式，完全由 IPtables 来实现， 通过各个node节点上的iptables规则来实现service的负载均衡，但是随着service数量的增大，iptables模式由于线性查找匹配、全量更新等特点，其性能会显著下降。</li><li>IPVS， 与iptables同样基于Netfilter，但是采用的hash表，因此当service数量达到一定规模时，hash查表的速度优势就会显现出来，从而提高service的服务性能。 k8s 1.8版本开始引入，1.11版本开始稳定，需要开启宿主机的ipvs模块。</li></ul><p>IPtables模式示意图：</p><p><img src="'+T+`" alt=""></p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ iptables-save <span class="token punctuation">|</span>grep <span class="token operator">-</span>v myblog-np<span class="token punctuation">|</span>grep  <span class="token string">&quot;nohi/myblog&quot;</span>
<span class="token operator">-</span>A KUBE-SERVICES <span class="token operator">!</span> <span class="token operator">-</span>s 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>0<span class="token punctuation">.</span>0/16 <span class="token operator">-</span>d 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/32 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m comment <span class="token operator">--</span>comment <span class="token string">&quot;demo/myblog: cluster IP&quot;</span> <span class="token operator">-</span>m tcp <span class="token operator">--</span>dport 80 <span class="token operator">-</span>j KUBE-MARK-MASQ
<span class="token operator">-</span>A KUBE-SERVICES <span class="token operator">-</span>d 10<span class="token punctuation">.</span>99<span class="token punctuation">.</span>174<span class="token punctuation">.</span>93/32 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m comment <span class="token operator">--</span>comment <span class="token string">&quot;demo/myblog: cluster IP&quot;</span> <span class="token operator">-</span>m tcp <span class="token operator">--</span>dport 80 <span class="token operator">-</span>j KUBE-SVC-WQNGJ7YFZKCTKPZK

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SVC-WQNGJ7YFZKCTKPZK
<span class="token operator">-</span>A KUBE-SVC-WQNGJ7YFZKCTKPZK <span class="token operator">-</span>m statistic <span class="token operator">--</span>mode random <span class="token operator">--</span>probability 0<span class="token punctuation">.</span>50000000000 <span class="token operator">-</span>j KUBE-SEP-GB5GNOM5CZH7ICXZ
<span class="token operator">-</span>A KUBE-SVC-WQNGJ7YFZKCTKPZK <span class="token operator">-</span>j KUBE-SEP-7GWC3FN2JI5KLE47

$  iptables-save <span class="token punctuation">|</span>grep KUBE-SEP-GB5GNOM5CZH7ICXZ
<span class="token operator">-</span>A KUBE-SEP-GB5GNOM5CZH7ICXZ <span class="token operator">-</span>p tcp <span class="token operator">-</span>m tcp <span class="token operator">-</span>j DNAT <span class="token operator">--</span>to-destination 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>158:8002

$ iptables-save <span class="token punctuation">|</span>grep KUBE-SEP-7GWC3FN2JI5KLE47
<span class="token operator">-</span>A KUBE-SEP-7GWC3FN2JI5KLE47 <span class="token operator">-</span>p tcp <span class="token operator">-</span>m tcp <span class="token operator">-</span>j DNAT <span class="token operator">--</span>to-destination 10<span class="token punctuation">.</span>244<span class="token punctuation">.</span>1<span class="token punctuation">.</span>159:8002

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="kubernetes服务访问之ingress" tabindex="-1"><a class="header-anchor" href="#kubernetes服务访问之ingress" aria-hidden="true">#</a> Kubernetes服务访问之Ingress</h4>`,6),kn={href:"https://www.kubernetes.org.cn/5948.html",target:"_blank",rel:"noopener noreferrer"},bn=i(`<p>Ingress-nginx是7层的负载均衡器 ，负责统一管理外部对k8s cluster中Service的请求。主要包含：</p><ul><li><p>ingress-nginx-controller：根据用户编写的ingress规则（创建的ingress的yaml文件），动态的去更改nginx服务的配置文件，并且reload重载使其生效（是自动化的，通过lua脚本来实现）；</p></li><li><p>Ingress资源对象：将Nginx的配置抽象成一个Ingress对象</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> simple<span class="token punctuation">-</span>example
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> foo.bar.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service1
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">8080</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h6 id="示意图" tabindex="-1"><a class="header-anchor" href="#示意图" aria-hidden="true">#</a> 示意图：</h6><p><img src="`+A+'" alt=""></p><h6 id="实现逻辑" tabindex="-1"><a class="header-anchor" href="#实现逻辑" aria-hidden="true">#</a> 实现逻辑</h6><p>1）ingress controller通过和kubernetes api交互，动态的去感知集群中ingress规则变化 2）然后读取ingress规则(规则就是写明了哪个域名对应哪个service)，按照自定义的规则，生成一段nginx配置 3）再写到nginx-ingress-controller的pod里，这个Ingress controller的pod里运行着一个Nginx服务，控制器把生成的nginx配置写入/etc/nginx/nginx.conf文件中 4）然后reload一下使配置生效。以此达到域名分别配置和动态更新的问题。</p><h6 id="安装-安装异常-改为helm-安装" tabindex="-1"><a class="header-anchor" href="#安装-安装异常-改为helm-安装" aria-hidden="true">#</a> 安装 （安装异常，改为helm 安装）</h6>',7),gn={href:"https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md",target:"_blank",rel:"noopener noreferrer"},hn=i(`<div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>$ wget https:<span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com/kubernetes/ingress-nginx/nginx-0<span class="token punctuation">.</span>30<span class="token punctuation">.</span>0/deploy/static/mandatory<span class="token punctuation">.</span>yaml
<span class="token comment">## 或者使用myblog/deployment/ingress/mandatory.yaml</span>
<span class="token comment">## 修改部署节点</span>
$ grep <span class="token operator">-</span>n5 nodeSelector mandatory<span class="token punctuation">.</span>yaml
212-    spec:
213-      hostNetwork: true <span class="token comment">#添加为host模式</span>
214-      <span class="token comment"># wait up to five minutes for the drain of connections</span>
215-      terminationGracePeriodSeconds: 300
216-      serviceAccountName: nginx-ingress-serviceaccount
217:      nodeSelector:
            kubernetes<span class="token punctuation">.</span>io/os: linux
218-        ingress: <span class="token string">&quot;true&quot;</span>		<span class="token comment">#替换此处，来决定将ingress部署在哪些机器</span>
219-      containers:
220-        <span class="token operator">-</span> name: nginx-ingress-controller
221-          image: quay<span class="token punctuation">.</span>io/kubernetes-ingress-controller/nginx-ingress-controller:0<span class="token punctuation">.</span>30<span class="token punctuation">.</span>0
222-          args:

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建ingress</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment"># 为k8s-master节点添加label</span>
$ kubectl label node k8s-master ingress=true

$ kubectl create <span class="token operator">-</span>f mandatory<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>检查k8s-master是否有污点</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl describe node k8s-master | grep Taints
Taints:             node-role.kubernetes.io/control-plane:NoSchedule  # Noschedule即为污点，无法调度
# 删除污点
$ kubectl taint node k8s-master node-role.kubernetes.io/control-plane-
node/k8s-master untainted
[root@k8s-master deployment]# kubectl describe node k8s-master | grep Taints
Taints:             &lt;none&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,4),yn={id:"helm-安装ingress-nginx",tabindex:"-1"},xn=n("a",{class:"header-anchor",href:"#helm-安装ingress-nginx","aria-hidden":"true"},"#",-1),fn={href:"https://github.com/kubernetes/ingress-nginx",target:"_blank",rel:"noopener noreferrer"},wn=n("p",null,"helm安装",-1),Pn={href:"https://github.com/helm/helm/releases/tag/v3.11.1",target:"_blank",rel:"noopener noreferrer"},Sn=n("p",null,[n("img",{src:$,alt:"image-20230213124437901"})],-1),qn=i(`<li><p>解压</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar -zxvf helm-v3.11.1-linux-amd64.tar.gz
mv linux-amd64/helm /usr/local/bin/helm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),_n=i(`<li><p>这里将k8s-m1(10.0.0.216)作为边缘节点，打上Label：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl label node k8s-master ingress=true
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
    # 与视频统一节点选择器
    ingress: &quot;true&quot;
    #node-role.kubernetes.io/edge: &#39;&#39;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nginx ingress controller的副本数replicaCount为1，将被调度到k8s-m1这个边缘节点上。这里并没有指定nginx ingress controller service的externalIPs，而是通过<code>hostNetwork: true</code>设置nginx ingress controller使用宿主机网络。 因为k8s.gcr.io被墙，这里替换成unreachableg/registry.k8s.io_ingress-nginx_controller提前拉取一下镜像:</p></li><li><p>拉取镜像</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>crictl pull unreachableg/registry.k8s.io_ingress-nginx_controller:v1.5.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>出现拉取异常</p><p>crictl version同样出现异常</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> E0213 12:28:47.673818 2408373 remote_image.go:171] &quot;PullImage from image service failed&quot; err=&quot;rpc error: code = Unavailable desc = connection error: desc = \\&quot;transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory\\&quot;&quot; image=&quot;unreachableg/registry.k8s.io_ingress-nginx_controller:v1.5.1&quot;
FATA[0000] pulling image: rpc error: code = Unavailable desc = connection error: desc = &quot;transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory&quot;

执行：
	kubernetes 1.24+ 之后，如果dockershim已经变成了cri-docker，所以你需要执行：
	crictl config runtime-endpoint unix:///var/run/cri-dockerd.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>helm install ingress-nginx ingress-nginx-4.4.2.tgz --create-namespace -n ingress-nginx -f ingress_values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查看运行状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>$ kubectl get pod -n ingress-nginx
NAME                                       READY   STATUS    RESTARTS   AGE
ingress-nginx-controller-7c96f857f-8f5ls   1/1     Running   0          2m3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>访问：http://10.0.0.181 （k8s-ms）返回 nginx404页</p></li>`,8),En=n("p",null,[s("使用示例："),n("code",null,"myblog/deployment/ingress.yaml")],-1),Rn=n("strong",null,"和原视频版本不同，改动较大",-1),Nn={href:"https://www.cnblogs.com/dudu/p/15548461.html",target:"_blank",rel:"noopener noreferrer"},Tn=i(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ingressClassName</span><span class="token punctuation">:</span> nginx 
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.nohi.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ingress-nginx动态生成upstream配置：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">...</span>
                server_name myblog.nohi.com ;

                listen 80  ;
                listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>80  ;
                listen 443  ssl http2 ;
                listen <span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">:</span>443  ssl http2 ;

                set $proxy_upstream_name &quot;<span class="token punctuation">-</span>&quot;;

                ssl_certificate_by_lua_block <span class="token punctuation">{</span>
                        certificate.call()
                <span class="token punctuation">}</span>

                location / <span class="token punctuation">{</span>

                        set $namespace      &quot;nohi&quot;;
                        set $ingress_name   &quot;myblog&quot;;
 <span class="token punctuation">...</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="访问" tabindex="-1"><a class="header-anchor" href="#访问" aria-hidden="true">#</a> 访问</h6><p>域名解析服务，将 <code>myblog.nohi.com</code>解析到ingress的地址上。ingress是支持多副本的，高可用的情况下，生产的配置是使用lb服务（内网F5设备，公网elb、slb、clb，解析到各ingress的机器，如何域名指向lb地址）</p><p>本机，添加如下hosts记录来演示效果。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token number">10.0</span>.<span class="token number">0.181</span> myblog.nohi.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，访问 http://myblog.nohi.com/blog/index/</p><p>HTTPS访问：</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code><span class="token comment">#自签名证书</span>
$ openssl req <span class="token operator">-</span>x509 <span class="token operator">-</span>nodes <span class="token operator">-</span>days 2920 <span class="token operator">-</span>newkey rsa:2048 <span class="token operator">-</span>keyout tls<span class="token punctuation">.</span>key <span class="token operator">-</span>out tls<span class="token punctuation">.</span>crt <span class="token operator">-</span>subj <span class="token string">&quot;/CN=*.nohi.com/O=ingress-nginx&quot;</span>

<span class="token comment"># 证书信息保存到secret对象中，ingress-nginx会读取secret对象解析出证书加载到nginx配置中</span>
$ kubectl <span class="token operator">-</span>n nohi create secret tls https-secret <span class="token operator">--</span>key tls<span class="token punctuation">.</span>key <span class="token operator">--</span>cert tls<span class="token punctuation">.</span>crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog<span class="token punctuation">-</span>tls
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ingressClassName</span><span class="token punctuation">:</span> nginx 
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.nohi.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> myblog
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> myblog.nohi.com
    <span class="token key atrule">secretName</span><span class="token punctuation">:</span> https<span class="token punctuation">-</span>secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，访问 https://myblog.nohi.com/blog/index/</p><h6 id="多路径转发及重写的实现" tabindex="-1"><a class="header-anchor" href="#多路径转发及重写的实现" aria-hidden="true">#</a> 多路径转发及重写的实现</h6><ol><li><p>多path转发示例：</p><p>目标：</p></li></ol><div class="language-none line-numbers-mode" data-ext="none"><pre class="language-none"><code>myblog.nohi.com -&gt; 10.0.0.181 -&gt; /foo   service1:4200
                                      /bar   service2:8080
                                      /		 myblog:80

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 实现：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> simple<span class="token punctuation">-</span>fanout<span class="token punctuation">-</span>example
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.nohi.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /foo
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service1
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">4200</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /bar
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service2
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myblog
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p>nginx的URL重写</p><p>目标：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>myblog.nohi.com -&gt; 10.0.0.181 -&gt; /foo/    myblog:80/admin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>实现：ingress-rewriter.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>   <span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
   <span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
   <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
     <span class="token key atrule">name</span><span class="token punctuation">:</span> rewrite<span class="token punctuation">-</span>path
     <span class="token key atrule">namespace</span><span class="token punctuation">:</span> nohi
     <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
       <span class="token key atrule">nginx.ingress.kubernetes.io/rewrite-target</span><span class="token punctuation">:</span> /admin/$1
   <span class="token key atrule">spec</span><span class="token punctuation">:</span>
     <span class="token key atrule">rules</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> myblog.nohi.com
       <span class="token key atrule">http</span><span class="token punctuation">:</span>
         <span class="token key atrule">paths</span><span class="token punctuation">:</span>
         <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /foo/(.<span class="token important">*)</span>
           <span class="token key atrule">backend</span><span class="token punctuation">:</span>
             <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> myblog
             <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="小结-2" tabindex="-1"><a class="header-anchor" href="#小结-2" aria-hidden="true">#</a> 小结</h4><ol><li>核心讲如何通过k8s管理业务应用</li><li>介绍k8s的架构、核心组件和工作流程，使用kubeadm快速安装k8s集群</li><li>定义Pod.yaml，将myblog和mysql打包在同一个Pod中，myblog使用localhost访问mysql</li><li>mysql数据持久化，为myblog业务应用添加了健康检查和资源限制</li><li>将myblog与mysql拆分，使用独立的Pod管理</li><li>yaml文件中的环境变量存在账号密码明文等敏感信息，使用configMap和Secret来统一配置，优化部署</li><li>只用Pod去直接管理业务应用，对于多副本的需求，很难实现，因此使用Deployment Workload</li><li>有了多副本，多个Pod如何去实现LB入口，因此引入了Service的资源类型，有CLusterIp和NodePort</li><li>ClusterIP是四层的IP地址，不固定，不具备跨环境迁移，因此利用coredns实现集群内服务发现，组件之间直接通过Service名称通信，实现配置的去IP化</li><li>对Django应用做改造，django直接使用mysql:3306实现数据库访问</li><li>为了实现在集群外部对集群内服务的访问，因此创建NodePort类型的Service</li><li>介绍了Service的实现原理，通过kube-proxy利用iptables或者ipvs维护服务访问规则，实现虚拟IP转发到具体Pod的需求</li><li>为了实现集群外使用域名访问myblog，因此引入Ingress资源，通过定义访问规则，实现七层代理</li><li>考虑真实的场景，对Ingress的使用做了拓展，介绍多path转发及nginx URL重写的实现</li></ol>`,23);function An($n,Cn){const a=p("ExternalLinkIcon");return o(),c("div",null,[D,n("blockquote",null,[O,n("p",null,[s("🔗"),n("a",I,[s("Docker+k8s教程"),e(a)])]),n("p",null,[s("💽 "),n("a",M,[s("课件"),e(a)]),s(" 提取码：9z5h")])]),L,n("table",null,[U,n("tbody",null,[n("tr",null,[Y,G,n("td",null,[n("a",K,[s("Linux 2.4.19"),e(a)])])]),n("tr",null,[j,V,n("td",null,[n("a",F,[s("Linux 2.6.19"),e(a)])])]),n("tr",null,[Q,B,n("td",null,[n("a",W,[s("Linux 2.6.19"),e(a)])])]),n("tr",null,[H,X,n("td",null,[n("a",z,[s("Linux 2.6.24"),e(a)])])]),n("tr",null,[Z,J,n("td",null,[n("a",nn,[s("始于Linux 2.6.24 完成于 Linux 2.6.29"),e(a)])])]),n("tr",null,[sn,an,n("td",null,[n("a",en,[s("始于 Linux 2.6.23 完成于 Linux 3.8"),e(a)])])])])]),ln,n("blockquote",null,[n("p",null,[s("见：🔗"),n("a",tn,[s("Docker+k8s教程"),e(a)])])]),pn,n("ul",null,[n("li",null,[on,n("ul",null,[n("li",null,[n("p",null,[s("1.13版本后，集群开启"),cn,s(" 功能，即"),n("a",rn,[s("taint-based-evictions"),e(a)]),s("，即节点若失联或者出现各种异常情况，k8s会自动为node打上污点，同时为pod默认添加如下容忍设置：")]),dn])])])]),un,n("p",null,[s("运行在每个节点上，监听 API Server 中服务对象的变化，再通过创建流量路由规则来实现网络的转发。"),n("a",vn,[s("参照"),e(a)])]),mn,n("p",null,[s("对于Kubernetes的Service，无论是Cluster-Ip和NodePort均是四层的负载，集群内的服务如何实现七层的负载均衡，这就需要借助于Ingress，Ingress控制器的实现方式有很多，比如nginx, Contour, Haproxy, trafik, Istio。几种常用的ingress功能对比和选型可以参考"),n("a",kn,[s("这里"),e(a)])]),bn,n("p",null,[n("a",gn,[s("官方文档"),e(a)])]),hn,n("h6",yn,[xn,s(" helm 安装"),n("a",fn,[s("ingress-nginx"),e(a)])]),n("ul",null,[n("li",null,[wn,n("ul",null,[n("li",null,[n("p",null,[s("下载： "),n("a",Pn,[s("Helm v3.11.1"),e(a)])]),Sn]),qn])]),_n]),En,n("p",null,[Rn,s(" 👉 "),n("a",Nn,[s("Kubernetes 升级后 ingress api 变化带来的问题"),e(a)])]),Tn])}const On=t(C,[["render",An],["__file","14_Docker_k8s教程-01基础.html.vue"]]);export{On as default};

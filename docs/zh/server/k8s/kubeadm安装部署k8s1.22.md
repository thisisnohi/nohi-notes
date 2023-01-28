# kubeadm安装部署1.22

> 见：K8S安装
>
> https://www.bilibili.com/video/BV1cR4y1f7Ac/?spm_id_from=333.337.search-card.all.click&vd_source=9004ce053a52d5930f71e230579961e7

## 1环境

| 主机名     | ip地址     | 角色         |
| ---------- | ---------- | ------------ |
| k8s-master | 10.0.0.212 | master，node |
| k8s-node1  | 10.0.0.213 | node         |
| K8s-node2  | 10.0.0.214 | node         |

分别设置主机名

```
hostnamectl  set-hostname k8s-master
hostnamectl  set-hostname k8s-node1
hostnamectl  set-hostname k8s-node2
或者修改 vi /etc/hostname
```



```
10.0.0.212	k8s-master
10.0.0.213	k8s-node1
10.0.0.214	k8s-node2
```



* master

  * etcd
  * Api-server
  * controller-manager
  * scheduler

  * kubelet
  * Kube-proxy

* node

  * kubelet
  * Kube-proxy
  * Docker

# 2 环境设置

* 主机名  `/etc/hosts`

  ```
  10.0.0.212	k8s-master
  10.0.0.213	k8s-node1
  10.0.0.214	k8s-node2
  ```

* 关闭防火墙

  ```
  # 关闭防火墙
  systemctl stop firewalld
  # 开机不启动
  systemctl disable firewalld 
  ```

* 禁用selinux

  ```
  setenforce 0  # 临时关闭
  getenforce 		# 查看selinux状态
  vi /etc/selinux/config  # 永久关闭
  SELINUX=disabled
  ```

* 关闭swap分区

  ```
  swapoff -a  # 禁用swap
  free -h # 查看分区
  ```

* 时间同步

  ```
  systemctl start chronyd
  systemctl enable chronyd
  ```

* 桥接IPV4流量

  ```
  cat >> /etc/sysctl.d/k8s.conf <<EOF
  net.bridge.bridge-nf-call-ip6tables=1
  net.bridge.bridge-nf-call-iptables=1
  net.ipv4.ip_forward=1
  vm.swappiness=0
  EOF
  ```

  * 应用sysctl参数而不重新启动： `sysctl --system`

# 3安装K8S

## 3.1 安装docker

### 3.1.1 删除旧docker版本

```
yum remove docker docker-client \
   docker-client-latest \
   docker-common \
   docker-latest \
   docker-latest-logrotate \
   docker-logrotate \
   docker-engine 
```

### 3.1.2 安装并启动Docker

* 安装yum-utils,主要提供yum-config-manager命令

  ```
  yum install -y yum-utils
  ```

* 安装docker的repo仓库

  ```
  yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  ```

* 安装指定版本

  ```
  yum -y install docker-ce-20.10.9 docker-ce-cli-20.10.9 containerd.io
  ```

* 设置开机自启动、启动docker

  ```
  systemctl enable docker
  systemctl start docker
  ```

### 3.1.3 设置镜像加速器

* `vi /etc/docker/daemon.json`

  ```json
  {
   "registry-mirrors": ["https://c07oywfn.mirror.aliyuncs.com"],
   "exec-opts": ["native.cgroupdriver=systemd"]
  }
  ```

## 3.2 配置kubernetes的阿里云yum源（所有节点执行）

```
cat > /etc/yum.repos.d/kubernetes.repo  << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

## 3.3 yum安装kubeadm、kubelet、kubectl（所有节点都执行）

```
yum list --showduplicates | grep kubeadm  ## 查看yum可获取的kubeadm版本，这里选择1.22.6
# 卸载之前安装版本
yum remove kubelet kubeadm kubectl
# 安装指定版本
yum -y install kubelet-1.22.6 kubeadm-1.22.6 kubectl-1.22.6
# 开机自启
systemctl enable kubelet
```

## 3.4 初始化master节点 

```shell
kubeadm init \
--apiserver-advertise-address=10.0.0.212 \
--image-repository registry.aliyuncs.com/google_containers \
--kubernetes-version v1.22.6 \
--service-cidr=10.96.0.0/12 \
--pod-network-cidr=10.244.0.0/16 \
```

初始化成功后出现如下提示

```shell 
[addons] Applied essential addon: kube-proxy

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.0.0.212:6443 --token oha8m0.wo4a62msnuw95z4f \
	--discovery-token-ca-cert-hash sha256:1021c5ef14ee4811d185c4df78a56731cfce0e0b03d54dc90e59fc14bfc581f1
```

* ## 如果因之前安装、启动报错，可执行重置：`kubeadm reset`

* 按提示操作

```shell
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
export KUBECONFIG=/etc/kubernetes/admin.conf
```

* 列出所有pods

```shell
kubectl get pods -A 
```

## 3.5 将node节点加入k8s集群

* 在另两台机器上执行 （3.4提示信息）

  ```shell 
  kubeadm join 10.0.0.212:6443 --token oha8m0.wo4a62msnuw95z4f \
  	--discovery-token-ca-cert-hash sha256:1021c5ef14ee4811d185c4df78a56731cfce0e0b03d54dc90e59fc14bfc581f1
  ```

* 查看节点状态

  ```
  [root@k8s-master manifests]# kubectl get nodes -A
  NAME         STATUS     ROLES                  AGE   VERSION
  k8s-master   NotReady   control-plane,master   11m   v1.22.6
  k8s-node1    NotReady   <none>                 41s   v1.22.6
  ```



# 4 部署容器网络，CNI网络插件（在Master上执行)

## 4.1 在master节点配置pod网络创建

​		node节点加入k8s集群后，在master上执行kubectl get nodes 发现状态是NotReady，因为还没有部署CNI网络插件，其实在步骤四初始化。

​		著名的有flannel、calico、canal和kube-router等 

## 4.2 下载kube-flannel.yml

```
wget https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

修改network与执行kubeadm init一致
net-conf.json: |
    {
      "Network": "10.244.0.0/16",
      "Backend": {
        "Type": "vxlan"
      }
    }
```

## 4.3 安装flannel插件

* 拉取镜像(所有节点)

  ```shell
  docker pull rancher/mirrored-flannelcni-flannel-cni-plugin:v1.1.0
  docker pull rancher/mirrored-flannelcni-flannel:v0.20.1
  ```

* 主机节点执行

  ```shell
  kubectl apply -f kube-flannel.yml
  ```

# 5 设置角色

```
kubectl label node k8s-node1 node-role.kubernetes.io/worker=worker
kubectl label node k8s-node2 node-role.kubernetes.io/worker=worker
```



# 6 测试

* 创建目录

  ```
  mkdir hello && cd hello
  ```

* `vi server.js`

  ```go
  var http = require('http');
  console.log('hello...');
  
  var handleRequest = function(request, response) {
    console.log('Received request for URL:' + request.url);
    response.writeHead(200);
    response.end('Hello World');
  };
  var www = http.createServer(handleRequest);
  www.listen(8080);
  console.log('Listening');
  ```

* `vi Dockerfile`

  ```
  FROM node:6.14.2
  EXPOSE 8080
  COPY server.js .
  CMD node server.js
  ```

* 创建镜像

  ```shell
  docker build -t hello_world:v2 .
  ```

* 打包镜像

  ```shell 
  [root@k8s-master hello]# docker images
  REPOSITORY                                                        TAG       IMAGE ID       CREATED         SIZE
  hello_world                                                       v2        fd37ca142433   3 minutes ago   660MB
  node                                                              6.14.2    00165cd5d0c0   4 years ago     660MB
  [root@k8s-master hello]# docker save fd37ca142433 > hello.tar
  docker save -o hello.tar hello_world:v2 # 指定镜像名称版本
  
  ## 测试镜像是否可用
  docker run --name hello-world -p 8080:8080 hello_world:v2
  访问http://127.0.0.1:8080是否可以出现Hello world
  ```

* 导入镜像(其他节点)

  ```
  docker load < hello.tar
  
  [root@k8s-node2 ~]# docker images
  REPOSITORY                                           TAG       IMAGE ID       CREATED         SIZE
  <none>                                               <none>    fd37ca142433   7 minutes ago   660MB
  [root@k8s-node2 ~]# docker tag fd37ca142433 hello_world:v2
  ```

  

* `vi hello_world.yaml` （主节点）

  ```
  apiVersion: v1
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
  ```

* 部署

  ```
  kubectl apply -f hello_world.yaml
  ```

* 查看服务

  ```
  kubectl get pods -A 
  kubectl get svc -A
  ```

  

## 常用命令

```
kubectl get pods -A 
kubectl get svc -A
```


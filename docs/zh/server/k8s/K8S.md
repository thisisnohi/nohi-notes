# K8S

> add by nohi 20221224

```
journalctl -xeu kubelet 日志目录：/run/log/journal
```



## 教程

### 1 kubeadm安装部署1.22

> 见：K8S安装
>
> https://www.bilibili.com/video/BV1cR4y1f7Ac/?spm_id_from=333.337.search-card.all.click&vd_source=9004ce053a52d5930f71e230579961e7

:happy: 安装完成

### 2 v1.26 安装

> 安装视频参见：[kubernetes 1.26版本上线，90分钟入门精讲](https://www.bilibili.com/video/BV1Vg411b7sB/?spm_id_from=333.1007.top_right_bar_window_history.content.click&vd_source=9004ce053a52d5930f71e230579961e7)
>
> 20220106 未安装成功，改为 v1.26+containerd方式

:pensive:  安装失败

### 3 v1.26+Containerd

> create by nohi 20230106
>
> 参见：[使用kubeadm部署Kubernetes 1.26](

:happy: 安装完成



### 4 Kubeadm安装K8s-1.26.0(docker+containerd+CRI-O)

> create by nohi 20230112 
>
> :point_right: [Kubeadm安装K8s-1.26.0（docker+containerd+CRI-O)](https://www.bilibili.com/video/BV1V8411N78a/?spm_id_from=333.788&vd_source=9004ce053a52d5930f71e230579961e7)







### 【Docker+k8s教程】

> create by nohi 20230112 
>
> :link:[Docker+k8s教程](https://www.bilibili.com/video/BV1Fv4y1v7CE/?t=639.8&vd_source=9004ce053a52d5930f71e230579961e7)
>
> :minidisc:  [课件](https://pan.baidu.com/s/1-bGAHDmt9F8gO5cngaNn7w )  提取码：9z5h 









## 可以做什么

- **服务发现和负载均衡**

  Kubernetes 可以使用 DNS 名称或自己的 IP 地址来暴露容器。 如果进入容器的流量很大， Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定。

- **存储编排**

  Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。

- **自动部署和回滚**

  你可以使用 Kubernetes 描述已部署容器的所需状态， 它可以以受控的速率将实际状态更改为期望状态。 例如，你可以自动化 Kubernetes 来为你的部署创建新容器， 删除现有容器并将它们的所有资源用于新容器。

- **自动完成装箱计算**

  你为 Kubernetes 提供许多节点组成的集群，在这个集群上运行容器化的任务。 你告诉 Kubernetes 每个容器需要多少 CPU 和内存 (RAM)。 Kubernetes 可以将这些容器按实际情况调度到你的节点上，以最佳方式利用你的资源。

- **自我修复**

  Kubernetes 将重新启动失败的容器、替换容器、杀死不响应用户定义的运行状况检查的容器， 并且在准备好服务之前不将其通告给客户端。

- **密钥与配置管理**

  Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 ssh 密钥。 你可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。



## 组件

* 一组工作机器，称为节点，每个集群至少有一个工作节点

* 工作节点会托管 Pod ，而 Pod 就是作为应用负载的组件

  可以在 Kubernetes 中创建和管理的、最小的可部署的计算单元。

* 控制平面管理集群中的工作节点和 Pod。 

* 在生产环境中，控制平面通常跨多台计算机运行， 一个集群通常运行多个节点，提供容错性和高可用性。

![Kubernetes 的组件](./attach/components-of-kubernetes.svg)

### 控制平面组件（Control Plane Components）

控制平面组件会为集群做出全局决策，比如资源的调度。 以及检测和响应集群事件，例如当不满足部署的 replicas 字段时， 要启动新的 pod

|        组件        | 说明                                                         |
| :----------------: | :----------------------------------------------------------- |
|        etcd        | 一致且高度可用的键值存储，用作 Kubernetes 的所有集群数据的后台数据库。<br>保存整个集群的状态 |
|     apiserver      | API 服务器是 Kubernetes [控制平面](https://kubernetes.io/zh-cn/docs/reference/glossary/?all=true#term-control-plane)的组件， 该组件负责公开了 Kubernetes API，负责处理接受请求的工作。 API 服务器是 Kubernetes 控制平面的前端。<br>提供了资源操作的唯一入口 ，并提供认证、授权、访问控制、API注册和发现等机制; |
| Controller manager | [kube-controller-manager](https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kube-controller-manager/) 是[控制平面](https://kubernetes.io/zh-cn/docs/reference/glossary/?all=true#term-control-plane)的组件， 负责运行[控制器](https://kubernetes.io/zh-cn/docs/concepts/architecture/controller/)进程。<br>负责维护集群的状态，比如故障检测、自动扩展、滚动更新等;<br>   1. 节点控制器（Node Controller）：负责在节点出现故障时进行通知和响应 <br>   2. 任务控制器（Job Controller）：监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成<br>   3. 端点分片控制器（EndpointSlice controller）：填充端点分片（EndpointSlice）对象（以提供 Service 和 Pod 之间的链接）。 <br>   4. 服务账号控制器（ServiceAccount controller）：为新的命名空间创建默认的服务账号（ServiceAccount）。 |
|     scheduler      | `kube-scheduler` 是[控制平面](https://kubernetes.io/zh-cn/docs/reference/glossary/?all=true#term-control-plane)的组件， 负责监视新创建的、未指定运行[节点（node）](https://kubernetes.io/zh-cn/docs/concepts/architecture/nodes/)的 [Pods](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/)， 并选择节点来让 Pod 在上面运行。<br>负责资源的调度，按照预定的调度策略将Pod调度到相应的机器上 |
|      kubelet       | 负责维护容器的生命周期，同时也负责Volumn(CVI)和网络(CNI)的管理; |
| Container runtime  | 负责镜像管理以及Pod和容器的真正运行(CRI);                    |
|     kube-proxy     | 负责为Service提供cluster内部的服务发现和负载均衡             |

### NODE组件

节点组件会在每个节点上运行，负责维护运行的 Pod 并提供 Kubernetes 运行环境。

|       组件        | 说明                                                         |
| :---------------: | :----------------------------------------------------------- |
|      kubelet      | `kubelet` 会在集群中每个[节点（node）](https://kubernetes.io/zh-cn/docs/concepts/architecture/nodes/)上运行。 它保证[容器（containers）](https://kubernetes.io/zh-cn/docs/concepts/overview/what-is-kubernetes/#why-containers)都运行在 [Pod](https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/) 中。<br>负责维护容器的生命周期，同时也负责Volumn(CVI)和网络(CNI)的管理; |
| Container runtime | 容器运行环境是负责运行容器的软件。<br>负责镜像管理以及Pod和容器的真正运行(CRI); |
|    kube-proxy     | [kube-proxy](https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kube-proxy/) 是集群中每个[节点（node）](https://kubernetes.io/zh-cn/docs/concepts/architecture/nodes/)上所运行的网络代理， 实现 Kubernetes [服务（Service）](https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/) 概念的一部分。<br>负责为Service提供cluster内部的服务发现和负载均衡 |
|                   |                                                              |
|                   |                                                              |
|                   |                                                              |
|                   |                                                              |

### 扩展组件

|         组件          | 说明                         |
| :-------------------: | :--------------------------- |
|       kube-dns        | 负责为整个集群提供DNS服务    |
|  Ingress Controller   | 为服务提供外网入口           |
|       Heapster        | 提供资源监控                 |
|       DashBoard       | 提供GUI                      |
|      Federation       | 提供跨可用区的集群           |
| Fluentd-elasticsearch | 提供集群日志采集、存储与查询 |
|                       |                              |

 



## 介绍

* [官网](https://kubernetes.io/zh-cn/docs/tasks/tools/install-kubectl-linux/)
* v1.26





## 安装部署

* 常见安装方式：
  * kubeadm
  * 二进制
* 见:  kubeadm安装部署k8s1.22   (v1.22 + docker)
* 见：v1.26 安装
* k8s+containerd: https://blog.frognew.com/2023/01/kubeadm-install-kubernetes-1.26.html




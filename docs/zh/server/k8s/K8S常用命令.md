# 常用命令

## k8s自动补全

```
yum -y install bash-completion
source /usr/share/bash-completion/bash_completion
source <(kubectl completion bash)
echo "source <(kubectl completion bash)" >> ~/.bashrc
```



## 域名解析

```
route -n
iptables-save | grep 10.105.42.173
```



## 查看日志

```
# 在pod对应机器节点查看
# 查找对应容器id
crictl ps
crictl ps -a
# 查看容器日志
crictl logs 6e2c272bcbd41
```



## docker

### 查看日志 

* `docker logs --tail=1 -f 711fe733d6f4`
* `docker logs -f 711fe733d6f4`

## kubectl

* 常用

  ```
  create apply get delete logs describe
  ```

  ```
  label
  
  kubectl get node --show-labels
  ```

  

### 查看所有资源

* `kubectl api-resources`

  ```
  [root@k8s-master ~]# kubectl api-resources
  NAME                              SHORTNAMES   APIVERSION                             NAMESPACED   KIND
  bindings                                       v1                                     true         Binding
  componentstatuses                 cs           v1                                     false        ComponentStatus
  configmaps                        cm           v1                                     true         ConfigMap
  
  # SHORTNAMES 为简写,如:
  kubectl get componentstatuses == kubectl get cs
  ```

  



* kubectl get pod -A / kubectl get pods -A
* kubectl get svc -A
* 进入pod：`kubectl exec -it curl --/bin/sh`
* 执行pod中命令：`kubectl exec -ti curl(此为podname) -- cat /etc/resolv.conf`

* ComponentStatus

  ```
  kubectl get cs/node/pod
  ```

* kubectl 展示搜索出的pod列表（含pod所在的namespace

  ```
  kubectl get pod -A / kubectl get pod -A grep <podname>
  ```

  

* kubectl 删除pod命令

  ```
  kubectl delete pod <podname> -n <namespace>
  ```

* 查看deployment信息

  ```
  kubectl get deployment -n <namespace>
  ```


* 删除对应pod

  ```
  kubectl delete deployment <deployxxx> -n  <namespace>
  ```

* 查看节点

  ```
  kubectl get nodes
  ```

### POD

#### 1 查看POD

> 主要命令即是：create apply get delete logs describe

* 查看pod基本情况

  ```
  kubectl get pod
  ```

* 查看所有namespace下pod

  ```
  kubectl get pod -A
  ```

* `-owide`显示ip、node等信息

#### 2 查看pod详情

```
kubectl describe pod <podname>  # podname可通过kubectl get pod查看 => demo1-74564bd775-494lz
kubectl get pod <podname> -n <namespace> -o wide -o yaml
kubectl get pod myblog -n nohi -o wide -o yaml
```

#### 3 pod扩容

```
kubectl scale deployment demo1 --replicas 5
```

#### 查看窗口情况

```
kubectl -n nohi exec -ti myblog -c mysql bash
# 如果pod只有一个非pasuse容器，可省略-c mysql
```

#### 删除POD

* 查看pod状态

  ```
  $ kubectl get pod -A
  $ kubectl get pods -n ingress-nginx
  NAME                                   READY   STATUS             RESTARTS   AGE
  ingress-nginx-admission-create-9xnc5   0/1     ImagePullBackOff   0          19m
  ```

* 确定问题 Pod 所在节点

  ```
  kubectl get pods ingress-nginx-admission-create-9xnc5 -n ingress-nginx -o wide
  NAME                                   READY   STATUS             RESTARTS   AGE   IP               NODE     NOMINATED NODE   READINESS GATES
  ingress-nginx-admission-create-9xnc5   0/1     ImagePullBackOff   0          20m   10.243.111.195   k8s-n2   <none>           <none>
  ```

  node 对应 k8s-n2，该 Pod 被调度到了 `k8s-n2` 节点


* 查看pod所在节点 

  ```
  kubectl get pod -owide
  ```

* 确定 Pod 所使用的容器镜像

  ```
  kubectl get pods ingress-nginx-admission-create-9xnc5 -n ingress-nginx -o yaml | grep image
  ```

* 删除一个pod

  ```
  1、先删除pod2、再删除对应的deployment否则只是删除pod是不管用的，还会看到pod，因为deployment.yaml文件中定义了副本数量
  
  删除pod
  [root@test2 ~]# kubectl get pod -n jenkins
  NAME                        READY     STATUS    RESTARTS   AGE
  jenkins2-8698b5449c-grbdm   1/1       Running   0          8s
  [root@test2 ~]# kubectl delete pod jenkins2-8698b5449c-grbdm -n jenkins
  pod "jenkins2-8698b5449c-grbdm" deleted
  
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
  
  deployment.extensions "jenkins2" deleted
  [root@test2 ~]# kubectl get deployment -n jenkins
  No resources found.
  [root@test2 ~]# 
  [root@test2 ~]# kubectl get pod -n jenkins
  No resources found.
  ```

#### 查看日志

```
kubectl logs -n nohi myblog -c mysql
# 对应如下命令，711fe733d6f4是mysql id
docker logs --tail=1 -f 711fe733d6f4  

## tail
kubectl logs -n nohi myblog -c mysql -f
kubectl logs -n nohi myblog -c mysql -f --tail=1
```



### 标签

#### 1. 查看节点标签

```
kubectl get node --show-labels
```

#### 2. 添加标签

```
kubectl label node k8s-master ingress=true
```

#### 3 删除标签

```
kubectl label node k8s-master ingress-
```







## helm

* 查询全部服务：`helm -n <namespace> ls -a `
* 删除失败的安装： `helm -n <namespace> delete <packagename> ` 

## metrics-server

* 查看节点metrics

  ```
  [root@k8s-m1 ~]# kubectl top node
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
  ```



## 路由

```
# 根据服务名称访问
$ kubectl -n istio-demo get svc
NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
bill-service   ClusterIP   10.107.86.195   <none>        9999/TCP   2d9h
# pod 内访问 bill-service，实际是访问cluster-ip
/ # nslookup bill-service
Server:		10.96.0.10
Address:	10.96.0.10:53

Name:	bill-service.istio-demo.svc.cluster.local
Address: 10.107.86.195

# 查看iptables
$ iptables-save | grep 10.107.86.195
-A KUBE-SERVICES -d 10.107.86.195/32 -p tcp -m comment --comment "istio-demo/bill-service:http cluster IP" -m tcp --dport 9999 -j KUBE-SVC-PK4BNTKC2JYVE7B2
-A KUBE-SVC-PK4BNTKC2JYVE7B2 ! -s 10.224.0.0/16 -d 10.107.86.195/32 -p tcp -m comment --comment "istio-demo/bill-service:http cluster IP" -m tcp --dport 9999 -j KUBE-MARK-MASQ

# 查看svc，策略为0.5
$ iptables-save | grep KUBE-SVC-PK4BNTKC2JYVE7B2
:KUBE-SVC-PK4BNTKC2JYVE7B2 - [0:0]
-A KUBE-SERVICES -d 10.107.86.195/32 -p tcp -m comment --comment "istio-demo/bill-service:http cluster IP" -m tcp --dport 9999 -j KUBE-SVC-PK4BNTKC2JYVE7B2
-A KUBE-SVC-PK4BNTKC2JYVE7B2 ! -s 10.224.0.0/16 -d 10.107.86.195/32 -p tcp -m comment --comment "istio-demo/bill-service:http cluster IP" -m tcp --dport 9999 -j KUBE-MARK-MASQ
-A KUBE-SVC-PK4BNTKC2JYVE7B2 -m comment --comment "istio-demo/bill-service:http -> 10.224.2.176:80" -m statistic --mode random --probability 0.50000000000 -j KUBE-SEP-2N5D6YEYMYJU3FWT
-A KUBE-SVC-PK4BNTKC2JYVE7B2 -m comment --comment "istio-demo/bill-service:http -> 10.224.2.177:80" -j KUBE-SEP-4YJXLYWAOEZ73MAQ

```



# Ingress

```
apiVersion: networking.k8s.io/v1
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
```



# 常见问题

##  crictl

### Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory"

```
crictl config runtime-endpoint unix:///var/run/cri-dockerd.sock
```


# 常用命令
## kubectl

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

* 查看节点

  ```
  kubectl get nodes
  ```

## pod

### 删除POD

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

* 
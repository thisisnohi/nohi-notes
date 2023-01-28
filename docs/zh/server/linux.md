---
sidebar: auto
---
# Linux

### 常用命令

#### 网络

* Centos8

  * 重新加载网络：`nmcli c reload`

    ```
    ## 配置见：https://www.cnblogs.com/ay-a/p/11828607.html
    TYPE=Ethernet
    PROXY_METHOD=none
    BROWSER_ONLY=no
    BOOTPROTO=static
    DEFROUTE=yes
    IPV4_FAILURE_FATAL=no
    IPV6INIT=yes
    IPV6_AUTOCONF=yes
    IPV6_DEFROUTE=yes
    IPV6_FAILURE_FATAL=no
    NAME=ens192
    UUID=2497d58c-c681-40ec-a86d-72f94c01abff
    DEVICE=ens192
    ONBOOT=yes
    IPADDR=10.0.0.214
    NETMASK=255.255.255.0
    PREFIX=24
    GATEWAY=10.0.0.1
    ```

    

#### 文件

* 查看文件inode `df -ia`
* 查看文件名柄: lsof -i:port

#### 其他

* 查看端口占用 netstate -an | grep 9000

* 查看端口进程: lsof -i:port

* 定位 Java 进程和线程  top -H -p pid 、Mac： ps -M pid

   ```
   以前只是在 linux 机器上使用 top 命令。常用的快键键是:
   	p 键 - 按 cpu 使用率排序
   	m 键 - 按内存使用量排序
   这 2 个快捷键在 mac 上都不一样。对应的是，先输入 o，然后输入 cpu 则按 cpu 使用量排序，输入 rsize 则按内存使用量排序。
   如果记不清了，可以在 top 的界面上按 ?，在弹出的帮助界面中即可看到。
   ```

   

* 再利用 jstack -l pid 导出线程栈

* Linux下查看CPU使用率的命令
		* vmstat 1 5
		* sar -u 1 5
		* mpstat 1 5 每1秒收集一次，共5次。
		* iostat -c 1 2
		* dstat -c 每秒cpu使用率情况获取
		* dstat --top-cpu 最占cpu的进程获取
	
* mpstat 
	* mpstat  -P ALL 2 #看每个cpu核心的详细
			%user      在internal时间段里，用户态的CPU时间(%)，不包含nice值为负进程  (usr/total)*100
			%nice      在internal时间段里，nice值为负进程的CPU时间(%)   (nice/total)*100
			%sys       在internal时间段里，内核时间(%)       (system/total)*100
			%iowait    在internal时间段里，硬盘IO等待时间(%) (iowait/total)*100
			%irq       在internal时间段里，硬中断时间(%)     (irq/total)*100
			%soft      在internal时间段里，软中断时间(%)     (softirq/total)*100
			%idle      在internal时间段里，CPU除去等待磁盘IO操作外的因为任何原因而空闲的时间闲置时间(%) (idle/total)*100
	
* 时区：cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

### file

```
-- 删除 ~/file/input/BERS/ 一年前{365}数据 {} 前后有空格
find ~/file/input/BERS/ -name "*.zip" -mtime +365 -exec rm {} \;
```

## shell

* 脚本路径

  ```shell
  BASE_PATH=$(cd `dirname $0`; pwd)
  ```

* start 

  ```shell
  #!/bin/sh
  
  pwd
  BASEPATH=$(cd `dirname $0`;pwd)
  cd $BASEPATH
  echo currentPath:$BASEPATH
  pwd
  JAR_NAME=chss-rhwzh.jar
  echo start app $JAR_NAME
  export JAVA_OPT="-server -Xms1024m -Xmx2048m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m"
  nohup java $JAVA_OPT -jar ${JAR_NAME}  > /dev/null 2>&1 &
  ```

* stop

  * 指定jar

  ```
  jarName=chss-rhwzh.jar
  echo "jps -ml|grep ${jarName} | grep -v grep | awk '{print $1}'"
  LIVEPID=`jps -ml|grep ${jarName}  |grep -v grep | awk '{print $1}'`
  echo "PID ${LIVEPID}"
  if [ -z $LIVEPID ];then
      echo "pid is null"
  else
      echo $LIVEPID
      kill -9 $LIVEPID
  fi
  ```

  * 选择jar

  ```
  #!/bin/bash
  
  JAR_NAME=$1
  if [ -z "$JAR_NAME" ];then
    echo "JAR_NAME is empty, please input a jar name"
    exit 100
  fi
  BASE_PATH=$(cd `dirname $0`; pwd)
  echo $BASE_PATH
  echo "获取[$JAR_NAME]获取进程列表"
  
  # 获取进程列表
  P_LIST=`jps -l | grep $JAR_NAME`
  echo "$P_LIST"
  
  # 输出循环列表
  i=0
  echo "$P_LIST"| while read line
  do
    ((i++))
    echo "[$i] $line"
  done
  
  P_INDEX=1
  read -p "Please select INDEX of Progress[1]: " P_INDEX
  
  if [ "$P_INDEX" == "" ]; then
    P_INDEX=1
  fi
  
  i=0
  echo "$P_LIST"| while read line
  do
    ((i++))
    if [ "$i" == "$P_INDEX" ];then
          echo "kill [$i] $line"
          echo $line | awk '{print $1}' | xargs kill -9
    fi
  done
  ```

  

## centos8切换yum源

* [CentOS 8 EOL如何切换源？](https://help.aliyun.com/document_detail/405635.htm?spm=a2c4g.11186623.0.0.7cb420beB9u6VU)

  ```
  址http://mirrors.cloud.aliyuncs.com替换为http://mirrors.aliyun.com。、
  例如，yum源替换为http://mirrors.aliyun.com/centos-vault/8.5.2111/，epel源替换为http://mirrors.aliyun.com/epel-archive/8/。
  
  # 运行以下命令备份之前的repo文件。
  rename '.repo' '.repo.bak' /etc/yum.repos.d/*.repo
  
  # 运行以下命令下载最新的repo文件。
  wget http://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo -O /etc/yum.repos.d/Centos-vault-8.5.2111.repo
  wget http://mirrors.aliyun.com/repo/epel-archive-8.repo -O /etc/yum.repos.d/epel-archive-8.repo
  
  # 运行以下命令替换repo文件中的链接
  sed -i 's/http:\/\/mirrors.aliyun.com/url_tmp/g'  /etc/yum.repos.d/Centos-vault-8.5.2111.repo &&  sed -i 's/http:\/\/mirrors.aliyun.com/http:\/\/mirrors.aliyun.com/g' /etc/yum.repos.d/Centos-vault-8.5.2111.repo && sed -i 's/url_tmp/http:\/\/mirrors.aliyun.com/g' /etc/yum.repos.d/Centos-vault-8.5.2111.repo
  sed -i 's/http:\/\/mirrors.aliyun.com/http:\/\/mirrors.aliyun.com/g' /etc/yum.repos.d/epel-archive-8.repo
  
  # 运行以下命令重新创建缓存
  yum clean all && yum makecache
  ```

  

## 压缩

```bash
zip test.zip test.txt  #添加压缩文件
zip test.zip test1.txt  #移动文件到压缩包
zip -d test.zip test.txt    #删除test.txt

zip -r test.zip ./*          #压缩当前全部文件到test.zip
zip test2.zip test2/*   #打包目录
zip test3.zip tests/* -x tests/ln.log  #压缩目录,除了tests/ln.log

zip -r test.zip ./* -P 123  #设置密码(明文设置密码不太安全)
zip -r test.zip ./* -e   #交互设置密码(安全)

#设置压缩比
#-0不压缩，-9最高压缩，默认为-6
zip test.zip test.txt -6
```

### 文件句柄

* ulimit -a

  ···

  while true
  do 

  lsof -p 19268 |wc -l

  sleep 10
  done

  ···

* lsof|awk '{print $2}'|sort|uniq -c|sort -nr|more

* netstat -an | grep CLOSE_WAIT | grep 8092

* netstat -ant|awk '/^tcp/ {++S[$NF]} END {for(a in S) print (a,S[a])}'

* ps aef | grep pid



### history

* 显示时间 export HISTTIMEFORMAT='%F %T'
* 显示记录数：HISTSIZE=200

### linux时间差8小时

```
修改时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

VirtualBox 时间不同步
1. vboxmanage list vms 显示虚拟下所有机器
2. 关闭/开启同步
	关闭时间同步：vboxmanage guestproperty set <虚拟机名/虚拟机UUID> --timesync-set-stop
	打开时间同步：vboxmanage guestproperty set <虚拟机名/虚拟机UUID> --timesync-set-start
```





## SSH 免密登录

> Ssh 免官登录，允许用户远程登录机器、scp操作，不需要密码
>
> 参见：https://blog.csdn.net/BD_fuhong/article/details/103295240

生成密码参见网上：ssh-keygen

```
A免密操作B
在A上执行 ssh-copy-id -i ~/.ssh/id_rsa.pub user@B.B.B.B
在B的.ssh文件夹下回自动生成 authorized_keys文件

注意：
  sshd为了安全，对属主的目录和文件权限有所要求。如果权限不对，则ssh的免密码登陆不生效。
  用户目录权限为 755 或者 700，就是不能是77x。
  .ssh目录权限一般为755或者700。
  rsa_id.pub 及authorized_keys权限一般为644
  rsa_id权限必须为600
解决方案：
    chmod 700 /home/hadoop 

```



```
两个机器：A、B
允许A远程免密访问B
1. A执行ssh-keygen 一路驾车。执行完成后会有.ssh目录下生成id_rea.pub公钥文件
2. B 同理执行
3. A机器执行 ssh-copy-id -i ~/.ssh/id_rsa.pub user@B.B.B.B
4. 测试：scp A机器某文件 user@B.B.B.B:/home/xx
5. 执行完后，查看B相应目录是否有文件
```

 

## 防火墙

* 开启关闭

  ```
  关闭防火墙： systemctl stop firewalld.service
  开启： systemctl start firewalld.service
  	 先用：systemctl unmask firewalld.service 
     然后：systemctl start firewalld.service
  开机运行：systemctl enable firewalld.
  关闭开机运行： systemctl disable firewalld.service
  ```

* 查看防火墙状态 systemctl status firewalld  或 firewall-cmd --state

* 添加、删除规则

  ```
  开启端口
  #（--permanent永久生效，没有此参数重启后失效）
  #注：可以是一个端口范围，如1000-2000/tcp
  firewall-cmd --zone=public --add-port=80/tcp --permanent   
  移除端口
  firewall-cmd --zone=public --remove-port=80/tcp --permanent
  firewall-cmd --permanent --remove-port=123/tcp
  ```

* 查看端口

  * 查看端口列表： firewall-cmd --list-port
  * 查看端口： firewall-cmd --query-port=80/tcp

* 刷新防火墙

```
重新加载防火墙 firewall-cmd --reload
```



## 网络抓包

* 查看网卡: tcpdump -D 

* 抓包：tcpdump -i 网卡 -w  /root/1.pcap  请求完成后，断开命令即可生成文件

* 使用 wireshark分析文件

  * 过滤源ip、目的ip

    ```
    查找目的地址为192.168.101.8的包，ip.dst==192.168.101.8；查找源地址为ip.src==1.1.1.1
    ```

  * 端口过滤: tcp.port==80

  * 协议过滤: http

  * 过滤get包

    * ```
      http.request.method=="GET",过滤post包，http.request.method=="POST
      ```

  * 连接符and的使用：ip.src==192.168.101.8 and http

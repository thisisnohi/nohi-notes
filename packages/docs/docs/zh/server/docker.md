---
sidebar: auto
---

# docker
> 安装见: https://www.cnblogs.com/yufeng218/p/8370670.html
> 介绍：https://www.cnblogs.com/s-b-b/p/8533932.html

## 配置
### 镜像加速

*  /etc/docker/daemon.json（Linux）
*  %programdata%\docker\config\daemon.json（Windows）
```
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```

## 常用
* 镜像操作
	* 查看当前本地镜像列表: docker images
	* 查看远程相关镜像镜像: docker search 镜像名称
	* 拉取镜像到本地: docker pull xxx
	* 删除镜像: docker rmi 镜像名字
		* 当存在多个名字一样的镜像时候，可以通过指定tag方式来操作，如ubuntu:16.04
* 容器操作
	* 创建一个docker容器，返回容器的id: docker create 镜像名字
	* 运行docker容器：docker start 
	* 新建容器且运行，也就是上面两步一块执行: docker run 镜像名字
		* 如果镜像不在，从源拉去
		* p：指定映射端口，如运行一个nginx服务，那么我可以设置 -p 8080:80来把本地的8080端口映射到容器里的80端口。
		* d：容器作为一个守护进程去进行运行，也就是保持后台运行，运行后会返回cotainer id。
	* 停止容器: docker stop  容器id
	* 
	* 查看进程: docker ps
		* docker ps -a
	* 删除容器: docker rm 容器id
* 容器与镜像间的操作
	* 终端连接到容器: docker exec -i -t 容器id bash
	* 复制文件到容器里面: docker cp index.html 镜像id://usr/share/nginx/html
	* 保存更改并生成为一个新的image文件: docker commit -m "mess" 镜像id 镜像名字

* 查看容器内的标准输出: docker logs `CONTAINER ID` / docker logs `NAMES`
	* docker logs -f id/name 类似tail -f
* 停止容器: docker stop `CONTAINER ID` / docker stop `NAMES`
* 查看命令帮助:  docker command --help 如:docker status --help
* docker pull training/webapp  # 载入镜像
* docker run -d -P training/webapp python app.py
	* -d:让容器在后台运行。
	* -P:将容器内部使用的网络端口映射到我们使用的主机上。-p 8080:80来把本地的8080端口映射到容器里的80端口。
* docker run -d -p 5000:5000 training/webapp python app.py  -p 设置端口映射
* docker stop id/name
* docker start id/name 重启
* docker rm id/name 删除容器
	* 删除容器时，容器必须是停止状态.

* 查看端口映射: docker port id/name
* 查看容器进程: docker top  id/name
* 查看容器底层信息: docker inspect id/name



## 使用

### Docker Hello World

* docker run ubuntu:15.10 /bin/echo "Hello world"
	* run:与前面的 docker 组合来运行一个容器。
	* ubuntu:15.10指定要运行的镜像，Docker首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像。
	* /bin/echo "Hello world": 在启动的容器里执行的命令

### 运行交互式的容器

* docker run -i -t ubuntu:15.10 /bin/bash
	* -t:在新容器内指定一个伪终端或终端。
	* -i:允许你对容器内的标准输入 (STDIN) 进行交互。

### 启动容器（后台模式）

* docker run -d ubuntu:15.10 /bin/sh -c "while true; do echo hello world; sleep 1; done"

## 容器
* docker pull training/webapp  # 载入镜像
* docker run -d -P training/webapp python app.py
	* -d:让容器在后台运行。
	* -P:将容器内部使用的网络端口映射到我们使用的主机上。
	*  docker run -d -p 5000:5000 training/webapp python app.py  -p 设置端口映射

## 镜像
* 查看镜像: docker image
	* REPOSITORY：表示镜像的仓库源
	* TAG：镜像的标签
	* IMAGE ID：镜像ID
	* CREATED：镜像创建时间
	* SIZE：镜像大小
	
* 获取镜像: docker pull ubuntu:13.10  
* 查找镜像: docker search httpd
* 创建镜像: 
* 设置镜像标签:  docker tag 860c279d2fec runoob/centos:dev



## Docker网络

* 单机网络
	* Bridge Network
	* Host Network
	* None Network
* 多机网络
	* Overlay Network
	* 安装插件: etcd

* docker network ls 查看网络
* docker network create -h  查看帮助
* docker network create -d bridge my-bridge 创建网络类型
* docker run -d --name test3 --network my-bridge hello-world-loop
* docker network connect -h

* docker run -d --name test2 --link test hello-world-loop


* 测试
	*  docker run -d -p 5000:5000 --name test training/webapp python app.py
	*   docker run -d -p 5001:5001 --name test2 --link test training/webapp python app.py

	* docker network create -d bridge my-bridge 创建网络
	* docker run -d -p 5003:5003 --network my-bridge --name test3 --link test training/webapp python app.py 指定网络
	* docker network connect my-bridge test 指定网络连接容器
	
### Docker的镜像和容器
* docker 依赖的底层技术
	* namespaces:访问隔离(pid,network,mnt)
	* cgroup:资源控制
	* ufs:文件系统隔离

* docker -o test.tar test 导出image
* docker load -i test.tar 导入image

* docker exec -it name bash 进入容器中

* docker export containerid -o container.tar 导出容器
* docker import container.tar xxxx/aaa  导入

* 资源监控
	* docker stats id
	* docker inspect 

## 管理界面

> DockerUI: http://192.168.56.101:9000 
> Portainer: http://192.168.56.101:9001 admin/a**

### DockerUI
#### 安装
* 拉取镜像: docker pull uifd/ui-for-docker 
* 启动容器: docker run -it -d --name docker-web -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock docker.io/uifd/ui-for-docker 
* 界面: ip:9000

#### 总结
> 因为没有登录体系，所以很难在公司里流通。因为这样，每个人都可以去控制，即使通过TLS来控制权限，但无法将容器管理权限分配给某个用户，所以最终放弃该平台。

* 优点：

	支持容器管理
	支持镜像管理
	基于docker api，自身也是一个容器。
	稳定性高
	可动态显示显示容器之间关系图
	容器管理，增加端口映射，增加系统变量、映射目录等

* 缺点：

	没有登录验证，因为没有登录体系，目前解决办法是，只开放本地访问，或者通过TLS来对权限进行控制。
	无法分配某容器给某用户。
	不支持多主机。
	不支持集群swarm等
	功能少
	不支持控制台命令

### Shipyard
> 打不开的，作者已经弃坑此项目: https://blog.hans362.cn/archives/266/


### Portainer

#### 安装
* 拉取portainer镜像：
  * docker pull docker.io/portainer/portainer
* 镜像名打了tag：docker tag docker.io/portainer/portainer portainer
* 运行,映射端口到9001: docker run -d -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --name portainer portainer/portainer 
* 打开浏览器: ip:9001
> 注：
> 　　如果出现创建用户／密码后，登录异常，查看服务器时间是否太过早（如果太早，则修改，则可以登录）

#### 总结
* 优点
	支持容器管理、镜像管理
	轻量级，消耗资源少
	基于docker api，安全性高，可指定docker api端口，支持TLS证书认证。
	支持权限分配
	支持集群

* 缺点
	功能不够强大。
	容器创建后，无法通过后台增加端口。


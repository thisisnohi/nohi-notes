# jenkins

> create by nohi 20220706

## 参考：

* Docker版本Jenkins的使用 https://www.jianshu.com/p/0391e225e4a6

## 安装

* 拉取镜像：docker pull jenkins/jenkins

* 查看镜像： docker images

* 启动

  ```
  docker run -d -p 8002:8080 -p 50000:50000 -v /home/common/docker_volumes/jenkins:/var/jenkins_home -v /etc/localtime:/etc/localtime --name jenkins docker.io/jenkins/jenkins
  ```

  

## TODO

* post step 环境变量
* 

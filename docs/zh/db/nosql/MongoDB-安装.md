# MongoDB

> create by nohi 20240913



## 安装

* mongodb
* mongosh

### macOS 安装MongoDB

:point_right:  [参考](https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-os-x/)

```shell
-- 安装 公式和数据库工具
brew tap mongodb/brew
-- 安装 MongoDB社区版 7.0
brew install mongodb-community@7.0
-- 运行
brew services start mongodb-community@7.0
-- 停止
brew services stop mongodb-community@7.0
-- 查看信息
brew services info mongodb-community@7.0

-- mongod作为后台进程运行
mongod --config /usr/local/etc/mongod.conf --fork

-- 安装mongodb-shell
brew install mongodb-community-shell
```

* mongosh

  ```shell
  mongosh --version
  -- 连接服务
  mongosh --host <hostname>:<port>
  
  -- 
  mongosh --host 127.0.0.1 --port 27017 -u "kinit" -p "123456" --authenticationDatabase "kinit"
  ```

### docker下安装

> 参考：https://zhuanlan.zhihu.com/p/610560696

* 拉取最新镜像

  ```shell
  # 搜索可用镜像
  docker search mongo
  # 拉取最新镜像
  docker pull mongo:latest
  ```

* 运行一个MongoDB窗口

  ```shell 
  docker run -itd --name mongo-test -p 27017:27017 mongo --auth
  ```

  **参数说明：**

  - **-itd：**其中，i是交互式操作，t是一个终端，d指的是在后台运行。
  - **--name mongo-test：**容器名称
  - **-p 27017:27017** ：映射容器服务的 27017 端口到宿主机的 27017 端口。外部可以直接通过 宿主机 ip:27017 访问到 mongo 的服务。
  - **--auth**：需要密码才能访问容器服务（注意：安全问题，MongoDB默认是不开启权限验证的，不过设置了这里就相当于修改MongoDB的配置auth=ture启用权限访问）。

* 进入创建的MongoDB容器

  ```
  docker exec -it mongo-test mongosh
  ```

  * 在admin数据库中通过创建一个用户，赋予用户root权限

    ```
    # 进入admin数据库 use admin 
    # 创建一个超级用户 db.createUser({ user:"root", pwd:"123456", roles:[{role:"root",db:"admin"}] } );
    
    #授权登录
    db.auth('root','123456')
    ```






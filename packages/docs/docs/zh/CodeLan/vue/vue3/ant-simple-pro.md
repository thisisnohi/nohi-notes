# ant-simple-pro

> create by nohi 20220109

## 参考

* https://github.com/lgf196/ant-simple-pro
* [git/ant-aimple-pro](https://github.com/lgf196/ant-simple-pro)



## 文档

* [DOCS](http://blog.lgf196.top/ant-simple-pro-document/)
* [GIT/GITEE](https://github.com/lgf196/ant-simple-pro)



## 配置

* vite.config.js

  ```
  base: '/ant-simple-pro/',
  
  port: 8002  运行端口
  ```

## 操作

* 启动：yarn dev --host 允许其他机器访问
* 访问：http://localhost:8002/ant-simple-pro
  * 账号🔒：lgf@163.com
  * 密码🔑:123456



## 问题

* (build后无法使用 yarn dev 后，只有当前nginx跳转，外层再nginx跳转则异常)

  * 210 centos linux 

  ```
  yarn dev 启动后， ngnix 配置 /ant-sample-pro 
  
  Http:/10.0.0.210/ant-sample-pro/ 可以访问
  
  外网：http://home.nohi.online:8888/ant-sample-pro/  无法显示页面，network不停的重定向
  ```

  
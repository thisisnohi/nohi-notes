# Nacos

> create by nohi 20211013
>
> 参考：https://nacos.io/zh-cn/docs/what-is-nacos.html



## 安装使用

参考：https://nacos.io/zh-cn/docs/quick-start.html

* startup.sh -m standalone

* http://127.0.0.1:8848/nacos/index.html

### 服务注册&发现和配置管理

* 服务注册

```
curl -X POST 'http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&ip=20.18.7.10&port=8080'
```

* 服务发现

```
curl -X GET 'http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName'
```

* 发布配置

```
curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test&content=HelloWorld"
```

* 获取配置

```
curl -X GET "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test"
```






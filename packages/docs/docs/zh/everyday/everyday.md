# 记录每一天



## 注解属性 20200705

* Target
* Renention

### tomcat配置文件 HOST Server作用

> 参见：https://www.cnblogs.com/hongdada/p/6698003.html



### tomcat jetty underrow

* jetty

  * 参考：

    * https://blog.csdn.net/shuaishuai1234/article/details/86625986
    * https://blog.csdn.net/shuaishuai1234/article/details/86627055

  * 命令

    ```
    新项目，空文件，部署启动
    JETTY_BASE=/tmp/mybase
    mkdir $JETTY_BASE
    cd $JETTY_BASE
    cp $JETTY_HOME/demo-base/webapps/async-rest.war webapps/ROOT.war
    java -jar $JETTY_HOME/start.jar --add-to-startd=http,deploy
    命令用于创建一个新的根路径，同时激活HTTP connector和web 应用部署模块，并且拷贝一个web应用例子来部署
    
    指定端口号
    java -jar $JETTY_HOME/start.jar jetty.http.port=8081
    
    添加并激活HTTPS和HTTP2模块
    java -jar $JETTY_HOME/start.jar --add-to-startd=https,http2
    ```

    

### Tomcat系统架构与设计模式



### servlet3.1 3.0 区别



### emebdtomcat springmvc restController启用

* 只启用了根目录，多级目录未启用



### Http1.0/2.0



### Kotlin


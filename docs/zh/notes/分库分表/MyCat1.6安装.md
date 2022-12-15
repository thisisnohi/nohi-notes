
# MyCat1.6安装.md

mycat目前稳定版本是1.6.7.x版本，本文选择了1.6.7.6。    
mycat安装前必须已经部署好数据库集群。
如何部署数据库集群，请参考<a href="https://github.com/AlphaYu/Adnc/tree/master/doc/mariadb" target="_blank" title="mariadb基于GTID主从复制搭建">mariadb基于GTID主从复制搭建</a>。

## 下载mycat安装包

```shell
#新建目录
mkdir /root/data/mycat
#切换目录
cd /root/data/mycat
#下载mycat release1.6.7.6到当前目录
wget http://dl.mycat.org.cn/1.6.7.6/20201126013625/Mycat-server-1.6.7.6-release-20201126013625-linux.tar.gz
mv Mycat-server-1.6.7.6-release-20201126013625-linux.tar.gz mycat1.6.7.6.tar.gz
#解压conf目录到当前目录，因为使用docker直接挂载conf目录会报错，mycat启动时需要依赖conf目录中的文件。
tar -zxvf mycat1.6.7.6.tar.gz -C /root/data/ mycat/conf
```

## 编辑配置文件

调整`/root/data/mycat/conf`目录中的`server.xml` 与 `schema.xml` 两个核心配置文件。
- server.xml <a href="https://github.com/AlphaYu/Adnc/blob/master/doc/mycat/server.xml">请参考这里</a>  
- schema.xml <a href="https://github.com/AlphaYu/Adnc/blob/master/doc/mycat/schema.xml">请参考这里</a>
- server.xml 关键节点介绍
```xml
  <!-- mycat的账号 -->
  <user name="root" defaultAccount="true"> 
    <!-- 密码 -->
    <property name="password">alpha.mycat</property>  
    <!-- 该账号可以访问的逻辑库,对应schema.xml文件的schema节点的name-->
    <property name="schemas">adnc_usr,adnc_maint,adnc_cus</property> 
  </user> 
```
- schema.xml 关键节点介绍
```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
    <!-- 配置3个逻辑库-->
	<schema name="adnc_usr" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn_usr"></schema>
	<schema name="adnc_maint" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn_maint"></schema>
	<schema name="adnc_cus" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn_cus"></schema>

    <!-- 逻辑库对应的真实数据库-->
	<dataNode name="dn_usr" dataHost="dh_adnc" database="adnc_usr" />
	<dataNode name="dn_maint" dataHost="dh_adnc" database="adnc_maint" />
	<dataNode name="dn_cus" dataHost="dh_adnc" database="adnc_cus" />

    <!--真实数据库所在的服务器地址，这里配置了1主2从。主服务器(hostM1)宕机会自动切换到(hostS1) -->
	<dataHost name="dh_adnc" maxCon="1000" minCon="10" balance="1" writeType="0" dbType="mysql" dbDriver="native">
		<heartbeat>select user()</heartbeat>
		<writeHost host="hostM1" url="172.20.0.11:3306" user="root" password="alpha.abc" >
			<readHost host="hostS2" url="172.20.0.13:3306" user="root" password="alpha.abc" />
		</writeHost>
		<writeHost host="hostS1" url="172.20.0.12:3306" user="root" password="alpha.abc" />
	</dataHost>

</mycat:schema>
```
- 每个节点详细介绍请参考 <a href="http://www.mycat.org.cn/document/mycat-definitive-guide.pdf" target="_blank">mycat权威指南</a>

## 下载dockerfile
由于mycat官方并没有提供docker镜像，我们需要自己编写dockerfile文件打包镜像。
```shell
#下载dockerfile文件到当前目录
wget https://raw.githubusercontent.com/AlphaYu/Adnc/master/doc/mycat/Dockerfile
#如果下载失败，请手动下载并上传到/root/data/mycat目录，文件地址如下
#https://github.com/AlphaYu/Adnc/blob/master/doc/mycat/Dockerfile
```
最终目录结构如下图<br/>
![mycat部署](https://aspdotnetcore.net/wp-content/uploads/2020/12/mycat_dir.jpg)

## 创建mycat镜像与容器
```shell
#创建镜像文件
docker build -t mycat:1.6.7.6 .
#运行容器并挂载配置文件目录与日志目录
#-v /root/data/mycat/conf:/usr/local/mycat/conf 挂载配置文件目录
#-v /root/data/mycat/logs:/usr/local/mycat/logs 挂载日志目录
# --network=adnc_net --ip 172.20.0.16  adnc_net是自建的bridge网络，如果使用docker默认网络，不需要这段
docker run --privileged=true -p 8066:8066 -p 9066:9066 --name mycat -v /root/data/mycat/conf:/usr/local/mycat/conf -v /root/data/mycat/logs:/usr/local/mycat/logs --network=adnc_net --ip 172.20.0.16 -d mycat:1.6.7.6
```
## 验证
```shell
# 进入mariadb/mysql容器
docker exec -it mariadb01 /bin/bash
# 登录mycat,172.20.0.16 是指mycat容器的Ip地址，如果容器没有指定固定Ip，你的可能不一样，请注意。
mysql -uroot -palpha.mycat -P8066 -h172.20.0.16
# 显示所有数据库
show databases;
# 多次执行下面的sql,观察hostname的变化。
select @@hostname;
```





## oracle、mysql

> 参考：https://www.cnblogs.com/yhq1314/p/9968380.html

* oralce

  ```
  CREATE TABLE UC_USER(ID varchar2(50) primary key,UC_NAME VARCHAR(64), UC_AGE NUMBER(4),CREATE_TIME DATE);
  CREATE TABLE UC_ORDER(ID varchar2(50) primary key,UC_ID varchar2(50),SHOP_NAME VARCHAR(64),CREATE_TIME DATE);
  CREATE TABLE TRADERS(ID varchar2(50) primary key,UC_ID varchar2(50), ORDER_ID varchar2(50), FEE number(20,4),TRADE_STATUS char(1),CREATE_TIME DATE);
  
  INSERT INTO UC_USER(ID,UC_NAME,UC_AGE, CREATE_TIME)VALUES(1,'张三', 18,SYSDATE);
  INSERT INTO UC_USER(ID,UC_NAME, UC_AGE, CREATE_TIME)VALUES(2,'李四', 19,SYSDATE);
  INSERT INTO UC_ORDER(ID,UC_ID,SHOP_NAME,CREATE_TIME)VALUES(1,1,'mycat技术权威指南书籍',SYSDATE);
  INSERT INTO UC_ORDER(ID,UC_ID,SHOP_NAME,CREATE_TIME)VALUES(2,2,'mysql高性能第三版',SYSDATE);
  INSERT INTO TRADERS(ID,UC_ID,ORDER_ID,FEE,TRADE_STATUS,CREATE_TIME)VALUES(1,1,1,59,1,SYSDATE);
  INSERT INTO TRADERS(ID,UC_ID,ORDER_ID,FEE,TRADE_STATUS,CREATE_TIME)VALUES(2,2,2,119,1,SYSDATE);
  ```

* mysql

  ```
  CREATE TABLE UC_USER_2(ID VARCHAR(50), UC_NAME VARCHAR(64), UC_AGE INT(4) , CREATE_TIME DATETIME);
  CREATE TABLE UC_ORDER_2(ID VARCHAR(50),UC_ID int,SHOP_NAME VARCHAR(64),CREATE_TIME DATETIME);
  CREATE TABLE TRADERS_2(ID VARCHAR(50),UC_ID int,ORDER_ID VARCHAR(50), FEE decimal(20,4) , TRADE_STATUS char(1),CREATE_TIME DATETIME);
  ```

  
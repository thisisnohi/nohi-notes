# Mycat操作结果

> create by nohi 20210621

## 环境

* 版本
  * 最新稳定版本：1.6.7.6 源码、安装文件都不能使用
  * 源码分支：1673-2019-9-27，可以使用
  * 源码： https://github.com.cnpmjs.org/MyCATApache/Mycat-Server.git 

* 数据库：

  * Mycat:  jdbc:mysql://127.0.0.1:8066/mycat_db?useUnicode=true&characterEncoding=utf-8&serverTimezone=GMT&useServerPrepStmts=true

  * mysql

    * 主从：

      ```
      mariadb01  root/alpha.abc  jdbc:mysql://192.168.1.236:13311/mysql
      mariadb02  root/alpha.abc  jdbc:mysql://192.168.1.236:13312/mysql
      mariadb03  root/alpha.abc  jdbc:mysql://192.168.1.236:13313/mysql
      
      database:
      	adnc_cus_dev
      	adnc_maint_dev
      	adnc_usr_dev
      ```

    * 单节点

      ```
      mariadb21 root/alpha.abc jdbc:mariadb://192.168.1.236:13321/mysql
      
      databases:
        mycat_db1
        mycat_db2
        mycat_db3
        mycat_db4
      table：
      	t_user
      ```

  * Oracle:

    ```
    mycat/mycat1234 jdbc:oracle:thin:@192.168.1.211:1521:orcl
    ```

## 结果

* 日期

  ```
  mysql-plus 语句
  INSERT INTO UC_USER  ( id, UC_NAME, UC_AGE, CREATE_TIME )  VALUES  ( ?, ?, ?, ? )
  
  -- mycat执行语句
  INSERT INTO UC_USER(id,UC_NAME,UC_AGE,CREATE_TIME)VALUES('22','姓名12',33,'2021-06-22 10:37:23.088')
  ```

  * CREATE_TIME 日期类型 mysql为format后字符串， oracle不支持，需要转换

* 事务

  * 单表事务正常没有问题： mysql oracle
  * 分布式事务 ？？？

* 分片

  * 一张表多结点，一个结点异常，查询异常报某结点.表不存在

    ```
    mycat_db2.t_user doesn't exist
    ```

* 查询

  ```
  select u.user_id, u.user_name, u2.user_id, u2.user_name from t_user u
  , t_user u2
  where u.user_id != u2.user_id
   and u.user_age = u2.user_age;
  
  select * from t_user u
  where u.user_id in (
     select t.user_id from t_user t
      where t.user_age >= 13
  );
  ```

  


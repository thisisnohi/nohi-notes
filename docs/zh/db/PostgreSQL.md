# PostgreSQL

> create by nohi 20240310

##一  概念

### 简介

**1.PostgreSQL**: 是以[加州大学](https://link.jianshu.com?t=http://baike.baidu.com/view/182408.htm)伯克利分校计算机系开发的 POSTGRES，现在已经更名为PostgreSQL，版本 4.2为基础的对象[关系型数据库管理系统](https://link.jianshu.com?t=http://baike.baidu.com/view/1450387.htm)（ORDBMS）。PostgreSQL支持大部分 SQL标准并且提供了许多其他现代特性：复杂查询、[外键](https://link.jianshu.com?t=http://baike.baidu.com/view/68073.htm)、[触发器](https://link.jianshu.com?t=http://baike.baidu.com/view/71792.htm)、视图、[事务](https://link.jianshu.com?t=http://baike.baidu.com/view/121511.htm)完整性、[MVCC](https://link.jianshu.com?t=http://baike.baidu.com/view/1887040.htm)。同样，PostgreSQL 可以用许多方法扩展，比如， 通过增加新的数据类型、函数、操作符、[聚集函数](https://link.jianshu.com?t=http://baike.baidu.com/view/2537411.htm)、索引。免费使用、修改、和分发 PostgreSQL，不管是私用、商用、还是学术研究使用。

**2.psql**: 是PostgreSQL数据库的命令行交互工具

**3.pgAdmin**: 是PostgreSQL数据库的图形化管理工具

### 安装

>  mac安装：https://www.jianshu.com/p/fedda9824f6a

### 常用语句

* 进入命令行工具
  ```
  psql
  ```

* 用户相关

  ```
  修改用户密码
   alter user db1 with password 'db1';
  1.查看数据库用户列表: \du
  2.创建数据库用户: create user db1 with password 'db12345';
  3.删除数据库用户: drop user user1;
  ```

* 数据库相关

  ```sql
  1.查看数据库列表: \l (list的意思)
  2.创建数据库: create database db1;
  3.删除数据库: drop database db1;
  
  -- 创建数据库指定所属者 
  create database db1 owner db1; 
  -- 将数据库得权限，全部赋给某个用户
  grant all on database dbtest to username;
  ```

* 创建和删除 数据库表

  ```sql
  对应命令如下(在postgres=# 环境下)：
  1.选择数据库: \c DatabaseName (choose的意思)
  2.创建数据库表: create table people;
  3.删除数据库表: drop table people;
  4.查看数据库信息：\d (database list的意思)
  ```

* 模式

  ```sql
  \dn
  查看数据库中的所有模式,默认模式为public
  CREATE SCHEMA custom;
  ALTER SCHEMA custom OWNER TO custom;
  -- 创建表指定模式
  CREATE TABLE custom.test (id integer not null);
  ```

  
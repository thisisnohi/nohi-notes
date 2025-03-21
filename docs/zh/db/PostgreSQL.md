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
  2.创建数据库: create database runoobdb;
    -- 参数： -D tablespace 指定数据库默认表空间;-E encoding 指定数据库的编码。
  3.删除数据库: DROP DATABASE [ IF EXISTS ] runoobdb;
  -- 命令行删除数据库 runoobdb （只能超管用户操作）
  4.dropdb -h localhost -p 5432 -U postgres runoobdb --if-exists
  
  -- 创建数据库指定所属者 
  create database db1 owner db1; 
  -- 将数据库得权限，全部赋给某个用户
  grant all on database dbtest to username;
  ```

* 创建和删除 数据库表

  ```sql
  对应命令如下(在postgres=# 环境下)：
  1.选择数据库: \c DatabaseName (choose的意思) 
  2.创建数据库表: create table table_name;
    CREATE TABLE table_name(
     column1 datatype,column2 datatype,...columnN datatype,PRIMARY KEY(一个或多个列)
    );
  3.删除数据库表: DROP TABLE table_name1,table_name;
  4.查看数据库信息：\d (database list的意思)
  
  -- 系统命令行直接进入数据库：-U为用户  nohi为数据库
  psql -h localhost -p 5432 -U postgres nohi
         
         
  CREATE TABLE COMPANY(
     ID INT PRIMARY KEY     NOT NULL,
     NAME           TEXT    NOT NULL,
     AGE            INT     NOT NULL,
     ADDRESS        CHAR(50),
     SALARY         REAL
  );
  CREATE TABLE DEPARTMENT(
     ID INT PRIMARY KEY      NOT NULL,
     DEPT           CHAR(50) NOT NULL,
     EMP_ID         INT      NOT NULL
  );       
  ```

* 模式

  ```sql
  \dn
  查看数据库中的所有模式,默认模式为public
  模式（SCHEMA）可以看着是一个表的集合。一个模式可以包含视图、索引、数据类型、函数和操作符等。
  相同的对象名称可以被用于不同的模式中而不会出现冲突，例如 schema1 和 myschema 都可以包含名为 mytable 的表。
  
  CREATE SCHEMA myschema;
  DROP SCHEMA myschema;
  DROP SCHEMA myschema CASCADE;
  ALTER SCHEMA custom OWNER TO custom;
  -- 创建表指定模式
  CREATE TABLE myschema.test (id integer not null);
  ```
  

* 数据

  ```sql 
  CREATE TABLE COMPANY(
     ID INT PRIMARY KEY     NOT NULL,
     NAME           TEXT    NOT NULL,
     AGE            INT     NOT NULL,
     ADDRESS        CHAR(50),
     SALARY         REAL,
     JOIN_DATE      DATE
  );
  -- 全部字段
  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (1, 'Paul', 32, 'California', 20000.00,'2001-07-13');
  -- 部分字段
  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,JOIN_DATE) VALUES (2, 'Allen', 25, 'Texas', '2007-12-13');
  -- 使用 DEFAULT 子句来设置默认值
  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (3, 'Teddy', 23, 'Norway', 20000.00, DEFAULT );
  -- 插入多行
  INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY,JOIN_DATE) VALUES (4, 'Mark', 25, 'Rich-Mond ', 65000.00, '2007-12-13' ), (5, 'David', 27, 'Texas', 85000.00, '2007-12-13');
  ```



## 数据类型

* 数值类型
* 货币类型
* 字符类型
* 日期/时间类型
* 布尔类型
* 枚举类型
* 几何类型
* 网络地址类型
* 位串类型
* 文本搜索类型
* UUID 类型
* XML 类型
* JSON 类型
* 数组类型
* 复合类型
* 范围类型
* 对象标识符类型
* 伪类型

### 1.数值类型

数值类型由 2 字节、4 字节或 8 字节的整数以及 4 字节或 8 字节的浮点数和可选精度的十进制数组成。

| 名字             | 存储长度 | 描述                 | 范围                                         |
| :--------------- | :------- | :------------------- | :------------------------------------------- |
| smallint         | 2 字节   | 小范围整数           | -32768 到 +32767                             |
| integer          | 4 字节   | 常用的整数           | -2147483648 到 +2147483647                   |
| bigint           | 8 字节   | 大范围整数           | -9223372036854775808 到 +9223372036854775807 |
| decimal          | 可变长   | 用户指定的精度，精确 | 小数点前 131072 位；小数点后 16383 位        |
| numeric          | 可变长   | 用户指定的精度，精确 | 小数点前 131072 位；小数点后 16383 位        |
| real             | 4 字节   | 可变精度，不精确     | 6 位十进制数字精度                           |
| double precision | 8 字节   | 可变精度，不精确     | 15 位十进制数字精度                          |
| smallserial      | 2 字节   | 自增的小范围整数     | 1 到 32767                                   |
| serial           | 4 字节   | 自增整数             | 1 到 2147483647                              |
| bigserial        | 8 字节   | 自增的大范围整数     | 1 到 9223372036854775807                     |

### 2.货币类型

money 类型存储带有固定小数精度的货币金额。

numeric、int 和 bigint 类型的值可以转换为 money，不建议使用浮点数来处理处理货币类型，因为存在舍入错误的可能性。

| 名字  | 存储容量 | 描述     | 范围                                           |
| :---- | :------- | :------- | :--------------------------------------------- |
| money | 8 字节   | 货币金额 | -92233720368547758.08 到 +92233720368547758.07 |

### 3.字符类型

```
1	character varying(n), varchar(n) 变长，有长度限制
2	character(n), char(n) f定长,不足补空白
3	text 变长，无长度限制
```

### 4.日期/时间类型

| 名字                                      | 存储空间 | 描述                     | 最低值        | 最高值        | 分辨率         |
| :---------------------------------------- | :------- | :----------------------- | :------------ | :------------ | :------------- |
| timestamp [ (*p*) ] [ without time zone ] | 8 字节   | 日期和时间(无时区)       | 4713 BC       | 294276 AD     | 1 毫秒 / 14 位 |
| timestamp [ (*p*) ] with time zone        | 8 字节   | 日期和时间，有时区       | 4713 BC       | 294276 AD     | 1 毫秒 / 14 位 |
| date                                      | 4 字节   | 只用于日期               | 4713 BC       | 5874897 AD    | 1 天           |
| time [ (*p*) ] [ without time zone ]      | 8 字节   | 只用于一日内时间         | 00:00:00      | 24:00:00      | 1 毫秒 / 14 位 |
| time [ (*p*) ] with time zone             | 12 字节  | 只用于一日内时间，带时区 | 00:00:00+1459 | 24:00:00-1459 | 1 毫秒 / 14 位 |
| interval [ *fields* ] [ (*p*) ]           | 12 字节  | 时间间隔                 | -178000000 年 | 178000000 年  | 1 毫秒 / 14 位 |
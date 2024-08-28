# mysql

> create by nohi 20210105



* 常用命令

  ```
  登录：mysql -uroot -p123456
  ```

  

## 创建用户

* mysql 8

  ```
  CREATE USER 'nohi'@'%' IDENTIFIED BY 'nohi';
  GRANT ALL ON *.* TO 'nohi'@'%'; 
  ALTER USER 'nohi'@'%' IDENTIFIED WITH mysql_native_password BY 'nohi';
  ```

* 修改密码

  ```
  参考：https://www.cnblogs.com/tmdsleep/p/10967432.html
  
  mysql> select host,user,authentication_string from mysql.user;
  host: 允许用户登录的ip‘位置'%表示可以远程；
  user:当前数据库的用户名；
  authentication_string: 用户密码（后面有提到此字段）；
  
  1.8. 设置（或修改）root用户密码：
  默认root密码为空的话 ，下面使用navicat就无法连接，所以我们需要修改root的密码。
  这是很关键的一步。此处踩过N多坑，后来查阅很多才知道在mysql 5.7.9以后废弃了password字段和password()函数；authentication_string:字段表示用户密码。
  下面直接演示正确修改root密码的步骤：
  
  一、如果当前root用户authentication_string字段下有内容，先将其设置为空，否则直接进行二步骤。
  
  use mysql; 
  update user set authentication_string='' where user='root'
  
  3.下面直接演示正确修改root密码的步骤：
  
  二、使用ALTER修改root用户密码,方法为 ALTER user 'root'@'localhost' IDENTIFIED BY '新密码'。如下：
  
  ALTER user 'root'@'localhost' IDENTIFIED BY 'JOhydhLfMsWyBcn#'
  
  此处有两点需要注意：
  1、不需要flush privileges来刷新权限。
  2、密码要包含大写字母，小写字母，数字，特殊符号。
  修改成功； 重新使用用户名密码登录即可；
  
  ```


## 常用语句/函数

### 日期/时间

```mysql
-- 获取当前系统日期、时间
select sysdate() "当前系统时间(年月日时分秒)", current_date "日期", current_time "时间",current_timestamp "年月日时分秒";

-- 日期时间转换为字符串
select current_timestamp, date_format(current_timestamp, '%Y-%m-%d'), date_format(current_timestamp, '%h-%i-%s');

-- 增加秒数
select now(), addtime(now(),1), addtime(now(),10), addtime(now(),-10); -- 加1秒
-- adddate 增加 秒、时、天、月、年
select now() 当前, adddate(now(),1) 一天后, adddate(now(), interval 1 day) 一天后, adddate(now(), interval 1 hour) 一小时后,adddate(now(), interval 1 month ) 一月后 ;
```



### 递归`WITH RECURSIVE`

```mysql
 -- 查询子节点  含自己
 WITH RECURSIVE DATA_ZONE_TREE (id, pid, deep, name, pinyin_prefix, pinyin, ext_id, ext_name) AS
      (
         SELECT T1.id, T1.pid, T1.deep, T1.name, T1.pinyin_prefix, T1.pinyin, T1.ext_id, T1.ext_name
         from DATA_ZONE T1
         where T1.ID = '341122'
         UNION ALL
         SELECT T2.id, T2.pid, T2.deep, T2.name, T2.pinyin_prefix, T2.pinyin, T2.ext_id, T2.ext_name
         from DATA_ZONE T2, DATA_ZONE_TREE T3
         WHERE T2.pid = T3.id
       )
SELECT T.* FROM DATA_ZONE_TREE T ;
```

### 行转列`group_concat`

```mysql
WITH RECURSIVE DATA_ZONE_TREE (id, pid, deep, name, pinyin_prefix, pinyin, ext_id, ext_name) AS
       (
         SELECT T1.id, T1.pid, T1.deep, T1.name, T1.pinyin_prefix, T1.pinyin, T1.ext_id, T1.ext_name
         from DATA_ZONE T1
         where T1.ID = '341122'
         UNION ALL
         SELECT T2.id, T2.pid, T2.deep, T2.name, T2.pinyin_prefix, T2.pinyin, T2.ext_id, T2.ext_name
         from DATA_ZONE T2, DATA_ZONE_TREE T3
         WHERE T2.id = T3.pid
       )
select group_concat(ext_name order by deep separator '') INTO returnValue
from ( SELECT distinct ext_name , max(deep) deep FROM DATA_ZONE_TREE T group by ext_name order by deep ) RS order by deep;
```


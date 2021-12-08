# DB

* 登录数据库服务器

  ```
  ssh oracle@215.8.7.60
  export NLS_LANG="AMERICAN_AMERICA.UTF8"
  export ORACLE_SID=appdb1
  sqlplus curvapp/curvapp
  col parameter for a30;
  col value for a25;
  select * from nls_databas
  ```

* 数据库连接三种方式

  ```
  jdbc:oracle:thin:@host:port:SID 
  jdbc:oracle:thin:@//host:port/service_name
  jdbc:oracle:thin:@//localhost:1521/orcl.city.com 
  
  jdbc:oracle:thin:@//215.8.7.66:11521/appdb
  ```
  

## druid

> created by nohi 20191211

### druid 监控

参考：https://blog.csdn.net/weixin_45501830/article/details/100847818

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

  
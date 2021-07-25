# MyCat

> create by nohi 20210618



## [mariadb基于GTID主从复制搭建](https://github.com/AlphaYu/Adnc/tree/master/doc/mariadb)

* 参见：mariadb基于GTID主从复制搭建.md / https://github.com/AlphaYu/Adnc/tree/master/doc/mariadb

* ```
  docker run --name mariadb21 -p 13321:3306 -e MYSQL_ROOT_PASSWORD=alpha.abc -e TZ=Asia/Shanghai --restart=always -v /root/data/mariadb21/conf:/etc/mysql -v /root/data/mariadb21/logs:/var/log/mysql -v /root/data/mariadb21/data:/var/lib/mysql --network=adnc_net --ip 172.20.0.21 -d mariadb:10.5.8
  
  
  ```

  

## docker安装Mycat

* 参考：https://github.com/MyCATApache/Mycat-Server/wiki/2.1-docker%E5%AE%89%E8%A3%85Mycat




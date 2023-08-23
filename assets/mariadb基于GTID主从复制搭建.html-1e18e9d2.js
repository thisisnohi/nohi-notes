import{_ as e,p as a,q as i,a1 as n}from"./framework-449724a9.js";const d={},s=n(`<h1 id="mariadb基于gtid主从复制搭建" tabindex="-1"><a class="header-anchor" href="#mariadb基于gtid主从复制搭建" aria-hidden="true">#</a> mariadb基于GTID主从复制搭建</h1><div align="center"><a href="https://github.com/alphayu/adnc" target="_blank" title="Adnc是一个微服务开发框架 代码改变世界 开源推动社区"><img src="https://aspdotnetcore.net/wp-content/uploads/2020/12/adnc-homepage-logo-3.webp" alt="Adnc是一个微服务开发框架 代码改变世界 开源推动社区"></a></div><p>本文演示环境是在同一台服务器上部署。因为docker创建容器时默认采用bridge网络，会自行分配ip，不允许指定，重启容器会导致ip变更。所以我们需要创建自定义的bridge网络，这样创建容器的时候才能指定ip。</p><h3 id="创建自定义网络" tabindex="-1"><a class="header-anchor" href="#创建自定义网络" aria-hidden="true">#</a> 创建自定义网络</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#创建一个新的bridge网络adnc_net
docker network create --driver bridge --subnet=172.20.0.0/16 --gateway=172.20.0.1 adnc_net
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拉取镜像文件并运行容器" tabindex="-1"><a class="header-anchor" href="#拉取镜像文件并运行容器" aria-hidden="true">#</a> 拉取镜像文件并运行容器</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#拉取mariadb镜像
docker pull mariadb:10.5.8

#启动mariadb01容器
docker run --name mariadb01 -p 13311:3306 -e MYSQL_ROOT_PASSWORD=alpha.abc -e TZ=Asia/Shanghai --restart=always -v /root/data/mariadb01/conf:/etc/mysql -v /root/data/mariadb01/logs:/var/log/mysql -v /root/data/mariadb01/data:/var/lib/mysql --network=adnc_net --ip 172.20.0.11 -d mariadb:10.5.8

#启动mariadb02容器
docker run --name mariadb02 -p 13312:3306 -e MYSQL_ROOT_PASSWORD=alpha.abc -e TZ=Asia/Shanghai --restart=always -v /root/data/mariadb02/conf:/etc/mysql -v /root/data/mariadb02/logs:/var/log/mysql -v /root/data/mariadb02/data:/var/lib/mysql --network=adnc_net --ip 172.20.0.12 -d mariadb:10.5.8

#启动mariadb03容器
docker run --name mariadb03 -p 13313:3306 -e MYSQL_ROOT_PASSWORD=alpha.abc -e TZ=Asia/Shanghai --restart=always -v /root/data/mariadb03/conf:/etc/mysql -v /root/data/mariadb03/logs:/var/log/mysql -v /root/data/mariadb03/data:/var/lib/mysql --network=adnc_net --ip 172.20.0.13 -d mariadb:10.5.8

#查看mariadb三个容器是否正常运行
docker container ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编辑mariadb的配置文件" tabindex="-1"><a class="header-anchor" href="#编辑mariadb的配置文件" aria-hidden="true">#</a> 编辑mariadb的配置文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /root/data/mariadb01/conf/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>拷贝如下内容到my.cnf</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysqld]
server_id = 11    #  一组主从组里的每个id必须是唯一值。推荐用ip位数
log-bin= mysql-bin # 二进制日志，后面指定存放位置。如果只是指定名字，默认存放在/var/lib/mysql下
lower_case_table_names=1 # 不区分大小写
binlog-format=ROW    # 二进制日志文件格式
log-slave-updates=True    # slave更新是否记入日志
sync-master-info=1    # 值为1确保信息不会丢失
slave-parallel-threads=3 #同时启动多少个复制线程，最多与要复制的数据库数量相等即可
binlog-checksum=CRC32    # 效验码
master-verify-checksum=1    # 启动主服务器效验
slave-sql-verify-checksum=1   # 启动从服务器效验
bind-address = 172.20.0.11    # 监听本机网卡ip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /root/data/mariadb02/conf/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>拷贝如下内容到my.cnf</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysqld]
server_id=12
log-bin= mysql-bin #log-bin是二进制文件
relay_log = relay-bin    # 中继日志, 后面指定存放位置。如果只是指定名字，默认存放在/var/lib/mysql下
lower_case_table_names=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vim /root/data/mariadb03/conf/my.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>拷贝如下内容到my.cnf</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[mysqld]
server_id=13
log-bin= mysql-bin
relay_log = relay-bin    # 中继日志, 后面指定存放位置。如果只是指定名字，默认存放在/var/lib/mysql下
lower_case_table_names=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>重启3个容器</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker restart mariadb01
docker restart mariadb02
docker restart mariadb03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建账号-master容器-mariadb01" tabindex="-1"><a class="header-anchor" href="#创建账号-master容器-mariadb01" aria-hidden="true">#</a> 创建账号(master容器(mariadb01))</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker exec -it mariadb01 /bin/bash
mysql -uroot -palpha.abc
grant all privileges on *.* to dbsync@&#39;%&#39; identified by &#39;dbsync123&#39;;
FLUSH PRIVILEGES;
#查看master状态，查看二进制文件名(mysql-bin.000001)和位置(530)：
SHOW MASTER STATUS;
#状态信息如下
+------------------+----------+--------------+------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+------------------+----------+--------------+------------------+
| mysql-bin.000003 |      651 |              |                  |
+------------------+----------+--------------+------------------+
#通过二进制日志跟偏移位置查看此时的GTID值
SELECT BINLOG_GTID_POS(&#39;mysql-bin.000003&#39;, 651);
#内容如下
+------------------------------------------+
| BINLOG_GTID_POS(&#39;mysql-bin.000003&#39;, 651) |
+------------------------------------------+
| 0-11-7197                                |
+------------------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="同步账号到slave容器-mariadb02" tabindex="-1"><a class="header-anchor" href="#同步账号到slave容器-mariadb02" aria-hidden="true">#</a> 同步账号到slave容器(mariadb02)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker exec -it mariadb02 /bin/bash
mysql -uroot -palpha.abc
SET GLOBAL gtid_slave_pos=&#39;0-11-7197&#39;;

CHANGE MASTER TO MASTER_HOST=&#39;172.20.0.11&#39;, MASTER_USER=&#39;dbsync&#39;, MASTER_PASSWORD=&#39;dbsync123&#39;,  MASTER_USE_GTID=slave_pos;
start slave;
show slave status\\G
#成功状态如下
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="同步账号到slave容器-mariadb03" tabindex="-1"><a class="header-anchor" href="#同步账号到slave容器-mariadb03" aria-hidden="true">#</a> 同步账号到slave容器(mariadb03)</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker exec -it mariadb03 /bin/bash
mysql -uroot -palpha.abc
SET GLOBAL gtid_slave_pos=&#39;0-11-7197&#39;;

CHANGE MASTER TO MASTER_HOST=&#39;172.20.0.11&#39;, MASTER_USER=&#39;dbsync&#39;, MASTER_PASSWORD=&#39;dbsync123&#39;,  MASTER_USE_GTID=slave_pos;
start slave;
show slave status\\G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入数据库到master-mariadb01-并验证是否同步" tabindex="-1"><a class="header-anchor" href="#导入数据库到master-mariadb01-并验证是否同步" aria-hidden="true">#</a> 导入数据库到master(mariadb01)，并验证是否同步</h3><p>我们在mariadb01中创建adnc_usr,adnc_maint,adnc_cus三个数据库并导入数据。</p><ul><li>下载3脚本文件到/root/data目录</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cd /root/data
wget https://raw.githubusercontent.com/AlphaYu/Adnc/master/doc/adnc_usr_dev.sql
wget https://raw.githubusercontent.com/AlphaYu/Adnc/master/doc/adnc_maint_dev.sql
wget https://raw.githubusercontent.com/AlphaYu/Adnc/master/doc/adnc_cus_dev.sql
#如果wget下载失败,请手动下载并上传到/root/data目录,文件地址如下
#https://github.com/AlphaYu/Adnc/tree/master/doc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>拷贝3个sql文件到mariadb01容器</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker cp /root/data/adnc_usr_dev.sql mariadb01:/usr/adnc_usr_dev.sql
docker cp /root/data/adnc_maint_dev.sql mariadb01:/usr/adnc_maint_dev.sql
docker cp /root/data/adnc_cus_dev.sql mariadb01:/usr/adnc_cus_dev.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>进入mariadb01,创建数据库并导入数据</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#进入mariadb01容器
docker exec -it mariadb01 /bin/bash
#启动mysql client
mysql -uroot -palpha.abc

#创建数据库 adnc_usr
CREATE DATABASE IF NOT EXISTS adnc_usr CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
#导入数据
use adnc_usr;
source /usr/adnc_usr_dev.sql;

#创建数据库 adnc_maint
CREATE DATABASE IF NOT EXISTS adnc_maint CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
#导入数据
use adnc_maint;
source /usr/adnc_maint_dev.sql;

#创建数据库 adnc_cus
CREATE DATABASE IF NOT EXISTS adnc_cus CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
use adnc_cus;
source /usr/adnc_cus_dev.sql;

#进入mariadb02，mariadb03检查是否同步了。
docker exec -it mariadb02 /bin/bash
mysql -uroot -palpha.abc
use adnc_usr;
select count(1) from sysuser where account=&#39;Alpha2008&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,33),l=[s];function r(c,v){return a(),i("div",null,l)}const m=e(d,[["render",r],["__file","mariadb基于GTID主从复制搭建.html.vue"]]);export{m as default};

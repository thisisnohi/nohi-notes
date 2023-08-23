import{_ as e,p as a,q as i,a1 as n}from"./framework-449724a9.js";const l={},d=n(`<h1 id="docker-实例" tabindex="-1"><a class="header-anchor" href="#docker-实例" aria-hidden="true">#</a> docker_实例</h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><h3 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> redis</h3><blockquote><p>https://baijiahao.baidu.com/s?id=1696572376871263000&amp;wfr=spider&amp;for=pc</p></blockquote><ul><li><p>docker run --name redis -p 6379:6379 -v $HOME/data/redis/data:/data -d redis redis-server --appendonly yes</p></li><li><p>增加映射</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>本地目录： /opt/redis/conf

docker run -p 6379:6379 --name redis \\
-v $HOME/data/redis/conf/confredis.conf:/etc/redis/redis.conf \\
-v $HOME/data/redis/data:/data \\
-d redis redis-server /etc/redis/redis.conf --appendonly yes --requirepass &quot;123456&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h3><pre><code>1. docker run --name nginx1 -p 8081:80 -d nginx  (-d设置容器在在后台一直运行)
2. docker cp 6dd4380ba708:/etc/nginx/nginx.conf ~/data/nginx/conf
	拷贝容器内 Nginx 默认配置文件到本地当前目录下的 conf 目录，容器 ID 可以查看 docker ps 命令输入中的第一列：

3. docker run -d -p 80:80 --name nginx -v ~/data/nginx/www:/usr/share/nginx/html -v ~/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/data/nginx/logs:/var/log/nginx nginx
4.nginx 监听了多个端口，但只有 \`80\` 端口起效果，如果想要多个端口起效果，则将 \`-p 80:80\` 换成 \`--net host\`
docker run -d --net = host --name nginx2 -v ~/data/nginx/www:/usr/share/nginx/html -v ~/data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v ~/data/nginx/logs:/var/log/nginx nginx

--net host 只支持linux， Mac、Windows别想了
mac下参见(未尝试)：https://windmt.com/2019/08/30/docker-for-mac-network/
</code></pre><h3 id="oracle" tabindex="-1"><a class="header-anchor" href="#oracle" aria-hidden="true">#</a> oracle</h3><pre><code>http://www.thxopen.com/linux/docker/2019/04/17/install-oracle11g-on-docker

-- 命令：
docker run --privileged --name oracle11g -p 1521:1521 -v /Users/nohi/env/install:/install jaspeen/oracle-11g

-- 安装源文件 /root/soft/oracle
-- 最好增加数据文件映射： 目标/opt/oracle/app/oradata
-- 启动命令  文件映射 /root/soft/oracle:/install  /opt/oracle:/home/oracle 
docker run --privileged --name oracle11g -p 1521:1521 -v /opt/oracle/oradata:/opt/oracle/app/oradata -v /opt/oracle/userhome:/home/oracle  -v /root/soft/oracle:/install jaspeen/oracle-11g

docker exec -it oracle11g /bin/bash
</code></pre><ul><li><p>oracle11g</p><ul><li>搜索oracle: docker search oracle</li><li>下载： docker pull jaspeen/oracle-11g</li><li>docker run --privileged --name oracle11g -p 1521:1521 -v /Users/nohi/data/docker/oracle/install:/install -v /Users/nohi/data/docker/oracle/data:/opt/oracle/data jaspeen/oracle-11g</li></ul></li><li><p>Oracle 19c</p><blockquote><p>参见：https://blog.csdn.net/qianglei6077/article/details/103886056</p><p>https://www.codercto.com/a/60412.html</p></blockquote><p>docker run --name oracle-19c <br> -p 1521:1521 -p 5500:5500 <br> -e ORACLE_SID=lei <br> -e ORACLE_PDB=leipdb <br> -e ORACLE_PWD=Oracle <br> -v /oracle/oradata:/opt/oracle/oradata <br> oracle/database:19.3.0-ee</p></li></ul><h3 id="自制oracle19c镜像" tabindex="-1"><a class="header-anchor" href="#自制oracle19c镜像" aria-hidden="true">#</a> 自制oracle19c镜像</h3><blockquote><p>参考：https://www.jianshu.com/p/b683640677c9、https://www.jianshu.com/p/9000cdd58cd8</p></blockquote><h4 id="_1-下载" tabindex="-1"><a class="header-anchor" href="#_1-下载" aria-hidden="true">#</a> 1. 下载</h4><ul><li><p>clone官网构建程序</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>git clone https://github.com/oracle/docker-images.git
cd docker-images/OracleDatabase/SingleInstance/dockerfiles/19.3.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>下载Oracle19c 预安装程序,放入19.3.0目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://yum.oracle.com/repo/OracleLinux/OL7/latest/x86_64/getPackage/oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>Oracle19c的安装程序,放入19.3.0目录下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://download.oracle.com/otn/linux/oracle19c/190000/LINUX.X64_193000_db_home.zip?AuthParam=1681821468_152367006636f1d0a2b9881c95b36722
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>其他（同样放入19.3.0目录下）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://mirrors.cloud.tencent.com/epel/6/x86_64/Packages/r/rlwrap-0.42-1.el6.x86_64.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="_2-oracle-image" tabindex="-1"><a class="header-anchor" href="#_2-oracle-image" aria-hidden="true">#</a> 2 Oracle image</h4><ul><li><p>修改Dockerfile</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi Dockerfile
#FROM oraclelinux:7-slim as base
FROM centos:7.6.1810 as base
....
# Copy files needed during both installation and runtime
# -------------
COPY $SETUP_LINUX_FILE $CHECK_SPACE_FILE $INSTALL_DIR/
COPY oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm $INSTALL_DIR/
COPY rlwrap-0.42-1.el6.x86_64.rpm $INSTALL_DIR/
COPY $RUN_FILE $START_FILE $CREATE_DB_FILE $CONFIG_RSP $PWD_FILE $CHECK_DB_FILE $USER_SCRIPTS_FILE $ORACLE_BASE/ 
....
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改setupLinuxEnv.sh</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi setupLinuxEnv.sh
…
chmod ug+x $ORACLE_BASE/*.sh &amp;&amp; \\
#yum -y install oracle-database-preinstall-19c openssl &amp;&amp; \\
yum -y localinstall /opt/install/oracle-database-preinstall-19c-1.0-1.el7.x86_64.rpm   \\
&amp;&amp; yum -y install openssl  \\
&amp;&amp; yum -y install openssl-devel \\
&amp;&amp; yum -y install lsof \\
&amp;&amp; yum -y install iproute \\
&amp;&amp; yum -y install net-tools \\
&amp;&amp; yum -y install rsyslog \\
&amp;&amp; yum -y install bash-completion \\
&amp;&amp; yum -y install tmux \\
&amp;&amp; yum -y install lrzsz \\
&amp;&amp; yum -y install telnet \\
&amp;&amp; yum -y localinstall /opt/install/rlwrap-0.42-1.el6.x86_64.rpm &amp;&amp; \\
rm -rf /var/cache/yum &amp;&amp; \\
ln -s $ORACLE_BASE/$PWD_FILE /home/oracle/ &amp;&amp; \\
echo oracle:oracle1234 | chpasswd &amp;&amp; \\
echo root:root1234 | chpasswd &amp;&amp; \\
chown -R oracle:dba $ORACLE_BASE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改installDBBinaries.sh</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi installDBBinaries.sh
…
# Temp location
#rm -rf /tmp/* &amp;&amp; \\
…
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_3-构建" tabindex="-1"><a class="header-anchor" href="#_3-构建" aria-hidden="true">#</a> 3 构建</h4><p>Dockfile所在上一级目录下下执行build</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 20230418 官网脚本已经更新
./buildContainerImage.sh -v 19.3.0 -e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-创建实例" tabindex="-1"><a class="header-anchor" href="#_4-创建实例" aria-hidden="true">#</a> 4 创建实例</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mkdir  -p /Users/nohi/data/docker/oracle/data19c
--执行创建
docker run -e TZ=&quot;Asia/Shanghai&quot;  -itd -h ora193 -m 2048m --name ora193 \\
  -p 11521:1521 -p 15500:5500 \\
  -e ORACLE_SID=mycdb \\
  -e ORACLE_PDB=pdb1 \\
  -v /Users/nohi/data/docker/oracle/data19c/:/opt/oracle/oradata  oracle/database:19.3.0-ee
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过命令:docker logs -f ora193 观察部署进度,预估15-25分钟完成</p><h4 id="_5-设置sys、system用户密码" tabindex="-1"><a class="header-anchor" href="#_5-设置sys、system用户密码" aria-hidden="true">#</a> 5 设置sys、system用户密码</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker exec ora193  ./setPassword.sh nohi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_6-cdb、pdb" tabindex="-1"><a class="header-anchor" href="#_6-cdb、pdb" aria-hidden="true">#</a> 6 cdb、pdb</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 进入docker 
docker exec -it ora193  bash
-- 登录
sqlplus / as sysdba
-- 展示pdb
show pdbs; -- 展示pdb数据库集合
-- 切换pdb
alter session set container=PDBORCL;

-- 其中pdborcl是我创建的可插接式数据库，nohi是创建的用户，nohi是密码。file_name_convert换成相应目录就OK了
create pluggable database pdborcl admin user nohi identified by nohi roles=(connect) file_name_convert=(&#39;/opt/oracle/oradata/MYCDB/pdbseed&#39;,&#39;/opt/oracle/oradata/MYCDB/pdborcl&#39;);

show pdbs; -- 展示pdb数据库集合
alter session set container=PDBORCL; -- 切入到PDB 数据库
alter session set container=CDB$ROOT; -- 切回到CDB 容器数据库
-- ORA-01950: 对表空间 &#39;SYSTEM&#39; 无权限 问题解决
alter user crm quota unlimited on system;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run --name oracle19c -p 11521:1521 -p 15500:5500 -v /Users/nohi/data/docker/volumes/oracle/oracle19c:/opt/oracle/oradata oracle/database:19.3.0-ee


其实并不用那么麻烦，只需要几部就可以创建不带C##的用户。
1.使用sqlplus 以 DBA 身份链接。 命令：sqlplus / as sysdba
2.在链接成功后，通过命令查看存在的PDB服务。语句：show pdbs;
3.切换到pdb服务上。语句：
alter session set container=pdb服务名;
alter pluggable database pdb服务名 open;
4.尝试创建不带C##的用户吧。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="oracle12cr2" tabindex="-1"><a class="header-anchor" href="#oracle12cr2" aria-hidden="true">#</a> oracle12cR2</h3><blockquote><p>参考：http://blog.itpub.net/26736162/viewspace-2703940/</p></blockquote><ul><li><p>安装阿里的docker源：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>cat /etc/docker/daemon.json
{&quot;registry-mirrors&quot;: [&quot;https://pee6w651.mirror.aliyuncs.com&quot;]}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>重启docker服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>拉取12c版本</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker pull registry.cn-hangzhou.aliyuncs.com/lhrbest/oracle_12cr2_ee_lhr_12.2.0.1:1.0

docker tag registry.cn-registry.cn-hangzhou.aliyuncs.com/lhrbest/oracle_12cr2_ee_lhr_12.2.0.1:1.0  lhrbest/oracle_12cr2_ee_lhr_12.2.0.1:1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>运行</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -itd --name oracle12c -p 11521:1521 -p 10022:22 -p 15500:5500 -p 15501:5501 -e ORACLE_SID=orcl lhrbest/oracle_12cr2_ee_lhr_12.2.0.1:1.0 init

docker run -d --name oracle12c -p 18080:8080 -p 11521:1521 -v /home/common/docker_volumes/oracle12c/oradata:/u01/app/oracle/oradata -e TZ=Asia/Shanghai sath89/oracle-12c
-- 注意目录权限，不行就777
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="portainer" tabindex="-1"><a class="header-anchor" href="#portainer" aria-hidden="true">#</a> portainer</h3><blockquote><p>https://blog.51cto.com/bovin/2170723</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. docker pull portainer/portainer
2. docker volume create portainer_data

3. docker run -d -p 9000:9000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
4. 127.0.0.1:9000  admin/admin123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kafka" tabindex="-1"><a class="header-anchor" href="#kafka" aria-hidden="true">#</a> kafka</h3><p>参见：https://www.jianshu.com/p/e8c29cba9fae</p><ul><li><p>zookeeper</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -d --restart=always --log-driver json-file --log-opt max-size=100m --log-opt max-file=2  --name zookeeper -p 2181:2181 -v /etc/localtime:/etc/localtime wurstmeister/zookeeper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>kafka</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker run -d --name kafka -p 9092:9092 -e KAFKA_BROKER_ID=0 -e KAFKA_ZOOKEEPER_CONNECT=172.17.0.1:2181/kafka -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://172.17.0.1:9092 -e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092  wurstmeister/kafka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p>topic:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/opt/kafka/bin/kafka-topics.sh --create --zookeeper 172.17.0.1:2181 --replication-factor 1 --partitions 1 --topic curve
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h3><ul><li>https://www.cnblogs.com/sablier/p/11605606.html</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>docker pull mysql:5.7   # 拉取 mysql 5.7
docker pull mysql       # 拉取最新版mysql镜像

docker run --name mysql \\
    --restart=always \\
    -p 3306:3306 \\
    -v /opt/mysql/conf.d:/etc/mysql/conf.d \\
    -v /opt/mysql/var/lib/mysql:/var/lib/mysql \\
    -e MYSQL_ROOT_PASSWORD=nohi1234 \\
    -d mysql:8.0.16
    
docker run -p 3306:3306 --name mysql \\
-v /opt/mysql/conf:/etc/mysql \\
-v /opt/mysql/logs:/var/log/mysql \\
-v /opt/mysql/data:/var/lib/mysql \\
-v /opt/mysql/mysql-files:/var/lib/mysql-files \\
-e MYSQL_ROOT_PASSWORD=nohi1234 \\
-d mysql --lower_case_table_names=1

登录：mysql -uroot -p123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>mariadb基于GTID主从复制搭建 [https://github.com/AlphaYu/Adnc/tree/master/doc/mariadb]</li></ul><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2><ul><li>images <ul><li>docker images</li><li>docker rmi xxx</li></ul></li><li>container <ul><li>docker ps -a</li><li>docker rm id/name</li></ul></li><li>文件 <ul><li>docker cp /Users/sftp/ftp_files/XETL0303_20190918.DMP oracle11g:/opt/oracle/exp</li></ul></li></ul>`,44),s=[d];function r(c,t){return a(),i("div",null,s)}const v=e(l,[["render",r],["__file","docker_实例.html.vue"]]);export{v as default};

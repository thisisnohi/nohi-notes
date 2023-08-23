import{_ as i,M as a,p as l,q as d,R as e,t,N as r,a1 as n}from"./framework-449724a9.js";const c={},p=n(`<h1 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h1><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3><h4 id="网络" tabindex="-1"><a class="header-anchor" href="#网络" aria-hidden="true">#</a> 网络</h4><ul><li><p>Centos8</p><ul><li><p>重新加载网络：<code>nmcli c reload</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>## 配置见：https://www.cnblogs.com/ay-a/p/11828607.html
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
NAME=ens192
UUID=2497d58c-c681-40ec-a86d-72f94c01abff
DEVICE=ens192
ONBOOT=yes
IPADDR=10.0.0.214
NETMASK=255.255.255.0
PREFIX=24
GATEWAY=10.0.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul><h4 id="文件" tabindex="-1"><a class="header-anchor" href="#文件" aria-hidden="true">#</a> 文件</h4><ul><li>查看文件inode <code>df -ia</code></li><li>查看文件名柄: lsof -i:port</li></ul><h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h4><ul><li><p>查看端口占用 netstate -an | grep 9000</p></li><li><p>查看端口进程: lsof -i:port</p></li><li><p>定位 Java 进程和线程 top -H -p pid 、Mac： ps -M pid</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>以前只是在 linux 机器上使用 top 命令。常用的快键键是:
	p 键 - 按 cpu 使用率排序
	m 键 - 按内存使用量排序
这 2 个快捷键在 mac 上都不一样。对应的是，先输入 o，然后输入 cpu 则按 cpu 使用量排序，输入 rsize 则按内存使用量排序。
如果记不清了，可以在 top 的界面上按 ?，在弹出的帮助界面中即可看到。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>再利用 jstack -l pid 导出线程栈</p></li><li><p>Linux下查看CPU使用率的命令 * vmstat 1 5 * sar -u 1 5 * mpstat 1 5 每1秒收集一次，共5次。 * iostat -c 1 2 * dstat -c 每秒cpu使用率情况获取 * dstat --top-cpu 最占cpu的进程获取</p></li><li><p>mpstat</p><ul><li>mpstat -P ALL 2 #看每个cpu核心的详细 %user 在internal时间段里，用户态的CPU时间(%)，不包含nice值为负进程 (usr/total)*100 %nice 在internal时间段里，nice值为负进程的CPU时间(%) (nice/total)*100 %sys 在internal时间段里，内核时间(%) (system/total)*100 %iowait 在internal时间段里，硬盘IO等待时间(%) (iowait/total)*100 %irq 在internal时间段里，硬中断时间(%) (irq/total)*100 %soft 在internal时间段里，软中断时间(%) (softirq/total)*100 %idle 在internal时间段里，CPU除去等待磁盘IO操作外的因为任何原因而空闲的时间闲置时间(%) (idle/total)*100</li></ul></li><li><p>时区：cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</p></li></ul><h3 id="file" tabindex="-1"><a class="header-anchor" href="#file" aria-hidden="true">#</a> file</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 删除 ~/file/input/BERS/ 一年前{365}数据 {} 前后有空格
find ~/file/input/BERS/ -name &quot;*.zip&quot; -mtime +365 -exec rm {} \\;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="shell" tabindex="-1"><a class="header-anchor" href="#shell" aria-hidden="true">#</a> shell</h2><ul><li><p>脚本路径</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">BASE_PATH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">cd</span> \`dirname $0\`<span class="token punctuation">;</span> <span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>start</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>

<span class="token builtin class-name">pwd</span>
<span class="token assign-left variable">BASEPATH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">cd</span> \`dirname $0\`<span class="token punctuation">;</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>
<span class="token builtin class-name">cd</span> <span class="token variable">$BASEPATH</span>
<span class="token builtin class-name">echo</span> currentPath:<span class="token variable">$BASEPATH</span>
<span class="token builtin class-name">pwd</span>
<span class="token assign-left variable">JAR_NAME</span><span class="token operator">=</span>chss-rhwzh.jar
<span class="token builtin class-name">echo</span> start app <span class="token variable">$JAR_NAME</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_OPT</span><span class="token operator">=</span><span class="token string">&quot;-server -Xms1024m -Xmx2048m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m&quot;</span>
<span class="token function">nohup</span> <span class="token function">java</span> <span class="token variable">$JAVA_OPT</span> <span class="token parameter variable">-jar</span> <span class="token variable">\${JAR_NAME}</span>  <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>stop</p><ul><li>指定jar</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>jarName=chss-rhwzh.jar
echo &quot;jps -ml|grep \${jarName} | grep -v grep | awk &#39;{print $1}&#39;&quot;
LIVEPID=\`jps -ml|grep \${jarName}  |grep -v grep | awk &#39;{print $1}&#39;\`
echo &quot;PID \${LIVEPID}&quot;
if [ -z $LIVEPID ];then
    echo &quot;pid is null&quot;
else
    echo $LIVEPID
    kill -9 $LIVEPID
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>选择jar</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/bash

JAR_NAME=$1
if [ -z &quot;$JAR_NAME&quot; ];then
  echo &quot;JAR_NAME is empty, please input a jar name&quot;
  exit 100
fi
BASE_PATH=$(cd \`dirname $0\`; pwd)
echo $BASE_PATH
echo &quot;获取[$JAR_NAME]获取进程列表&quot;

# 获取进程列表
P_LIST=\`jps -l | grep $JAR_NAME\`
echo &quot;$P_LIST&quot;

# 输出循环列表
i=0
echo &quot;$P_LIST&quot;| while read line
do
  ((i++))
  echo &quot;[$i] $line&quot;
done

P_INDEX=1
read -p &quot;Please select INDEX of Progress[1]: &quot; P_INDEX

if [ &quot;$P_INDEX&quot; == &quot;&quot; ]; then
  P_INDEX=1
fi

i=0
echo &quot;$P_LIST&quot;| while read line
do
  ((i++))
  if [ &quot;$i&quot; == &quot;$P_INDEX&quot; ];then
        echo &quot;kill [$i] $line&quot;
        echo $line | awk &#39;{print $1}&#39; | xargs kill -9
  fi
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="centos8切换yum源" tabindex="-1"><a class="header-anchor" href="#centos8切换yum源" aria-hidden="true">#</a> centos8切换yum源</h2>`,13),u={href:"https://help.aliyun.com/document_detail/405635.htm?spm=a2c4g.11186623.0.0.7cb420beB9u6VU",target:"_blank",rel:"noopener noreferrer"},v=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>址http://mirrors.cloud.aliyuncs.com替换为http://mirrors.aliyun.com。、
例如，yum源替换为http://mirrors.aliyun.com/centos-vault/8.5.2111/，epel源替换为http://mirrors.aliyun.com/epel-archive/8/。

# 运行以下命令备份之前的repo文件。
rename &#39;.repo&#39; &#39;.repo.bak&#39; /etc/yum.repos.d/*.repo

# 运行以下命令下载最新的repo文件。
wget http://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo -O /etc/yum.repos.d/Centos-vault-8.5.2111.repo
wget http://mirrors.aliyun.com/repo/epel-archive-8.repo -O /etc/yum.repos.d/epel-archive-8.repo

# 运行以下命令替换repo文件中的链接
sed -i &#39;s/http:\\/\\/mirrors.aliyun.com/url_tmp/g&#39;  /etc/yum.repos.d/Centos-vault-8.5.2111.repo &amp;&amp;  sed -i &#39;s/http:\\/\\/mirrors.aliyun.com/http:\\/\\/mirrors.aliyun.com/g&#39; /etc/yum.repos.d/Centos-vault-8.5.2111.repo &amp;&amp; sed -i &#39;s/url_tmp/http:\\/\\/mirrors.aliyun.com/g&#39; /etc/yum.repos.d/Centos-vault-8.5.2111.repo
sed -i &#39;s/http:\\/\\/mirrors.aliyun.com/http:\\/\\/mirrors.aliyun.com/g&#39; /etc/yum.repos.d/epel-archive-8.repo

# 运行以下命令重新创建缓存
yum clean all &amp;&amp; yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),o=n(`<h2 id="sshguard" tabindex="-1"><a class="header-anchor" href="#sshguard" aria-hidden="true">#</a> sshguard</h2><blockquote><p>https://developer.aliyun.com/article/1100605</p></blockquote><h2 id="压缩" tabindex="-1"><a class="header-anchor" href="#压缩" aria-hidden="true">#</a> 压缩</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">zip</span> test.zip test.txt  <span class="token comment">#添加压缩文件</span>
<span class="token function">zip</span> test.zip test1.txt  <span class="token comment">#移动文件到压缩包</span>
<span class="token function">zip</span> <span class="token parameter variable">-d</span> test.zip test.txt    <span class="token comment">#删除test.txt</span>

<span class="token function">zip</span> <span class="token parameter variable">-r</span> test.zip ./*          <span class="token comment">#压缩当前全部文件到test.zip</span>
<span class="token function">zip</span> test2.zip test2/*   <span class="token comment">#打包目录</span>
<span class="token function">zip</span> test3.zip tests/* <span class="token parameter variable">-x</span> tests/ln.log  <span class="token comment">#压缩目录,除了tests/ln.log</span>

<span class="token function">zip</span> <span class="token parameter variable">-r</span> test.zip ./* <span class="token parameter variable">-P</span> <span class="token number">123</span>  <span class="token comment">#设置密码(明文设置密码不太安全)</span>
<span class="token function">zip</span> <span class="token parameter variable">-r</span> test.zip ./* <span class="token parameter variable">-e</span>   <span class="token comment">#交互设置密码(安全)</span>

<span class="token comment">#设置压缩比</span>
<span class="token comment">#-0不压缩，-9最高压缩，默认为-6</span>
<span class="token function">zip</span> test.zip test.txt <span class="token parameter variable">-6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件句柄" tabindex="-1"><a class="header-anchor" href="#文件句柄" aria-hidden="true">#</a> 文件句柄</h3><ul><li><p>ulimit -a</p><p>···</p><p>while true do</p><p>lsof -p 19268 |wc -l</p><p>sleep 10 done</p><p>···</p></li><li><p>lsof|awk &#39;{print $2}&#39;|sort|uniq -c|sort -nr|more</p></li><li><p>netstat -an | grep CLOSE_WAIT | grep 8092</p></li><li><p>netstat -ant|awk &#39;/^tcp/ {++S[$NF]} END {for(a in S) print (a,S[a])}&#39;</p></li><li><p>ps aef | grep pid</p></li></ul><h3 id="history" tabindex="-1"><a class="header-anchor" href="#history" aria-hidden="true">#</a> history</h3><ul><li>显示时间 export HISTTIMEFORMAT=&#39;%F %T&#39;</li><li>显示记录数：HISTSIZE=200</li></ul><h3 id="linux时间差8小时" tabindex="-1"><a class="header-anchor" href="#linux时间差8小时" aria-hidden="true">#</a> linux时间差8小时</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>修改时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

VirtualBox 时间不同步
1. vboxmanage list vms 显示虚拟下所有机器
2. 关闭/开启同步
	关闭时间同步：vboxmanage guestproperty set &lt;虚拟机名/虚拟机UUID&gt; --timesync-set-stop
	打开时间同步：vboxmanage guestproperty set &lt;虚拟机名/虚拟机UUID&gt; --timesync-set-start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ssh-免密登录" tabindex="-1"><a class="header-anchor" href="#ssh-免密登录" aria-hidden="true">#</a> SSH 免密登录</h2><blockquote><p>Ssh 免官登录，允许用户远程登录机器、scp操作，不需要密码</p><p>参见：https://blog.csdn.net/BD_fuhong/article/details/103295240</p></blockquote><p>生成密码参见网上：ssh-keygen</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>A免密操作B
在A上执行 ssh-copy-id -i ~/.ssh/id_rsa.pub user@B.B.B.B
在B的.ssh文件夹下回自动生成 authorized_keys文件

注意：
  sshd为了安全，对属主的目录和文件权限有所要求。如果权限不对，则ssh的免密码登陆不生效。
  用户目录权限为 755 或者 700，就是不能是77x。
  .ssh目录权限一般为755或者700。
  rsa_id.pub 及authorized_keys权限一般为644
  rsa_id权限必须为600
解决方案：
    chmod 700 /home/hadoop 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>两个机器：A、B
允许A远程免密访问B
1. A执行ssh-keygen 一路驾车。执行完成后会有.ssh目录下生成id_rea.pub公钥文件
2. B 同理执行
3. A机器执行 ssh-copy-id -i ~/.ssh/id_rsa.pub user@B.B.B.B
4. 测试：scp A机器某文件 user@B.B.B.B:/home/xx
5. 执行完后，查看B相应目录是否有文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p></p><h2 id="防火墙" tabindex="-1"><a class="header-anchor" href="#防火墙" aria-hidden="true">#</a> 防火墙</h2><ul><li><p>开启关闭</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>关闭防火墙： systemctl stop firewalld.service
开启： systemctl start firewalld.service
	 先用：systemctl unmask firewalld.service 
   然后：systemctl start firewalld.service
开机运行：systemctl enable firewalld.
关闭开机运行： systemctl disable firewalld.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看防火墙状态 systemctl status firewalld 或 firewall-cmd --state</p></li><li><p>添加、删除规则</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>开启端口
#（--permanent永久生效，没有此参数重启后失效）
#注：可以是一个端口范围，如1000-2000/tcp
firewall-cmd --zone=public --add-port=80/tcp --permanent   
移除端口
firewall-cmd --zone=public --remove-port=80/tcp --permanent
firewall-cmd --permanent --remove-port=123/tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看端口</p><ul><li>查看端口列表： firewall-cmd --list-port</li><li>查看端口： firewall-cmd --query-port=80/tcp</li></ul></li><li><p>刷新防火墙</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>重新加载防火墙 firewall-cmd --reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="网络抓包" tabindex="-1"><a class="header-anchor" href="#网络抓包" aria-hidden="true">#</a> 网络抓包</h2><ul><li><p>查看网卡: tcpdump -D</p></li><li><p>抓包：tcpdump -i 网卡 -w /root/1.pcap 请求完成后，断开命令即可生成文件</p></li><li><p>使用 wireshark分析文件</p><ul><li><p>过滤源ip、目的ip</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>查找目的地址为192.168.101.8的包，ip.dst==192.168.101.8；查找源地址为ip.src==1.1.1.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>端口过滤: tcp.port==80</p></li><li><p>协议过滤: http</p></li><li><p>过滤get包</p><ul><li><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http.request.method==&quot;GET&quot;,过滤post包，http.request.method==&quot;POST
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul></li><li><p>连接符and的使用：ip.src==192.168.101.8 and http</p></li></ul></li></ul>`,21);function m(b,h){const s=a("ExternalLinkIcon");return l(),d("div",null,[p,e("ul",null,[e("li",null,[e("p",null,[e("a",u,[t("CentOS 8 EOL如何切换源？"),r(s)])]),v])]),o])}const x=i(c,[["render",m],["__file","linux.html.vue"]]);export{x as default};

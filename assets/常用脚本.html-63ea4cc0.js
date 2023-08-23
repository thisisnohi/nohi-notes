import{_ as e,p as i,q as n,a1 as s}from"./framework-449724a9.js";const l={},a=s(`<h1 id="oracle-常用脚本" tabindex="-1"><a class="header-anchor" href="#oracle-常用脚本" aria-hidden="true">#</a> Oracle 常用脚本</h1><blockquote><p>ceate by nohi 20201230</p></blockquote><h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 锁       
SELECT /*+ rule */ s.username, decode(l.type,&#39;TM&#39;,&#39;TABLE LOCK&#39;,&#39;TX&#39;,&#39;ROW LOCK&#39;,
NULL) LOCK_LEVEL, o.owner,o.object_name,o.object_type,
s.sid,s.serial#,s.terminal,s.machine,s.program,s.osuser
FROM v$session s,v$lock l,dba_objects o
WHERE l.sid = s.sid
AND l.id1 = o.object_id(+)
and l.type in (&#39;TM&#39;,&#39;TX&#39;)
AND s.username is NOT NULL
and s.username in (&#39;&#39;,&#39;CURVAPP&#39;,&#39;&#39;);

-- 杀进程
ALTER SYSTEM KILL SESSION &#39;619, 14479&#39;;

SELECT &#39;ALTER SYSTEM KILL SESSION &#39;&#39;&#39;  || s.sid || &#39;,&#39; || s.serial# || &#39;&#39;&#39;;&#39;
FROM v$session s,v$lock l,dba_objects o
WHERE l.sid = s.sid
AND l.id1 = o.object_id(+)
AND s.username is NOT NULL
and s.username in (&#39;&#39;,&#39;CURVAPP&#39;,&#39;&#39;)
and l.type in (&#39;TM&#39;,&#39;TX&#39;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表空间" tabindex="-1"><a class="header-anchor" href="#表空间" aria-hidden="true">#</a> 表空间</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 修改表所属表空间：alter table 表名 move tablespace &quot;表空间名称&quot;
-- 修改表索引所属表空间：alter index 索引名 rebuild tablespace &quot;表空间名称&quot;

-- 查询某表空间的所有表：
select segment_name from dba_segments where owner=&#39;表空间名称&#39; and segment_type=&#39;TABLE&#39; group by segment_name

-- 查询用户占用空间大小
select owner,tablespace_name,round(sum(bytes)/1024/1024,2) &quot;USED (M)&quot; from dba_segments 
group by owner,tablespace_name
order by sum(bytes)desc;

-- 临时表空间   
select tablespace_name,file_name,bytes/1024/1024 file_size,autoextensible from dba_temp_files;

-- 临时表空间
SELECT D.TABLESPACE_NAME,SPACE &quot;SUM_SPACE(M)&quot;,BLOCKS SUM_BLOCKS,
USED_SPACE &quot;USED_SPACE(M)&quot;,ROUND(NVL(USED_SPACE,0)/SPACE*100,2) &quot;USED_RATE(%)&quot;,
NVL(FREE_SPACE,0) &quot;FREE_SPACE(M)&quot;
FROM
(SELECT TABLESPACE_NAME,ROUND(SUM(BYTES)/(1024*1024),2) SPACE,SUM(BLOCKS) BLOCKS
FROM DBA_TEMP_FILES
GROUP BY TABLESPACE_NAME) D,
(SELECT TABLESPACE_NAME,ROUND(SUM(BYTES_USED)/(1024*1024),2) USED_SPACE,
ROUND(SUM(BYTES_FREE)/(1024*1024),2) FREE_SPACE
FROM V$TEMP_SPACE_HEADER
GROUP BY TABLESPACE_NAME) F
WHERE  D.TABLESPACE_NAME = F.TABLESPACE_NAME(+);

alter database tempfile &#39;+BJXG_CS_CBPC_DATA/APPDB/TEMPFILE/temp.370.1021910773&#39; resize 30G;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="表数据清理" tabindex="-1"><a class="header-anchor" href="#表数据清理" aria-hidden="true">#</a> 表数据清理</h3><ul><li><p>查询表占用空间大小</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select owner,tablespace_name,round(sum(bytes)/1024/1024,2) &quot;USED (M)&quot; from dba_segments 
group by owner,tablespace_name
order by sum(bytes)desc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>SYS_LOB 占用大小</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select object_name,status from dba_objects where object_id=&#39;xxxxxxxxxx&#39;;
## object_id 这里写LOBSEGMENT名字里SYS_LOB后的10位数字。

SELECT owner, table_name, column_name
FROM dba_lobs
WHERE segment_name = &#39;SYS_LOB&lt;&lt;identifier&gt;&gt;$$&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>清理</p><ul><li>truncate table xxxxx;</li><li>清空一下回收站 purge table xxxx;</li><li>清空一下回收站 purge recyclebin;</li></ul></li></ul><h2 id="创建表空间" tabindex="-1"><a class="header-anchor" href="#创建表空间" aria-hidden="true">#</a> 创建表空间</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 查询表空间路径
select * from dba_data_files; 
-- 创建表空间
create tablespace jcms
datafile &#39;/opt/oracle/app/oradata/orcl/jcms.dbf&#39;
size 10M reuse autoextend on;
-- 创建临时表空间
create tablespace ocrm
datafile &#39;/home/oracle/app/oracle/oradata/orcl/ocrm.dbf&#39;
size 10M reuse autoextend on;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用户" tabindex="-1"><a class="header-anchor" href="#用户" aria-hidden="true">#</a> 用户</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>drop user xetl cascade;
DROP TABLESPACE newoa INCLUDING CONTENTS AND DATAFILES;
drop table CHANNELCODE cascade constraints;

-- 12c 数据 切换seesion
select * from V$ACCESS;
select name,cdb from v$database;
select pdb_id,pdb_name,dbid,status,creation_scn from dba_pdbs;
select con_id,dbid,NAME,OPEN_MODE from v$pdbs;

alter session set container=ORCLPDB1;
alter session set container = cdb$root;

alter pluggable database ORCLPDB1 open;

-- 创建用户
 create user jcms
 identified by jcms
 default tablespace jcms
 account unlock;
-- 赋权 
 grant create session to xetl;
 grant create table to xetl;
 grant create sequence to xetl;
 grant create procedure to xetl;
 grant create VIEW to xetl;
 grant resource to xetl;
 
alter user pi_valuation account  unlock;
revoke dba from cap;
grant dba to jcms;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="导入导出" tabindex="-1"><a class="header-anchor" href="#导入导出" aria-hidden="true">#</a> 导入导出</h2><ul><li><p>exp、imp</p><ul><li>exp userid=sap/sap@orcl_sit owner=sap file=sap_sit_20121206.dmp log=sap.log</li><li>exp userid=sap/sap@orcl_sit owner=sap file=sap_sit_20121206.dmp log=sap.log tables=T_USER,T_ROLE</li><li>imp newoa1203/newoa1203@nohi file=sap_sit_20121206.dmp fromuser=sap touser=sap_uat</li><li>imp newoa1203/newoa1203@nohi file=sap_sit_20121206.dmp fromuser=sap touser=sap_uat tables=T_USER,T_ROLE</li><li>增加buffer imp esb_tmp/esb_tmp file=sap_sit_20121206 log=imp tables=T_USER ignore=yes buffer=102400000 commit=yes feedback=1000</li><li>导出表结构 exp ocrm/ocrm@43_227 file=ocrm_t.dmp owner=(ocrm) rows=n</li></ul></li><li><p>数据泵方式</p><ul><li><p>创建目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from dba_directories;
 -- 创建目录
create or replace directory data_dump_dir as &#39;/home/oracle/exp/&#39;;


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>expdp nohi/nohi@orcl schemas=riskDIRECTORY=data_dump_dir dumpfile=EXPDP_20171208.dmp LOGFILE=expdb.log version=&#39;10.2.0&#39;</p><ul><li>version 指定导入版本，向下兼容</li></ul></li><li><p>impdp nohi/nohi@orcl DIRECTORY=data_dump_dir REMAP_SCHEMA=UserA:UserB remap_tablespace=TbsA:TbsB DUMPFILE=EXPDP_20171208.dmp LOGFILE =impdb.log version=&#39;10.2.0&#39;</p></li></ul></li></ul><h2 id="常用语句" tabindex="-1"><a class="header-anchor" href="#常用语句" aria-hidden="true">#</a> 常用语句</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>

select d.dbid            dbid
     , d.name            db_name
     , i.instance_number inst_num
     , i.instance_name   inst_name
  from v$database d,
       v$instance i;
    

-- 表分析
analyze table tableName compute statistics;
analyze index indexname compute statistics;



--- # 查看1小时内执行的sql语句，并按照执行时间倒序排序
select s.LAST_ACTIVE_TIME,s.SQL_TEXT,s.SQL_FULLTEXT,s.FIRST_LOAD_TIME,s.LAST_LOAD_TIME,s.EXECUTIONS from v$sql s
where  s.LAST_ACTIVE_TIME&gt;sysdate-1/24
 and s.PARSING_SCHEMA_NAME in (&#39;CURVAPP&#39;, &#39;BASEAPP&#39;)
order by s.LAST_ACTIVE_TIME desc;
-- 超时时间
-- 其中IDLE_TIME的值就是设置的空闲超时时间
select * from dba_profiles t where t.resource_name=&#39;CONNECT_TIME&#39;;
select * from user_resource_limits;
select resource_name,resource_type,limit from dba_profiles where profile=&#39;DEFAULT&#39; ;
ALTER PROFILE DEFAULT LIMIT IDLE_TIME UNLIMITED;

select * from dba_profiles where profile=&#39;DEFAULT&#39; ;

-- 临时表空间
create temporary tablespace temp tempfile &#39;/opt/oracle/oradata/conner/temp.dbf&#39; size 200M autoextend off;
alter database default temporary tablespace temp;
drop tablespace temp2; //drop tablespace temp including contents and datafiles cascade constraints --彻底删除包括操作系统中的临时表空间的数据文件
-- 表记录数
select * from user_tables where num_rows &gt; 100000;
select num_rows * avg_row_len , table_name , num_rows from user_tables where num_rows &gt; 10000 order by num_rows desc;
  
-- 查询表占用大小
select segment_name,bytes , bytes/1024/1024 M from user_segments where segment_type = &#39;TABLE&#39; and segment_name not like &#39;BIN%&#39; order by bytes desc
  
select &#39;create sequence &#39;||sequence_name||
   &#39; minvalue &#39;||min_value||
   &#39; maxvalue &#39;||max_value||
   &#39; start with &#39;||last_number||
   &#39; increment by &#39;||increment_by||
   (case when cache_size=0 then &#39; nocache&#39; else &#39; cache &#39;||cache_size end) ||&#39;;&#39;
from user_sequences
--    
select * from dba_users;
select * from user_tables;
select * from dba_data_files; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),d=[a];function r(c,t){return i(),n("div",null,d)}const m=e(l,[["render",r],["__file","常用脚本.html.vue"]]);export{m as default};

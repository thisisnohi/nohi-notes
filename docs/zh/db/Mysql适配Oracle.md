```sql

-- sequence
drop table if exists SEQUENCE;
create table sequence (
    name varchar(50) not null primary key comment '索引名',
    current_value int not null comment '当前值',
    increment int not null default 1 comment '步长',
    start_with int not null default 1 comment '起始值',
    max_value int not null default 999999999 comment '最大值',
    cycle char(1) default 'N' comment '是否循环'
);
select * from SEQUENCE;

-- 当前值
drop function if exists currval;
DELIMITER $
create function currval(seq_name varchar(50)) returns integer
language sql
deterministic
contains sql
sql security definer
comment ''
begin
    declare value integer;
    set value = 0;
    select current_value into value from sequence where name = seq_name;
    return value;
end $
delimiter ;

drop function if exists nextval;
DELIMITER $
create function nextval(seq_name varchar(50)) returns integer
language sql
deterministic
contains sql
sql security definer
comment ''
begin
    update sequence
    set current_value = current_value + increment where name = seq_name;
    return currval(seq_name);
end $
delimiter ;

drop function if exists setval;
DELIMITER $
create function setval(seq_name varchar(50), value integer) returns integer
language sql
deterministic
contains sql
sql security definer
comment ''
begin
    update sequence
    set current_value = value where name = seq_name;
    return currval(seq_name);
end $
delimiter ;

-- 循环序列
drop function if exists  nextval;
create function nextval(seq_name varchar(50)) returns int
begin
    declare TMP_CURRENT_VALUE integer;
    declare TMP_INCREMENT integer;
    declare TMP_START_WITH integer;
    declare TMP_MAX_VALUE integer;
    declare TMP_CYCLE varchar(20);
    select current_value, increment, start_with, max_value, cycle into TMP_CURRENT_VALUE, TMP_INCREMENT, TMP_START_WITH, TMP_MAX_VALUE, TMP_CYCLE from sequence where name = seq_name;
    if TMP_CYCLE = 'Y' and TMP_CURRENT_VALUE + TMP_INCREMENT > TMP_MAX_VALUE then
        -- 重置初始值
	    update sequence set current_value = start_with - increment where name = seq_name;
    end if;
    update sequence set current_value = current_value + increment where name = seq_name;
    return currval(seq_name);
end;


select name, current_value, increment, start_with, max_value, cycle from sequence;
-- 初始化sequence
insert into sequence(name, current_value, increment, max_value, cycle) values ('DGKH_SYS_EVT_TRACE_ID_SEQ',0, 1, 999999, 'Y');
insert into sequence(name, current_value, increment, max_value, cycle) values ('DGKH_CHANNEL_NO_SEQ',0, 1, 999999, 'Y');
insert into sequence(name, current_value, increment, max_value, cycle) values ('DGKH_MARKET_CODE_SEQ',0, 1, 999999, 'Y');
insert into sequence(name, current_value, increment, max_value, cycle) values ('TEST',0, 1, 99, 'N');

select setval('DGKH_CHANNEL_NO_SEQ', 77);
select nextval('TEST'), currval('TEST');
select setval('DGKH_SYS_EVT_TRACE_ID_SEQ', 999990);
select nextval('DGKH_SYS_EVT_TRACE_ID_SEQ'), currval('DGKH_SYS_EVT_TRACE_ID_SEQ');
```


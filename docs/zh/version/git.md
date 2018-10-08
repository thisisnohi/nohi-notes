---
sidebar: auto
---

# GIT NOTE

## 基本命令

* git remote -v 查看仓库地址
* git status 查看本地文件状态
* git pull 更新
* git add filename   提交文件
* git commit -m "this is commit　by nohi"   注释
 

## 分支相关
* git branch -vv 查看本地分支和远程分支的关联关系
* git branch --set-upstream-to=origin/远程分支的名字 本地分支的名字   
* git checkout -b iss53 新建分支iss53
* git checkout iss53 切换分支
* git branch -d iss53 删除本地分支
* git push origin --delete iss53　删除远程分支

* 合并分到 iss53 至master 
    * git checkout master  切换至master   
    * git merge iss53  合并  

## PUSH 提交
* git push origin iss53 提交本地代码支分支iss53

## stash 
* git stash list 显示保存进度的列表
* git stash 保存当前工作进度
* git stash save 'message...' 可以添加一些注释

* git stash pop 恢复最新的进度到工作区。git默认会把工作区和暂存区的改动都恢复到工作区。
* git stash pop --index 恢复最新的进度到工作区和暂存区。（尝试将原来暂存区的改动还恢复到暂存区）
* git stash pop stash@{1}恢复指定的进度到工作区。stash_id是通过git stash list命令得到的 
  通过git stash pop命令恢复进度后，会删除当前进度。
  
* git stash apply [–index] [stash_id] 
> 除了不删除恢复的进度之外，其余和git stash pop 命令一样。

* git stash drop [stash_id] 删除一个存储的进度。如果不指定stash_id，则默认删除最新的存储进度。

* git stash clear 删除所有存储的进度

## 回滚
如果只回退一个最新commit：git reset HEAD^
如果需要回退多个commit：git reset 回退至的commit hash码
如果直接要舍弃commit的内容，命令末尾加--hard

## FAQ
### 配置ssh-key免密登录
1. $ ssh-keygen -t rsa -C "youremail@youremail.com"  
   Generating public/private rsa key pair... 三次回车即可生成 ssh key
   不需要输入密码
   
2. 拷贝公钥至github里。默认公钥文件 ~/.ssh/id_rsa.pub
   
3. 如果存在多个账户、需要连接不同仓库。~/.ssh/目录增加文件 config

4. config文件如下
```
# 配置github.com
Host github.com                 
    HostName github.com
    IdentityFile C:\\Users\\\nohi\\.ssh\\thisisnohi_github.com
    PreferredAuthentications publickey
    User thisisnohi

# 配置work.scfsoft.com
Host work.scfsoft.com
    HostName work.scfsoft.com
#	port 90
    IdentityFile C:\\Users\\\nohi\\.ssh\\dinglonghai
    PreferredAuthentications publickey
    User dinglonghai
```

5. 测试　ssh -T git@github.com

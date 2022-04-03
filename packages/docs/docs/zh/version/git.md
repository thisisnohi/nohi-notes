---
sidebar: auto
---

# GIT NOTE



```
mac刷新hosts
sudo dscacheutil -flushcache
```



## 基本命令

* git remote -v 查看仓库地址
* git status 查看本地文件状态
* git add filename   提交文件
* git commit -m "this is commit　by nohi"   注释
* git pull 更新
* git log
* git reflog用来记录你的每一次命令

## 删除

* git rm test.txt  
	* 提交：git push 
	* 恢复: git checkout -- test.txt

## 远程仓库
* git remote add origin git@github.com:michaelliao/learngit.git
	* 关联一个远程库
* git push -u origin master  
	* master推送到远程仓库
	* -u 第一次推送时，本地与远程进行关联
	* 以后推送只需要执行: git push origin master
* 添加本地项目至远程
  * git init  -> git add . -> git commit -m "初始化项目与远程git相连接"
  * 连接远程仓库  git remote add origin https://github.com/demo-wx/server.git
  * 本地内容推送到远程仓库: git push -u origin master （-f）其中-f为强制推送

## Push

### 本地代码到远程仓库

* 初始化版本库

  ```
  $rm -rf .git  // 从别处clone的项目需要删除其版本库
  $git init
  ```

* 添加文件到版本库（只是添加到缓冲区）

  ```
  $git add .  // " . "代表添加文件夹下所有的文件
  ```

* 把缓冲区中的文件添加到本地版本库

  ```
  $git commit -m "第一次提交"
  ```

* 关联本地库和远程库

  ```
  git remote add origin git@xxx.git(远程仓库地址)
  ```

* 将代码推送到远程仓库

  ```
  git push -u origin master  // 第一次推送时
  git push origin master  // 第一次推送后，直接使用该命令即可推送修改
  ```


### git 上传代码到指定仓库_从一个git仓库提交代码到另一个git仓库

> 参考：https://blog.csdn.net/weixin_39961855/article/details/111513676

```
假如仓库repo_a当前位于branch_a，要求将branch_a的整个数据(包括提交历史)全部提取出来，并建立一个新的仓库repo_b。这里假设仓库repo_b已经被建立。
git remote add基本语法如下。name和url是必须的。
git remote add [-t ] [-m ] [-f] [--[no-]tags] [--mirror=]

1、 将仓库repo_b的URL添加到工作仓库的remote。
git remote add origin_repo_b git@server_ip:/path/repo_b.git
(origin_repo_b:自己起的名字，只要不与现有的remote名重复即可)
(git@server_ip:/path/repo_b.git:repo_b的远程路径)

2、将代码推送到远程repo_b。
git push origin_repo_b branch_a
(origin_repo_b:远程仓库repo_b的名字)
(branch_a:仓库repo_a的的branch_a分支)
```



## 分支相关

* git branch -a 查看本地和远程所有分支
  * git branch -r 查看远程分支
  * git checkout -b 本地分支名x origin/远程分支名x
* git checkout -b dev : 创建dev分支
	* -b 表示创建并切换，相当于git branch dev & git checkout dev
* git branch:查看当前分支
* git branch -vv 查看本地分支和远程分支的关联关系
* git branch --set-upstream-to=origin/远程分支的名字 本地分支的名字   
* git checkout dev 切换分支
* git branch -d dev 删除本地分支
	* git branch -D <name>
* git push origin --delete dev　删除远程分支
* 合并分到 dev 至master 
    * git checkout master  切换至master   
    * git merge dev  合并  
* 查看远程库信息，使用git remote -v；
* 本地新建的分支如果不推送到远程，对其他人就是不可见的；
* 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
* 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
* 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
* 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

## PUSH 提交
* git push origin iss53 提交本地代码支分支iss53

## Stash

* git stash list 显示保存进度的列表
* git stash 保存当前工作进度
* git stash save 'message...' 可以添加一些注释

* git stash pop 恢复最新的进度到工作区。git默认会把工作区和暂存区的改动都恢复到工作区。
	* 恢复的同时把stash内容也删了
* git stash pop --index 恢复最新的进度到工作区和暂存区。（尝试将原来暂存区的改动还恢复到暂存区）
* git stash pop stash@{1}恢复指定的进度到工作区。stash_id是通过git stash list命令得到的 
  通过git stash pop命令恢复进度后，会删除当前进度。
  
* git stash apply [–index] [stash_id] 
> 除了不删除恢复的进度之外，其余和git stash pop 命令一样。

* git stash drop [stash_id] 删除一个存储的进度。如果不指定stash_id，则默认删除最新的存储进度。
* git stash clear 删除所有存储的进度



## log

* git log 
* git log --pretty=oneline 显示一行
* git log --graph --pretty=oneline --abbrev-commit

## 回滚

* 未commit前： git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令。
* git commit 前

```
如果只回退一个最新commit：git reset HEAD^
如果需要回退多个commit：git reset 回退至的commit hash码
如果直接要舍弃commit的内容，命令末尾加--hard
多次commit后，例：c1 c2 c3.    可以随便切换commit时的版本 git reset commitId
`git reflog` 查看历史操作命令记录

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。
场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。 ( git reset HEAD^  / git reset commitid)
```

* git commit 后

  ```
  1. 使用git revert commitid
  
  2. -- reset 退到某次提交，那该提交之后的提交都会回滚，不过这种覆盖是不可逆的，之前的提交记录都没有了。所以平时开发中尽量注意，避免使用reset。
  3. git  reset --hard  commit_id
  4. 3执行完后，执行git push,报错：
      ! [rejected]        master -> master (non-fast-forward)
      error: failed to push some refs to 'https://github.com/thisisnohi/test_git'
      hint: Updates were rejected because the tip of your current branch is behind
      hint: its remote counterpart. Integrate the remote changes (e.g.
      hint: 'git pull ...') before pushing again.
      hint: See the 'Note about fast-forwards' in 'git push --help' for details.
    解决方法：git pull + 远程名+ 分支名操作  若是想直接强制推送，可以加上 -f 参数强制push
      第一种. git push -f origin master 强制提交，不可逆转
      第二种. git reset 最新的commit_id 然后git add file   git commit  git push
      			 (参见：https://blog.csdn.net/qq_36460164/article/details/79857431)
    	 
  ```

* git reset/revert

  ```
  git reset –soft 不会改变stage区，仅仅将commit回退到了指定的提交 
  git reset –mixed 不回改变工作区，但是会用指定的commit覆盖stage 区，之前所有暂存的内容都变为为暂存的状态 
  git reset –hard 使用指定的commit的内容覆盖stage区和工作区。
  
  git revert用于反转提交,执行命令时要求工作树必须是干净的.
  git revert用一个新提交来消除一个历史提交所做的任何修改.
  git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit
  ```

* git revert(撤消操作)的格式：

  >  撤销某次操作，此次操作之前的commit都会被保留. git reset 是撤销某次提交，但是此次之后的修改都会被退回到暂存区.

  * 格式
    git revert [--edit | --no-edit] [-n] [-m parent-number] [-s] <commit>...git revert --continue git revert --quit git revert --abort

  * 示例

    ```
    git revert HEAD~3：丢弃最近的三个commit，把状态恢复到最近的第四个commit，并且提交一个新的commit来记录这次改变。
    git revert -n master~5..master~2：丢弃从最近的第五个commit（包含）到第二个（不包含）,但是不自动生成commit，这个revert仅仅修改working tree和index。
    ```

    `建议，你可以用git revert来撤销已经提交的更改，而git reset用来撤销没有提交的更改`

### `git reset --hard` 后撤销

> reset --hard 只是移动了HEAD，本地.git/logs目录下仍有HEAD改变的记录

* 查看历史commitid 

  * git log -g
  * git reflog

* 根据历史commitid创建分支

  * git branch branchName commitId

    

## 标签

* git tag v1.0 打标签
	* 打当前版本
	* git tag v0.9 f52c633 打历史版本
	* git tag -a v0.1 -m "version 0.1 released" 1094adb 增加说明
* git tag
* git show <tagname>查看标签信息：
* git tag -d v0.1 删除标签
* git push origin v1.0 推送标签到远程
* git push origin --tags 一次性推送全部尚未推送到远程的本地标签
* 删除标签
	*  git tag -d v0.9 删除本地
	*  git push origin :refs/tags/v0.9

## FAQ

### gitbash 免密

* git config --global credential.helper store
* 需要输入一次用户名密码后，下次执行git就不需要密码



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


* Your branch is ahead of 'origin/master' by 21 commits.
	*  提交本地内容: git push origin
	*  删除本地分支: git reset --hard origin/master

*  pull遇到错误：error: Your local changes to the following files would be overwritten by merge:
  * 保存本地修改
    * git stash    
    * git pull  [origin master]
    * git stash pop  
  * 否
    * git reset --hard  
    * git pull origin master


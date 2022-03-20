# git hooks



## 参考

* https://www.cnblogs.com/hpcpp/p/7380939.html
* https://www.jianshu.com/p/5531a21afa68

## 安装

* mac

  ```shell
  docker run -d  -p 443:443 -p 80:80 -p 222:22 --name gitlab --restart always -v /home/gitlab/config:/etc/gitlab -v /home/gitlab/logs:/var/log/gitlab -v /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
  ```

* linux

  ```
  docker run -d  -p 10443:443 -p 10080:10080 -p 10022:10022 --name gitlab --restart always -v /home/gitlab/config:/etc/gitlab -v /home/gitlab/logs:/var/log/gitlab -v /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
  
  /home/gitlab/config:/etc/gitlab
  /home/gitlab/logs:/var/log/gitlab
  /home/gitlab/data:/var/opt/gitlab
  ```



## hooks

* 参考：https://www.jianshu.com/p/5531a21afa68
* `vi /etc/gitlab/gitlab.rb` 
* `gitaly['custom_hooks_dir'] = "/var/opt/gitlab/gitaly/custom_hooks"`



* Gitlab - project - setting - general setting  获取 projectid  这里是2
* echo -n projectid | sha256sum   获取输出
  * 如： echo -n 2 | sha256sum  
  * 结果： d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
  * 路径目录 d4/73/d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35.git

* cd /var/opt/gitlab/git-data/repositories/@hashed/`d4/73/d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35.git`



* Customer_hooks/pre-receive.d/01.sh

  ```
  # Get custom commit message format
  while read OLD_REVISION NEW_REVISION REFNAME ; do
    echo [pre-receive] OLD_REVISION : ${OLD_REVISION}
    echo [pre-receive] NEW_REVISION : ${NEW_REVISION}
    echo [pre-receive] REFNAME      : ${REFNAME}
  
    export OLD_VALUE=${OLD_REVISION}
    export NEW_VALUE=${NEW_REVISION}
  done
  ```

  

* 注释

  * https://www.cnblogs.com/jiaoshou/p/11190619.html
  * 标准注释

  ```
  feat： 新增 feature
  fix: 修复 bug
  docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
  style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
  refactor: 代码重构，没有加新功能或者修复 bug
  perf: 优化相关，比如提升性能、体验
  test: 测试用例，包括单元测试、集成测试等
  chore: 改变构建流程、或者增加依赖库、工具等
  revert: 回滚到上一个版本
  ```

  * 注释脚本

    ```shell 
    #!/bin/bash
    
    validate_ref()
    {
        # --- Arguments
        oldrev=$(git rev-parse $1)
        newrev=$(git rev-parse $2)
        refname="$3"
    
        commitList=`git rev-list $oldrev..$newrev`
        echo '****************'
        echo $commitList
        echo '****************'
        split=($commitList)
        rm -rf target.txt
        for s in ${split[@]}
        do
        #echo $s
            echo $s >>./target.txt
            msg=`git cat-file commit $s | sed '1,/^$/d'`
            echo COMMIT MSG:$msg
    
        done
        #python3 scp.py
        #cp target.txt /home/gitlab/target.txt
        exit 1
    
    }
    
    if [ -n "$1" -a -n "$2" -a -n "$3" ]; then
        echo "11111"
        PAGER= validate_ref $2 $3 $1
    else
        echo "2222"
        while read oldrev newrev refname
        do
            echo "before validate_ref oldrev:$oldrev"
            validate_ref $oldrev $newrev $refname
        done
    fi
    echo "before exit"
    exit 1
    ```

    
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

**坑**

```
10080 访问：strict-origin-when-cross-origin
使用其他商品访问：http://10.0.0.210:82
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

    

### 客户端githooks

* Githooks:
  * 位置：`.git/hooks`
  * 文件：`pre-commit`（以sample结尾的为样例文件，不生效）

* pmd检查(java命令运行)

  ```shell
  下载代码：`https://github.com/alibaba/p3c.git`
  cd p3c-pmd
  mvn clean package
  
  # p3c-pmd-2.1.1-jar-with-dependencies.jar 不同版本jar名称不同
  pmd_dir=pmd jar所在目录
  java -Dfile.encoding=utf8 -cp ${pmd_dir}/p3c-pmd-2.1.1-jar-with-dependencies.jar net.sourceforge.pmd.PMD -d ./src/main -R ${pmd_dir}/ali-p3c.xml -f text -shortnames -no-cache -r ${pmd_dir}/report.html  
  ## 参数
  -d 源码所在目录 
  -R 规则文件
  -f 生成结果文件格式: text 为文本
  -r 生成结果文件目录
  ```

  * 如果不知道参数信息

    > 可通过直接运行pmdjar 得到提示,如下
    > java -Dfile.encoding=utf8 -cp ${pmd_dir}/p3c-pmd-2.1.1-jar-with-dependencies.jar net.sourceforge.pmd.PMD

  ```shell
  
  Usage: pmd [options]
    Options:
      -failOnViolation, --failOnViolation
        By default PMD exits with status 4 if violations are found. Disable this
        option with '-failOnViolation false' to exit with 0 instead and just
        write the report.
        Default: true
      -auxclasspath
        Specifies the classpath for libraries used by the source code. This is
        used by the type resolution. Alternatively, a 'file://' URL to a text
        file containing path elements on consecutive lines can be specified.
      -benchmark, -b
        Benchmark mode - output a benchmark report upon completion; default to
        System.err.
        Default: false
      -cache
        Specify the location of the cache file for incremental analysis. This
        should be the full path to the file, including the desired file name
        (not just the parent directory). If the file doesn't exist, it will be
        created on the first run. The file will be overwritten on each run with
        the most up-to-date rule violations.
      -dir, -d
        Root directory for sources.
      -encoding, -e
        Specifies the character set encoding of the source code files PMD is
        reading (i.e., UTF-8).
        Default: UTF-8
      -filelist
        Path to a file containing a list of files to analyze.
      -format, -f
        Report format type.
        Default: text
      -help, -h, -H
        Display help on usage.
      -ignorelist
        Path to a file containing a list of files to ignore.
      -language, -l
        Specify a language PMD should use.
      -minimumpriority, -min
        Rule priority threshold; rules with lower priority than configured here
        won't be used. Valid values are integers between 1 and 5 (inclusive),
        with 5 being the lowest priority.
        Default: 5
      -no-cache
        Explicitly disable incremental analysis. The '-cache' option is ignored
        if this switch is present in the command line.
        Default: false
      -norulesetcompatibility
        Disable the ruleset compatibility filter. The filter is active by
        default and tries automatically 'fix' old ruleset files with old rule
        names
        Default: false
      -property, -P
        {name}={value}: Define a property for the report format.
        Default: []
      -reportfile, -r
        Sends report output to a file; default to System.out.
    * -rulesets, -R
        Comma separated list of ruleset names to use.
      -shortnames
        Prints shortened filenames in the report.
        Default: false
      -showsuppressed
        Report should show suppressed rule violations.
        Default: false
      -stress, -S
        Performs a stress test.
        Default: false
      -suppressmarker
        Specifies the string that marks a line which PMD should ignore; default
        is NOPMD.
        Default: NOPMD
      -threads, -t
        Sets the number of threads used by PMD.
        Default: 1
      -uri, -u
        Database URI for sources.
      -debug, -verbose, -D, -V
        Debug mode.
        Default: false
      -version, -v
        Specify version of a language PMD should use.
  
  
  Mandatory arguments:
  1) A java source code filename or directory
  2) A report format
  3) A ruleset filename or a comma-delimited string of ruleset filenames
  
  For example:
  C:\>pmd-bin-6.15.0\bin\pmd.bat -d c:\my\source\code -f html -R java-unusedcode
  
  Languages and version suported:
  java
  
  Available report formats and their configuration properties are:
     codeclimate: Code Climate integration.
     csv: Comma-separated values tabular format.
          problem - Include Problem column   default: true
          package - Include Package column   default: true
          file - Include File column   default: true
          priority - Include Priority column   default: true
          line - Include Line column   default: true
          desc - Include Description column   default: true
          ruleSet - Include Rule set column   default: true
          rule - Include Rule column   default: true
     emacs: GNU Emacs integration.
     empty: Empty, nothing.
     html: HTML format
          linePrefix - Prefix for line number anchor in the source file.
          linkPrefix - Path to HTML source.
     ideaj: IntelliJ IDEA integration.
          classAndMethodName - Class and Method name, pass '.method' when processing a directory.   default:
          sourcePath - Source path.   default:
          fileName - File name.   default:
     summaryhtml: Summary HTML format.
          linePrefix - Prefix for line number anchor in the source file.
          linkPrefix - Path to HTML source.
     text: Text format.
     textcolor: Text format, with color support (requires ANSI console support, e.g. xterm, rxvt, etc.).
          color - Enables colors with anything other than 'false' or '0'.   default: yes
     textpad: TextPad integration.
     vbhtml: Vladimir Bossicard HTML format.
     xml: XML format.
          encoding - XML encoding format, defaults to UTF-8.   default: UTF-8
     xslt: XML with a XSL Transformation applied.
          encoding - XML encoding format, defaults to UTF-8.   default: UTF-8
          xsltFilename - The XSLT file name.
     yahtml: Yet Another HTML format.
          outputDir - Output directory.
  
  For example on windows:
  C:\>pmd-bin-6.15.0\bin\pmd.bat -dir c:\my\source\code -format text -R rulesets/java/quickstart.xml -version 1.5 -language java -debug
  C:\>pmd-bin-6.15.0\bin\pmd.bat -dir c:\my\source\code -f xml -rulesets rulesets/java/quickstart.xml,category/java/codestyle.xml -encoding UTF-8
  C:\>pmd-bin-6.15.0\bin\pmd.bat -d c:\my\source\code -rulesets rulesets/java/quickstart.xml -auxclasspath lib\commons-collections.jar;lib\derby.jar
  C:\>pmd-bin-6.15.0\bin\pmd.bat -d c:\my\source\code -f html -R rulesets/java/quickstart.xml -auxclasspath file:///C:/my/classpathfile
  
  For example on *nix:
  $ pmd-bin-6.15.0/bin/run.sh pmd -dir /home/workspace/src/main/java/code -f html -rulesets rulesets/java/quickstart.xml,category/java/codestyle.xml
  $ pmd-bin-6.15.0/bin/run.sh pmd -d ./src/main/java/code -R rulesets/java/quickstart.xml -f xslt -property xsltFilename=my-own.xsl
  $ pmd-bin-6.15.0/bin/run.sh pmd -d ./src/main/java/code -f html -R rulesets/java/quickstart.xml -auxclasspath commons-collections.jar:derby.jar
  
  ```

### DEMO

### `ali-p3c.xml`

```xml
<?xml version="1.0"?>
<ruleset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="alibaba-pmd"
         xmlns="http://pmd.sourceforge.net/ruleset/2.0.0"
         xsi:schemaLocation="http://pmd.sourceforge.net/ruleset/2.0.0 http://pmd.sourceforge.net/ruleset_2_0_0.xsd">
    <description>p3c rule set</description>
    <rule ref="rulesets/java/ali-concurrent.xml"/>
    <rule ref="rulesets/java/ali-comment.xml"/>
    <rule ref="rulesets/java/ali-constant.xml"/>
	<rule ref="rulesets/java/ali-exception.xml"/>
	<rule ref="rulesets/java/ali-flowcontrol.xml"/>
	<rule ref="rulesets/java/ali-naming.xml">
        <!-- 去掉抽象类命名规范-->
        <exclude name="AbstractClassShouldStartWithAbstractNamingRule"/>
        <!-- 去掉测试用例命名规范 -->
        <exclude name="TestClassShouldEndWithTestNamingRule"/>
    </rule>
    <rule ref="rulesets/java/ali-other.xml"/>
    <rule ref="rulesets/java/ali-orm.xml"/>
    <rule ref="rulesets/java/ali-oop.xml"/>
    <rule ref="rulesets/java/ali-set.xml"/>
</ruleset>
```

### `pre-commit`

```shell
#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

REJECT=0

# BASE_PATH变量中为当前脚本存放的路径
BASE_PATH=$(cd `dirname $0`; pwd)    
PROJECT_ROOT=$(cd $(dirname ${BASH_SOURCE[0]})/../..; pwd)
echo "Project Path:${PROJECT_ROOT}"

# 读取git暂存区的.java文件
files=$(git diff --cached --name-only | grep -E '\.java$')

echo "==========本次提交的文件=========="
echo $files
echo "=================================="

PMD_DIR=${PROJECT_ROOT}/githook
PMD_JAR=p3c-pmd-2.1.1-jar-with-dependencies.jar

java -Dfile.encoding=gbk -cp ${PMD_DIR}/${PMD_JAR} net.sourceforge.pmd.PMD -d ${PROJECT_ROOT}/src/main -R ${PMD_DIR}/ali-p3c.xml -f text -shortnames -no-cache -r ${PROJECT_ROOT}/target/pmd_report.txt

# 接收上面的java命令执行的结果返回值
REJECT=$?
if test $[REJECT] -eq 0
then 
 echo "\033[36m commit success!!! \033[1m"  #蓝色打印提交成功
else 
 echo "\033[31m 代码提交未通过阿里规范，不允许提交！！！ \033[1m"
 echo "========================================================错误列表======================================================"
 cat ${PROJECT_ROOT}/target/pmd_report.txt
 echo "======================================================================================================================="
fi

echo "REJECT is ${REJECT}"

exit $REJECT
```




# MAVEN

## 跳过测试类

* -DskipTests，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。
* -Dmaven.test.skip=true，不执行测试用例，也不编译测试用例类。

## 生命周期 lifecycle

* default

  ```
  validate
  initialize
  generate-sources
  process-sources
  generate-resources
  process-resources
  compile
  process-classes
  generate-test-sources
  process-test-sources
  generate-test-resources
  process-test-resources
  test-compile
  process-test-classes
  test
  prepare-package
  package
  pre-integration-test
  integration-test
  post-integration-test
  verify
  install
  deploy
  ```

* clean

  * pre-clean
  * clean （注意这个clean不是lifecycle而是phase）
  * post-clean



## install

mvn install:install-file -Dfile=/Users/nohi/Downloads/dingtalk-sdk-java/taobao-sdk-java-auto_1479188381469-20210101.jar -DgroupId=com.oracle -DartifactId=ojdbc8 -Dversion=12.2.0.1 -Dpackaging=jar

-- DgroupId和DartifactId构成了该jar包在pom.xml的坐标， 对应依赖的DgroupId和DartifactId
-- Dfile表示需要上传的jar包的绝对路径
-- Dpackaging 为安装文件的种类



## 仓库配置

```
mirrorOf=“*”  //刚才经过，mirror一切，你配置的repository不起作用了
mirrorOf=my-repo-id //镜像my-repo-id，你配置的my-repo-id仓库不起作用了
mirrorOf=*,!my-repo-id  //!表示非运算，排除你配置的my-repo-id仓库，其他仓库都被镜像了。就是请求下载my-repo-id的仓库的jar不使用mirror的url下载，其他都是用mirror配置的url下载
mirrorOf=external:*  //如果本地库存在就用本地库的，如果本地没有所有下载就用mirror配置的url下载
```

* apache-maven的settings.xml不做任何配置时是有默认的仓库的，这个仓库就是central仓库，默认值是https://repo.maven.apache.org/maven2/，我们可以配置mirrorOf=central只镜像默认的central仓库
* 如果你只配置了mirrorOf=”my-repo-id“没有配置central或*，那么请求maven会判断，首先在默认的central仓库https://repo.maven.apache.org/maven2/找依赖，如果找不到就去my-repo-id对应的仓库找，遍历所有仓库后找不到就报错。

### 多仓库配置

> 参见：https://www.cnblogs.com/gentlescholar/p/15049090.html

profiles节点下配置多个profile，而且配置之后要激活

```
<activeProfiles>
    <activeProfile>aliyun</activeProfile>
    <activeProfile>maven-central</activeProfile>
</activeProfiles>
```

* pom.xml   maven.settings.xml

```
  <profiles>
     <profile>
        <id>aliyun</id>
        <repositories>
            <repository>
                <id>aliyun</id>
                <url>https://maven.aliyun.com/repository/public/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>true</enabled>
                    <updatePolicy>always</updatePolicy>
                </snapshots>
            </repository>
        </repositories>
    </profile>
    <profile>
        <id>maven-central</id>
        <repositories>
            <repository>
                <id>maven-central</id>
                <url>https://repo.maven.apache.org/maven2/</url>
                <releases>
                    <enabled>true</enabled>
                </releases>
                <snapshots>
                    <enabled>true</enabled>
                    <updatePolicy>always</updatePolicy>
                </snapshots>
            </repository>
        </repositories>
    </profile>
  </profiles>
```

* idea 勾选对应profile
* maven命令：mvn -Paliyun



## 项目中配置镜像

* 项目中pom.xml 

  这里的id就是mirrorOf要使用的ID。

```
<!-- 特殊maven仓库 -->
<repositories>
    <repository>
        <id>central-repo1</id>
        <name>Maven Repository Switchboard</name>
        <url>http://repo1.maven.org/maven2/</url>
        <layout>default</layout>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
```



## 父子工程

### 版本依赖、切换版本

maven项目中，父子工程版本号切换、子工程间版本依赖。除了手工修改，还可以使用项目版本号、变量替换。

#### 工程结构

```xml
Project-parent
|-- pom.xml
|-- Project-One
|---- pom.xml   (project-one依赖project-two)
|-- Project-Two
|---- pom.xml

parent -> pom.xml
<groupId>nohi.online</groupId>
<artifactId>VersionProject</artifactId>
<version>${reversion}</version>
<packaging>pom</packaging>

<modules>
	<module>Project-One</module>
	<module>Project-Two</module>
</modules>

<dependencyManagement>
  <dependencies>
  	<dependency>
    	<groupId>nohi.online</groupId>
      <artifactId>Project-One</artifactId>
      <version>${project.version}</version>
      -- project.version 会与 ${reversion} 版本号保持一致
    </dependency>
    <dependency>
    	<groupId>nohi.online</groupId>
      <artifactId>Project-Two</artifactId>
      <version>${project.version}</version>
    </dependency>
  </dependencies>
</dependencyManagement>

Project-One -> pom.xml (依赖project-two)
-- 1.子工程使用${reversion} 版本号与父工程保持一至
-- 2.子工程依赖其他子工程，使用父工程的dependencyManagement控制依赖版本号
<parent>
	<groupId>nohi.online</groupId>
  <artifactId>VersionProject</artifactId>
  <version>${reversion}</version>
</parent>
<dependencies>
  <dependency>
    <groupId>nohi.online</groupId>
    <artifactId>Project-Two</artifactId>
  </dependency>
</dependencies>

```

* maven打包

  ```
  mvn version:set -DnewVersion=1.2.3
  mvn clean -Dreversion=1.2.3 -DskipTests=true package
  ```

  












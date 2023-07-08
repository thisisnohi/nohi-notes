---
sidebar: auto
---

# SpringNative

> create by nohi 20221024 

* 参考：Spring Native 初体验及对比https://cloud.tencent.com/developer/article/2011143
* [微服务框架之争--Spring Boot和Quarkus - 掘金](https://juejin.cn/post/7023317351563001886)

## 背景

* [Spring Native与WebFlux一样注定昙花一现？ - 掘金](https://juejin.cn/post/6973203283666173983)

​		Spring Native使用GraalVM的Native Image编译器在编译期就将JVM字节码编译成可执行镜像文件（机器码），运行在Hotspot虚拟机之外的GraalVM（编译时写入），这说明它为了性能将会抛弃一些运行时特性，如类的延迟加载（常见如远程类加载、tomcat动态部署war）、反射、动态代理、Java Agent。目前也并不只有Spring Native支持GraalVM，与之在同一赛道的还有Quarkus，而且更轻量，然而广大开发者也并没有为此买单，因为它在我们的舒适圈之外，所以Quarkus的流行度并不足以衡量Spring Native的流行度，就像文章前面说的，Spring Native还自带光环。最后一个不是那么确定的因素，为了性能，你会选择Spring Native还是选择换一门语言如golang呢？我猜选择Spring Native的至少占九层以上，包括我。虽然golang很简洁，但不像java一样能带给我很多惊喜，创造很多“艺术”、艺术。



## 准备

* 下载

  * :link:  [社区版-航班](https://github.com/graalvm/graalvm-ce-builds/releases/)

    下载graalvm、native-image

  * :link:  [OpenJdk](https://jdk.java.net/archive/)

* GraalVM

  * :door:[安装文档](https://www.graalvm.org/22.0/docs/getting-started/macos/)
  * GRAALVM_HOME=/Library/Java/JavaVirtualMachines/graalvm-ce-java17-22.2.0/Contents/Home
  * `sudo xattr -r -d com.apple.quarantine /path/to/graalvm`
    * 不执行上述命令：java -version可能出现文件损坏提示(MacOs)

* Natvie Image

  * 自动安装：gu install native-image
  * 手动安装：
    * 参见：准备-下载 下载graalvm对应版本 native-image 
    * 文档：https://www.graalvm.org/22.2/reference-manual/graalvm-updater/
    * 指定jar安装： gu -L install component.jar
    * 指定目录安装： gu -L install -D



## 打包

```
GRAALVM_HOME='/Library/Java/JavaVirtualMachines/graalvm-ce-java17-22.2.0/Contents/Home' JAVA_HOME='/Library/Java/JavaVirtualMachines/jdk-17.0.2.opjdk/Contents/Home/' 
mvn -Pnative -DskipTests package
```

## DEMO（SrpingBoot2）

>项目：git@github.com:thisisnohi/SpringCloud2022.git/SpringBoot-2-Native

* SpringBoot 2.7.5
* native-maven-plugin 0.9.22

## DEMO (SpringBoot3)

> 项目：git@github.com:thisisnohi/SpringCloud2022.git/SpringBootNative
>
> 参考：https://blog.csdn.net/BASK2311/article/details/128830624

```
mvn native:build来构建spring boot3应用程序

## 经过尝试：
* 第一步：mvn -Pnative -DskipTests spring-boot:build-image
* 第二步：mvn native:build 可以正常打包
## 最终
* mvn clean package -Pnative
```

:point_right: 注意修改：mainClass （Application）

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.1.0</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>nohi.demo</groupId>
	<artifactId>SpringBootNative</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>SpringBootNative</name>
	<description>Demo SpringBootNative project for Spring Boot 3</description>
	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.graalvm.buildtools</groupId>
				<artifactId>native-maven-plugin</artifactId>
				<configuration>
					<!-- imageName用于设置生成的二进制文件名称 -->
					<imageName>${project.artifactId}</imageName>
					<!-- mainClass用于指定main方法类路径 -->
					<mainClass>nohi.SpringBootNativeApplication</mainClass>
					<buildArgs>
						--no-fallback
					</buildArgs>
				</configuration>
				<executions>
					<execution>
						<id>build-native</id>
						<goals>
							<goal>compile-no-fork</goal>
						</goals>
						<phase>package</phase>
					</execution>
				</executions>
			</plugin>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>
```

* springboot 3.1.0
* native-maven-plugin

### Application

```java
@RestController
@SpringBootApplication
public class SpringBootNativeApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootNativeApplication.class, args);
    }
    @GetMapping(path = "/main")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello world! SpringBootNative");
    }
}	
```

### 打包

```shell
mvn -Pnative -DskipTests package
```

## DEMO (nohi-web-native)

> 项目：git@github.com:thisisnohi/SpringCloud2022.git/*nohi-web-native*

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>nohi.demo</groupId>
  <artifactId>nohi-web-native</artifactId>
  <version>2.0.0-SNAPSHOT</version>

  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.0</version>
    <!-- 子模块非依赖工程的父模块 -->
    <relativePath/>
  </parent>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <java.version>17</java.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webflux</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>

    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.14.2</version>
    </dependency>

    <!-- <dependency>
       <groupId>org.projectlombok</groupId>
       <artifactId>lombok</artifactId>
     </dependency>-->

    <dependency>
      <groupId>org.hibernate.validator</groupId>
      <artifactId>hibernate-validator</artifactId>
      <version>6.1.3.Final</version>
    </dependency>

    <dependency>
      <groupId>com.google.guava</groupId>
      <artifactId>guava</artifactId>
      <version>31.1-jre</version>
    </dependency>

    <dependency>
      <groupId>org.apache.commons</groupId>
      <artifactId>commons-lang3</artifactId>
    </dependency>
    <dependency>
      <groupId>commons-lang</groupId>
      <artifactId>commons-lang</artifactId>
      <version>2.6</version>
    </dependency>
    <dependency>
      <groupId>commons-io</groupId>
      <artifactId>commons-io</artifactId>
      <version>2.11.0</version>
    </dependency>

    <!-- httpclient -->
    <dependency>
      <groupId>org.apache.httpcomponents</groupId>
      <artifactId>httpmime</artifactId>
      <version>4.5.14</version>
    </dependency>

    <!-- Httpclient5 -->
    <dependency>
      <groupId>org.apache.httpcomponents.client5</groupId>
      <artifactId>httpclient5</artifactId>
      <version>5.1.3</version>
    </dependency>

    <!-- OK Http -->
    <dependency>
      <groupId>com.squareup.okhttp3</groupId>
      <artifactId>okhttp</artifactId>
      <version>4.10.0</version>
    </dependency>

    <!-- logback  spring-boot-starter-webflux 含 logback-classic-->

    <!-- swagger3 -->
    <dependency>
      <groupId>com.github.xiaoymin</groupId>
      <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
      <version>4.1.0</version>
    </dependency>

    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-starter-openfeign</artifactId>
      <version>4.0.3</version>
    </dependency>

    <dependency>
      <groupId>io.github.openfeign</groupId>
      <artifactId>feign-jackson</artifactId>
      <version>11.10</version>
    </dependency>

    <dependency>
      <groupId>io.github.openfeign</groupId>
      <artifactId>feign-httpclient</artifactId>
      <version>11.10</version>
    </dependency>

    <dependency>
      <groupId>io.github.openfeign</groupId>
      <artifactId>feign-okhttp</artifactId>
      <version>11.9.1</version>
    </dependency>

    <dependency>
      <groupId>com.alibaba.fastjson2</groupId>
      <artifactId>fastjson2</artifactId>
      <version>2.0.13</version>
    </dependency>

    <dependency>
      <groupId>com.sun.xml.ws</groupId>
      <artifactId>jaxws-ri</artifactId>
      <version>2.3.0</version>
      <type>pom</type>
      <exclusions>
        <exclusion>
          <groupId>commonj.sdo</groupId>
          <artifactId>commonj.sdo</artifactId>
        </exclusion>
      </exclusions>
    </dependency>

    <dependency>
      <groupId>commons-net</groupId>
      <artifactId>commons-net</artifactId>
      <version>3.9.0</version>
    </dependency>

    <dependency>
      <groupId>cn.hutool</groupId>
      <artifactId>hutool-all</artifactId>
      <version>5.8.20</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.graalvm.buildtools</groupId>
        <artifactId>native-maven-plugin</artifactId>
        <configuration>
          <!-- imageName用于设置生成的二进制文件名称 -->
          <imageName>${project.artifactId}</imageName>
          <!-- mainClass用于指定main方法类路径 -->
          <mainClass>nohi.Application</mainClass>
          <buildArgs>
            --no-fallback
            -Dspring.native.remove-yaml-support=true -Dspring.spel.ignore=true
            --trace-class-initialization=org.apache.commons.logging.LogFactory
            --initialize-at-build-time=org.apache.commons.logging.LogFactory
          </buildArgs>
        </configuration>
        <executions>
          <execution>
            <id>build-native</id>
            <goals>
              <goal>compile-no-fork</goal>
            </goals>
            <phase>package</phase>
          </execution>
        </executions>
      </plugin>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

### package

```
mvn -Pnative -DskipTests clean package
```

### Q&A

#### `--trace-class-initialization=org.apache.commons.logging.LogFactory`

```
Error: Classes that should be initialized at run time got initialized during image building:
 org.apache.commons.logging.LogFactory was unintentionally initialized at build time. To see why org.apache.commons.logging.LogFactory got initialized use --trace-class-initialization=org.apache.commons.logging.LogFactory
To see how the classes got initialized, use --trace-class-initialization=org.apache.commons.logging.LogFactory
Error: Use -H:+ReportExceptionStackTraces to print stacktrace of underlying exception

Finished generating 'nohi-web-native' in 53.2s.
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:04 min
[INFO] Finished at: 2023-06-24T11:11:41+08:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.graalvm.buildtools:native-maven-plugin:0.9.22:compile-no-fork (build-native) on project nohi-web-native: Execution of /Library/Java/JavaVir
```

* pom.xml增加参数

  ```
  -Dspring.native.remove-yaml-support=true -Dspring.spel.ignore=true
  --trace-class-initialization=org.apache.commons.logging.LogFactory
  --initialize-at-build-time=org.apache.commons.logging.LogFactory
  ```

  ```xml
  <plugin>
    <groupId>org.graalvm.buildtools</groupId>
    <artifactId>native-maven-plugin</artifactId>
    <configuration>
      <!-- imageName用于设置生成的二进制文件名称 -->
      <imageName>${project.artifactId}</imageName>
      <!-- mainClass用于指定main方法类路径 -->
      <mainClass>nohi.Application</mainClass>
      <buildArgs>
        --no-fallback
        -Dspring.native.remove-yaml-support=true -Dspring.spel.ignore=true
        --trace-class-initialization=org.apache.commons.logging.LogFactory
        --initialize-at-build-time=org.apache.commons.logging.LogFactory
      </buildArgs>
      <!-- 省略其他配置... -->
    </configuration>
  </plugin>
  ```

##  FastJson转换问题



`mvn -Pnative -DskipTests clean package` 打包成功后，运行程序出现

`JSONObject.toJSONString` 转换JSON结果为空，以下为解决过程及坑



### 20230707

* 根据fastjson2 git 项目 [example-graalvm-native] 2.0.35-SNAPSHOT 修改依赖 
  * 本地instanll 2.0.35-SNAPSHOT fastjson2
  * fastjosn-2.0.35-SNAPSHOT example-graalvm-native 打包native后可以使用 JSONObject.toJSONString(mediaContent)
* 本工程 依赖 fastjosn-2.0.35-SNAPSHOT
  * 结果：转json仍为空

### 20230708

#### 1 使用追踪代理（Tracing Agent）

* pom.xml

  ```xml
  <buildArgs>
     --no-fallback
     -Dspring.native.remove-yaml-support=true
     -Dspring.spel.ignore=true
     --trace-class-initialization=org.apache.commons.logging.LogFactory
     --initialize-at-build-time=org.apache.commons.logging.LogFactory
     --initialize-at-build-time=java.util.jar.JarFile
     --trace-class-initialization=java.util.jar.JarFile
     --initialize-at-run-time=java.util.jar.JarFile
  </buildArgs>
  ```

```shell
-- 1 生成jar包
mvn -Dmaven.test.skip=true clean package

-- 2.得到jar包之后，执行命令运行并开始收集元数据
java -jar -agentlib:native-image-agent=config-output-dir=META-INF/native-image target/nohi-web-native-2.0.0-SNAPSHOT.jar
java -Dspring.aot.enabled=true \
    -agentlib:native-image-agent=config-output-dir=src/main/resources/META-INF/native-image \
    -jar target/nohi-web-native-2.0.0-SNAPSHOT.jar
  * 接着程序就开始运行了，我们可能需要打开网页或者测试工具将所有代码都跑完，这个是最蛋疼的，
  * 跑不完生成的镜像可能也可以运行，但指不定你哪天就报错了，或者运行到某一块有特别反射的地方
  * 也报错，就尴尬了

-- 3.拷贝 META-INF 到 工程resources目录下

-- 4.native打包
mvn -Pnative -Dmaven.test.skip=true clean package
```
   **结果失败**

#### 2 使用 JSON.register objectWriter ObjectReaders

> 结果正常
>
> 代码: [nohi-web-native]()
>
> [fastjson2](https://github.com/alibaba/fastjson2/tree/main/example-graalvm-native)

虽可以解决json转换问题，但对象如果很多，使用仍不方便。

```java
public void registerRsaRespItemVO() {
    log.info("===========================registerRsaRespItemVO======");
    JSON.register(RsaRespItemVO.class
            , ObjectWriters.objectWriter(RsaRespItemVO.class
                    , ObjectWriters.fieldWriter("acctNo", RsaRespItemVO::getAcctNo)
                    , ObjectWriters.fieldWriter("acctName", RsaRespItemVO::getAcctName)
                    , ObjectWriters.fieldWriter("dateTime", RsaRespItemVO::getDateTime)
                    , ObjectWriters.fieldWriter("amt", BigDecimal.class, RsaRespItemVO::getAmt)
                    , ObjectWriters.fieldWriter("balance", BigDecimal.class, RsaRespItemVO::getBalance)
            )
    );
    JSON.register(RsaRespItemVO.class, ObjectReaders.of(RsaRespItemVO::new
            , fieldReaderString("acctNo", RsaRespItemVO::setAcctName)
            , fieldReaderString("acctName", RsaRespItemVO::setAcctName)
            , fieldReaderString("dateTime", RsaRespItemVO::setDateTime)
            , fieldReader("amt", BigDecimal.class, RsaRespItemVO::setAmt)
            , fieldReader("balance", BigDecimal.class, RsaRespItemVO::setBalance)
    ));
}
```

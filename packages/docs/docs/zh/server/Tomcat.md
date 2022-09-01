---
sidebar: auto
---

# Tomcat

>  create by nohi 202020606



## 环境搭建

* 版本：apache-tomcat-9.0.35-src 

  原码目录：https://mirror.bit.edu.cn/apache/tomcat/tomcat-9/v9.0.35/src/apache-tomcat-9.0.35-src.zip

  二进制目录：https://mirror.bit.edu.cn/apache/tomcat/tomcat-9/v9.0.35/bin/apache-tomcat-9.0.35.zip

  注: 当前版本验证有效，不要随意使用最新版本，可能出现意想不到情况。之前9.0.34版本，出现各种问题。

* 增加pom.xml

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  
    <modelVersion>4.0.0</modelVersion>
    <groupId>cn.xxx</groupId>
    <artifactId>Tomcat9.0</artifactId>
    <name>Tomcat9</name>
    <version>9.0</version>
  
    <build>
      <finalName>Tomcat9</finalName>
      <sourceDirectory>java</sourceDirectory>
      <resources>
        <resource>
          <directory>java</directory>
        </resource>
      </resources>
      <plugins>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>2.3</version>
          <configuration>
            <encoding>UTF-8</encoding>
            <source>1.8</source>
            <target>1.8</target>
          </configuration>
        </plugin>
      </plugins>
    </build>
  
    <dependencies>
      <dependency>
        <groupId>org.apache.ant</groupId>
        <artifactId>ant</artifactId>
        <version>1.10.1</version>
      </dependency>
      <dependency>
        <groupId>org.apache.ant</groupId>
        <artifactId>ant-apache-log4j</artifactId>
        <version>1.9.5</version>
      </dependency>
      <dependency>
        <groupId>org.apache.ant</groupId>
        <artifactId>ant-commons-logging</artifactId>
        <version>1.9.5</version>
      </dependency>
      <dependency>
        <groupId>javax.xml.rpc</groupId>
        <artifactId>javax.xml.rpc-api</artifactId>
        <version>1.1</version>
      </dependency>
      <dependency>
        <groupId>wsdl4j</groupId>
        <artifactId>wsdl4j</artifactId>
        <version>1.6.2</version>
      </dependency>
      <dependency>
        <groupId>org.eclipse.jdt.core.compiler</groupId>
        <artifactId>ecj</artifactId>
        <version>4.6.1</version>
      </dependency>
  
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
      </dependency>
      <dependency>
        <groupId>org.easymock</groupId>
        <artifactId>easymock</artifactId>
        <version>3.5.1</version>
      </dependency>
    </dependencies>
  </project>
  ```

* 工程增加lib目录, 拷贝对应版本二进制包(即制品、可运行包)目录lib所有依赖包

* 运行：org.apache.catalina.startup.Bootstrap 增加VN options 如是下

  ```
  -Dcatalina.home=/Users/nohi/work/workspaces-nohi/apache-tomcat-9.0.35-src
  -Dfile.encoding=UTF-8
  -Duser.region=US
  -Duser.language=en
  ```

  

* 运行乱码

  * 控制台乱码

  ```
  -Dfile.encoding=UTF-8
  -Duser.region=US
  -Duser.language=en
  -Dcatalina.home=/Users/nohi/work/workspaces-nohi/apache-tomcat-9.0.34-src
  ```

  * Tomcat/manager页面乱码：

    ```
    主要由于国际化属性文件内容引起
    apache-tomcat-9.0.35-src/java/org/apache/catalina/manager/LocalStrings_zh_CN.properties
    1. native2ascii LocalStrings_zh_CN.properties LocalStrings_zh_CN.properties.txt
    2. LocalStrings_zh_CN.properties.txt拷贝至LocalStrings_zh_CN.properties
    
    参见：
    中文乱码解决
    1.解决方法一:在使用keyValue时,进行编码转换
    view plaincopy to clipboardprint?
    String keyValue = new String(rb.getString(keyName).getBytes("ISO-8859-1"), "GBK");  
    String keyValue = new String(rb.getString(keyName).getBytes("ISO-8859-1"), "GBK");
    2.解决方法二:将machine_zh_CN.properties转换成为unicode形式
    native2ascii.exe machine_zh_CN.properties machine_zh_CN.txt
    p1=/u51b0/u7bb1 p2=/u6d17/u8863/u673a p3=/u7535/u89c6/u673a
    ```


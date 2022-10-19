## Gradle

* 参照：Gradle下载安装教程 https://zhuanlan.zhihu.com/p/460771551

  

```
gradle projects 查看工程信息
gradle tasks 查看任务信息
gradle task name 执行task任务
```

* gradlew checkstyleNohttp --stacktrace

* gradle build -x test 跳过test

  * ```bash
    gradle test 手工执行test
    ```



## 设置

* 指定版本

  * gradle/wrapper/gradle-wrapper.properties

    ```
    distributionUrl=https\://services.gradle.org/distributions/gradle-6.1-all.zip
    distributionUrl=file:/Users/nohi/data/gradle-6.5-all.zip
    ** file: 为从本地获取无需下载
    ```

    

## dep

```
   compile group: 'javax.servlet', name:'javax.servlet-api', version: '3.1.0'
//    optional("javax.servlet:javax.servlet-api:3.1.0")
    compile('commons-logging:commons-logging:1.2')
```


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

* Natvie Image

  * 自动安装：gu install native-image
  * 手动安装：
    * 参见：准备-下载 下载graalvm对应版本 native-image 
    * 文档：https://www.graalvm.org/22.2/reference-manual/graalvm-updater/
    * 指定jar安装： gu -L install component.jar
    * 指定目录安装： gu -L install -D



## 打包

```
GRAALVM_HOME='/Library/Java/JavaVirtualMachines/graalvm-ce-java17-22.2.0/Contents/Home' JAVA_HOME='/Library/Java/JavaVirtualMachines/jdk-17.0.2.opjdk/Contents/Home/' mvn -Pnative -DskipTests package
```


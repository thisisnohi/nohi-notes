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










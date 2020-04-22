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












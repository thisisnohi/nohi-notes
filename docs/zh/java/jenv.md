# JAVA多环境管理

* 管理

  * jenv
  * sdkman

* 显示版本列表

  MacOS: `/usr/libexec/java_home -V`





## jenv



* 安装： MacOS `brew install jenv`

* 显示当前版本：`jenv version`

* 显示所有版本：`jenv versions`

* 临时设置版本：`jenv local xxx`

* 全局设置版本：`jenv global xxx`

* 添加jdk

  ```
  jenv add /Library/Java/JavaVirtualMachines/jdk-18.0.2.jdk/Contents/Home
  ```

  

  
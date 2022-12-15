# 21 Class文件结构

## 1 解读class文件方式

* Notepad++，安装HEX-Editor插件，或者用Binary Viewer
* javap(jdk自带反解析工具)
* 使用IDEA插件，jclasslib 或者 jclasslib bytecode viewer客户端工具



## 4 常用命令

* javac -g 生成局部变量表信息

* javap <options> <classes>

  * javap --help 帮助

  * javap -version 当前javap所在jdk的版本信息，与class文件无关

  * javap -s 输出内部类型签名

  * java -l 输出行号和本地变量表

  * javac -c 对代码进行反汇编

  * java -v -verbose 输出附加信息（包括行号、本地变量表、反汇编等详细信息）

    
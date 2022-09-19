# Jmeter

> JMeter最佳实践http://www.jmeter.com.cn/2941.html
>
> https://www.cnblogs.com/imyalost/p/7062784.html



## 常用插件

> 参考：https://www.cnblogs.com/imyalost/p/7751981.html



## 步骤

* 新建测试计划TestPlan
* 线程组
  * 
* 请求



## 导出HTML报告

> 参考：https://www.jianshu.com/p/4f32918d66bb



* 查看结果树

  * 配置输出文件：/Users/nohi/env/apache-jmeter-5.5/work_jemter/NOHI_test.csv
  * 配置按钮弹出界面按需选择，这里默认

* 命令格式：**jmeter -n -t [jmx file] -l [result file] -e -o [Path to output**

  - jmx file：测试计划的文件名称
  - result file：输出文件路径，可以是结果日志名称
  - Path to output folder：要保存的report文件路径

   ** 参数说明**

  - -n：非GUI模式执行JMeter
  - -t：执行测试文件所在的位置
  - -l：指定生成测试结果的保存文件，jtl文件格式
  - -e：测试结束后，生成测试报告
  - -o：指定测试报告的存放位置

* 直接生成HTML报告

  ```
  jmeter -n -t /Users/nohi/work/jemeter/NOHI_TEST.jmx -l /Users/nohi/work/jemeter/report/NOHI_test.csv -e -o /Users/nohi/work/jemeter/report/file
  ```

* 使用之前的测试结果，生成测试报告

  * 生成测试结果

    ```
    jmeter -n -t /Users/nohi/work/jemeter/NOHI_TEST.jmx -l 20220917.jtl
    ```

  * 根据测试结果，生成测试报告

    ```
    jmeter -g 20220917.jtl -o /Users/nohi/work/jemeter/report2
    ```

    
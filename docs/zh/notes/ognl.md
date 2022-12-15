# OGNL
> 20190130 https://www.cnblogs.com/cenyu/p/6233942.html

## 概述
* OGNL表达式
	OGNL是Object Graphic Navigation Language(对象图导航语言)的缩写，他是一个开源项目。Struts框架使用OGNL作为默认的表达式语言
* OGNL优势
	* 支持对象方法调用，如：×××.doSomeSpecial();
	* 支持类静态的方法调用和值访问，表达式的格式
		@[类全名（包括包路径）]@[方法名 |  值名]
		例如： @java.lang.String@format('foo %s', 'bar')或@tutorial.MyConstant@APP_NAME；
	
	* 支持赋值操作和表达式串联
	  > 如price=100, discount=0.8,calculatePrice()，这个表达式会返回80；
	
	* 访问OGNL上下文（OGNL context）和ActionContext；
	* 操作（创建）集合对象。
	
 	
	OGNL 有一个上下文（Context）概念，说白了上下文就是一个MAP结构，它实现了java.utils.Map 的接口。


## OGNL 表达式

* 常量： 字符串：“ hello ” 字符：‘ h ’ 数字：除了像 java 的内置类型 int,long,float 和 double,Ognl 还有如例：10.01B，相当于 java.math.BigDecimal，使用’ b ’或者’ B ’后缀。 100000H，相当于 java.math.BigInteger，使用’ h ’ 或 ’ H ’ 后缀。
* 属性的引用 例如：user.name
* 变量的引用 例如：#name
* 静态变量的访问 使用 @class@field
* 静态方法的调用 使用 @class@method(args), 如果没有指定 class 那么默认就使用java.lang.Math.
* 构造函数的调用 例如：new java.util.ArrayList();


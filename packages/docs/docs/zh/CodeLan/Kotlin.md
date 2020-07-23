# Kotlin

> 参考：
>
> 从 Java 角度深入理解 Kotlin https://chiclaim.blog.csdn.net/article/details/85575213
>
> Kotlin从入门到进阶https://www.jianshu.com/p/f98dcd2da323 

## 类的修饰符

* classModifier: 类属性修饰符，标示类本身特性。

```
abstract    // 抽象类  
final       // 类不可继承，默认属性
enum        // 枚举类
open        // 类可继承，类默认是final的
annotation  // 注解类
```

* accessModifier: 访问权限修饰符

```
private    // 仅在同一个文件中可见
protected  // 同一个文件中或子类可见
public     // 所有调用的地方都可见
internal   // 同一个模块中可见
```

* 变量

  ```
  const val 公有常量
  val 私有常量
  ```

  

* 伴生对象

  > 参见：https://blog.csdn.net/sinat_14849739/article/details/80552111


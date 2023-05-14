# SpringBoot 测试

> create by nohi 20230106
>
> :video_camera: 视频：[Udemy 高分付费课程](https://www.bilibili.com/video/BV1XP4y1Y7H6?p=5&spm_id_from=pageDriver&vd_source=9004ce053a52d5930f71e230579961e7)
>
> :video_camera:[单元测试详解-SpringBootTest和Mock测试](https://www.bilibili.com/video/BV1DD4y1j7xb/?spm_id_from=333.337.search-card.all.click&vd_source=9004ce053a52d5930f71e230579961e7)   :spiral_notepad: [笔记](https://blog.csdn.net/sinat_41900036/article/details/128551507?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22128551507%22%2C%22source%22%3A%22sinat_41900036%22%7D)

## 1 概念

### 什么是单元测试

* 什么是单元？

* 可独立执行

* 速度较快

  

## 2 基础单元测试

### 依赖maven

```
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.9.1</version>
    <scope>test</scope>
</dependency>
```

* demo

  ```
  public class A01Utils {
      public int intAdd(int a, int b){
          return a + b;
      }
  }
  ```

  ```
  A01Utils u = new A01Utils();
  Assertions.assertEquals(6, u.intAdd(1,5), "1+5 must equals 6");
  Assertions.assertNotEquals(5, u.intAdd(1,5), "1+5 must not equals 5");
  ```

### 执行步骤

* set up
* Execute
* Assert

```java 
@Test
public void testEqualsAndNotEquals() {
  // set up
  DemoUtils demoUtils = new DemoUtils();
  int expected = 6;
  // execute
  int actual = demoUtils.intAdd(2, 4);
  // assert
  Assertions.assertEquals(expected, actual, "2+4 must be 6");
}
```

### 单元测试覆盖率

* 执行时选择Run xxx with coverage
* 运行结束后出现覆盖率情况

![image-20230505223402445](./attach/image-20230505223402445.png)

* 源码右显示命中情况

![image-20230505223640980](./attach/image-20230505223640980.png)



### JUnit Assertions

`org.junit.jupiter.api.Assertions`

* assertEquals

* assertNotEquals

* assertNull

* assertNotNull

* assertTrue

* assertFalse

* assertInstanceOf

  ...

### JUnit 生命周期函数

| @BeforeAll  | 在当前类的所有测试方法之前执行。 注解在静态方法上。 此方法可以包含一些初始化代码。 | Junit4 ：@BeforeClass |
| ----------- | ------------------------------------------------------------ | --------------------- |
| @BeforeEach | 在每个测试方法之前执行。 注解在非静态方法上。 可以重新初始化测试方法所需要使用的类的某些属性。 | Junit4:@Before        |
| @AfterEach  | 在每个测试方法之后执行。 注解在非静态方法上。 可以回滚测试方法引起的数据库修改。 | Junit4:@After         |
| @AfterAll   | 在当前类中的所有测试方法之后执行。 注解在静态方法上。 此方法可以包含一些清理代码。 | Junit4:@AfterClass    |

* 执行顺序

  ![](./attach/image-20230508124409328.png)

### Customer Display Name

* `@DisplayName `可以给 测试类 或者 测试方法来自定义显示的名称。可以支持 空格、特殊字符，甚至是 emoji。

* `@DisplayNameGenerator`

  | DisplayNameGenerator | Behavior                             | Example                                                      |
  | -------------------- | ------------------------------------ | ------------------------------------------------------------ |
  | Standard             | 默认的，没什么变化                   | test_display_ok() -> test_display_ok()                       |
  | Simple               | 针对没有参数的方法，去除掉尾部的括号 | test_display_ok() -> test_display_ok                         |
  | ReplaceUnderscores   | 把下划线 ‘_’ 替换成空格              | test_display_ok() -> test display ok                         |
  | IndicativeSentences  | class + method name                  | test_diaplay_ok() -> DisplayNameGeneratorTest , test_diaplay_ok() |

* `Parameterized Tests`

  可参数化的测试，我们可以用 `ParameterizedTest` 来自定义设置 DisplayName,这种时候就不需要用 `DisplayName`或者 `DisplayNameGenerator`

   @ParameterizedTest(name = "#{index} - Test with {0} and {1}")

### 方法排序

> [13.JUnit5 执行顺序](https://www.zhihu.com/zvideo/1574353816069242880)

* OrderAnnotation 
* DisplayName
* Random
* MethodName


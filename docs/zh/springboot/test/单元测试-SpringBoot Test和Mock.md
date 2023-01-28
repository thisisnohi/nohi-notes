# 单元测试-SpringBoot Test和Mock

> create by nohi 20230110 
>
> :video_camera:[单元测试详解-SpringBootTest和Mock测试](https://www.bilibili.com/video/BV1DD4y1j7xb/?spm_id_from=333.337.search-card.all.click&vd_source=9004ce053a52d5930f71e230579961e7)   :spiral_notepad: [笔记](https://blog.csdn.net/sinat_41900036/article/details/128551507?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22128551507%22%2C%22source%22%3A%22sinat_41900036%22%7D)



## 概念

XXX

## 单元测试与SpringBoot

### 依赖

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

* junit – 标准的单元测试Java应用程序
* Spring Test & Spring Boot Test – 对Spring Boot应用程序的单元测试提供支持
* Mockito, Java mocking框架，用于模拟任何Spring管理的Bean，比如在单元测试中模拟一个第三方系统Service接口返回的数据，而不会去真正调用第三方系统；
* AssertJ，一个流畅的assertion库，同时也提供了更多的期望值与测试返回值的比较方式；
* JSONassert，对JSON对象或者JSON字符串断言的库。

### Spring Boot单元测试结构

```
@DisplayName("AlarmMsgstationController测试类")  //起别名
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class Test {
}
```

## 注解

![在这里插入图片描述](./attach/421a1f0b0d77407093e84356d205ae11.png)

## 用法

```
// junit5 之前采用 @RunWith(SpringRunner.class) 方式
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class FirstTest {
    @Test
    public void test() {
        int a=1;
        Assertions.assertEquals(1,a);//判断二者是否相等
    }
}
```

### Mock

1. 可以完全脱离数据库
2. 只针对某一个小方法（一个小的单元）来测试，测试过程中，不需要启动其他的东西，不免其他因素可能产生的干扰

* 不再使用@Autowired

* 启动Spring会导致运行单元测试的时候的速度变慢（run->Junit Test），单元测试只针对某一个类的方法来测试，不需要启动Spring，只需要对应的实体实例就够了，在需要注入bean的时候直接new

* 不再使用@SpringBootTest

* 不调用数据库

* @Transactional @Rollback(true)这两个注解也不要

* 使用Assert断言

#### **基本应用**

```
public class MockitoDemo {
    @Test
    public void test() {
        Random mockRandom = mock(Random.class); //mock了一个Random对象
        Assertions.assertEquals(0, mockRandom.nextInt());//未进行打桩，每次返回值都是0

        when(mockRandom.nextInt()).thenReturn(100);  // 进行打桩操作，指定调用 nextInt 方法时，永远返回 100
        Assertions.assertEquals(100, mockRandom.nextInt());
    }
}
```

* 异常：Mockito cannot mock this class: class java.util.Random

  ```
  jvm参数添加： --add-exports=java.base/jdk.internal.util.random=ALL-UNNAMED
  ```

#### @Mock

@Mock 注解可以理解为对 mock 方法的一个替代。使用该注解时，要使用`MockitoAnnotations.initMocks` 方法，让注解生效。旧版的是initMocks，新版的是openMocks

```java 
	  @Mock
    private Random random;

    @BeforeEach
    public void before() {
        System.out.println("===BeforeEach===");
        // 让注解生效
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testNew() {
        when(random.nextInt()).thenReturn(100);
        Assertions.assertEquals(100, random.nextInt());
    }
```

也可以用`MockitoJUnitRunner`来代替`MockitoAnnotations.initMocks`

```java 
// junit5 mockito
@ExtendWith(MockitoExtension.class)
public class Mockito2Demo {
    @Mock
    private Random random;
    @BeforeEach
    public void before() {
        System.out.println("===BeforeEach===");
    }

    /**
     * 增加jvm参数：--add-exports=java.base/jdk.internal.util.random=ALL-UNNAMED
     */
    @Test
    public void testNew() {
        when(random.nextInt()).thenReturn(100);
        Assertions.assertEquals(100, random.nextInt());
    }
}
```



#### @Spy

> mock()方法与spy()方法的不同：
>
> 1. 被spy的对象会走真实的方法，而mock对象不会
> 2. spy方法的参数是对象实例，mock的参数是class

@InjectMocks
mockito 会将 @Mock、@Spy 修饰的对象自动注入到 @InjectMocks 修饰的对象中

##### thenReturn

thenReturn 用来指定特定函数和参数调用的返回值；

thenReturn 中可以指定多个返回值。在调用时返回值依次出现。若调用次数超过返回值的数量，再次调用时返回最后一个返回值。

doReturn 的作用和 thenReturn 相同，但使用方式不同：

```
when(mockRandom.nextInt()).thenReturn(1);//返回值为1
when(mockRandom.nextInt()).thenReturn(1, 2, 3);

doReturn(1).when(random).nextInt();
```



##### thenThrow

thenThrow 用来让函数调用抛出异常。（可搭配try catch使用）

thenThrow 中可以指定多个异常。在调用时异常依次出现。若调用次数超过异常的数量，再次调用时抛出最后一个异常。

```java
when(mockRandom.nextInt()).thenThrow(new RuntimeException("异常"));
when(mockRandom.nextInt()).thenThrow(new RuntimeException("异常1"), new RuntimeException("异常2"));

@Test
public void test() {
  Random mockRandom = mock(Random.class);
  when(mockRandom.nextInt()).thenThrow(new RuntimeException("异常1"), new RuntimeException("异常2"));

  try {
    mockRandom.nextInt();
    Assertions.fail();//上一行会抛出异常，到catch中去，走不到这里
  } catch (Exception ex) {
    System.out.println("===ex：" + ex.getMessage());
    Assertions.assertTrue(ex instanceof RuntimeException);
    Assertions.assertEquals("异常1", ex.getMessage());
  }
  try {
    mockRandom.nextInt();
    Assertions.fail();
  } catch (Exception ex) {
    Assertions.assertTrue(ex instanceof RuntimeException);
    Assertions.assertEquals("异常2", ex.getMessage());
  }
}
```

##### doThrow

对应返回类型是 void 的函数，thenThrow 是无效的，要使用 doThrow。也可以用 doThrow 让返回非void的函数抛出异常

```
doThrow(new RuntimeException("异常")).when(exampleService).hello();
// 下面这句等同于 when(random.nextInt()).thenThrow(new RuntimeException("异常"));
doThrow(new RuntimeException("异常")).when(random).nextInt();
```



##### reset

使用 reset 方法，可以重置之前自定义的返回值和异常。

```
reset(exampleService);
```



##### vetify

使用 verify 可以校验 mock 对象是否发生过某些操作，配合 time 方法，可以校验某些操作发生的次数

```
//判断backOutstockMapper.selectReportCountByMap()方法是否被调用1次
verify(backOutstockMapper, times(1)).selectReportCountByMap(Mockito.any());

//校验backOutstockMapper.selectReportCountByMap()方法是否被调用过
verify(backOutstockMapper).selectReportCountByMap(Mockito.any());
```



### 断言

```
->assertTrue(String message, boolean condition)             要求condition == true
->assertFalse(String message, boolean condition)            要求condition == false
->assertEquals(String message, XXX expected,XXX actual) 要求expected期望的值能够等于actual
->assertArrayEquals(String message, XXX[] expecteds,XXX [] actuals) 要求expected.equalsArray(actual)
->assertNotNull(String message, Object object)          要求object!=null
->assertNull(String message, Object object)             要求object==null
->assertSame(String message, Object expected, Object actual)     要求expected == actual
->assertNotSame(String message, Object unexpected,Object actual) 要求expected != actual
->assertThat(String reason, T actual, Matcher matcher)  要求matcher.matches(actual) == true
->fail(String message) 要求执行的目标结构必然失败，同样要求代码不可达,即是这个方法在程序运行后不会成功返回，如果成功返回了则报错
```






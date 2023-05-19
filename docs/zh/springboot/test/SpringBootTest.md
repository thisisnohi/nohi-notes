# SpringBoot 测试

> create by nohi 20230106
>
> :video_camera: 视频：[Udemy 高分付费课程](https://www.bilibili.com/video/BV1XP4y1Y7H6?p=5&spm_id_from=pageDriver&vd_source=9004ce053a52d5930f71e230579961e7)
>
> :video_camera:[单元测试详解-SpringBootTest和Mock测试](https://www.bilibili.com/video/BV1DD4y1j7xb/?spm_id_from=333.337.search-card.all.click&vd_source=9004ce053a52d5930f71e230579961e7)   :spiral_notepad: [笔记](https://blog.csdn.net/sinat_41900036/article/details/128551507?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22128551507%22%2C%22source%22%3A%22sinat_41900036%22%7D)
>
> 个人项目代码
>
> :anchor: [代码](https://github.com/thisisnohi/SpringCloud2022/tree/feature-demo/JunitTest)  SpringCloud2022/JunitTest

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

* 导出覆盖率报告

  ![image-20230515222531451](./attach/image-20230515222531451.png)

  html报告

  ![image-20230515222647813](./attach/image-20230515222647813.png)

* 导出测试结果报告

  ![img](./attach/clip_image001.png)

  <img src="./attach/clip_image002.png" alt="img" style="zoom:80%;" />

  ![image-20230515223845997](./attach/image-20230515223845997.png)

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

* assertSame

* isGreater

* assertArrayEquals

* assertIterableEquals

* assertThrows

  ```
  @Test
      @DisplayName("Throw Exception")
      public void testThrowException() {
          DemoUtils demoUtils = new DemoUtils();
          Assertions.assertThrowsExactly(Exception.class, () -> { demoUtils.throwException(-1); }, "-1 < 0 throw Exception");
          Assertions.assertDoesNotThrow(() -> { demoUtils.throwException(1); }, "should not throw Exception");
      }
  ```

* assertTimeoutPreemptively

  ```
  
  ```

  

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

```
按DisplayName排序
@TestMethodOrder(MethodOrderer.DisplayName.class)
```



## 3 单元测试报告

> :anchor: [代码](https://github.com/thisisnohi/SpringCloud2022/tree/feature-demo/JunitTest)  SpringCloud2022/JunitTest

### Maven Surefile Plugin

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.0.0-M5</version>
    </plugin>
  </plugins>
</build>
```

* 运行

  ```
  mvn clean test
  # 如果run0, 则说明mvn无法识别单元测试，需要引入surefire plugin
  # [ERROR] Tests run: 8, Failures: 2, Errors: 0, Skipped: 0
  ```

  * 跳过test

    ```
    mvn clean package -DskipTests=true
    ```

### 创建单元测试报告

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-report-plugin</artifactId>
      <version>3.0.0-M5</version>
      <executions>
      	<execution>
        	<phase>test</phase>
          <goals>
          	<goal>report</goal>
          </goals>
        </execution>
      </executions>
      <!-- 忽略失败的单元测试，继续mvn其他命令，如：package -->
      <configuration>
        <testFailureIgnore>true</testFailureIgnore>
      </configuration>
    </plugin>
  </plugins>
</build>
```

```333shell
# site 添加网站资源如图版、css...
# -DgenerateReports=false  不覆盖已有的HTML报告
mvn site -DgenerateReports=false
# 生成报告 target/site/surefire-report.html
mvn surefire-report:report 
```

###  忽略失败单元测试

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId>
      <version>3.0.0-M5</version>
      <!-- 忽略失败的单元测试，否则不生成单元测试报告 -->
      <configuration>
        <testFailureIgnore>true</testFailureIgnore>
      </configuration>
    </plugin>
  </plugins>
</build>
```

### 显示@DisplayName

```xml
<plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.0.0-M5</version>
        <configuration>
          <testFailureIgnore>true</testFailureIgnore>
          <statelessTestsetReporter
                  implementation="org.apache.maven.plugin.surefire.extensions.junit5.JUnit5Xml30StatelessReporter">
            <!-- 显示@DisplayName -->
            <usePhrasedTestCaseMethodName>true</usePhrasedTestCaseMethodName>
          </statelessTestsetReporter>
        </configuration>
      </plugin>
```



###  Java代码覆盖率工具Jacoco

> Java Code Coverage

* pom.xml

  ```xml
  <plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.7</version>
  
    <executions>
      <execution>
        <id>jacoco-prepare</id>
        <goals>
          <goal>prepare-agent</goal>
        </goals>
      </execution>
  
      <execution>
        <id>jacoco-report</id>
        <phase>test</phase>
        <goals>
          <goal>report</goal>
        </goals>
      </execution>
    </executions>
  </plugin>
  ```

* `mvn clean test`

  ```
  Loading execution data file .../JunitTest/target/jacoco.exec
  # 报告目录
  target/site/jacoco/index.html
  ```

## 4 单元测试-继续

### Conditional Tests

* `@Disabled` and `@EnabledOnOs`

  ```java
  @Test
  @Disabled("Don't run until JIRA #123 is resolved")
  void basicTest() {
    // execute method and perform asserts
  }
  
  @Test
  @EnabledOnOs(OS.MAC)
  void testForMacOnly() {
    // execute method and perform asserts
  }
  
  @Test
  @EnabledOnOs({OS.MAC, OS.WINDOWS})
  void testForMacAndWindowsOnly() {
    // execute method and perform asserts
  }
  ```

* `@EnabledOnJre` `@EnabledForJreRange`

  ```java
  @EnabledOnJre(JRE.JAVA_17)
  @EnabledForJreRange(min=JRE.JAVA_13, max=JRE.JAVA_18)
  ```

* `@EnabledIfSystemProperty`

  ```java
  @EnabledIfEnvironmentVariable(named="LUV2CODE_ENV", matches="DEV")
  @EnabledIfSystemProperty(named="LUV2CODE_SYS_PROP", matches="CI_CD_DEPLOY") 
  ```

### TDD(Test Driven Development)

1. writer a failing test
2. write code to make the test pass
3. refactor the code
4. repeat the process

![image-20230517124730109](./attach/image-20230517124730109.png)

* FizzBuzz

  输入数字，按以下规则打印

  ```
  可以被3整除，打印Fizz
  可以被5整除，打印Buzz
  可以被3和5同时整除，打印FizzBuzz
  其他打印相应数据
  ```

  ```java
  @TestMethodOrder(MethodOrderer.OrderAnnotation.class)
  public class FizzBuzzTest {
  
      @Test
      @DisplayName("被三整除")
      @Order(1)
      void testDivisibleByThree(){
          String expect = "Fizz";
          assertEquals(expect, FizzBuzz.compute(3), "3可被三整除，返回Fizz");
      }
      @Test
      @DisplayName("被5整除")
      @Order(2)
      void testDivisibleByFivee(){
          String expect = "Buzz";
          assertEquals(expect, FizzBuzz.compute(5), "3可被三整除，返回Fizz");
      }
  
      @Test
      @DisplayName("被3和5整除")
      @Order(3)
      void testDivisibleByThreeANDFive(){
          String expect = "FizzBuzz";
          assertEquals(expect, FizzBuzz.compute(15), "可被3和5整除，返回FizzBuzz");
      }
  
      @Test
      @DisplayName("无法被3和5整除")
      @Order(4)
      void testNotDivisibleByThreeANDFive(){
          String expect = "1";
          assertEquals(expect, FizzBuzz.compute(1), "无法被3和5整除");
      }
  }
  ```

### `ParameterizedTest`参数化测试

> https://doczhcn.gitbook.io/junit5/index/index-2/parameterized-tests

`@ValueSource`

`@CsvSource`

`@CsvFileSource`

`@EnumSource`

`@MethodSource`

```java
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class FizzBuzzTest {

    @Test
    @DisplayName("被三整除")
    @Order(1)
    void testDivisibleByThree() {
        String expect = "Fizz";
        assertEquals(expect, FizzBuzz.compute(3), "3可被三整除，返回Fizz");
    }

    @Test
    @DisplayName("被5整除")
    @Order(2)
    void testDivisibleByFivee() {
        String expect = "Buzz";
        assertEquals(expect, FizzBuzz.compute(5), "3可被三整除，返回Fizz");
    }

    @Test
    @DisplayName("被3和5整除")
    @Order(3)
    void testDivisibleByThreeANDFive() {
        String expect = "FizzBuzz";
        assertEquals(expect, FizzBuzz.compute(15), "可被3和5整除，返回FizzBuzz");
    }

    @Test
    @DisplayName("无法被3和5整除")
    @Order(4)
    void testNotDivisibleByThreeANDFive() {
        String expect = "1";
        assertEquals(expect, FizzBuzz.compute(1), "无法被3和5整除");
    }

    @DisplayName("CsvSource")
    @ParameterizedTest(name = "value={0},expect={1}")
    @CsvSource({"1, 1", "2, 2", "3, Fizz", "4, 4", "5, Buzz", "6, Fizz", "15, FizzBuzz"})
    @Order(5)
    void testWithCsvSource(int value, String expect) {
        assertEquals(expect, FizzBuzz.compute(value));
    }

    @DisplayName("CsvFileSource")
    @ParameterizedTest(name = "value={0},expect={1}")
    @CsvFileSource(resources = "/small-test-data.csv")
    @Order(6)
    void testWithCsvFileSource(int value, String expect) {
        assertEquals(expect, FizzBuzz.compute(value));
    }
}
```

## 5 SpringBoot单元测试

> :anchor: [代码](https://github.com/thisisnohi/SpringCloud2022/tree/feature-demo/SpringBootTest)  SpringCloud2022/SpringBootTest

### 需要解决的问题

* 访问Spring Appication Context
* Spring 依赖注入
* 访问application.properties等配置的属性
* Mock数据：web,data,Rest API..

#### 支持

`@SpringBootTest`

* maven

  ```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
  ```

    * 依赖

      <img src="./attach/image-20230518134053115.png" alt="image-20230518134053115" style="zoom:90%;" />

   * `mvn dependency:tree`

#### 代码

* SpringBootTestApplication

  ```
  package nohi.boot;
  
  import lombok.extern.slf4j.Slf4j;
  import nohi.boot.models.CollegeStudent;
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Scope;
  
  /**
   * TEST
   * @author NOHI
   * @date 2023/1/12 13:47
   */
  @Slf4j
  @SpringBootApplication
  public class SpringBootTestApplication {
  
  	public static void main(String[] args) {
  		SpringApplication.run(SpringBootTestApplication.class, args);
  	}
  
  	@Bean(name = "collegeStudent")
  	@Scope(value = "prototype")
  	CollegeStudent getCollegeStudent() {
  		log.info("==>getCollegeStudent");
  		return new CollegeStudent();
  	}
  }
  ```

* Test

  > 不同包下运行
  >
  > 需要：*@SpringBootTest(classes* *= SpringBootTestApplication.class)* 否则报错

  ```java 
  package nohi.demo;
  
  import nohi.boot.models.CollegeStudent;
  import nohi.boot.models.Student;
  import org.junit.jupiter.api.Assertions;
  import org.junit.jupiter.api.DisplayName;
  import org.junit.jupiter.api.Order;
  import org.junit.jupiter.api.Test;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.boot.test.context.SpringBootTest;
  
  /**
   * 不同包下的测试
   */
  @SpringBootTest
  @DisplayName("SrpingBoot单元测试,不同包下运行测试")
  class SpringBootTestApplicationTests {
  	@Autowired
  	CollegeStudent collegeStudent;
  
  	@Autowired
  	Student student;
  
  	@Test
  	@DisplayName("测试Bean获取，根本不运行")
  	@Order(1)
  	void testGetBean(){
  		Assertions.assertNotNull(collegeStudent, "CollegeStudent 不应为空");
  		Assertions.assertNotNull(student, "CollegeStudent 不应为空");
  	}
  }
  ```

  














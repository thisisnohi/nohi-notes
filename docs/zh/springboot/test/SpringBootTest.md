# SpringBoot 测试

> create by nohi 20230106
>
> :video_camera: 视频：[Udemy 高分付费课程](https://www.bilibili.com/video/BV1XP4y1Y7H6?p=5&spm_id_from=pageDriver&vd_source=9004ce053a52d5930f71e230579961e7)
>
> :video_camera:[单元测试详解-SpringBootTest和Mock测试](https://www.bilibili.com/video/BV1DD4y1j7xb/?spm_id_from=333.337.search-card.all.click&vd_source=9004ce053a52d5930f71e230579961e7)   :spiral_notepad: [笔记](https://blog.csdn.net/sinat_41900036/article/details/128551507?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22128551507%22%2C%22source%22%3A%22sinat_41900036%22%7D)



## 基础测试

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

### JUnit Assertions

`org.junit.jupiter.api.Assertions`

* assertEquals

* assertNotEquals

* assertNull

* assertNotNull

  ...


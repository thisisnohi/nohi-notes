# SpringcloudTest

> create by nohi 20240904

## 问题

* 测试范围
  * 项目内部
  * 如果需要测试项目外，比如加载配置中心？怎么办
* 如何加载bootstrap.yml配置文件(SpringCloud中使用配置中心)
  * 不加载bootstrap.yml配置，可以在application-dev/test.yml配置中，增加配置中心、eureka等配置



## 内容

### Mockito使用

* ArgumentMatcher使用(根据参数条件不同返回不同结果)

* 样例

  ```java
  @ExtendWith(SpringExtension.class)
  @DisplayName("mockito使用")
  public class XxxTest {
    @MockBean
    FeignFactory feignfactory;
    @MockBean
    InternalApi internalApi;
    
    // 匹配参数条件，根据不同条件，返回是否匹配
    private ArgumentMatcher<BaseRequest<AxxxReq>> matchRequest(final String target) {
      return request -> request != null && target.equals(request.getTxBody().getEntity().getXxx());
    }
    // 测试方法前执行
    @BeforeEach
    public void init() {
      Mockito.when(feignfactory.getApi(InternalApi.class)).thenReturn(internalApi);
      Mockito.when(internalApi.callAxxxx(Mockito.argThat(matchRequest("11111"))))
        .thenReturn(SomeObjectOrValue);
      Mockito.when(internalApi.callAxxxx(Mockito.argThat(matchRequest("2222"))))
        .thenReturn(SomeObjectOrValue2);
    }
    
  }
  ```

## 常见问题

* mock初始化不在BeforeAll中

```
在@BeforeAll注释方法中使用JUnit 5测试运行时，Mockito不会初始化mock
```

* `@ExtendWith`

  ```
  Spring环境：使用Spring测试框架功能（例如）@MockBean，则必须使用@ExtendWith(SpringExtension.class)。它取代了不推荐使用的JUnit4@RunWith(SpringJUnit4ClassRunner.class)
  
  非Spring环境：
  Mockito而不涉及Spring，只使用@Mock/@InjectMocks批注时，使用@ExtendWith(MockitoExtension.class)，它不会加载到很多不需要的Spring东西中。它替换了不推荐使用的JUnit4 @RunWith(MockitoJUnitRunner.class)。
  
  // 以下为手写未在编辑器中编译，可能出现语法错误
  @ExtendWith(MockitoExtension.class)
  public class XxxxTest{
     @Mock
     XxxService  innerService;
     
     @InjectMocks
     XxxService  needTestService;
     
     @Test
     public void testServer() {
     		Mockito.when(innerService.getAcctName(Mockito.any())
     		    .thenReturn(returnvalue...));   		    
     		// 测试访求    
     		Assertions.assertXXXX(needTestService.validatorAcctName("1","2"))
     }
  }
  ```

  * 加载Spring环境，适合集成测试
  * 不加载Spring环境，适合单元测试

* 返回值`void`方法的mock

  * 用处，模拟异常/或者不做任何事情

  ```
  List<String> spy = spy(names);
  Mockito.doNothing().when(spy).add(anyInt(), anyString());
  // 抛异常
  doThrow(new DataAccessException()).when(spy).add(anyInt());
  ```

  

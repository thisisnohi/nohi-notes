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




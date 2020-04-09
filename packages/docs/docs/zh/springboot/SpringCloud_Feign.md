## SpringCloud Feign

> create by nohi 20191121



## 超时时间设置

```java
1.把超时发生异常属性关闭 (测试后发现，超过60s后仍超时)
hystrix:
  command:
      default:
        execution:
          timeout:
            enabled: false
2.同样出现超过60秒超时总是
hystrix:
  command:
    "MyFeignClient#sayWhyByFeign()":
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 9000
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 2000

ribbon:
  ReadTimeout: 5000
  ConnectTimeout: 5000

3. configu设置超时
    @Bean
    public Feign.Builder feignHystrixBuilder() {
        return HystrixFeign.builder().setterFactory(new SetterFactory() {
            public HystrixCommand.Setter create(Target<?> target, Method method) {
                String groupKey = target.name();
                //@FeignClient(name = "xxx-im"
                System.out.println(groupKey);
                String commandKey = method.getName();
                System.out.println("commandKey=="+commandKey);

                //打印,为每一个方法生成一个对象，此时groupKey，commandKey没用，可以设置超时时间
                /**
                 * xxx-im2
                 commandKey==queryCategoriesCodeByProductCode2
                 xxx-im2
                 commandKey==queryCategoriesCodeByProductCode
                 xxx-im2
                 commandKey==queryMaxBasicPriceByPizzaSizeCode
                 */
                int time = 120000;
                if("queryCategoriesCodeByProductCode2".equals(commandKey)) {
                    time = 4000;
                }
                return HystrixCommand.Setter
                        .withGroupKey(HystrixCommandGroupKey.Factory.asKey(groupKey))// 控制 RemoteProductService 下,所有方法的Hystrix Configuration
                        .andCommandKey(HystrixCommandKey.Factory.asKey(commandKey))
                        .andCommandPropertiesDefaults(
                                HystrixCommandProperties.Setter().withExecutionTimeoutInMilliseconds(time) // 超时配置
                        );
            }
        });
    }
    
```


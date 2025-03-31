# SpringBootValidation

> create by nohi 20230626
>
> `validata`  `Valid`
>
> 参考：nohi-web-native



## DEMO

### pom.xml

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

### 实体

```java 
@Data
@Schema(name = "Hello请求对象", title = "Hello-Req", description = "请求对象示例")
public class HelloReq {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, title = "流水号2", description = "流水号3", example = "20230618000011110001")
    private String traceId;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, title = "姓名", description = "打招的人", example = "张三")

    @NotBlank(message = "请输入名称")
    @Length(message = "名称必须[{min} {max}]字符", min = 5, max = 10)
    private String name;

    @Max(value=50,message = "count最大小于等于50")
    @Min(value=10,message = "count最小大于等于10")
    private int count;

    @NotBlank(message = "age不能为空")
    private String age;
}
```



### controller

* 方式1 `@Valid`直接返回异常

  ```java 
  @PostMapping("sayHello")
  @Operation(summary = "向某人打招呼", description = "向某人打招呼, 演示Operation/Schema用法")
  public HelloResp sayHello(@Valid @RequestBody HelloReq req){
    log.info("请求对象:{}", JSONObject.toJSONString(req));
    HelloResp resp = new HelloResp();
    BeanUtils.copyProperties(req, resp);
    resp.setRetCode("SUC");
    resp.setRetMsg("响应信息..." + req.getName());
    return resp;
  }
  ```

* 方式2`@Validated`原程序内部返回异常

  ```java 
  @PostMapping("sayHello2")
  @Operation(summary = "向某人打招呼2", description = "向某人打招呼, 演示Operation/Schema用法, 增加Validated校验，程序中判断是否校验通过，返回约定格式报文")
  public HelloResp sayHello2(@Validated @RequestBody HelloReq req, BindingResult results){
    log.info("请求对象:{}", JSONObject.toJSONString(req));
  
    HelloResp resp = new HelloResp();
    BeanUtils.copyProperties(req, resp);
    // 把实体注解中的错误信息返回
    if (results.hasErrors()) {
      resp.setRetCode("ERROR");
      resp.setRetMsg("响应信息..." + results.getFieldError().getDefaultMessage());
      return resp;
    }
    resp.setRetCode("SUC");
    resp.setRetMsg("响应信息..." + req.getName());
    return resp;
  }
  ```

### service

`Validator..validate(req)`

`Validation.buildDefaultValidatorFactory().getValidator()`

```java
public class Knife4jService {
    @Autowired
    private Validator validator;

    @Validated
    public HelloResp sayHello3(@Valid HelloReq req) {
        log.info("请求对象:{}", JSONObject.toJSONString(req));
        /** 校验 **/
        // Validation.buildDefaultValidatorFactory().getValidator().valiate(req)
        Set<ConstraintViolation<HelloReq>> violations = validator.validate(req);

        /** 构建返回对象 **/
        HelloResp resp = new HelloResp();
        BeanUtils.copyProperties(req, resp);

        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation<HelloReq> constraintViolation : violations) {
                sb.append(constraintViolation.getMessage());
            }
            resp.setRetCode("ERROR");
            resp.setRetMsg("响应信息..." + sb.toString());
            return resp;
        }
        resp.setRetCode("SUC");
        resp.setRetMsg("响应信息..." + req.getName());
        return resp;
    }
}
```



## 基础

> 参考：https://juejin.cn/post/7087100869363122189

### 全局异常处理

```java 
package nohi.common.web;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

/**
 * <h3>SpringCloud2022</h3>
 *
 * @author NOHI
 * @description <p>全局异常处理</p>
 * @date 2023/06/27 12:30
 **/
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * @RequestBody 上校验失败后抛出的异常是 MethodArgumentNotValidException 异常。
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public String handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("handleMethodArgumentNotValidException");
        BindingResult bindingResult = e.getBindingResult();
        String message = bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining("；"));
        log.error("handleMethodArgumentNotValidException:{}", message);
        return message;
    }

    /**
     * 不加 @RequestBody注解，校验失败抛出的则是 BindException
     */
    @ExceptionHandler(value = BindException.class)
    public String exceptionHandler(BindException e) {
        log.error("exceptionHandler");
        String message = e.getBindingResult().getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining("；"));
        log.error("exceptionHandler:{}", message);
        return message;
    }

    /**
     * @RequestParam 上校验失败后抛出的异常是 ConstraintViolationException
     */
    @ExceptionHandler({ConstraintViolationException.class})
    public String methodArgumentNotValid(ConstraintViolationException exception) {
        log.error("methodArgumentNotValid");
        String message = exception.getConstraintViolations().stream().map(ConstraintViolation::getMessage).collect(Collectors.joining("；"));
        log.error("methodArgumentNotValid:{}", message);
        return message;
    }
}
```

### 遇到错误就抛出

检测到一个效验不通过的，就抛出异常

```java 
@Configuration
public class ParamValidatorConfig {

    @Bean
    public Validator validator() {
        ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)
                .configure()
                //failFast：只要出现校验失败的情况，就立即结束校验，不再进行后续的校验。
                .failFast(true)
                .buildValidatorFactory();
        return validatorFactory.getValidator();
    }

    @Bean
    public MethodValidationPostProcessor methodValidationPostProcessor() {
        MethodValidationPostProcessor methodValidationPostProcessor = new MethodValidationPostProcessor();
        methodValidationPostProcessor.setValidator(validator());
        return methodValidationPostProcessor;
    }
}
```

### 注解

@NotNull：适用于任何类型，不能为null，但可以是 ("","     ")

@NotBlank：只能用于 String，不能为null，而且调用 trim() 后，长度必须大于0，必须要有实际字符。

@NotEmpty：用于 String、Collection、Map、Array，不能为null，长度必须大于0。

| 注解             | 备注                                                         | 适用类型                                                     | 示例                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| @AssertFalse     | 被注释的元素必须为 `false`，null 值是有效的。                | boolean 和 Boolean                                           | @AssertFalse(message = "该参数必须为 false")                 |
| @AssertTrue      | 被注释的元素必须为 `true`，null 值是有效的。                 | boolean 和 Boolean                                           | @AssertTrue(message = "该参数必须为 true")                   |
| @DecimalMax      | 被注释的元素必须是一个数字，其值必须小于或等于指定的最大值，null 值是有效的。 | BigDecimal、BigInteger、CharSequence、byte、short、int、long以及包装类型 | @DecimalMax(value = "100",message = "该参数不能大于 100")    |
| @DecimalMin      | 被注释的元素必须是一个数字，其值必须大于或等于指定的最小值，null 值是有效的。 | BigDecimal、BigInteger、CharSequence、byte、short、int、long以及包装类型 | @DecimalMax(value = "0",message = "该参数不能小于 0")        |
| @Digits          | 被注释的元素必须是可接受范围内的数字，null 值是有效的。      | BigDecimal、BigInteger、CharSequence、byte、short、int、long以及包装类型 | @Digits(integer = 3,fraction = 2,message = "该参数整数位数不能超出3位，小数位数不能超过2位") |
| @Max             | 被注释的元素必须是一个数字，其值必须小于或等于指定的最大值，null 值是有效 | BigDecimal、BigInteger、byte、short、int、long以及包装类型   | @Max(value = 200,message = "最大金额不能超过 200")           |
| @Min             | 被注释的元素必须是一个数字，其值必须大于或等于指定的最小值，null 值是有效的。 | BigDecimal、BigInteger、byte、short、int、long以及包装类型   | @Min(value = 0,message = "最小金额不能小于 0")               |
| @Negative        | 被注释的元素必须是负数，null 值是有效                        | BigDecimal、BigInteger、byte、short、int、long、float、double 以及包装类型 | @Negative(message = "必须是负数")                            |
| @NegativeOrZero  | 被注释的元素必须是负数或 0，null 值是有效的。                | BigDecimal、BigInteger、byte、short、int、long、float、double 以及包装类型 | @NegativeOrZero(message = "必须是负数或者为0")               |
| @Positive        | 被注释的元素必须是正数，null 值是有效的。                    | BigDecimal、BigInteger、byte、short、int、long、float、double 以及包装类型 | @Positive(message = "必须是正数")                            |
| @PositiveOrZero  | 被注释的元素必须是正数或0，null 值是有效的。                 | BigDecimal、BigInteger、byte、short、int、long、float、double 以及包装类型 | @PositiveOrZero(message = "必须是正数或者为0")               |
| @Future          | 被注释的元素必须是未来的日期（年月日），null 值是有效的。    | 基本所有的时间类型都支持。常用的：Date、LocalDate、LocalDateTime、LocalTime、Instant | @Future(message = "预约日期要大于当前日期")                  |
| @FutureOrPresent | 被注释的元素必须是现在或者未来的日期（年月日），null 值是有效的。 | 基本所有的时间类型都支持。常用的：Date、LocalDate、LocalDateTime、LocalTime、Instant | @FutureOrPresent(message = "预约日要大于当前日期")           |
| @Past            | 被注释的元素必须是过去的日期，null 值是有效的。              | 基本所有的时间类型都支持。常用的：Date、LocalDate、LocalDateTime、LocalTime、Instant | @Past(message = "出生日期要小于当前日期")                    |
| @PastOrPresent   | 被注释的元素必须是过去或者现在的日期，null 值是有效的。      | 基本所有的时间类型都支持。常用的：Date、LocalDate、LocalDateTime、LocalTime、Instant | @PastOrPresent(message = "出生时间要小于当前时间")           |
| @NotBlank        | 被注释的元素不能为空，并且必须至少包含一个非空白字符         | CharSequence                                                 | @NotBlank(message = "name为必传参数")                        |
| @NotEmpty        | 被注释的元素不能为 null 也不能为空                           | CharSequence、Collection、Map、Array                         | @NotEmpty(message = "不能为null或者为空")                    |
| @NotNull         | 被注释的元素不能为null                                       | 任意类型                                                     | @NotNull(message = "不能为null")                             |
| @Null            | 被注释的元素必须为null                                       | 任意类型                                                     | @Null(message = "必须为null")                                |
| @Email           | 被注释的元素必须是格式正确的电子邮件地址，null 值是有效的。  | CharSequence                                                 | @Email(message = "email格式错误，请重新填写")                |
| @Pattern         | 被注释的元素必须匹配指定的正则表达式，null 值是有效的。      | CharSequence                                                 | @Pattern(regexp = "^1[3456789]\d{9}$",message = "手机号格式不正确") |
| @Size            | 被注释的元素大小必须在指定范围内，null 值是有效的。          | CharSequence、Collection、Map、Array                         | @Size(min = 5,max = 20,message = "字符长度在 5 -20 之间")    |


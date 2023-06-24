

## Swagger 3 VS Swagger2注解

| Swagger2注解       | OpenAPI3(swagger3)注解                                       |
| ------------------ | ------------------------------------------------------------ |
| @ApiParam          | @Parameter                                                   |
| @ApiOperation      | @Operation                                                   |
| @Api               | @Tag                                                         |
| @ApiImplicitParams | @Parameters                                                  |
| @ApiImplicitParam  | @Parameter                                                   |
| @ApiIgnore         | @Parameter(hidden = true) or @Operation(hidden = true) or @Hidden |
| @ApiModel          | @Schema                                                      |
| @ApiModelProperty  | @Schema                                                      |



## Swagger3

### pom.xml

```xml
<!-- swagger3 -->
<dependency>
  <groupId>com.github.xiaoymin</groupId>
  <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
  <version>4.1.0</version>
</dependency>
```

### config

```java
package nohi.common.config;

import cn.hutool.core.util.RandomUtil;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.customizers.GlobalOpenApiCustomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;

import java.util.HashMap;
import java.util.Map;

/**
 * @author NOHI
 * 2022-07-21 13:20
 * <p>@ConditionalOnExpression("${knife4j.enable}") 开启访问接口文档的权限</p>
 * **knife4j.enable是在yml配置文件中配置为true**
 **/
@Configuration
@Slf4j
public class Knife4jConfig {
    @Autowired
    private Environment environment;

    /**
     * 根据@Tag 上的排序，写入x-order
     *
     * @return the global open api customizer
     */
    @Bean
    public GlobalOpenApiCustomizer orderGlobalOpenApiCustomizer() {
        return openApi -> {
            if (openApi.getTags() != null) {
                openApi.getTags().forEach(tag -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("x-order", RandomUtil.randomInt(0, 100));
                    tag.setExtensions(map);
                });
            }
            if (openApi.getPaths() != null) {
                openApi.addExtension("x-test123", "333");
                openApi.getPaths().addExtension("x-abb", RandomUtil.randomInt(1, 100));
            }
        };
    }

    @Bean
    public OpenAPI customOpenApi() {
        // 设置显示的swagger环境信息
        Profiles profiles = Profiles.of("dev", "test");
        // 判断是否处在自己设定的环境当中
        boolean flag = environment.acceptsProfiles(profiles);
        log.info("Knife4j 开启[{}]", flag);

        return new OpenAPI().info(new Info().title("NOHI Web").version("1.0").description("Knife4j集成springdoc-openapi示例").termsOfService("http://nohi.online").license(new License().name("MIT License").url("http://opensource.org/licenses/MIT")));
    }
}
```

### 访问

```
knife4j: http://127.0.0.1:8888/doc.html
http://127.0.0.1:8888/swagger-ui/index.html
```

### Model

```java 
@Data
@Schema(title = "Rsa请求体")
public class RsaReqVo {
    @Schema(name = "流水号1", title = "流水号2", description = "流水号3", example = "20230618000011110001")
    private String traceId;
    @Schema(name = "账号", title = "账号", example = "6225888811112222")
    private String acctNo;
    @Schema(title = "账户名", example = "测试账号")
    private String acctName;
}
```


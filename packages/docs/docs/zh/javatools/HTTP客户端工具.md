# HTTP客户端工具

> create by nohi 20220919
>
> 参考：https://juejin.cn/post/7034701930286809095

- Apache HttpComponents项目中的HttpClient
- OkHttpClient
- Spring Boot中的WebClient

## HttpClient

> 参考：[Apache HttpClient 5 使用详细教程](https://www.cnblogs.com/niumoo/p/16611965.html)
>
> 官方：Quick Start https://hc.apache.org/httpcomponents-client-5.1.x/quickstart.html
>
> DEMO: https://github.com/thisisnohi/SpringCloud2022/tree/main/nohi-web/src/test/java/nohi/http/TestApacheHttpClientPool.java

* maven依赖

  ```xml 
  <dependency>
      <groupId>org.apache.httpcomponents.client5</groupId>
      <artifactId>httpclient5</artifactId>
      <version>5.1.3</version>
  </dependency>
  <!-- https://mvnrepository.com/artifact/org.apache.httpcomponents.client5/httpclient5-fluent -->
  <dependency>
      <groupId>org.apache.httpcomponents.client5</groupId>
      <artifactId>httpclient5-fluent</artifactId>
      <version>5.1.3</version>
  </dependency>
  ```

* GET + 设置超时时间

  ```java 
  String url = "http://127.0.0.1:8888/mock/http?sleep=8000";
  
          // 创建 HttpGet 请求
          HttpGet httpGet = new HttpGet(url);
          // 设置长连接
          httpGet.setHeader("Connection", "keep-alive");
          // 设置 Cookie
          httpGet.setHeader("Cookie", "Cooooooooooookie...");
  
          // 请求级别的超时
          httpGet.setConfig(config);
  
          RequestConfig config = RequestConfig.custom().setConnectTimeout(Timeout.ofMilliseconds(5000L)).setConnectionRequestTimeout(Timeout.ofMilliseconds(5000L)).setResponseTimeout(Timeout.ofMilliseconds(10000L)).build();
          // 客户端级别的超时
          CloseableHttpClient httpClient = HttpClients.custom().setDefaultRequestConfig(config).build();
          // 创建 HttpClient 客户端
          // CloseableHttpClient httpClient = HttpClients.createDefault();
  
          // 表单参数
          List<NameValuePair> nvps = new ArrayList<>();
          // GET 请求参数
          nvps.add(new BasicNameValuePair("username", "wdbyte.com"));
          nvps.add(new BasicNameValuePair("password", "secret"));
          // 增加到请求 URL 中
          try {
              URI uri = new URIBuilder(new URI(url)).addParameters(nvps).build();
              httpGet.setUri(uri);
          } catch (URISyntaxException e) {
              throw new RuntimeException(e);
          }
  
  
          CloseableHttpResponse httpResponse = null;
          try {
              // 请求并获得响应结果
              httpResponse = httpClient.execute(httpGet);
              HttpEntity httpEntity = httpResponse.getEntity();
              // 输出请求结果
              log.info("输出请求结果:{}", EntityUtils.toString(httpEntity));
          } catch (Exception e) {
              e.printStackTrace();
          }
          // 无论如何必须关闭连接
          finally {
              IOUtils.closeQuietly(httpResponse);
              IOUtils.closeQuietly(httpClient);
          }
  ```

* POST JSON

  ```java 
  			  // 创建 HttpClient 客户端
          CloseableHttpClient httpClient = HttpClients.createDefault();
          // 创建 HttpPost 请求
          HttpPost httpPost = new HttpPost("http://127.0.0.1:8888/mock/http?sleep=800");
          // 设置长连接
          httpPost.setHeader("Connection", "keep-alive");
  
          // 创建 HttpPost 参数
          String reqMsg = "{" + "\"retCode\": \"\"," + "\"retMsg\": \"\"," + "\"data\": {" + "\"a\": \"这是请求\"," + "\"b\": \"2\"," + "\"c\": \"3\"" + "}," + "\"traceId\": \"202209162226011001\"," + "\"traceTime\": \"20220916222601\"," + "\"txCode\": \"POST\"" + "}";
          // 设置 HttpPost 参数
          httpPost.setEntity(new StringEntity(reqMsg, ContentType.APPLICATION_JSON));
  
          CloseableHttpResponse httpResponse = null;
          try {
              httpResponse = httpClient.execute(httpPost);
              HttpEntity httpEntity = httpResponse.getEntity();
              // 输出请求结果
              System.out.println(EntityUtils.toString(httpEntity));
          } catch (Exception e) {
              e.printStackTrace();
          }
          // 无论如何必须关闭连接
          finally {
              IOUtils.closeQuietly(httpResponse);
              IOUtils.closeQuietly(httpClient);
          }
  ```

  

* HttpClient 5 拦截器



## OkHttp

> 面试官：“Okhttp连接池是咋实现“？你：该咋回答呢？https://zhuanlan.zhihu.com/p/425232575 

* Okhttp中通过okhttpClient对象是通过Builder对象初始化出来的，**此处Builder的用法是建造者模式，建造者模式主要是分离出外部类的属性初始化，而初始化属性交给了内部类Buidler类，这么做的好处是外部类不用关心属性的初始化**
* 初始化的时候有`interceptors`、`networkInterceptors`两种拦截器的初始化，还有`dispatcher(分发器)`的初始化，以及后面需要讲到的`cache(缓存)`初始化等
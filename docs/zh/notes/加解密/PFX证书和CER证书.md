# 证书密钥

 

## ssl证书

### 1. 生成私钥（key文件）

```shell
openssl genrsa -des3 -out server.pass.key 2048   #输入一个4位以上的密码。

# -genra    生成RSA私钥
# -des3 des3算法
# -out server.key 生成的私钥文件名
# -2048 私钥长度
```

### 2. 去除私钥中的密码

- 有密码的私钥是server.pass.key，没有密码的私钥是server.key
- 在上一步生成私钥的过程中，由于必须要指定一个密码。而这个密码会带来一个副作用，那就是在每次Apache启动Web服务器时，都会要求输入密码，这显然非常不方便。所以要删除私钥中的密码（生成一个没密码的新私钥文件）。

```ssh
openssl rsa -in server.pass.key -out server.key
```

### 3.生成CSR(证书签名请求)

```shell
openssl req -new -key server.key -out server.csr -subj "/C=CN/ST=Shanghai/L=Shanghai/O=cetc/OU=cetc/CN=www.nginx1.com"

# -req 生成证书签名请求
# -new 新生成
# -key 私钥文件
# -out 生成的CSR文件
# -subj 生成CSR证书的参数
```

<img src="https://tuchuang.zqfstack.cn/tuchuang/20250813155626.png" alt="img" style="zoom:50%;" />



### 4 .生成自签名SSL证书

```shell
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
# -days 证书有效期

ls
server.crt  server.csr  server.key  server.pass.key
```

key是服务器上的私钥文件，用于对发送给客户端数据的加密，以及对从客户端接收到数据的解密

csr是证书签名请求文件，用于提交给证书颁发机构（CA）对证书签名

crt是由证书颁发机构（CA）签名后的证书，或者是开发者自签名的证书，包含证书持有人的信息，持有的公钥，以及签署者的签名等信息 备注：在密码学中，X.509是一个标准，规范了公开秘钥认证、证书吊销列表、授权凭证、凭证路径验证算法等。

 

### 5. CRT 转换为 PEM 格式

```shell
openssl x509 -in server.crt -out server.pem -outform PEM
```



### 6. crt转换为pfx格式

```shell
openssl pkcs12 -export   -inkey server.key   -in server.crt   -out server.pfx
```





## 证书

[.pfx 证书和 .cer 证书](https://www.cnblogs.com/ljhdo/p/14109218.html)

### 文件形式存在的证书一般有三种格式：

- 第一种：带有私钥的证书，由Public Key Cryptography Standards #12，PKCS#12标准定义，包含了公钥和私钥的二进制格式的证书形式，以.pfx作为证书文件后缀名。
- 第二种：**DER Encoded Binary (.cer)** 二进制编码的证书，证书中没有私钥，DER 编码二进制格式的证书文件，以.cer作为证书文件后缀名。
- 第三种：**Base64 Encoded(.cer)**，Base64编码的证书，证书中没有私钥，BASE64 编码格式的证书文件，也是以.cer作为证书文件后缀名。

### pfx、cer转pem及提取公钥、私钥

> https://www.jianshu.com/p/bc18038cc9c8

1、将xxx.cer和xxxpfx文件转换成xxx.pem格式的文件

```shell script
openssl pkcs12 -in 503.pfx -nodes -out 503_42.pem
openssl x509 -inform der -in xxx.cer -out xxx.pem
```

2、从xxx.pfx中提取密钥对

```shell script
openssl pkcs12 -in 503.pfx -nocerts -nodes -out private_pc.key
需要输入密码: xxxxx
```

3、从密钥对中提取私钥(头部格式：-----BEGIN RSA PUBLIC KEY-----）

```shell script
openssl rsa -in  private_pc.key -out private.pem
```

4、从密钥对提取公钥(头部格式：-----BEGIN RSA PRIVATE KEY-----）

```shell script
openssl rsa -in private.pem -RSAPublicKey_out -out public.pem
```

5、从密钥对提取公钥(头部格式：-----BEGIN PUBLIC KEY-----）

```shell script
openssl rsa -in private_pc.key -pubout -out public.key
```

## pkcs1 -> pkcs8 （主要Java用）

> private.pem/public.pem  pkcs1
* openssl pkcs8 -topk8 -inform PEM -in private.pem -outform PEM -out private_pkcs8.pem -nocrypt



## 密钥

### 格式

* 格式密钥（**-----BEGIN CERTIFICATE-----格式密钥:**——)

  ```
  在PHP代码中是可以直接使用的,但是java代码中就不能直接使用,需要转换成pem的密钥文件.
  ```

* **-----BEGIN RSA PRIVATE KEY-----格式:**

  ```
  RSA直接生成没有进行转换的密钥格式，公钥可以直接使用，私钥需要转换格式
  ```

* **-----BEGIN PRIVATE KEY-----格式:**

  ```
  上面的密钥PKCS#8格式化后的密钥格式,java中用的私钥一般就是这种格式,但是公钥就不需要转换,可以直接使用
  ```

## 格式之间的转换

* **BEGIN CERTIFICATE 转成 BEGIN PUBLIC KEY：**

  对方给的cer格式的证书,需要转换之成java可以使用的PKCS#8格式密钥,具体如下

  ```
      /**
       * BEGIN CERTIFICATE格式解析密钥
       * @Return: java.security.PublicKey
       */
      public static String getCerToPublicKey() throws FileNotFoundException, CertificateException {
          FileInputStream file = new FileInputStream("D://publicKey.cer");
  
          CertificateFactory ft = CertificateFactory.getInstance("X.509");
          X509Certificate certificate = (X509Certificate) ft.generateCertificate(file);
          PublicKey publicKey = certificate.getPublicKey();
  
          String strKey = "-----BEGIN PUBLIC KEY-----\n" 
  				        + Base64.encodeBase64String(publicKey.getEncoded()) 
  				        + "\n-----END PUBLIC KEY-----";
  		System.out.println(strKey);
          return strKey;
      }
  ```

* **BEGIN RSA PRIVATE KEY 转成 BEGIN PRIVATE KEY：**

  这两种格式之间的转换百度很多，这里就不写了，包括DER 转换 PEM格式都有，只是用工具进行转换；
  贴个链接：https://www.jianshu.com/p/15d58b1ada5b










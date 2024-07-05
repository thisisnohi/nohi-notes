# netty

> create by nohi 20210817
>
> [netty实战与精髓](https://www.w3cschool.cn/essential_netty_in_action/essential_netty_in_action-un8q288w.html)
>
> [Netty入门与实战教程](https://www.cnblogs.com/lbhym/p/12753314.html)

Netty提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。

## 知识

### 1.零拷贝

Java的内存有堆内存、栈内存和字符串常量池等等，其中堆内存是占用内存空间最大的一块。

数据如果需要从IO读取到堆内存，中间需要经过Socket缓冲区，也就是说一个数据会被拷贝两次才能到达他的的终点。

Netty在堆内存之外开辟一块内存，数据就直接从IO读到了那块内存中去，在netty里面通过ByteBuf可以直接对这些数据进行直接操作，从而加快了传输速度。

### channel

一个客户端与服务器通信的通道，数据传输流

```
Channel，表示一个连接，可以理解为每一个请求，就是一个Channel。
**ChannelHandler**，核心处理业务就在这里，用于处理业务请求。
	ChannelInboundHandler，输入数据处理器
	ChannelOutboundHandler，输出业务处理器
ChannelHandlerContext，用于传输业务数据。通信管道的上下文
ChannelPipeline，用于保存处理过程需要用到的ChannelHandler和ChannelHandlerContext。
```

###ByteBuf

ByteBuf是一个存储字节的容器，最大特点就是**使用方便**，它既有自己的读索引和写索引，方便你对整段字节缓存进行读写，也支持get/set，方便你对其中每一个字节进行读写

#### 三种使用模式

* Heap Buffer 堆缓冲区
   堆缓冲区是ByteBuf最常用的模式，他将数据存储在堆空间。

* Direct Buffer 直接缓冲区
   直接缓冲区是ByteBuf的另外一种常用模式，他的内存分配都不发生在堆，jdk1.4引入的nio的ByteBuffer类允许jvm通过本地方法调用分配内存，这样做有两个好处

  - 通过免去中间交换的内存拷贝, 提升IO处理速度; 直接缓冲区的内容可以驻留在垃圾回收扫描的堆区以外。

  - DirectBuffer 在 -XX:MaxDirectMemorySize=xxM大小限制下, 使用 Heap 之外的内存, GC对此”无能为力”,也就意味着规避了在高负载下频繁的GC过程对应用线程的中断影响.

* Composite Buffer 复合缓冲区
   复合缓冲区相当于多个不同ByteBuf的视图，这是netty提供的，jdk不提供这样的功能。

### Codec

Netty中的编码/解码器，通过他你能完成字节与pojo、pojo与pojo的相互转换，从而达到自定义协议的目的。
 在Netty里面最有名的就是HttpRequestDecoder和HttpResponseEncoder了。







## BIO、NIO

* 参见：[手动搭建I/O网络通信框架](https://www.cnblogs.com/lbhym/p/12673470.html)

* Selector、Channel、Buffer
  * 一个Selector管理多个Channel
  * 一个Channel可以往Buffer中写入和读取数据。
  * Buffer名叫缓冲区，底层其实是一个数组，会提供一些方法往数组写入读取数据。
* **Buffer** https://blog.csdn.net/czx2018/article/details/89502699
  * allocate() - 初始化一块缓冲区
  * put() - 向缓冲区写入数据
  * get() - 向缓冲区读数据
  * filp() - 将缓冲区的读写模式转换
  * clear() - 这个并不是把缓冲区里的数据清除，而是利用后来写入的数据来覆盖原来写入的数据，以达到类似清除了老的数据的效果
  * compact() - 从读数据切换到写模式，数据不会被清空，会将所有未读的数据copy到缓冲区头部，后续写数据不会覆盖，而是在这些数据之后写数据
  * mark() - 对position做出标记，配合reset使用
  * reset() - 将position置为标记值
* Channel
  * FileChannel、SocketChannel、ServerSocketChannel

## Netty

### 服务端启动类详解

```
public class NettyServer {
    public static void main(String[] args) {
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        ServerBootstrap serverBootstrap = new ServerBootstrap();
        serverBootstrap
                .group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class)
                .childHandler(new ChannelInitializer<NioSocketChannel>() {
                    protected void initChannel(NioSocketChannel ch) {
                    }
                });

        serverBootstrap.bind(8000);
    }
}
```

* 引导类最小化的参数配置就是如上四个：配置线程组、IO模型、处理逻辑、绑定端口。



### 客户端启动类

```
public class NettyClient {
    public static void main(String[] args) {
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        Bootstrap bootstrap = new Bootstrap();
        bootstrap
                // 1.指定线程模型
                .group(workerGroup)
                // 2.指定 IO 类型为 NIO
                .channel(NioSocketChannel.class)
                // 3.IO 处理逻辑
                .handler(new ChannelInitializer<SocketChannel>() {
                    @Override
                    public void initChannel(SocketChannel ch) {
                    }
                });
        // 4.建立连接
        bootstrap.connect("127.0.0.1", 8000).addListener(future -> {
            if (future.isSuccess()) {
                System.out.println("连接成功!");
            } else {
                System.err.println("连接失败!");
                //重新连接
            }
        });
    }
}
```



## Channel

* 数据传输流

  ```
  Channel，表示一个连接，可以理解为每一个请求，就是一个Channel。
  **ChannelHandler**，核心处理业务就在这里，用于处理业务请求。
  ChannelHandlerContext，用于传输业务数据。
  ChannelPipeline，用于保存处理过程需要用到的ChannelHandler和ChannelHandlerContext。
  ```

### Channel 生命周期

* channelUnregistered
* channelRegistered
* channelActive
* channelInactive

### ChannelHandler 生命周期

* handlerAdded
* handlerRemoved
* exceptionCaught

### ChannelHandler 子接口

* ChannelInboundHandler
* ChannelOutboundHandler

### ChannelInboundHandler

* channelRegistered
* channelUnregistered
* channelActive
* channelInactive
* channelReadComplete
* channelRead
* channelWritabilityChanged
* userEventTriggered

### SimpleChannelInboundHandler

* 自动释放资源

### 资源回收

* ResourceLeakDetector

*  泄漏检测等级
  * Disables
  * SIMPLE
  * ADVANCED
  * PARANOID
* 修改检测等级 java -Dio.netty.leakDetectionLevel=paranoid


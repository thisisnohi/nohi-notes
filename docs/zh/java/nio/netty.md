# netty

> create by nohi 20210817
>
> [netty实战与精髓](https://www.w3cschool.cn/essential_netty_in_action/essential_netty_in_action-un8q288w.html)
>
> [Netty入门与实战教程](https://www.cnblogs.com/lbhym/p/12753314.html)

Netty提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。



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
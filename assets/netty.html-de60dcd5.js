import{_ as r,M as t,p as d,q as s,R as e,t as n,N as l,a1 as a}from"./framework-449724a9.js";const o={},c=e("h1",{id:"netty",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#netty","aria-hidden":"true"},"#"),n(" netty")],-1),h=e("p",null,"create by nohi 20210817",-1),u={href:"https://www.w3cschool.cn/essential_netty_in_action/essential_netty_in_action-un8q288w.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.cnblogs.com/lbhym/p/12753314.html",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"Netty提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。",-1),b=e("h2",{id:"bio、nio",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#bio、nio","aria-hidden":"true"},"#"),n(" BIO、NIO")],-1),m={href:"https://www.cnblogs.com/lbhym/p/12673470.html",target:"_blank",rel:"noopener noreferrer"},_=a("<li><p>Selector、Channel、Buffer</p><ul><li>一个Selector管理多个Channel</li><li>一个Channel可以往Buffer中写入和读取数据。</li><li>Buffer名叫缓冲区，底层其实是一个数组，会提供一些方法往数组写入读取数据。</li></ul></li><li><p><strong>Buffer</strong> https://blog.csdn.net/czx2018/article/details/89502699</p><ul><li>allocate() - 初始化一块缓冲区</li><li>put() - 向缓冲区写入数据</li><li>get() - 向缓冲区读数据</li><li>filp() - 将缓冲区的读写模式转换</li><li>clear() - 这个并不是把缓冲区里的数据清除，而是利用后来写入的数据来覆盖原来写入的数据，以达到类似清除了老的数据的效果</li><li>compact() - 从读数据切换到写模式，数据不会被清空，会将所有未读的数据copy到缓冲区头部，后续写数据不会覆盖，而是在这些数据之后写数据</li><li>mark() - 对position做出标记，配合reset使用</li><li>reset() - 将position置为标记值</li></ul></li><li><p>Channel</p><ul><li>FileChannel、SocketChannel、ServerSocketChannel</li></ul></li>",3),f=a(`<h2 id="netty-1" tabindex="-1"><a class="header-anchor" href="#netty-1" aria-hidden="true">#</a> Netty</h2><h3 id="服务端启动类详解" tabindex="-1"><a class="header-anchor" href="#服务端启动类详解" aria-hidden="true">#</a> 服务端启动类详解</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class NettyServer {
    public static void main(String[] args) {
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        ServerBootstrap serverBootstrap = new ServerBootstrap();
        serverBootstrap
                .group(bossGroup, workerGroup)
                .channel(NioServerSocketChannel.class)
                .childHandler(new ChannelInitializer&lt;NioSocketChannel&gt;() {
                    protected void initChannel(NioSocketChannel ch) {
                    }
                });

        serverBootstrap.bind(8000);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>引导类最小化的参数配置就是如上四个：配置线程组、IO模型、处理逻辑、绑定端口。</li></ul><h3 id="客户端启动类" tabindex="-1"><a class="header-anchor" href="#客户端启动类" aria-hidden="true">#</a> 客户端启动类</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class NettyClient {
    public static void main(String[] args) {
        NioEventLoopGroup workerGroup = new NioEventLoopGroup();
        Bootstrap bootstrap = new Bootstrap();
        bootstrap
                // 1.指定线程模型
                .group(workerGroup)
                // 2.指定 IO 类型为 NIO
                .channel(NioSocketChannel.class)
                // 3.IO 处理逻辑
                .handler(new ChannelInitializer&lt;SocketChannel&gt;() {
                    @Override
                    public void initChannel(SocketChannel ch) {
                    }
                });
        // 4.建立连接
        bootstrap.connect(&quot;127.0.0.1&quot;, 8000).addListener(future -&gt; {
            if (future.isSuccess()) {
                System.out.println(&quot;连接成功!&quot;);
            } else {
                System.err.println(&quot;连接失败!&quot;);
                //重新连接
            }
        });
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> Channel</h2><h3 id="channel-生命周期" tabindex="-1"><a class="header-anchor" href="#channel-生命周期" aria-hidden="true">#</a> Channel 生命周期</h3><ul><li>channelUnregistered</li><li>channelRegistered</li><li>channelActive</li><li>channelInactive</li></ul><h3 id="channelhandler-生命周期" tabindex="-1"><a class="header-anchor" href="#channelhandler-生命周期" aria-hidden="true">#</a> ChannelHandler 生命周期</h3><ul><li>handlerAdded</li><li>handlerRemoved</li><li>exceptionCaught</li></ul><h3 id="channelhandler-子接口" tabindex="-1"><a class="header-anchor" href="#channelhandler-子接口" aria-hidden="true">#</a> ChannelHandler 子接口</h3><ul><li>ChannelInboundHandler</li><li>ChannelOutboundHandler</li></ul><h3 id="channelinboundhandler" tabindex="-1"><a class="header-anchor" href="#channelinboundhandler" aria-hidden="true">#</a> ChannelInboundHandler</h3><ul><li>channelRegistered</li><li>channelUnregistered</li><li>channelActive</li><li>channelInactive</li><li>channelReadComplete</li><li>channelRead</li><li>channelWritabilityChanged</li><li>userEventTriggered</li></ul><h3 id="simplechannelinboundhandler" tabindex="-1"><a class="header-anchor" href="#simplechannelinboundhandler" aria-hidden="true">#</a> SimpleChannelInboundHandler</h3><ul><li>自动释放资源</li></ul><h3 id="资源回收" tabindex="-1"><a class="header-anchor" href="#资源回收" aria-hidden="true">#</a> 资源回收</h3><ul><li><p>ResourceLeakDetector</p></li><li><p>泄漏检测等级</p></li><li><p>Disables</p></li><li><p>SIMPLE</p></li><li><p>ADVANCED</p></li><li><p>PARANOID</p></li><li><p>修改检测等级 java -Dio.netty.leakDetectionLevel=paranoid</p></li></ul>`,19);function g(C,x){const i=t("ExternalLinkIcon");return d(),s("div",null,[c,e("blockquote",null,[h,e("p",null,[e("a",u,[n("netty实战与精髓"),l(i)])]),e("p",null,[e("a",v,[n("Netty入门与实战教程"),l(i)])])]),p,b,e("ul",null,[e("li",null,[e("p",null,[n("参见："),e("a",m,[n("手动搭建I/O网络通信框架"),l(i)])])]),_]),f])}const k=r(o,[["render",g],["__file","netty.html.vue"]]);export{k as default};

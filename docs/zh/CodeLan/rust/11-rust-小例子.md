# Rust-小例子

> create by nohi 20240126
>
> 参考：https://www.bilibili.com/video/BV1sG4y157EY/?spm_id_from=333.788&vd_source=9004ce053a52d5930f71e230579961e7



## 【Rust 语言】从零开始的 WebAssembly Demo

### 科普

* WebAssembly(wasm)

  ```
  WebAssembly 是基于栈式虚拟机的二进制指令集，可以作为编程语言的编译目标，能够部署在 web 客户端和服务端的应用中.
  是一个可移植、体积小、加载快并且兼容 Web 的全新格式
  ```

### 环境

```shell
##`安装支持wasm的toolchain ---- nightly`
rustup default nightly
## 安装编译目标(target) ---- wasm32-unknown-unknown
rustup target add wasm32-unknown-unknown
```

##  实现一个简单 redis

> https://course.rs/advance-practice/intro.html

### 环境配置

```shell
# 安装mini-redis
cargo install mini-redis
# 启动服务端
mini-redis-server
# 测试
$ mini-redis-cli set foo 1
OK
$ mini-redis-cli get foo
"1"
```



### Actix-Web：异步Web框架的新星

Actix-Web是一个基于Actor模型的异步Web框架，专为高性能、高并发的Web应用而设计。它充分利用了Rust的并发处理能力，通过异步编程模型实现了高效的并发处理，使得Web应用能够轻松应对高流量、低延迟的场景。

Actix-Web提供了丰富的Web开发特性，包括路由、中间件、会话管理、WebSocket支持等。此外，它还支持静态文件服务、模板渲染和JSON序列化等功能，为开发者提供了全面的Web开发解决方案。

> 中文参考：https://tech-cn.github.io/actix-website/docs/whatis









### Yew：为Web应用而生的Rust框架

Yew则是一个专注于构建Web前端的Rust框架，它采用了类似于React的组件化开发模式，使得开发者能够使用Rust语言构建出具有丰富交互和动态渲染的Web应用。

Yew通过编译到WebAssembly (Wasm) 的方式，使得Rust代码能够在浏览器中运行，从而充分利用了Rust的性能优势。同时，Yew还提供了虚拟DOM、状态管理、生命周期钩子等特性，为开发者提供了高效的Web前端开发工具。



### salvo

> https://salvo.rs/zh-hans/book/guide.html





## 其它

> Rust 真香却难学？不如先从开源项目试试 https://zhuanlan.zhihu.com/p/585452173

> 5 个优秀的 Rust 开源项目推荐https://zhuanlan.zhihu.com/p/650681240



### 日志

> 参考：`https://juejin.cn/post/7325317637075664932`

`log`为官方库，其为日志门面定义，并非具体日志实现框架，需要配合日志实现框架一起使用，如“env_logger”

```
/// 第一步： 引入依赖
///     log = "0.4.22"
///     env_logger = "0.11.5"
/// 第二步： 初始化
///     env_logger::init();
/// 第三步： 环境变量添加日志级别：RUST_LOG=debug
///    set_var("RUST_LOG", "debug");
use env_logger::{Logger, Env};

// 或者使用下面方式，手工设置环境变量
let env = Env::new()
// filters out any messages that aren't at "info" log level or above
 .filter_or("MY_LOG", "info")
// always use styles when printing
 .write_style_or("MY_LOG_STYLE", "always");

let logger = Logger::from_env(env);
```

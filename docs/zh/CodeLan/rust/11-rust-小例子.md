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





## 其它

> Rust 真香却难学？不如先从开源项目试试 https://zhuanlan.zhihu.com/p/585452173

> 5 个优秀的 Rust 开源项目推荐https://zhuanlan.zhihu.com/p/650681240
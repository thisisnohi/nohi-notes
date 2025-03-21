# nodejs

## npm

* 安装: npm install -g vuepress(-g全局)
* 删除: npm uninstall -g vuepress(-g全局)

### 指定源

临时使用
 npm --registry [https://registry.npm.taobao.org](https://link.jianshu.com?t=https://registry.npm.taobao.org) install express

永久使用
 npm config set registry https://registry.npm.taobao.org

cnpm
 npm install -g cnpm --registry=[https://registry.npm.taobao.org](https://link.jianshu.com?t=https://registry.npm.taobao.org) （安装cnpm）
 cnpm install express  （使用cnpm）



## pnpm

> 项目初衷: 节省磁盘空间 提高安装速度  非扁平的 node_modules 目录

* 安装

  ```
  npm install pnpm -g
  npm install pnpm@latest -g
  ```

  `-g`参数表示全局安装，这样pnpm就可以在你的系统任何位置被调用。

* 设置下载源（可选）

  ```
  查看当前源：
  pnpm config get registry
  
  切换到淘宝npm镜像源：
  pnpm config set registry https://registry.npmmirror.com/
  
  默认源
  pnpm config set registry https://registry.npmjs.org
  ```

* 常用

  ```
  安装项目依赖：
  pnpm install
  
  或者简写为：
  pnpm i
  
  添加依赖：
  将包添加到项目的dependencies中：
  pnpm add <package-name>
  
  将包添加到项目的devDependencies中：
  pnpm add <package-name> -D
  
  移除依赖：
  pnpm remove <package-name>
  
  移除全局安装的包：
  pnpm remove <package-name> --global
  
  更新依赖：
  更新所有依赖项：
  pnpm up
  
  或者更新特定包：
  pnpm upgrade <package-name>
  
  更新全局安装的包：
  pnpm upgrade <package-name> --global
  ```

  

# NOHI Notes
[![aaa](https://img.shields.io/badge/thisisnohi-nohi--notes-brightgreen)](http://github.com/thisisnohi/nohi-notes)

* 仓库地址：http://github.com/thisisnohi/nohi-notes
* 主页: https://thisisnohi.github.io
* 项目主页: https://thisisnohi.github.io/nohi-notes

## 利用vuePress制作个人笔记
* docs/zh/notes目录下新增xxx.md文件
* docs/.vuepress/configs/config.ts文件 配置导航菜单
  * docs/.vuepress/configs/items目录对应菜单下增加节点
* 新增目录，需要在目录下增加README.md(md小写)
```ts
 export const dbItems = [
  '/zh/db/database.md',
  '/zh/db/mysql.md',
  '/zh/db/常用脚本.md',
]
```

## 运行
* 运行： `yarn run docs:dev`
* 编译: `yarn run docs:build`
* 发布主页： `yarn deploy_index`
* 发布项目主页：`yarn deploy_nohi-notes`
* 发布主页和项目主页：`yarn deploy-github`

## Deploy
```
yarn build 
cd nohi-notes (config.js中的对应的dest)
注：.gitignore忽略dest对应目录,dest对应目录push到master/gh-pages
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io push到master
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO> push到gh-pages
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

https://thisisnohi.github.io/nohi-notes/ 最后一定要/结尾
https://thisisnohi.github.io 主页同样可以访问
```

# 介绍
> 仅作为个人笔记使用,内容参见VuePress官方指南
## Notes新增节点
* docs/zh/notes目录下新增xxx.md文件
* docs/.vuepress/configs/config.ts文件 配置导航菜单 
  * docs/.vuepress/configs/items目录对应菜单下增加节点
* 新增目录，需要在目录下增加README.MD
```ts
 export const dbItems = [
  '/zh/db/database.md',
  '/zh/db/mysql.md',
  '/zh/db/常用脚本.md',
]
```

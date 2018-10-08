# 介绍
> 仅作为个人笔记使用,内容参见VuePress官方指南
## Notes新增节点
* packages/docs/docs/zh/notes目录下新增xxx.md文件
* packages/docs/docs/.vuepress/config.js文件 genNotesSidebarConfig方法修改,
```
 children: [
        '',
        'nohi-notes',
        'xxx',
      ]
```

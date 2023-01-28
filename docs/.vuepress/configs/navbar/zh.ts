// @ts-ignore
import type { NavbarConfig } from "@vuepress/theme-default";
import { jvmItems } from "../items/jvmItems";
import { javaItems } from "../items/javaItems";
import { dbItems } from "../items/dbItems";
import { htmlItems } from "../items/htmlItems";
import { versionItems } from "../items/versionItems";
import { serverItems } from "../items/serverItems";
import { springItems } from "../items/springItems";
// import { version } from '../meta.js'

// 导航配置
export const navbarZh: NavbarConfig = [
  // NavbarItem
  {
    text: "NOTES",
    link: "/zh/notes/",
  },
  // NavbarGroup
  {
    text: "Java",
    children: javaItems,
  },
  {
    text: "JVM",
    children: jvmItems,
  },
  {
    text: "Spring",
    children: springItems,
  },
  // 字符串 - 页面文件路径
  {
    text: "DB",
    children: [
      {
        text: 'DB',
        children: dbItems
      }
    ],
  },
  {
    text: "HTML",
    children: htmlItems,
  },
  {
    text: "版本",
    children: versionItems,
  }, {
    text: "服务器",
    children: serverItems,
  },
  {
    text: `VuePress2参考指南`,
    link: "https://v2.vuepress.vuejs.org/zh/",
  },
]

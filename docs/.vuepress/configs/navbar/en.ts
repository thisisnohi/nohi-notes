import type { NavbarConfig } from '@vuepress/theme-default'
import { jvmItems } from "../items/jvmItems";
import { springItems } from "../items/springItems";
import { dbItems } from "../items/dbItems";
import { htmlItems } from "../items/htmlItems";
import { versionItems } from "../items/versionItems";
import { serverItems } from "../items/serverItems";
import { javaItems } from "../items/javaItems.js";
import { codeLanItems } from "../items/codeLanItems.js";

export const navbarEn: NavbarConfig =  [
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
    text: "CodeLan",
    children: codeLanItems,
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
    text: "VERSION Control",
    children: versionItems,
  }, {
    text: "SERVER",
    children: serverItems,
  },
  {
    text: `VuePress2参考指南`,
    link: "https://v2.vuepress.vuejs.org/zh/",
  },
]

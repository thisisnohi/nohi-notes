import type { NavbarConfig } from '@vuepress/theme-default'
import { jvmItems } from "../items/jvmItems";
import { springItems } from "../items/springItems";
import { dbItems } from "../items/dbItems";
import { htmlItems } from "../items/htmlItems";
import { versionItems } from "../items/versionItems";
import { serverItems } from "../items/serverItems";

export const navbarEn: NavbarConfig =  [
  // NavbarItem
  {
    text: "NOTES",
    link: "/zh/notes/",
  },
  // NavbarGroup
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
    text: "VERSION",
    children: versionItems,
  }, {
    text: "SERVER",
    children: serverItems,
  },
]

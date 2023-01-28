import type { SidebarConfig } from '@vuepress/theme-default'
import { jvmItems } from "../items/jvmItems";
import { javaItems } from "../items/javaItems";
import { notesItems } from "../items/notesItems";
import { dbItems } from "../items/dbItems";
import { htmlItems } from "../items/htmlItems";
import { versionItems } from "../items/versionItems";
import { serverItems } from "../items/serverItems";

export const sidebarZh: SidebarConfig = {
  '/zh/notes/': notesItems,
  '/zh/java/': javaItems,
  '/zh/jvm/': jvmItems,
  '/zh/db/': dbItems,
  '/zh/html/': htmlItems,
  '/zh/version/': versionItems,
  '/zh/server/': serverItems,
}

import type { SidebarConfig } from '@vuepress/theme-default'
import { jvmItems } from "../items/jvmItems";
import { notesItems } from "../items/notesItems";
import { dbItems } from "../items/dbItems";
import { htmlItems } from "../items/htmlItems";
import { versionItems } from "../items/versionItems";

export const sidebarZh: SidebarConfig = {
  '/zh/notes/': notesItems,
  '/zh/jvm/': jvmItems,
  '/zh/db/': dbItems,
  '/zh/html/': htmlItems,
  '/zh/version/': versionItems,
}

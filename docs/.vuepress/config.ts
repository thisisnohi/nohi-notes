import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { head, navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs';
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  // set site base to default value
  base: '/',
  // extra tags in `<head>`
  head,
  lang: "zh-CN",
  title: "NOHI Notes", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: "使用VuePress制作的个人笔记", // meta 中的描述文字，用于SEO

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'NOHI Notes',
      description: 'NOHI Notes',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'NOHI 笔记',
      description: '使用VuePress制作的个人笔记',
    },
  },

  plugins: [
    // 本地搜索
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search',
        },
        '/zh/': {
          placeholder: '搜索',
        },
      },
    }),
  ],

  // 默认主题
  theme: defaultTheme({
    repo: "https://github.com/thisisnohi/thisisnohi.github.io", //github仓库地址
    editLink: false,
    lastUpdatedText: "最后更新时间",
    contributorsText: "作者",
    docsDir: 'docs',

    // navbar: navbarZh,
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: navbarEn,
        // sidebar
        sidebar: sidebarEn,
        // page meta
        editLinkText: 'Edit this page on GitHub',
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // navbar
        navbar: navbarZh,
        // sidebar
        sidebar: sidebarZh,
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
      },
    },
  }),
});
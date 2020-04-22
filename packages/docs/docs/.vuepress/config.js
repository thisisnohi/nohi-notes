const path = require('path')

module.exports = {
  dest: '../../nohi-notes',
  base: '/nohi-notes/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'NOHI Notes',
      description: 'Make Personal Notes By VuePress'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'NOHI Notes',
      description: '使用VuePress制作的个人笔记'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    repo: 'thisisnohi/nohi-notes',
    editLinks: true,
    docsDir: 'docs',
    // #697 Provided by the official algolia team.
    // algolia: {
    //   apiKey: '3a539aab83105f01761a137c61004d85',
    //   indexName: 'vuepress'
    // },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/zh'), //直接指向中文
        sidebar: {
          '/guide/': genSidebarConfig('Guide')
        }
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: require('./nav/zh'),
        sidebar: {
          '/guide/': genSidebarConfig('指南'),
          '/zh/notes/': genNotesSidebarConfig('笔记'),
        }
      }
    }
  },
  plugins: {
    '@vuepress/i18n-ui': true,
    '@vuepress/back-to-top': true,
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    },
    '@vuepress/plugin-medium-zoom': true,
    '@vuepress/notification': true,
    'flowchart': true
  },
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
}

function genSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'permalinks',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy'
      ]
    }
  ]
}

function genNotesSidebarConfig (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'name',
        'java_jvm',
        'Java_test',
        'java_基础',
        'java_性能',
        '服务线程堆栈查看',
        'arthas',
        'database',
        'datasource',
        'wechat',
        'nodejs',
        'ognl',
        'python_note',
        'Was',
        'nohi-notes',
      ]
    }
  ]
}

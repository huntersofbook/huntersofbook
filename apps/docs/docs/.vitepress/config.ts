export default {
  lang: 'id-ID',
  title: 'huntersofbook',
  titleTemplate: 'huntersofbook open source',
  description: 'huntersofbook open the tools we use in our projects to all developers.',
  editLink: true,
  head: [
    ['meta', { property: 'og:description', content: 'huntersofbook open the tools we use in our projects to all developers.' }],
    ['meta', { property: 'og:type', content: 'article' }],
  ],
  themeConfig: {
    sidebar: {
      '/docs': sidebarMartin(),
    },
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Docs', link: '/docs/' },
    ],
    editLink: {
      pattern: 'https://github.com/huntersofbook/huntersofbook/edit/main/apps/docs/:path',
      text: 'GitHub Edit Link',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/huntersofbook/huntersofbook' },
      { icon: 'discord', link: 'https://discord.gg/N3vW4jrzdX' }
    ],
    footer: {
      message: 'Created by productdevbook',
      copyright: 'huntersofbook'
    },
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: false
  }
}

function sidebarMartin() {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'General', link: '/docs/' },
      ]
    },
    {
      text: 'Dynamic Forms Generator',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Getting Started', link: '/docs/form/' },
        { text: 'Naive UI', link: '/docs/form/naiveui/' },
      ]
    },
  ]
}


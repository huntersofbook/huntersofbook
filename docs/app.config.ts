export default defineAppConfig({
  github: {
    owner: 'huntersofbook',
    repo: 'huntersofbook',
    branch: 'main',
  },
  docus: {
    title: 'huntersofbook',
    description:
    'It is a community established specifically to improve the vue ecosystem. Our own team will always give this contribution back to the world.',
    image: 'https://opensource.huntersofbook.com/preview.png',
    url: 'https://opensource.huntersofbook.com',
    socials: {
      twitter: '@huntersofbook',
      github: 'huntersofbook/huntersofbook',
      discord: 'https://discord.gg/xAj9uqMrjC',
    },
    showLinkIcon: true,
    layout: {
      fluid: true,
    },
    aside: {
      level: 1,
      exclude: ['/changelog'],
    },
    github: {
      root: 'docs/content',
      edit: true,
      releases: true,
    },
    cover: {
      src: '/cover.jpg',
      alt: 'huntersofbook open source project was created for developers',
    },
    header: {
      title: 'huntersofbook',
      logo: false,
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com',
      },
      iconLinks: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          icon: 'IconNuxt',
        },
        {
          label: 'VueJS',
          href: 'https://vuejs.org',
          icon: 'uim:vuejs',
        },
      ],
    },
  },
})

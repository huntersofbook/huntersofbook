export default defineAppConfig({
  docus: {
    title: 'huntersofbook',
    description:
      'It is a community established specifically to improve the vue ecosystem. Our own team will always give this contribution back to the world.',
    layout: 'default',
    image: 'https://opensource.huntersofbook.com/preview.png',
    url: 'https://opensource.huntersofbook.com',
    debug: false,
    socials: {
      twitter: '@huntersofbook',
      github: 'huntersofbook/huntersofbook',
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
    aside: {
      level: 0,
      exclude: [],
    },
    header: {
      title: false,
      logo: false,
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com',
      },
      icons: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          component: 'IconNuxt',
        },
        {
          label: 'VueJS',
          href: 'https://vuejs.org',
          component: 'uim:vuejs',
        },
      ],
    },
  },
})

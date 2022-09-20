export default defineAppConfig({
  docus: {
    title: 'huntersofbook',
    description: 'We open the tools we use in our projects to all developers.',
    layout: 'docs',
    image: 'https://content.nuxtjs.org/preview.png',
    url: 'https://content.nuxtjs.org',
    debug: false,
    socials: {
      twitter: '@huntersofbook',
      github: 'huntersofbook/huntersofbook'
    },
    github: {
      root: 'apps/nuxt-docs/content',
      edit: true,
      releases: true
    },
    cover: {
      src: '/cover.jpg',
      alt: 'Content made easy for Vue developers'
    },
    header: {
      title: false,
      logo: false
    },
    footer: {
      credits: {
        icon: 'IconDocus',
        text: 'Powered by Docus',
        href: 'https://docus.com'
      },
      icons: [
        {
          label: 'NuxtJS',
          href: 'https://nuxtjs.org',
          component: 'IconNuxt'
        },
        {
          label: 'VueJS',
          href: 'https://vuejs.org',
          component: 'uim:vuejs'
        }
      ]
    }
  }
})

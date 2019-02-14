const path = require('path');
require('dotenv').config();
const features = [
  'fetch',
  'Object.entries',
  'IntersectionObserver',
].join('%2C');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    root: path.resolve(__dirname),
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname),
    },
  },
  /*
  ** Headers of the page
  */
  mode: 'universal',

  router: {
    middleware: 'authenticate',
  },
  head: {
    title: '시간 언제 괜찮으세요?',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: '모임 날짜 잡을 건데, 시간 언제 괜찮으세요? 많은 사람이 참석하는 모임 날짜를 조정하고 일정을 기획하는 것은 어렵습니다. 이제 간편하게 해보세요!' },
      { hid: 'keywords', name: '모임 날짜, 약속, 시간 조정, 날짜 조정, 행사 기획, 모임 기획' },
      { hid: 'og:url', property: 'og:url', content: process.env.HOST_URL },
      { hid: 'og:title', property: 'og:title', content: '시간 언제 괜찮으세요?' },
      { hid: 'og:description', property: 'og:description', content: '모임 날짜 잡을 건데, 시간 언제 괜찮으세요? 많은 사람이 참석하는 모임 날짜를 조정하고 일정을 기획하는 것은 어렵습니다. 이제 간편하게 해보세요!' },
      { property: 'og:image', content: `${process.env.HOST_URL}/title-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@nerfThisRabbit' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css'},
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/android-icon-144x144.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/android-icon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '72x72', href: '/android-icon-72x72.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/android-icon-48x48.png' },
      { rel: 'icon', type: 'image/png', sizes: '36x36', href: '/android-icon-36x36.png' },
      { rel: 'manifest', href:'/manifest.json' },
      { href: "/splashscreens/iphone5_splash.png", media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/iphone6_splash.png", media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/iphoneplus_splash.png", media: "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/iphonex_splash.png", media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/iphonexr_splash.png", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/iphonexsmax_splash.png", media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/ipad_splash.png", media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/ipadpro1_splash.png", media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/ipadpro3_splash.png", media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" },
      { href: "/splashscreens/ipadpro2_splash.png", media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)", rel: "apple-touch-startup-image" },
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.6.3/js/all.js',
        integrity: 'sha384-EIHISlAOj4zgYieurP0SdoiBYfGJKkgWedPHH4jCzpCXLmzVsw1ouK59MuUtP4a1',
        crossorigin: 'anonymous',
        defer: 'true'
      },
      { src: `https://polyfill.io/v3/polyfill.min.js?features=${features}`, body: true },
      { src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}`, async: true},
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    transpile: ['vuejs-datepicker']
  },
  css: [
    'normalize.css/normalize.css'
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
  ],
  styleResources: {
    // your settings here
    sass: ['@/assets/scss/common.scss'], // alternative: scss
  },
  plugins: [
    '@/plugins/toast.client.js',
    '@/plugins/clipboard.client.js',
    '@/plugins/swal.client.js',
    '@/plugins/axios.js',
    '@/plugins/gtag.client.js',
  ]
};


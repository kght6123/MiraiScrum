// read env.
const envObj = require(`./env.json`)

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.9.1/firebase-auth.js' },
      { src: 'https://www.gstatic.com/firebasejs/7.9.1/firebase-firestore.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // { src: '~/node_modules/highlight.js/styles/xcode.css', lang: 'css' },
    '~/assets/stylus/hjs.styl',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase.js', ssr: false },
    { src: '~/plugins/vue-js-modal.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // Doc: https://typescript.nuxtjs.org/guide/setup.html#module-options
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/markdownit
    '@nuxtjs/markdownit',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    stylus: ['~/assets/stylus/global_variables.styl']
   },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    injected: true,

    html: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      // 'markdown-it-div',
      // 'markdown-it-attrs'
    ],
    highlight: function (str, lang) {
      const hljs = require('highlight.js'); // https://highlightjs.org/
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }
      return ''; // use external default escaping
    }
  },
  dotenv: {
    /* module options */
    filename: '.env'
  },
  fontawesome: {
    icons: {
      solid: ['faHome','faAngleUp','faAngleLeft','faAngleRight','faAngleDown']
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  serverMiddleware: [`~/api/`],
  env: envObj,
}

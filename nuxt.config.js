module.exports = {
  head: {
    title: 'nuxt-blockstack',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  build: {
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '@/plugins/blockstack.js'
  ],
  ,
  serverMiddleware: [ // TODO
    { path: '/api/manifest.json', handler: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(require('./static/manifest.json')), 'utf-8')
      }
    }
  ],
  loading: { color: '#3B8070' }
}

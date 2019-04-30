const proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    title: 'Not a Whippet',
    description:"",
    author: "@markmichon"
  },

  developMiddleware: app => {
    app.use(
      '/.netlify/functions',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        }
      })
    )
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    
  ]
}
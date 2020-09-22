const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        path.join(__dirname, './src/assets/*.styl')
      ]
    }
  }
}

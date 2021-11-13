const path = require('path')

module.exports = {
  runtimeCompiler: true,
  transpileDependencies: [
    'vuetify'
  ],
  // configureWebpack: {
  //   resolve: {...you config...}
  // }
  configureWebpack: {
    resolve: {
        alias: {
          // '@': path.resolve(__dirname, 'src/components/'),
          Modules: path.resolve(__dirname, 'src/Modules/'),
        }
    }
  }
}

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 全局变量
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/global.scss";
        `
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_com', resolve('src/components'))
      .set('_api', resolve('src/api'))
      .set('_views', resolve('src/views'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.99.128:8083/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
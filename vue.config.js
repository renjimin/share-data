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
      config.resolve.symlinks(true);
  },
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本

  productionSourceMap: false, // 生产环境的 source map

  parallel: require('os').cpus().length > 1,

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

// vue.config.js
// const glob = require('glob')
// const path = require('path')
// const os =  require('os')
// const PAGE_PATH = path.resolve(__dirname, 'src/pages')
// let entryPage = glob.sync(PAGE_PATH + '/*/*.html')

// function resolve (dir) {
//   return ('src/pages/' + dir)
// }
// //development  production
// console.log(process.env.NODE_ENV)

// let pages = {}
// entryPage.forEach((filePath) => {
//   let packgeName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
//   pages[packgeName] = {
//     entry: resolve(packgeName + '/' + packgeName + '.js'),
//     template: resolve(packgeName + '/' + packgeName + '.html'),
//     filename: packgeName + '.html',
//   }
// })


// module.exports = {
//   pages: pages,
//   //  {
//   //   index: {
//   //     // 页面的入口文件
//   //     entry: 'src/pages/index/index.js',
//   //     // 页面的模板文件
//   //     template: 'public/index.html',
//   //     // build 生成的文件名称  例： dist/index.html
//   //     filename: 'index.html'
//   //   },
//   //   // template 默认会去找 public/subpage.html 页面，如果找不到会使用 public/index.html 文件
//   //   // 输出文件会默认的推断为 subpage.html
//   //   subpage: {
//   //     entry: 'src/pages/subpage/subpage.js',
//   //     filename: 'subpage.html'
//   //   }
//   // },
//   // 项目部署的基础路径
//   // 我们默认假设你的应用将会部署在域名的根部，
//   // 比如 https://www.my-app.com/
//   // 如果你的应用时部署在一个子路径下，那么你需要在这里
//   // 指定子路径。比如，如果你的应用部署在
//   // https://www.foobar.com/my-app/
//   // 那么将这个值改为 `/my-app/`
//   baseUrl: './',
//   // 放置静态资源的地方 (js/css/img/font/...)
//   assetsDir: './',
//   // 将构建好的文件输出到哪里
//   outputDir: 'resources/static',
//   // 是否在保存的时候使用 `eslint-loader` 进行检查。
//   // 有效的值：`ture` | `false` | `"error"`
//   // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
//   lintOnSave: true,

//   // 使用带有浏览器内编译器的完整构建版本
//   // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
//   // compiler: false,

//   // babel-loader 默认会跳过 node_modules 依赖。
//   // 通过这个选项可以显式转译一个依赖。
//   transpileDependencies: [/* string or regex */],

//   // 是否为生产环境构建生成 source map？
//   productionSourceMap: (process.env.NODE_ENV === 'development'),

//   // 调整内部的 webpack 配置。
//   // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
// //   chainWebpack:  config => {
// //       config
// //       .entry('index')
// //         .add('babel-polyfill')
// // },
//   configureWebpack: () => {},
//   // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
//   // 在多核机器下会默认开启。
//   parallel: os.cpus().length > 1,

//   // PWA 插件的选项。
//   // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
//   pwa: {},

//   // 配置 webpack-dev-server 行为。
// //   // 全局变量
//   css: {
//     loaderOptions: {
//       sass: {
//         data: `
//           @import "@/assets/styles/global.scss";
//         `
//       }
//     }
//   },
//   chainWebpack: (config) => {
//     config.resolve.alias
//       .set('@', resolve('src'))
//       .set('_com', resolve('src/components'))
//       .set('_api', resolve('src/api'))
//       .set('_views', resolve('src/views'))
//   },
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://192.168.99.128:8083/', //对应自己的接口
//         changeOrigin: true,
//         ws: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   },
//   // 三方插件的选项
//   pluginOptions: {
//     // ...
//   }
// }


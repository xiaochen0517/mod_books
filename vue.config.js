const {defineConfig} = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/docs',
            to: './',
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
  },
  css: {
    loaderOptions: {
      less: {
        // 引入styles下的
        additionalData: `@import "~@/assets/styles/variables.less";`,
      }
    }
  }
})

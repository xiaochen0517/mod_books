const {defineConfig} = require("@vue/cli-service");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "./src/docs",
                        to: "./",
                        noErrorOnMissing: true,
                    },
                ],
            }),
        ],
    },
    chainWebpack: config => {
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options => ({
                ...options,
                compilerOptions: {
                    isCustomElement: tag => tag.startsWith("fluent-")
                }
            }));
    },
    css: {
        loaderOptions: {
            less: {
                // 引入styles下的
                additionalData: "@import \"~@/assets/styles/variables.less\";",
            }
        }
    },
});

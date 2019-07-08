const {join, resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Jarvis = require("webpack-jarvis");

module.exports = {
    output: {
        filename: "scripts/[name].bundule.js"
    },
    // 配置 devServer
    devServer: {
        port: 4000,
        historyApiFallback: true,
        contentBase: join(__dirname, "../dist"),
        proxy: {
            "/api": "http://localhost:3000"
        },
        hot: true,
        quiet: true // necessary for FriendlyErrorsPlugin
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "CRM开发环境",
            filename: "index.html",
            template: resolve(__dirname, "../src/web/index-dev.html")
        }),
        new WebpackBuildNotifierPlugin({
            title: "大爷！服务已启动",
            logo: resolve("./static/img/xiaochuachua.png"),
            suppressSuccess: true
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ["You application is running here http://localhost:4000"]
                // notes: ["开发环境的Mock数据请务必与服务器报纸一致"]
            },
            clearConsole: true,
            onErrors: (severity, errors) => {
                // if (severity !== "error") {
                //   return; everity + ": " + error.name,
                // }
                // const error = errors[0];
                new WebpackBuildNotifierPlugin({
                    title: "CRM系统",
                    logo: resolve("./static/img/xiaochuachua.png"),
                    suppressSuccess: true
                });
            }
        })
    ],
};


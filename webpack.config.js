const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require('webpack-merge');
const {join, resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');//manifest.json
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const _modeflag = _mode == "production" ? true : false;
// const DashboardPlugin = require('webpack-dashboard/plugin');//面板
const setTitle = require('node-bash-title');
setTitle('🍎🍎🍎🍎🍎CRM1🍎🍎🍎🍎');

let webpackConfig = {
    entry: [
        './src/web/index.tsx'
    ],
    output: {
        path: resolve(__dirname, './dist/assets'),
        filename: '[name].js',

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: [resolve("src")],
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
                use: [
                    {
                        // loader: 'file-loader',
                        loader: "url-loader",
                        options: {
                            // 小于 10kB(10240字节）的内联文件
                            limit: 10 * 1024,
                            name: _modeflag
                                ? "images/[name].[hash:5].[ext]"
                                : "images/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        react: "React",
        "react-router-dom": "ReactRouterDOM",
        mobx: "mobx"
        // "mobx-react-lite": "mobx-react-lite"
    },
    optimization: {
        //压缩js代码
        minimize: _modeflag ? true : false,
        //runtimeChunk ，作用是将包含chunks映射关系的list单独从app.js里提取出来，因为每一个chunk的id基本都是基于内容hash出来的，所以你每次改动都会影响它，如果不把它提取出来的话，等于app.js每次都会改变，缓存就失效了。
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: "commons"
                }
            }
        }
    },
    resolve: {
        alias: {
            "@assets": resolve("src/web/assets"),
            "@components": resolve("src/web/components"),
            "@models": resolve("src/web/models"),
            "@pages": resolve("src/web/pages"),
            "@utils": resolve("src/web/utils")
        },
        modules: ["node_modules", resolve("src")],
        extensions: [".js", ".ts", ".tsx", "jsx"]
    },
    plugins: [
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag ? "styles/[name].[contenthash:5].css" : "",
            chunkFilename: _modeflag ? "styles/[name].[contenthash:5].css" : ""
        }),
        new ManifestPlugin(),
    ]
};

module.exports = merge(webpackConfig, _mergeConfig);

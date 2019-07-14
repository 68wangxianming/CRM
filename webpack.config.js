const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require('webpack-merge');
const {join, resolve} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');//manifest.json
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const {GenerateSW} = require('workbox-webpack-plugin');
const _modeflag = _mode == "production" ? true : false;
// const DashboardPlugin = require('webpack-dashboard/plugin');//面板
const setTitle = require('node-bash-title');
setTitle('🍎🍎🍎🍎🍎CRM1🍎🍎🍎🍎');

let webpackConfig = {
    entry: {
        app: resolve("src/web/index.tsx")
    },
    output: {
        path: join(__dirname, "./dist/assets"),
        filename: '[name].js',
        publicPath: "/"
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
        // new GenerateSW({
        //     importWorkboxFrom:'local',
        //     cacheId: 'webpack-pwa', // 设置前缀
        //     skipWaiting: true, // 强制等待中的 Service Worker 被激活
        //     clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
        //     swDest: 'service-wroker.js', // 输出 Service worker 文件
        //     globPatterns: ['**/*.{html,js,css,png.jpg}'], // 匹配的文件
        //     globIgnores: ['service-wroker.js'], // 忽略的文件
        //     runtimeCaching: [
        //         // 配置路由请求缓存
        //         {
        //             urlPattern: /.*\.js/, // 匹配文件
        //             handler: 'networkFirst' // 网络优先
        //         }
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: _modeflag ? "styles/[name].[contenthash:5].css" : "",
            chunkFilename: _modeflag ? "styles/[name].[contenthash:5].css" : ""
        }),
        new ManifestPlugin(),
    ]
};

module.exports = merge(webpackConfig, _mergeConfig);

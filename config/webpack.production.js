const {join, resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {GenerateSW} = require('workbox-webpack-plugin');


module.exports = {
    output: {
        filename: "scripts/[name].[contenthash:5].bundule.js"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: [
                    "default",
                    {
                        discardComments: {
                            removeAll: true
                        }
                    }
                ]
            },
            canPrint: true
        }),
        // new UglifyJsPlugin({
        //     uglifyOptions: {
        //         compress: {
        //             drop_console: true
        //         },
        //         output: {
        //             comments: false
        //         }
        //     },
        //     parallel: true
        // }),
        new GenerateSW({
            importWorkboxFrom: "local",
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [{
                urlPattern: new RegExp('.*\.html'),
                handler: 'NetworkFirst',
                options: {
                    cacheableResponse: {
                        statuses: [200]
                    }
                }
            }, {
                urlPattern: new RegExp('.*\.(?:js|css)'),
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheableResponse: {
                        statuses: [200]
                    }
                }
            }, {
                urlPattern: new RegExp('.*\.(?:ico|png|jpeg)'),
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheableResponse: {
                        statuses: [200]
                    }
                }
            },{
                urlPattern: new RegExp('https://cdn.staticfile.org/normalize/8.0.1/normalize.min.css'),
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheableResponse: {
                        statuses: [200]
                    }
                }
            }]
        }),
        new HtmlWebpackPlugin({
            title: "CRM开发环境",
            filename: "../views/index.html",
            template: resolve(__dirname, "../src/web/index-prod.html"),
            inject: true,
            minify: {
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
};








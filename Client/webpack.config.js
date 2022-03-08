const glob = require("glob");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBar = require('webpackbar');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
    experiments: {
        outputModule: true,
    },
    entry: {
        styles: './src/scss/theme.scss',
        ambient: glob.sync("./src/ts-ambient/*.ts"),
        interop: glob.sync("./src/ts-interop/*.ts")
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/Themes/ToSic.Oqt.Themes.ToShineBs5'),
        module: true,
        libraryTarget: 'module',
    },
    mode: 'production',
    devtool: 'source-map',
    watch: false,
    stats: {
        all: false,
        assets: true
    },
    resolve: {
        extensions: ['.scss']
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    }
                }
            })
        ],
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'theme.min.css',
        }),
        new WebpackBar(),
        new FriendlyErrorsWebpackPlugin(),
    ],
    module: {
        rules: [
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        postcssOptions: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ],
        },
        {
            test: /\.ts$/,
            exclude: [/node_modules/, /ts-interop/],
            use: {
                loader: 'ts-loader'
            }
        },
        {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/'
                }
            }]
        }
        ],
    },
};
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");//html build
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css build
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// css minify
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        MYSCRIPT: './src/index'
    },
    output: {
        filename: "bundle.js",
        library: "MYSCRIPT",
        libraryTarget: "umd",
        path: path.resolve(__dirname, '../build')
    },
    mode: 'development',// none, development, production
    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, "../build"),
        index: "index.html",
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules",
                use: ['babel-loader?compact=false']
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        extensions: [".jsx", ".js", ".ts", ".tsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style-test.css'
        }),
        new CleanWebpackPlugin()
    ]
} 
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");//html build
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css build
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// css minify
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: './src/index',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, '../build/')
    },
    mode: 'production',// none, development, production
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
                options: {
                    name: '[path][name].[ext]',
                    outputPath: 'images/'
                }  
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
            filename: 'style.css'
        }),
        new CleanWebpackPlugin()
    ]
}
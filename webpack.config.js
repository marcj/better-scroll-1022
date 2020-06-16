const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/main.js'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        symlinks: false,
    },
    target: 'node',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Scroll behavior',
            template: 'src/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
};

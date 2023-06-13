const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './rs-css/index.ts'),
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath}/[name][ext]`;
        },
    },
    module: {
        rules: [
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './rs-css/index.html'),
            filename: 'index.html',
        }),
        // new FaviconsWebpackPlugin({
        //     logo: './migration-to-ts/src/img/icon.png',
        // }),
        new EslingPlugin({ extensions: 'ts' })
    ],
};
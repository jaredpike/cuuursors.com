const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd ? false : 'source-map',
    entry: {
        'javascripts/main': './src/javascripts/main.js',
        'stylesheets/main': './src/stylesheets/main.scss'
    },
    output: {
        path: path.join(__dirname, 'static/assets'),
        filename: isProd ? '[name].[chunkhash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|vendor/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                }),
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
                loader: 'file-loader?name=[path][name].[hash:base64:5].[ext]'
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.json']
    },
    plugins: [
        new ManifestPlugin(),
        new ExtractTextPlugin(isProd ? '[name].[chunkhash].css' : '[name].css')
    ]
};
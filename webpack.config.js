const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = 
{
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/bundle.js'
    },
   devServer: {
    contentBase: './dist'
   },
Plugins: [
    new HtmlWebpackPlugin {
        filename: 'index.html',
        template: './index.html'
    }
],
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }
    ]
}

};
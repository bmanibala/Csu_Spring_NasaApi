const path = require('path');
const loader = require('sass-loader');

module.exports = {
    output:{
        path: path.join (__dirname, '/dist'),
        filename: "index.bundle.js",
    },
    devServer: {
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    }


};
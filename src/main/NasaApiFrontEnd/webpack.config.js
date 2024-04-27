const path = require('path');
const loader = require('sass-loader');

module.exports = {
    entry: './src/index.js',
    devtool: 'eval-source-map',
    cache: true,
    mode: 'development',
    output:{
        path: __dirname,
        filename: '../resources/static/built/index.bundle.js'
    },
    resolve: {
        alias: {
          // Correct alias configurations
          Browser: path.resolve(__dirname, 'src/browser/')
        }
      },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|eot|otf|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
};
var dev = process.env.NODE_ENV != 'production';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('app.css');

var config = {
    entry: __dirname + '/src/app.scss',
    output: {
        path: __dirname + '/dist/app',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract(['css-loader'])
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.png$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    plugins: [extractCSS]
};

var firefoxConfig = Object.assign({}, config, {
    output: {
        path: __dirname + '/dist-firefox/app',
        filename: 'app.js'
    }
});

module.exports = [config, firefoxConfig];

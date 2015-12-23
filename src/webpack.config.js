var path = require('path');


module.exports = {
    entry: path.resolve(__dirname, 'app/js/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080
    }
};

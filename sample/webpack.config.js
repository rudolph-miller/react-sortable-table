var webpack = require('webpack');

module.exports = {
    entry: './sample.jsx',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        modulesDirectories: [ "../node_modules" ]
    },
    devtool: "#inline-source-map"
}

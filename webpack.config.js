var webpack = require('webpack');

module.exports = {
    entry: './src/sortable-table.jsx',
    output: {
        filename: 'dist/react-sortable-table.js'
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
        modulesDirectories: [ "node_modules" ]
    },
    devtool: "#inline-source-map"
}

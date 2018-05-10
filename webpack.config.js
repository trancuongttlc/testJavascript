var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./js/exam.js', './css/style.sass'],
    output: {
        filename: 'dist/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'dist/[name].css',
            allChunks: true,
        }),
    ]
};
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'js/app.bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|txt)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/Nunito/[base]'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/app.bundle.css'
        })
    ]
};

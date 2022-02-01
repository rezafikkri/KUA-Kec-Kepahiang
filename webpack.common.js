const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        app: './src/js/app.js',
        galeri: './src/js/galeri.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'js/[name].bundle.js'
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

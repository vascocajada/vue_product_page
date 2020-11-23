const path = require('path');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//const StyleLintPlugin = require('stylelint-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devtool: 'cheap-eval-source-map',
    output: {
        filename: 'bundle_dev.js',
        path: path.resolve(__dirname, 'public/build/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                loader: "babel-loader"
            },
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'vue-style-loader', 'css-loader' ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.yaml|yml$/,
                use: 'js-yaml-loader',
            },
            {
                test: /\.styl$/,
                loader: ['style-loader', 'css-loader', 'stylus-loader']
            }
        ]
    },
    plugins: [
        //new CleanWebpackPlugin(['public/js/results']),
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        //new StyleLintPlugin({
            //files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        //})
        //new BundleAnalyzerPlugin()

    ]
};

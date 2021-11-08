const path = require('path'); //경로 쉽게 조작
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', //실서비스: production
    devtool: 'eval', //빠르게
    resolve: { 
        extensions: ['.js', '.jsx']
    },

    entry: { //입력
        //client.jsx가 WordRelay와 리액트,리액트돔까지 같이 불러옴.
        app: ['./client'],
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'], //browserslist
                        },
                        debug: true,
                    }], 
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: { //출력 
    //경로 알아서 합치기(현재폴더경로, 안에 dist)
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js',
        publicPath: '/dist/',
    },
    devServer: { 
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
      }
};
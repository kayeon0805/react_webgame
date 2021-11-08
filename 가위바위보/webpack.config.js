const path = require('path'); //노드에서 쉽게 경로 조작
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	name: 'rsp-setting',
    mode: 'development', //실서비스: production
    devtool: 'eval', //빠르게
    resolve: {
        extensions: ['.js', '.jsx'] //알아서 client. js || jsx가 있는지 찾음
    },

    entry: { //입력
        app: ['./client'],
    },

    module: {
        rules: [{
            test: /\.jsx?/, //규칙을 적용할 파일들
            loader: 'babel-loader', //js, jsx 파일을 바벨을 적용
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            //한국에서 5퍼 이상 사용하는 브라우저
                            browsers: ['> 5% in KR'], // 참고: browsersList
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ],
            },
        }],
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: { //출력    현재폴더
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    },
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    },
};
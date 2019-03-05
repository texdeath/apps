const path = require('path');
const config = require('config');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: config.env.stage,
    entry: '../src/server.tsx',
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: path.resolve(__dirname, 'config/tsconfig.client.json')
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    }
};
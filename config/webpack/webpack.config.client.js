const path = require('path');
const config = require('config');

module.exports = {
    mode: config.env.stage,
    entry: '../src/client/client.tsx',
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
        filename: 'static/js/bundle.js',
        path: path.resolve(__dirname, 'dist/public')
    }
};
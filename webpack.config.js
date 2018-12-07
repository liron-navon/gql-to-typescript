const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const dist = path.join(__dirname, 'dist');

module.exports = {
    mode,
    target: 'node',
    externals: [nodeExternals()],
    devtool: "source-map",
    entry: "./src/index.ts",
    stats: "verbose",
    plugins: [
        new CleanWebpackPlugin(dist, {}),
    ],
    output: {
        path: dist,
        filename: "gql-to-typescript.js",
        library: 'gqlToTypescript',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        alias: {
            src: path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    },
    externals: {
        'lodash/defaultsDeep': {
            commonjs: 'lodash/defaultsDeep',
            commonjs2: 'lodash/defaultsDeep',
            amd: 'lodash/defaultsDeep'
        },
        'glob': {
            commonjs: 'glob',
            commonjs2: 'glob',
            amd: 'glob'
        },
        'graphql-tag': {
            commonjs: 'graphql-tag',
            commonjs2: 'graphql-tag',
            amd: 'graphql-tag'
        },
        'graphql': {
            commonjs: 'graphql',
            commonjs2: 'graphql',
            amd: 'graphql'
        }
    }
};

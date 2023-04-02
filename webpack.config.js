const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

const pkg = require('./package.json');

const federationConfig = {
    name: 'mfe',
    library: { type: 'var', name: 'mfe' },
    filename: 'remoteEntry.js',
    exposes: {
        './MFE': './src/App',
    },
    // shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
};

module.exports = {
    entry: "./src/index.ts",
    mode: 'development',
    output: {
        publicPath: 'auto',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        port: 3001,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: 'css-loader', options: { url: false } }
                ]
            }
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
    plugins: [
        new ModuleFederationPlugin(federationConfig),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
};
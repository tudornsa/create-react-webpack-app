"use strict";

const webpackConfigTemplate = `const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "index-bundle.js",
        path: path.join(__dirname, "dist/")
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public/index.html")
        })
    ]
};
`;

module.exports.webpackConfigTemplate = webpackConfigTemplate;

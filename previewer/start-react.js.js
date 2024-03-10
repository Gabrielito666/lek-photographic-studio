const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack-preview-config.js');

const PORT = 8080;

const compiler = webpack(config);
const serverOptions = { hot: true, open: false };

const server = new WebpackDevServer(serverOptions, compiler);
server.startCallback(() => { console.log(`dev server in http://localhost:${PORT}`) });
#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

const webpackConfigPath = path.resolve(__dirname, '..', 'webpack.config.js');
const entryPath = path.resolve(__dirname, '..', 'previewer.js');

execSync(`webpack serve --mode development --entry ${entryPath} --config ${webpackConfigPath} --no-open`, { stdio: 'inherit' });
#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

const entryPath = path.resolve(__dirname, '..', 'previewer.js');
execSync(`webpack serve --mode development --entry ${entryPath} --no-open`, { stdio: 'inherit' });
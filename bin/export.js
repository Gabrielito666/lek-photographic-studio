#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

const capturePath = path.resolve(__dirname, '..', 'capture.js');
execSync(`node ${capturePath}`);
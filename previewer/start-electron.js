const { execSync } = require('child_process');
const path = require('path');

const starterPath = path.resolve(__dirname, './electron-starter.js');
execSync(`electron ${starterPath}`, { stdio: 'inherit' });
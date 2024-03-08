#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

const stylesCssPath = path.join(process.cwd(), 'styles.css');
const packageJsonPath = path.join(process.cwd(), 'package.json');
const imageJsPath = path.join(process.cwd(), 'image.js');

const packageJsonContent = 
`{
  "name": "my-lek-photographic-studio-project",
  "description": "lek-photographic-studio-project",
  "dependencies": {
    "lek-photographic-studio": "^1.0.4",
    "@babel/core": "^7.24.0",
    "@babel/preset-env": "^7.24.0",
    "@babel/preset-react": "^7.23.3",
    "babel-loader": "^9.1.3",
    "concurrently": "^8.2.2",
    "css-loader": "^6.10.0",
    "electron": "^29.1.0",
    "html-webpack-plugin": "^5.6.0",
    "style-loader": "^3.3.4",
    "webpack": "^5.90.3",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.0.2",
    "fs-extra": "^11.2.0",
    "jsdom": "^24.0.0",
    "puppeteer": "^22.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-error-boundary": "^4.0.13",
    "wait-on": "^7.2.0",
    "webpack-node-externals": "^3.0.0"
  },
  "scripts": {
    "start:react": "node ./node_modules/lek-photographic-studio/bin/start-react.js",
    "start:electron": "node ./node_modules/lek-photographic-studio/bin/start-electron.js",
    "dev": "concurrently \"npm run start:react\" \"wait-on http://localhost:8080 && npm run start:electron\"",
    "export": "node ./node_modules/lek-photographic-studio/bin/export.js"
  }
}`;

const imageJsContent =
`import React from "react";
import IMG from "./components/IMG";
import styles from ".styles.css";

const settings =
{
    dimensions :
    {
        width : 1000,
        height : 1000
    },
    export : 'default'
};

const Image = _ =>
{
    return <>
        <h1>Edit here your image</h1>
    </>
}

export { Image, settings };`


(async () => {
  try {
    const stylesCssPath = path.join(process.cwd(), 'styles.css');
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const imageJsPath = path.join(process.cwd(), 'image.js');
    
    // Escribe package.json y espera a que termine
    await fs.writeFile(packageJsonPath, packageJsonContent);
    
    // Ejecuta npm install de manera síncrona
    execSync('npm install', { stdio: 'inherit' });
    
    // Escribe los demás archivos
    await fs.writeFile(imageJsPath, imageJsContent);
    await fs.writeFile(stylesCssPath, '');
    
    console.log(`
      Your "lek-photographic-studio" project has been successfully initialized.
      
      Use 'npm run dev' to open the previewer and edit image.js to edit your photo.
      
      Use 'npm run export' to export the image to where you want it to go.
    `);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
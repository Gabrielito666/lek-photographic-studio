#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

const addScriptsToPackageJson = () => {
  fs.readFile(packageJsonPath, (err, data) => {
    if (err) throw err;
    const packageJson = JSON.parse(data);

    const scriptsToAdd = {
      "start:react": `webpack serve --mode development --entry ${path.resolve(__dirname, './previewer.js')} --no-open`,
      "start:electron": `electron ${path.resolve(__dirname, './electron-starter.js')}`,
      "dev": "concurrently \"npm run start:react\" \"wait-on http://localhost:8080 && npm run start:electron\"",
      "export": `node ${path.resolve(__dirname, './capture.js')}`
    };

    packageJson.scripts = { ...packageJson.scripts, ...scriptsToAdd };

    fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), (err) => {
      if (err) throw err;
      console.log('Scripts added to package.json successfully.');
    });
  });
}

if (!fs.existsSync(packageJsonPath)) {
  console.log('npm init...');
  execSync('npm init -y', { stdio: 'inherit' });
  addScriptsToPackageJson();
} else {
  addScriptsToPackageJson();
}

fs.writeFile(imageJsPath, imageJsContent, () => {});
fs.writeFile(stylesCssPath, '', () => {});

console.log(`
Your "lek-photographic-studio" project has been successfully initialized.

Use 'npm run dev' to open the previewer and edit image.js to edit your photo.

Use 'npm run export' to export the image to where you want it to go.
`);
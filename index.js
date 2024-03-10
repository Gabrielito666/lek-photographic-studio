#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

const packageJsonContent = 
`{
  "name": "my-lek-photographic-studio-project",
  "description": "lek-photographic-studio-project",
  "dependencies": {
    "lek-photographic-studio": "^2.0.1"
  },
  "scripts": {
    "start:react": "node --no-deprecation ./node_modules/lek-photographic-studio/bin/start-react.js",
    "start:electron": "node --no-deprecation ./node_modules/lek-photographic-studio/bin/start-electron.js",
    "dev": "concurrently \\"npm run start:react\\" \\"wait-on http://localhost:8080 && npm run start:electron\\"",
    "export": "node --no-deprecation ./node_modules/lek-photographic-studio/capture.js",
    "get-dims": "node --no-deprecation ./node_modules/lek-photographic-studio/tools/copy-dimentions.js"
  }
}`;

const imageJsContent =
`import React from "react";
import Screen from "lek-photographic-studio/components/Screen";
import IMG from "lek-photographic-studio/components/IMG";
import "./styles.css";

const Image = _ =>
{
  return <Screen className="lek-photographic-studio-screen" width={1000} height={1000} exports="default">
    <h1>Edit here your image</h1>
  </Screen>;
};

export default Image;`;

const stylesCssContent =
`.lek-photographic-studio-screen{
  overflow: 'hidden';
  border: 'solid black 3px';
  position: 'absolute';
}`;

(async () => {
  try {
    const stylesCssPath = path.join(process.cwd(), 'styles.css');
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const imageJsPath = path.join(process.cwd(), 'image.js');
    
    await fs.writeFile(imageJsPath, imageJsContent);
    await fs.writeFile(stylesCssPath, stylesCssContent);
    await fs.writeFile(packageJsonPath, packageJsonContent);
    
    execSync('npm install', { stdio: 'inherit' });
    
    console.log(`
      Your "lek-photographic-studio" project has been successfully initialized.
      
      Use 'npm run dev' to open the previewer and edit image.js to edit your photo.
      
      Use 'npm run export' to export the image to where you want it to go.
    `);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
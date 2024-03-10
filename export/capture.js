const ReactDOMServer = require('react-dom/server');
const React = require('react');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const { app, BrowserWindow } = require('electron');
const webpackConfig = require('./webpack-export-config');
const userPath = path.resolve(process.cwd(), 'image.js')

const getWin = ( width, height ) => new BrowserWindow
({
  width, height, webPreferences: { offscreen: true, nodeIntegration: true, contextIsolation: false }
});
const id = 'id-' + crypto.randomBytes(64).toString('hex');

const capture = async () => {
  console.log('wait please...')
  await webpack_compile();
  const Image = require('./dist-export/bundle');
  const ImageOriginal = Image();

  const Component = () => React.cloneElement
  (
    ImageOriginal,
    {
      ...ImageOriginal.props,
      className : `${ImageOriginal.props.className} ${id}`
    }
  );
  const {width, height, exports} = ImageOriginal.props;

  const win = getWin((width + 100), (height + 100));
  const html = ReactDOMServer.renderToStaticMarkup(Component());
  app.whenReady().then(() => { createWindow(html, win, exports) });
};

capture().catch(console.error);

const webpack_compile = _ => new Promise((resolve, reject) =>
{
  webpack(
    webpackConfig(userPath),
    (err, stats) =>
    {
      if (err || stats.hasErrors()) reject(err || stats.toString('errors-only'));
      else resolve();
    }
  );
});

const JSElectronCode =
`const element = document.querySelector('.${id}');
const rect = element.getBoundingClientRect();
return {x: rect.x, y: rect.y, width: rect.width, height: rect.height};`;

const createWindow = (html, win, exports) =>
{
  win.loadURL(`data:text/html;charset=utf-8,${html}`);

  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(JSElectronCode)
    .then(rect =>
    {
      win.capturePage(rect)
      .then(image =>
      {
        //revisar lo de las rutas
        fs.writeFile('output.jpeg', image.toJPEG(), (err) =>
        {
          if (err) throw err;
          console.log('Image saved successfully');
          app.quit();
        });
      });
    });
  });
};
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const puppeteer = require('puppeteer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs-extra');
const { JSDOM } = require('jsdom');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

const capture = async () => {
  const id = 'id-' + crypto.randomBytes(64).toString('hex');
  const userPath = path.resolve(process.cwd(), 'image.js')

  const browser = await puppeteer.launch();
  console.clear()
  console.log('wait please...')
  const page = await browser.newPage();
  await webpack_compile(userPath)

  const { settings, Image } = require('./dist-export/bundle')

  const { width, height } = settings.dimensions;
  const style = { width: width + 'px', height: height + 'px' };

  const Component = () => React.createElement('div', { id, style }, React.createElement(Image, null));
  const htmlPure = ReactDOMServer.renderToStaticMarkup(Component());
  const myComponentHTML = processHtmlImgsToBase64(htmlPure);

  await page.setContent(myComponentHTML);
  const componentHandle = await page.$(`#${id}`);

  const exportPathRef = { current: undefined };
  if (settings.export === 'default' || !settings.export) {
    exportPathRef.current = 'output.png';
  }
  else {
    exportPathRef.current = settings.export;
  }
  
  await componentHandle.screenshot({ path: exportPathRef.current });
  console.log('The photo has been successfully exported');
  await browser.close();
  fs.emptyDirSync(path.resolve(__dirname, './dist-export'));
};

capture().catch(console.error);

const convertImageToBase64 = filePath => {
  const buffer = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
};

const processHtmlImgsToBase64 = (html) => {
  const basePath = path.resolve(__dirname, 'dist-export');
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const images = document.querySelectorAll("img");

  images.forEach(img => {
    const src = img.getAttribute("src");
    if (src) {
      const absolutePath = path.resolve(basePath, src);
      const base64 = convertImageToBase64(absolutePath);
      img.setAttribute("src", base64);
    }
  });

  return dom.serialize();
};
const webpack_compile = userPath => {
  const webpackConfig = {
    mode: 'production',
    target: 'node',
    entry: userPath,
    output: {
      path: path.resolve(__dirname, 'dist-export'),
      filename: 'bundle.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    externals: [webpackNodeExternals()]
  };

  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err || stats.toString('errors-only'));
      } else {
        resolve();
      }
    });
  });
};
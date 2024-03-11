const ReactDOMServer = require('react-dom/server');
const React = require('react');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('lek-photographic-studio/export/webpack-export-config');
const userPath = path.resolve(process.cwd(), './image.js');

const getExportHtml = async () =>
{
  const id = 'id-' + crypto.randomBytes(64).toString('hex');
  console.log('wait please...')
  await webpack_compile();
  const Image = require('lek-photographic-studio/export/dist-export/bundle');
  const stringStyle = fs.readFileSync(path.resolve(__dirname, './dist-export/styles.css'), 'utf-8');
  const ImageOriginal = Image.default();
  const { width, height, exports, className, children } = ImageOriginal.props;
  const style = { width : width + 'px', height : height + 'px' };

  const Component = () => React.createElement(
    'div', 
    null,
    React.createElement('style', null, stringStyle),
    React.createElement('div', { className, style, id }, children)
  );
  const html = ReactDOMServer.renderToStaticMarkup(Component());
  console.log(html)
  return { html, exports, id };
};

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

module.exports = getExportHtml;
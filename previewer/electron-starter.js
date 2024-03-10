const { app, BrowserWindow } = require('electron');

const createWindow = _ =>
{
  const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });
  win.maximize();
  win.loadURL('http://localhost:8080');
};

app.whenReady().then(createWindow);
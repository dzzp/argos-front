'use strict';

const electron = require('electron');
const { app, BrowserWindow } = electron;

require('electron-reload')(__dirname);

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        // fullscreen: true,
    });
    win.loadURL(`file://${__dirname}/index.html`);
});
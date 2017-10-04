'use strict';

const electron = require('electron');
const { app, BrowserWindow } = electron;

require('electron-reload')(__dirname);

app.on('ready', () => {
    let win = new BrowserWindow({
        fullscreen: true,
    });
    win.loadURL(`file://${__dirname}/../index.html`);
});
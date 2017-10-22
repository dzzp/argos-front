'use strict';
const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    const win = new BrowserWindow({
        'fullscreen': true
    });
    win.loadURL(`file://${__dirname}/index.html`);
});
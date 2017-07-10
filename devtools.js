'use strict';

const electron = require('electron');
const isDev = require('electron-is-dev');

if (isDev) {
    require('devtron').install();
    require('vue-devtools').install();

    document.addEventListener('keydown', function (e) {
        if (e.which === 123) { // f12
            electron.remote.getCurrentWindow().toggleDevTools();
        }
    });
}
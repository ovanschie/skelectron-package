'use strict';

const electron = require('electron');
const isDev = require('electron-is-dev');

// Init main functions
exports.install = function () {
    require('./env.js');
};

// Install dev tools in renderer
exports.devTools = function () {
    require('./devtools.js');
};

// Titlebar options
exports.titleBar = function () {
    require('./titlebar.js')
};

// Check for development
exports.isDev = isDev;

// App Path
let appPath = electron.app.getAppPath();
let appPathUnpacked = appPath;

if (!isDev) {
    appPathUnpacked = appPath + '.unpacked';
}

exports.appPath = appPath;
exports.appPathUnpacked = appPathUnpacked;
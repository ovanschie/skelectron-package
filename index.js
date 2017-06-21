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

// App Path Helpers
exports.appPath = function (unpacked = false) {
    let appPath = electron.app.getAppPath();

    if (unpacked && ! isDev) {
        return appPath + '.unpacked';
    }

    return appPath;
};

exports.remoteAppPath = function (unpacked = false) {
    let appPath = electron.remote.app.getAppPath();

    if (unpacked && ! isDev) {
        return appPath + '.unpacked';
    }

    return appPath;
};
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

// Main app Paths
let appPath = electron.app.getAppPath();
let appPathUnpacked = appPath;

if (! isDev) {
    appPathUnpacked = appPath + '.unpacked';
}

exports.appPath = appPath;
exports.appPathUnpacked = appPathUnpacked;

// Remote app paths
let remoteAppPath = electron.remote.app.getAppPath();
let remoteAppPathUnpacked = appPath;

if (! isDev) {
    remoteAppPathUnpacked = remoteAppPath + '.unpacked';
}

exports.remoteAppPath = remoteAppPath;
exports.remoteAppPathUnpacked = remoteAppPathUnpacked;
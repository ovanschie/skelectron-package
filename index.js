'use strict';

const electron = require('electron');
const isDev = require('electron-is-dev');

require('./env.js');

// Install dev tools in renderer
exports.devTools = function () {
    require('./devtools.js');
};

// Check for development
exports.isDev = isDev;
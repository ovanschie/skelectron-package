'use strict';

const electron = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs');

let path = electron.app.getAppPath();

if(isDev) {
    path += '/dev.env';
}
else {
    path += '/production.env';
}

if(fs.existsSync(path)){
    require('dotenv').config({ path: path });
}
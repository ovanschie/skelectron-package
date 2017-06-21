//'https://releases.venom-app.com/update/osx_x64/' + app.getVersion() + '/'
const electron = require('electron');
const app = electron.app;
const autoUpdater = electron.autoUpdater;
const path = require('path');
const skelectron = require('skelectron');

let state = 'no-update',
    manualCheck = false;

// Initialize the updater
exports.initialize = function (feedUrl) {

    // Skip for appstore builds
    if (process.mas) {
        return;
    }

    autoUpdater.on('checking-for-update', function () {
        state = 'checking';
        exports.updateMenu();
    });

    autoUpdater.on('update-available', function () {
        state = 'downloading';
        exports.updateMenu();
    });

    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl) {
        state = 'installed';
        exports.updateMenu();

        let buttonPressed = electron.dialog.showMessageBox({
            type: 'info',
            buttons: ['Restart and Install Update', 'Later'],
            title: 'Update downloaded',
            message: 'New version available! Do you want to apply the update now?',
            detail: releaseName + "\n\n" + releaseNotes
        });

        if (buttonPressed === 0) {
            autoUpdater.quitAndInstall();
        }
    });

    autoUpdater.on('update-not-available', function () {
        state = 'no-update';
        exports.updateMenu();

        // Show notice if the user checked for update
        if (manualCheck){

            manualCheck = false;

            electron.dialog.showMessageBox({
                type: 'info',
                buttons: ['Ok'],
                title: 'No update found',
                message: 'This is the latest version'
            });

        }
    });

    autoUpdater.on('error', function (error) {
        state = 'no-update';
        console.log('no update -error', error);
        exports.updateMenu();

        // Show notice if the user checked for update
        if (manualCheck) {

            manualCheck = false;

            electron.dialog.showMessageBox({
                type: 'error',
                buttons: ['Ok'],
                title: 'Error',
                message: 'Error while checking for update, try again later'
            });

        }
    });

    // Start the update check
    if (! skelectron.isDev) {
        autoUpdater.setFeedURL(feedUrl);
        autoUpdater.checkForUpdates();
    }
};

exports.getUpdateMenuItems = function () {
    // Skip for appstore builds
    if (process.mas) {
        return [];
    }

    const version = app.getVersion();

    return [
        {
            label: 'Checking for Update',
            enabled: false,
            key: 'checkingForUpdate'
        },
        {
            label: 'Downloading Update',
            enabled: false,
            visible: false,
            key: 'downloadingUpdate'
        },
        {
            label: 'Check for Update',
            visible: false,
            key: 'checkForUpdate',
            click: function () {

                manualCheck = true;

                // autoUpdater.setFeedURL('https://releases.venom-app.com/update/osx_x64/' + app.getVersion() + '/');
                autoUpdater.checkForUpdates();
            }
        }, {
            label: 'Restart and Install Update',
            enabled: true,
            visible: false,
            key: 'restartToUpdate',
            click: function () {
                autoUpdater.quitAndInstall()
            }
        }];
};

exports.updateMenu = function () {
    let menu = electron.Menu.getApplicationMenu();

    // Skip for appstore builds
    // or if there is no menu
    if (process.mas || ! menu) {
        return;
    }

    // apply update status to menu
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                switch (item.key) {
                    case 'checkForUpdate':
                        item.visible = (state === 'no-update');
                        break;
                    case 'checkingForUpdate':
                        item.visible = (state === 'checking');
                        break;
                    case 'downloadingUpdate':
                        item.visible = (state === 'downloading');
                        break;
                    case 'restartToUpdate':
                        item.visible = (state === 'installed');
                        break;
                }
            })
        }
    });
};
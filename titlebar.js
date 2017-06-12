const electron = require('electron');

if (typeof window.$ !== 'undefined') {
    $(function() {
        let titleBar = $('.title-bar');

        // Make titlebar draggable
        titleBar.css('-webkit-app-region', 'drag');

        // Double click on titlebar will minimize/maximize
        titleBar.dblclick(function() {
            let win = electron.remote.getCurrentWindow();

            if (win.isMaximized()) {
                win.unmaximize();
            } else {
                win.maximize();
            }
        });
    });
}
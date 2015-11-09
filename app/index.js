(function() {

  'use strict';

  var app = require('app');
  var BrowserWindow = require('browser-window');

  // report crashes to the Electron project
  require('crash-reporter').start();

  // adds debug features like hotkeys for triggering dev tools and reload
  require('electron-debug')();

  // initialize service finder module
  var ServiceFinder = require('node-servicefinder').ServiceFinder;

  // create main application window
  function createMainWindow() {

    var win = new BrowserWindow({
      width: 1280,
      height: 800,
      resizable: true
    });

    win.loadUrl('file://' + __dirname + '/main.html');
    win.on('closed', onClosed);

    return win;
  }

  function onClosed() {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
  }

  var handleStartupEvent = function() {

    if (process.platform !== 'win32') {
      return false;
    }

    var cp = require('child_process');
    var path = require('path');
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);

    var squirrelCommand = process.argv[1];
    switch (squirrelCommand) {
      case '--squirrel-install':
      case '--squirrel-updated':

        // Optionally do things such as:
        //
        // - Install desktop and start menu shortcuts
        // - Add your .exe to the PATH
        // - Write to the registry for things like file associations and
        //   explorer context menus

        // create shortcuts
        cp.spawnSync(updateDotExe, ["--createShortcut", target], {
          detached: true
        });

        // Always quit when done
        app.quit();
        return true;

      case '--squirrel-uninstall':
        // Undo anything you did in the --squirrel-install and
        // --squirrel-updated handlers

        cp.spawnSync(updateDotExe, ["--removeShortcut", target], {
          detached: true
        });

        // Always quit when done
        app.quit();
        return true;

      case '--squirrel-obsolete':
        // This is called on the outgoing version of your app before
        // we update to the new version - it's the opposite of
        // --squirrel-updated
        app.quit();
        return true;
    }
  };

  // check if we are being called by insaller routine
  if (handleStartupEvent()) {
    return;
  }

  // prevent window being GC'd
  var mainWindow;

  app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate-with-no-open-windows', function() {
    if (!mainWindow) {
      mainWindow = createMainWindow();
    }
  });

  app.on('ready', function() {
    mainWindow = createMainWindow();
  });

  var path = require('path');
  var os = require('os');

  const dataDir = app.getPath('userData') + path.sep;
  const cacheDir = app.getPath('userCache') + path.sep;
  const tempDir = app.getPath('temp') + path.sep;
  const homeDir = app.getPath('home') + path.sep;
  const hostname = os.hostname();
  const username = (process.platform === 'win32') ? process.env.USERNAME : process.env.USER;

  app.serviceFinder = function(serviceName, protocol, subTypes, includeLocal) {
    return new ServiceFinder(serviceName, protocol, subTypes, includeLocal);
  };

  app.sysConfig = function() {
    return {
      host: hostname,
      user: username,
      paths: {
        home: homeDir,
        temp: tempDir,
        data: dataDir,
        cache: cacheDir
      }
    };
  };

})();

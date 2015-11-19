'use strict';

const test = require('tape-async');
const electronLocalshortcut = require('..');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const Menu = electron.menu;

require('electron-debug')();

test('add details files', () => {
  app.on('ready', () => {
    const win = new BrowserWindow({});
    const win2 = new BrowserWindow({});

    electronLocalshortcut.register(win, 'Ctrl+A', () => {
      process.stdout.write('A\n');
    });

    electronLocalshortcut.register(win, 'Ctrl+B', () => {
      process.stdout.write('B\n');
    });


    electronLocalshortcut.register(win2, 'Ctrl+A', () => {
      process.stdout.write('A2\n');
    });

    electronLocalshortcut.register(win2, 'Ctrl+B', () => {
      process.stdout.write('B2\n');
    });

    electronLocalshortcut.register(win2, 'Ctrl+C', () => {
      process.stdout.write('C2\n');
    });

    const template = [{
      label: 'test',
      submenu: [
        {
          label: 'Unregister all shortcuts',
          click() {
            electronLocalshortcut.unregisterAll(win);
          }
        }
      ]
    }];

    win.setMenu(Menu.buildFromTemplate(template));
    win.loadUrl('about://blank');
    win.show();

    const template2 = [{
      label: 'test',
      submenu: [{
        label: 'Unregister C2',
        click() {
          electronLocalshortcut.unregister(win2, 'Ctrl+C');
        }
      }, {
        label: 'Register C2',
        click() {
          electronLocalshortcut.register(win2, 'Ctrl+C', () => {
            process.stdout.write('C2\n');
          });
        }
      }, {
        label: 'Disable shortcuts',
        click() {
          electronLocalshortcut.disableAll(win2);
        }
      }, {
        label: 'Enable shortcuts',
        click() {
          electronLocalshortcut.enableAll(win2);
        }
      }, {
        label: 'Check C2',
        click() {
          process.stdout.write(
            electronLocalshortcut.isRegistered(win2, 'Ctrl+C') + '\n'
          );
        }
      }]
    }, {
      label: 'test all window',
      submenu: [{
        label: 'Unregister ALL',
        click() {
          electronLocalshortcut.unregister('Alt+A');
        }
      }, {
        label: 'Unregister any ALL',
        click() {
          electronLocalshortcut.unregisterAll();
        }
      }, {
        label: 'Register ALL',
        click() {
          electronLocalshortcut.register('Alt+A', () => {
            process.stdout.write('ALL\n');
          });
        }
      }, {
        label: 'Check ALL',
        click() {
          process.stdout.write(
            electronLocalshortcut.isRegistered('Alt+A') + '\n'
          );
        }
      }]
    }];

    win2.setMenu(Menu.buildFromTemplate(template2));
    win2.loadUrl('about://blank');
    win2.show();
  });
});

test('exit electron', t => {
  // app.quit();
  t.ok(true);
});

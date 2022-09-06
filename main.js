// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const Store = require('electron-store');
const path = require("path");

const createWindow = (bounds) => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        x: bounds?.x,
        y: bounds?.y,
        width: bounds?.width ?? 245,
        height: 50,
        minHeight: 49,
        maxHeight: 51,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('index.html')
    return mainWindow;
}



app.whenReady().then(() => {

    const store = new Store();
    const bounds = store.get('bounds');
    const mainWindow = createWindow(bounds)

    const saveBounds = () => {
        store.set('bounds', mainWindow.getBounds());
    }

    mainWindow.on('moved', saveBounds);
    mainWindow.on('resized', saveBounds);
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const electron = require('electron'), { app } = electron

const new_window = () => {
    // electron.Menu.setApplicationMenu(null)    
    let mainWindow = new electron.BrowserWindow({
        width: 1000, height: 700, frame: false, transparent: true
    })
    mainWindow.on('closed', () => { mainWindow = null })
    // mainWindow.loadURL("https://wx.qq.com")
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    win_event(mainWindow)
}

const win_event = w => {
    w.webContents.on('new-window', (event, url, fname, disposition, options) => {
        event.preventDefault()
        let childWindow = new electron.BrowserWindow({
            width: 1220, height: 800, frame: true
        })
        childWindow.on('closed', () => { mainWindow = null })
        childWindow.loadURL(url)
        win_event(childWindow)
    })
}

app.on("ready", new_window)
app.on('window-all-closed', () => { app.quit() })
/*
{
    "name": "app",
    "version": "0.0.1",
    "main": "main.js",
    "scripts": {
        "start": "C:/electron/electron.exe .",
        "build": "electron-packager ./ --win --electron-version=1.7.10 --icon=app.ico"
    }
}
*/
const electron = require('electron')

const {app, BrowserWindow} = electron

app.allowRendererProcessReuse = false
app.on("ready", () => {
    let win = new BrowserWindow({
        width: 800, height: 480, webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.setMenu(null)
    win.setFullScreen(false)
    win.openDevTools()

    win.loadURL(`file://${__dirname}/index.html`)
})

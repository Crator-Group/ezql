require('dotenv').config()

const path = require('path')
const { app, BrowserWindow, shell, Menu, dialog } = require('electron')
const { checkForUpdates } = require('./utils/updater')

const isDev = !app.isPackaged

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
    //   nodeIntegration: true,
    // },
  })

  const menuTemplate = [
    {
      label: 'File',
      submenu: [{ role: 'quit' }],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Check For Updates...',
          click: checkForUpdates,
        },
        {
          label: 'About',
          click: async () => {
            dialog.showMessageBoxSync(mainWindow, {
              type: 'info',
              title: 'EZQL',
              message: `Version: ${app.getVersion()}`,
              buttons: ['Ok'],
            })
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  if (isDev) {
    // Load hot reloading application
    mainWindow.loadURL('http://localhost:3000')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    // Load static application
    mainWindow.loadFile(path.resolve(__dirname, '../build/index.html'))
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

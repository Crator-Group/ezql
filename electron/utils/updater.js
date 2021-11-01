const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

let updater
autoUpdater.autoDownload = false

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('Updater registered.')

autoUpdater.on('error', error => {
  dialog.showErrorBox(
    'Error: ',
    error == null ? 'unknown' : (error.stack || error).toString()
  )
})

autoUpdater.on('update-available', () => {
  dialog
    .showMessageBox({
      type: 'info',
      title: 'Found Updates',
      message: 'Found updates, do you want update now?',
      buttons: ['Yes', 'No'],
    })
    .then(({ response }) => {
      if (response === 0) {
        autoUpdater.downloadUpdate()
        log.info('Downloading update...')
      } else {
        log.info('Update Declined')
        updater.enabled = true
        updater = null
      }
    })
})

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.',
  })
  updater.enabled = true
  updater = null
})

autoUpdater.on('download-progress', progressObj => {
  let log_message = `Download speed: ${progressObj.bytesPerSecond}`
  log_message = `${log_message} - Downloaded ${progressObj.percent}%`
  log_message = `${log_message} (${progressObj.transferred}/${progressObj.total})`
  log.info(log_message)
})

autoUpdater.on('update-downloaded', () => {
  dialog
    .showMessageBox({
      title: 'Install Updates',
      message: 'Updates downloaded, application will be quit for update...',
    })
    .then(() => {
      setImmediate(() => autoUpdater.quitAndInstall())
    })
})

// export this to MenuItem click callback
function checkForUpdates(menuItem, focusedWindow, event) {
  updater = menuItem
  updater.enabled = false
  autoUpdater.checkForUpdates()
}

module.exports.checkForUpdates = checkForUpdates

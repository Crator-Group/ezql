const fs = require('fs')

function log(text) {
  const logFile = path.resolve(app.getPath('logs'), 'logs.txt')
  fs.writeFileSync(logFile, `${text}\n`, { flag: 'as+' })
}

module.exports = log

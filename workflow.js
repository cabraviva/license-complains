const { check } = require('./main.js')
const cwd = process.cwd()
const path = require('path')
const licenseComplainsRC = JSON.parse(fs.readFileSync(path.join(process.cwd(), '.licensecomplainsrc')).toString('utf-8'))

check(licenseComplainsRC, true, true, cwd)
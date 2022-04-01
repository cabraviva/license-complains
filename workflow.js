const { check } = require('./main.js')
const cwd = process.cwd()
const path = require('path')
const licenseComplainsRC = require(path.join(process.cwd(), '.licensecomplainsrc'))

check(licenseComplainsRC, true, true, cwd)
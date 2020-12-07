const config = require('../config')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

const token = md5(config.admin.password + config.admin.salt)

function downloadFiles (req, res) {


}

module.exports = downloadFiles

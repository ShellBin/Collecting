const config = require('../config')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

const token = md5(config.admin.password + config.admin.salt)

function downloadFiles (req, res) {
    if (req.cookies.token === token) {
        // todo 压缩并下载
        // res.download
    } else {
        res.send({
            status: 'ok',
            message: 'invalid credentials'
        })
    }

}

module.exports = downloadFiles

const config = require('../config')
const archiver = require('archiver')
const fs = require('fs')
const md5 = require('md5')

const token = md5(config.admin.password + config.admin.salt)

function downloadFiles (req, res) {
    if (req.cookies.token === token) {
        const zipStream  =fs.createWriteStream('pack.zip')
        const archive = archiver('zip', {
            store: true
        })
        archive.on('warning', () => {
            res.send({
                status: 'error',
                message: '压缩出错，请联系管理员'
            })
        })
        archive.pipe(zipStream)
        archive.directory(config.fs.path, false)

        archive.on('finish', () => {
            console.log('create download task')
            res.download('./pack.zip',function (err) {
                if(err){
                    console.error(err)
                }
            })
        })

        archive.finalize()
    } else {
        res.send({
            status: 'ok',
            message: 'invalid credentials'
        })
    }

}

module.exports = downloadFiles

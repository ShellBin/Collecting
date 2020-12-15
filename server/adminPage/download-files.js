const config = require('../config')
const archiver = require('archiver')
const fs = require('fs')
const md5 = require('md5')

const token = md5(config.admin.password + config.admin.salt)

function downloadFiles (req, res) {
    if (req.cookies.token === token) {
        const zipStream = fs.createWriteStream('pack.zip')
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

        // 没有办法通过异步或回调正常跟踪压缩进度。使用时总会使未完成的文件损坏
        // 所以做了 200ms 的延时来完成正常的下载

        // archive.finalize().then(creatStream())

        archive.on('end', () => setTimeout(() => {
            creatStream()
        }, 200))

        archive.finalize()

        function creatStream() {
            console.log('create download stream')
            res.download('./pack.zip',(err) => {
                if(err){
                    console.error(err)
                }
            })
        }
    } else {
        res.send({
            status: 'ok',
            message: 'invalid credentials'
        })
    }

}

module.exports = downloadFiles

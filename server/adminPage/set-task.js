const config = require('../config')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

const deleteFiles = require('./delete-files')

const token = md5(config.admin.password + config.admin.salt)

function setTask (req, res) {
    // 访问合法性判断
    if (req.cookies.token === token) {
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))
        // POST 判空
        if (req.body.titleName !== '' && req.body.namingRules !== '') {
            const newString = req.body.namingRules
            // 姓名、学号、身份证号、任务名 必须有一项
            if((newString.indexOf('姓名') + newString.indexOf('学号') + newString.indexOf('身份证号') + newString.indexOf('任务名')) !== -1) {
                data.namingRules = req.body.namingRules
                data.titleName = req.body.titleName
                data.haveAnyTask = Boolean(req.body.haveAnyTask)
                if (Boolean(req.body.deleteFiles)) {
                    deleteFiles()
                    data.haveAnyTask = false
                } else {
                    fs.writeFile(path.resolve(__dirname,"../data.json"), JSON.stringify(data), function (err){
                        if(err) {
                            console.error(err)
                        }
                    })
                }
                res.send({
                    status: 'success'
                })
            } else {
                res.send({
                    status: 'error',
                    message: 'invalid namingRules'
                })
            }
        } else {
            res.send({
                status: 'error',
                message: 'empty'
            })
        }
    } else {
        res.send({
            status: 'ok',
            message: 'invalid credentials'
        })
    }
}

module.exports = setTask

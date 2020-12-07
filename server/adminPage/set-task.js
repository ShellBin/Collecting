const config = require('../config')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

const token = md5(config.admin.password + config.admin.salt)

function setTask (req, res) {
    if (req.cookies.token === token) {
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))

        if (req.body.titleName !== '' && req.body.namingRules !== '') {
            // 修改 titleName
            data.titleName = req.body.titleName
            // 修改 namingRules
            data.namingRules = req.body.namingRules
        }
        // 写回信息
        fs.writeFile('data.json', JSON.stringify(data), function (err){
            if(err) {
                console.error(err)
            }
        })

        res.send({
            status: 'success',
        })
    } else {
        res.send({
            status: 'ok',
            message: 'invalid credentials'
        })
    }
}

module.exports = setTask

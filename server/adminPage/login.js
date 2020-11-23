const config = require('../config')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

function login (req, res) {
    token = md5(config.admin.password + config.admin.salt)

    if (req.body.pw === config.admin.password || req.cookie.token === token) {
        console.log('user "' + req.connection.remoteAddress + '" login')
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))

        let nameArray = []
        for (key in data.stuInfo) {
            if(data.stuInfo[key].haveUpload === false) {
                nameArray.push(data.stuInfo[key].stuName)
            }
        }

        res.cookie('token',token)
        res.send({
            status: 'success',
            titleName: data.titleName,
            nameList: nameArray
        })
    } else {
        res.send({
            status: 'ok',
            message: 'invalid password'
        })
    }
}

module.exports = login

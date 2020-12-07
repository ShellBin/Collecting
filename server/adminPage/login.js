const config = require('../config')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

const token = md5(config.admin.password + config.admin.salt)

function login (req, res) {
    if (req.body.pw === config.admin.password || req.cookies.token === token) {
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))

        let nameArray = []
        for (key in data.stuInfo) {
            if(data.stuInfo[key].haveUpload === false) {
                nameArray.push(data.stuInfo[key].stuName)
            }
        }

        res.cookie('token',token,{maxAge:500000})
        res.send({
            status: 'success',
            titleName: data.titleName,
            namingRules: data.namingRules,
            nameList: nameArray
        })
    } else {
        res.send({
            status: 'ok',
            message: 'invalid credentials'
        })
    }
}

module.exports = login

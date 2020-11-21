const config = require('../config')
const fs = require('fs')
const path = require("path");

let stuName = ''
let idCard = ''
let fullStuId = ''

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))

function indexStuInfo(stuId) {
    const stuData = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8')).stuInfo
    if (stuId in stuData) {
        stuName = stuData[stuId].stuName
        idCard = stuData[stuId].idCard
        fullStuId = stuData[stuId].fullStuId
        return true
    } else return false
}

function uploadFile (req, res) {
    if (indexStuInfo(req.headers.stuid)) {
        console.log(`${stuName} (${req.connection.remoteAddress}) uploaded ${req.file.originalname}`)

        // 姓名 学号 身份证号
        const naming = data.namingRules.replace(/姓名/g,stuName).replace(/身份证号/g, idCard).replace(/学号/g, fullStuId)
        const newName = `${naming}` + '.' + req.file.originalname.split('.').pop()
        fs.renameSync(req.file.path, config.fs.path + newName)

        res.send({
            status: 'success',
            finalFileName: newName
        })
    } else {
        res.status(403).send({
            status: 'error',
            message: '用户不存在'
        })
    }
}

module.exports = uploadFile

const config = require('../config')
const fs = require('fs')
const path = require("path");

let stuName = ''
let idCard = ''
let fullStuId = ''

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
    if (indexStuInfo(req.headers.stuid) && Boolean(req.file)) {
        console.log(`${stuName} uploaded ${req.file.originalname}`)

        // 姓名 学号 身份证号 任务名
        const stuData = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))
        const naming = stuData.namingRules.replace(/姓名/g,stuName).replace(/身份证号/g, idCard).replace(/学号/g, fullStuId).replace(/任务名/g, stuData.titleName).replace(/班级/g, config.info.className)
        const newName = `${naming}` + '.' +req.file.originalname.split('.').pop()

        if (stuData.namingRules.indexOf('姓名') + stuData.namingRules.indexOf('学号') + stuData.namingRules.indexOf('身份证号') === -3) {
            fs.renameSync(req.file.path, config.fs.path + req.headers.stuid + newName)
        } else {
            fs.renameSync(req.file.path, config.fs.path + newName)
        }

        stuData.stuInfo[req.headers.stuid].haveUpload = true

        fs.writeFile(path.resolve(__dirname,"../data.json"), JSON.stringify(stuData), function (err){
            if(err) {
                console.error(err)
            }
        })

        res.send({
            status: 'success',
            finalFileName: newName
        })
    } else {
        fs.unlinkSync(req.file.path)
        res.status(403).send({
            status: 'error',
            message: '用户不存在/文件不合法'
        })
    }
}

module.exports = uploadFile

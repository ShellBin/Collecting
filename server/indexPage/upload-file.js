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
    if (indexStuInfo(req.headers.stuid)) {
        res.send({
            status: 'success',
            stuName: stuName,
            idCard: idCard,
            fullStuId: fullStuId,
            // TODO: 通过不同的 Params 分支处理。先查看是否是合法用户，返回 success 拉起上传开始
            // TODO: 文件上传处理（判断大小，接受上传到指定文件夹并重命名），将学号后三位放在 header 里
        })
    } else {
        res.status(403).send({
            status: 'error',
        })
    }
}

module.exports = uploadFile

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

function packingRename() {
    // TODO: 如果是单个文件，则重命名。如果是多个文件则压缩后重命名
}

function uploadFile (req, res) {
    if (indexStuInfo(req.headers.stuid)) {
        packingRename()
        res.send({
            status: 'success',
            // TODO: 文件上传处理（判断大小，接受上传到指定文件夹并重命名）
        })
    } else {
        res.status(403).send({
            status: 'error',
            message: '用户不存在'
        })
    }
}

module.exports = uploadFile

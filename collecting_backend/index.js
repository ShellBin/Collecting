const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const multer = require('multer')
const cookieParser = require('cookie-parser')

const config = require('./config')
const publicAPI = require('./controller/public')

const server = express()
const router = express.Router()
const upload = multer({ dest: `${__dirname}/static/uploads-temp/` })

// 文件上传目录
fs.stat(`${__dirname}/static/uploads/`, (err, stats) => {
    if (err) {
        fs.mkdirSync(`${__dirname}/static/uploads/`)
    }
})

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cookieParser())

server.listen(config.port)
server.use('/api/',router)
server.use("/",express.static("./static"));

// API: 获取当前的服务器状态
router.get('/serverStatus',publicAPI.serverStatus)
// API：通过学号或 ID 查询有什么任务可以上交
router.post('/uploadFile',publicAPI.checkTask)

// // API: 处理上传的文件
// router.post('/uploadFile',upload.single('file'),indexPage.uploadFile)
// // API: 处理登录操作
// router.post('/login',adminPage.login)
// // API: 信息修改操作
// router.post('/setTask',adminPage.setTask)
// // API: 文件下载操作
// router.get('/downloadFiles',adminPage.downloadFiles)

console.log('Server is running at '+config.port+' port')

const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cookieParser = require('cookie-parser')

const config = require('./config')
const indexPage = require('./indexPage')
const adminPage = require('./adminPage')

const server = express()
const router = express.Router()
const upload = multer({dest: './uploads-temp/'})

// todo 初始化下载文件夹 uploads

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cookieParser())

server.listen(config.http.port)
server.use('/api/v1/',router)
server.use("/static",express.static("./public"));

// API: 获取当前的收集任务
router.get('/fetchTask',indexPage.fetchTask)
// API: 处理上传的文件
router.post('/uploadFile',upload.single('file'),indexPage.uploadFile)
// API: 处理登录操作
router.post('/login',adminPage.login)
// API: 信息修改操作
router.post('/setTask',adminPage.setTask)
// API: 文件下载操作
// router.get('/downloadFiles',adminPage.downloadFiles)

console.log('Server is running at '+config.http.port+' port, hostname/api/v1/')

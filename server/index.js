const express = require('express')

const config = require('./config')
const indexPage = require('./indexPage')

let server = express()

server.listen(config.http.port)
let router = express.Router()

server.use('/api/v1/',router)

// API: 获取当前的收集任务
router.get('/fetchTask',indexPage.fetchTask)
// API: 处理上传的文件
// router.get('/uploadFile',indexPage.uploadFile)

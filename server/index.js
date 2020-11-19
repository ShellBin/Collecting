const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const config = require('./config')
const indexPage = require('./indexPage')

const server = express()
const router = express.Router()
const upload = multer({dest: './uploads/'})

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(upload.any())

server.listen(config.http.port)

server.use('/api/v1/',router)

// API: 获取当前的收集任务
router.get('/fetchTask',indexPage.fetchTask)
// API: 处理上传的文件
router.post('/uploadFile',indexPage.uploadFile)

console.log('Server is running at '+config.http.port+' port')

const config = require('../config')
const fs = require('fs')
const path = require('path')

function setTask (req, res) {
    if(req.cookies.token === token) {
        const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))
        // 修改 titleName
    } else {

    }
}

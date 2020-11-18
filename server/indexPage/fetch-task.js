const  config = require('../config')
const fs = require('fs')

function fetchTask (req, res) {
    const data = fs.readFileSync('../data.json')

    res.send({
        status: 'ok',
        haveAnyTask: data.haveAnyTask,
        titleName: data.titleName,
        className: config.info.className,
    })
}

// TODO: 应在每次访问时都重新读取 json (readfilesync)

module.exports = fetchTask

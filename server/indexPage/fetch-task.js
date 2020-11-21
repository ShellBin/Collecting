const config = require('../config')
const fs = require('fs')
const path = require('path')

function fetchTask (req, res) {
    console.log('user "' + req.connection.remoteAddress + '" Fetching a task now')

    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))

    res.send({
        status: 'ok',
        haveAnyTask: data.haveAnyTask,
        titleName: data.titleName,
        className: config.info.className,
    })
}

module.exports = fetchTask

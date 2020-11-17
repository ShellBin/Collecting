const  config = require('../config')

function fetchTask (req, res) {
    const data = require('../data.json')

    res.send({
        status: 'ok',
        haveAnyTask: data.haveAnyTask,
        titleName: data.titleName,
        className: config.info.className,
    })
}

// TODO: 应在每次访问时都重新读取 json (readfilesync)

module.exports = fetchTask

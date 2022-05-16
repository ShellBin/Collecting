const os = require('os')

function serverStatus (req, res) {
    const freeMem = `${(os.freemem()/1024/1024).toFixed(1)} MiB`
    const totalMem = `${(os.totalmem()/1024/1024).toFixed(1)} MiB`

    res.send({
        status: 'ok',
        freeMem: freeMem,
        totalMem: totalMem,
    })
}

module.exports = serverStatus

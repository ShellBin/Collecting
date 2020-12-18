const fs = require('fs')
const xlsx = require('node-xlsx')

function xlsx2data() {
    fs.access('./list.xlsx', fs.constants.F_OK,(err, stats) => {
        if (err) {
            console.log('使用上次的名单设置')
            return 0
        } else {
            process()
        }
    })
}

function process() {
    const data = JSON.parse(fs.readFileSync('./data.json'), 'utf-8')
    delete data.stuInfo
    data.stuInfo = {}

    const list = xlsx.parse('./list.xlsx')[0].data

    list.forEach((i) => {
        if(i[0]) {
            const key = i[0].slice(-3)
            data.stuInfo[key] = {}

            data.stuInfo[key].stuName = i[1]
            data.stuInfo[key].idCard = i[2]
            data.stuInfo[key].fullStuId = i[0]
            data.stuInfo[key].haveUpload = false
            console.log(i[1] + '同学（学号前三位'  + key + '） 信息已添加')
        }
    })

    fs.writeFileSync('./data.json', JSON.stringify(data))

    fs.unlinkSync('./list.xlsx')
    console.log('新名单已成功添加')
}

module.exports = xlsx2data
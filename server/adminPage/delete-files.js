const config = require('../config')
const fs = require('fs')
const path = require('path')

function delAllFiles(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delAllFiles(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        // fs.rmdirSync(path);
        // 删除根目录自身
    }
}

function deleteFiles() {
    console.log('DELETE FILE AND TASK')
    let data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), 'utf-8'))
    for (key in data.stuInfo) {
        data.stuInfo[key].haveUpload = false
    }
    // todo 改好的 json 存不进去？
    fs.writeFileSync(path.resolve(__dirname,"../data.json"), JSON.stringify(data))

    // 删除收集目录下所有文件
    delAllFiles(config.fs.path)
    // 删除所有传输临时文件
    delAllFiles('./uploads-temp/')
}

module.exports = deleteFiles

const config = require('../config')
const fs = require('fs')

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
    // 删除收集目录下所有文件
    delAllFiles(config.fs.path)
    // 删除所有传输临时文件
    delAllFiles('./uploads-temp/')
    // 删除上次生成的压缩包
    fs.unlink('pack.zip',(err => {
        if (err) {
            console.log('此前未创建过下载')
        }
    }))
}

module.exports = deleteFiles

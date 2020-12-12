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
    const stuData = JSON.parse(fs.readFileSync("data.json", 'utf-8'))
    for (let key in stuData.stuInfo) {
        stuData.stuInfo[key].haveUpload = false
    }
    console.log(JSON.stringify(stuData))
    fs.writeFile("data.json", JSON.stringify(stuData), function (err){
        if(err) {
            console.error(err)
        }
    })

    // 删除收集目录下所有文件
    delAllFiles(config.fs.path)
    // 删除所有传输临时文件
    delAllFiles('./uploads-temp/')
}

module.exports = deleteFiles

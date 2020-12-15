module.exports = {
    http: {
        port: 8001,
        // 默认运行在 8001 端口，视情况修改
    },
    fs: {
        path: './uploads/'
        // 上传目录位置，不建议更改，反正没人在乎
    },
    admin: {
        password: 'password',
        salt:'cf1bf73cfeb17628a56a24218c1ab8ac'
        // 安全起见，请自行配置密码和一个新的盐
    },
    info: {
        className: '某校某系某班'
        // 并不起眼的一行字，写上班级名称就好了
    }
}

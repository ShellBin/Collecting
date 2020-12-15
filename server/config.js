module.exports = {
    http: {
        port: 8001,
    },
    fs: {
        path: './uploads/'
    },
    admin: {
        password: 'password',
        salt:'cf1bf73cfeb17628a56a24218c1ab8ac'
        //安全起见，请自行配置密码和一个新的盐
    },
    info: {
        className: '某校某系某班'
    }
}

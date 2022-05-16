const sqlite3 = require('sqlite3')
const path = require('path')
const databaseFile = path.join(__dirname, 'data.db')

const db = new sqlite3.Database(databaseFile, err => {
    if (err) throw(err)
})


const detail = [{
    name: '"ShellBin"',
    password: '"12345678"',
    className: '"Self"'
}, {
    name: '"Test"',
    password: '"87654321',
    className: '"TestClass"'
}]

// 插入多条记录，detail 使用数组内的键值对表示
function insertMany(table, detail) {
    for (let item of detail) {
        const columns = Object.keys(item)
        const values = []
        for (let i of columns) {
            values.push(item[i])
        }
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${values});`
        db.run(sql, (err) => { if (err) throw(err) })
    }
    db.close(err => { if (err) throw(err) })
}

// 删除多条记录，使用数组表示要删除的 indexId
function deleteOne(table, indexId) {
    const sql = `DELETE FROM ${table} WHERE id = ${indexId};`
    db.run(sql, (err) => { if (err) throw(err) })
    db.close(err => { if (err) throw(err) })
}

// 修改一条记录
function updateOne(){

}

// insertOne('admin',detail)

// module.exports = { insertOne, }

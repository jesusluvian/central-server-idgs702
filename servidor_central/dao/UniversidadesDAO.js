

const conn = require('./../database/MySQLConnection');

exports.login = async function (usr, pass) {
    let sql = 'SELECT * FROM universidad WHERE universidad_id = ? AND password = ?';
    return await conn.getOne(sql, [usr, pass]);
}

exports.getById = async function (universidad_id) {
    let sql = 'SELECT * FROM universidad WHERE universidad_id = ?';
    return await conn.getOne(sql, [universidad_id]);
}

exports.update = async function (datos) {
    let sql = 'UPDATE universidad SET password = ?, nombre_universidad = ?, url_recuperacion_libro = ?, grupo = ?, metodo = ? WHERE universidad_id = ?';
    return await conn.getOne(sql, [datos.password, datos.nombre_universidad, datos.url_recuperacion_libro, datos.grupo, datos.metodo, datos.universidad_id]);
}
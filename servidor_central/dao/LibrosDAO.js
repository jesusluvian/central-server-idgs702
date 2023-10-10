

const conn = require('./../database/MySQLConnection');

exports.login = async function (usr, pass) {
    let sql = 'SELECT * FROM libros WHERE universidad_id = ? AND password = ?';
    return await conn.getOne(sql, [usr, pass]);
}

exports.getById = async function (universidad_id, libro_id) {
    let sql = 'SELECT * FROM libros WHERE universidad_id = ? AND universidad_libro_id = ?';
    return await conn.getOne(sql, [universidad_id, libro_id]);
}

exports.getByIdUrl = async function (universidad_id, libro_id) {
    let sql = 'SELECT libros.*,universidad.url_recuperacion_libro, universidad.metodo FROM libros JOIN universidad ON libros.universidad_id = universidad.universidad_id WHERE libros.universidad_id = ? AND libros.universidad_libro_id = ?';
    return await conn.getOne(sql, [universidad_id, libro_id]);
}

exports.insert = async function (datos) {
    let sql = 'INSERT INTO libros (universidad_id,universidad_libro_id,libro_nombre,tema) VALUES (?,?,?,?)';
    return await conn.getOne(sql, [datos.universidad_id, datos.libro_id, datos.libro_nombre, datos.tema]);
}

exports.update = async function (datos) {
    let sql = 'UPDATE libros SET libro_nombre = ?,tema = ? WHERE universidad_id = ? AND universidad_libro_id = ?';
    return await conn.getOne(sql, [datos.libro_nombre, datos.tema, datos.universidad_id, datos.libro_id]);
}

exports.buscarLibro = async function (filtro_busqueda) {
    filtro_busqueda = filtro_busqueda ? '%' + filtro_busqueda + '%' : "";
    let sql = 'SELECT libros.*,universidad.nombre_universidad FROM libros JOIN universidad ON libros.universidad_id = universidad.universidad_id';
    let parametros = [];
    if (filtro_busqueda) {
        sql += ` WHERE libros.libro_nombre like ? OR libros.tema like ?`;
        parametros.push(filtro_busqueda, filtro_busqueda);
    }
    return await conn.getAll(sql, parametros);
}


const _UniversidadesDAO = require('../dao/UniversidadesDAO');
const _UniversidadesCommands = require('../cqrs/UniversidadesCommands');
const _UtilJWT = require('../utils/UtilJWT');



exports.generarToken = async function (datos) {

    if (!datos.usuario) return { error: 'Es obligatorio indicar el usuario' }
    if (!datos.contrasena) return { error: 'Es obligatorio indicar la contraseña' }
    if (`${datos.usuario}`.length > 20) return { error: 'El usuario debe tener un máximo de 20 caracteres' }
    if (`${datos.contrasena}`.length > 50) return { error: 'La contraseña debe tener un máximo de 50 caracteres' }

    let existe = await _UniversidadesDAO.login(datos.usuario, datos.contrasena);
    if (!existe) {
        return { error: 'Los accesos son incorrectos' };
    }
    let tokenJWT = _UtilJWT.generarToken({ universidad_id: existe.universidad_id, nombre: existe.nombre_universidad, grupo: existe.grupo });
    return tokenJWT;
}

exports.getById = async function (universidad_id) {
    let existente = await _UniversidadesDAO.getById(universidad_id);
    if (existente) delete existente.password;
    return existente;
}

exports.updatePerfil = async function (datos) {
    return await _UniversidadesCommands.updatePerfil(datos);
}
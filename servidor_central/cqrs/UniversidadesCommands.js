const _UniversidadesDAO = require('../dao/UniversidadesDAO');


exports.updatePerfil = async function (datos) {

    if(datos.nueva_contrasena == 'string') datos.nueva_contrasena = '';

    if (!datos.nombre_universidad) return { error: 'Es necesario indicar el nombre de la universidad' }
    if (!datos.grupo) return { error: 'Es necesario indicar el grupo al que perteneces' }
    if (!datos.url_recuperacion_libro) return { error: 'Es necesario indicar la url de recuperación del libro' }
    if (`${datos.nombre_universidad}`.length > 50) return { error: 'El nombre de la universidad no debe pasar de 100 caracteres' }
    if (`${datos.grupo}`.length > 50) return { error: 'El nombre del grupo no debe pasar de 50 caracteres' }
    if (datos.nueva_contrasena & `${datos.nueva_contrasena}`.length > 50) return { error: 'La contraseña no debe pasar de 50 caracteres' }


    let existente = await _UniversidadesDAO.getById(datos.universidad_id);
    if (datos.nueva_contrasena && datos.nueva_contrasena != 'string') existente.nueva_contrasena = datos.nueva_contrasena;
    if (datos.nombre_universidad && datos.nombre_universidad != 'string') existente.nombre_universidad = datos.nombre_universidad;
    if (datos.url_recuperacion_libro && datos.url_recuperacion_libro != 'string') existente.url_recuperacion_libro = datos.url_recuperacion_libro;
    if (datos.grupo && datos.grupo != 'string') existente.grupo = datos.grupo;
    if (datos.metodo && datos.metodo != 'string') existente.metodo = datos.metodo;

    await _UniversidadesDAO.update(existente);

    let actualizado = await _UniversidadesDAO.getById(datos.universidad_id);
    if (actualizado) delete actualizado.password;
    return actualizado;
}


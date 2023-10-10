const _LibrosDAO = require('../dao/LibrosDAO');


exports.update = async function (datos) {

    if (!datos.universidad_id) return { error: 'Es necesario indicar la clave de la universidad' }
    if (!datos.libro_id) return { error: 'Es necesario indicar el identificador del libro' }
    if (!datos.libro_nombre) return { error: 'Es necesario indicar el nombre del libro' }
    if (!datos.tema) return { error: 'Es necesario indicar el tema del libro' }
    if (`${datos.universidad_id}`.length > 20) return { error: 'El identificador de la universidad no debe pasar de 20 caracteres' }
    if (`${datos.libro_id}`.length > 30) return { error: 'El identificador del libro no debe pasar de 50 caracteres' }
    if (`${datos.libro_nombre}`.length > 200) return { error: 'El nombre del libro no debe pasar de 200 caracteres' }
    if (`${datos.tema}`.length > 200) return { error: 'El tema del libro no debe pasar de 200 caracteres' }

    
    let existente = await _LibrosDAO.getById(datos.universidad_id, datos.libro_id);
    if (existente) {
        existente = await _LibrosDAO.update(datos);
    } else {
        existente = await _LibrosDAO.insert(datos);
    }

    existente = await _LibrosDAO.getById(datos.universidad_id, datos.libro_id);
    return existente;
}


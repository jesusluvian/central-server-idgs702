const _LibrosDAO = require('../dao/LibrosDAO');
const _LibrosCommands = require('../cqrs/LibrosCommands');

exports.getById = async function (universidad_id) {
    let existente = await _UniversidadesDAO.getById(universidad_id);
    if (existente) delete existente.password;
    return existente;
}

exports.update = async function (datos) {
    return await _LibrosCommands.update(datos);
}

exports.buscarLibro = async function (filtro) {
    return await _LibrosDAO.buscarLibro(filtro);
}

exports.getLibroDetail = async function (filtros) {

    if (!filtros.universidad_id) return { error: ' Es necesario proporcionar el identificador de la universidad' }
    if (!filtros.universidad_libro_id) return { error: ' Es necesario proporcionar el identificador de del libro' }

    let libroDetail = await _LibrosDAO.getByIdUrl(filtros.universidad_id, filtros.universidad_libro_id);
    if (!libroDetail) return { error: 'El libro solicitado no existe' };

    return libroDetail;
}
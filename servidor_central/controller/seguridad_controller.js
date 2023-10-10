const _UniversidadesAppService = require('../ddd/UniversidadesAppService');
const _UtilJWT = require('../utils/UtilJWT');

exports.generar = async function (req, res) {
    console.log('Consulta a seguridad_controller.generar');
    let resultado = await _UniversidadesAppService.generarToken(req.body);
    if (!resultado || resultado.error) return res.status(402).json(resultado);
    return res.status(200).json(resultado);
}


exports.getPerfil = async function (req, res) {
    console.log('Consulta a seguridad_controller.getPerfil');
    let datosToken = _UtilJWT.verificarToken(req);
    if (!datosToken) return res.status(401).json({ error: 'Token inválido o expirado' });
    let existente = await _UniversidadesAppService.getById(datosToken.universidad_id);
    return res.status(200).json(existente);
}

exports.actualizarPerfil = async function (req, res) {
    console.log('Consulta a seguridad_controller.actualizarPerfil');
    let datosToken = _UtilJWT.verificarToken(req);
    if (!datosToken) return res.status(401).json({ error: 'Token inválido o expirado' });

    let data = req.body;
    data.universidad_id = datosToken.universidad_id;
    data.metodo = `${data.metodo}`.trim().toLowerCase();
    data.metodo = data.metodo == 'get' ? 'get' : 'post';


    var resultado = await _UniversidadesAppService.updatePerfil(data);
    if(!resultado || resultado.error) return res.status(402).json(resultado);
    return res.status(200).json(resultado);
}

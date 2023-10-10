const _LibrosAppService = require('../ddd/LibrosAppService');
// const _LibroExternoApiService = require('../apiservice/LibroExternoApiService');
const _LibrosDAO = require('../dao/LibrosDAO');
const _UtilJWT = require('../utils/UtilJWT');
const axios = require('axios');

exports.registrar = async function (req, res) {
    console.log('Consulta a libros_controller.registrar');
    let datosToken = _UtilJWT.verificarToken(req);
    let data = req.body;
    if (!datosToken) return res.status(401).json({ error: 'Token inválido o expirado' });
    // console.log(`Petición de ${datosToken.nombre}`);

    data.universidad_id = datosToken.universidad_id;

    let resultado = await _LibrosAppService.update(data);
    if (!resultado || resultado.error) return res.status(402).json(resultado);
    return res.json(resultado);
}

exports.buscarLibro = async function (req, res) {
    console.log('Consulta a libros_controller.buscarLibro');
    let datosToken = _UtilJWT.verificarToken(req);
    if (!datosToken) return res.status(401).json({ error: 'Token inválido o expirado' });

    let libros = await _LibrosAppService.buscarLibro(req.body.filtro);
    return res.status(200).json(libros);
}

exports.recuperarLibro = async function (req, res) {
    console.log('Consulta a libros_controller.recuperarLibro');
    let datosToken = _UtilJWT.verificarToken(req);
    let data = req.body;
    if (!datosToken) return res.status(401).json({ error: 'Token inválido o expirado' });
    // console.log(`Petición de ${datosToken.nombre}`);

    let libroDetail = await _LibrosAppService.getLibroDetail(data);
    if (!libroDetail || libroDetail.error) return res.status(402).json(libroDetail);

    console.log("Recuperando libro desde " + libroDetail.url_recuperacion_libro + ' con universidad_libro_id ' + libroDetail.universidad_libro_id);
    
    let libroBas64 = null;

    if(libroDetail.metodo == 'get'){

        libroBas64 = await axios.get(libroDetail.url_recuperacion_libro, 
            {
                params: {
                    universidad_libro_id: libroDetail.universidad_libro_id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(respuesta => {

            // console.log('Retornado como exitoso');
            // console.log(respuesta.data);
            return respuesta.data;
    
        }).catch(err => {
            let error = { url_llamada: libroDetail.url_recuperacion_libro};
              if(err.response && err.response.data){
                error.data = err.response.data;
              }
              if(err.message){
                error.message = err.message;
              }
              return error;
        });


    } else {

        libroBas64 = await axios.post(libroDetail.url_recuperacion_libro, 
            { 
                universidad_libro_id: libroDetail.universidad_libro_id 
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(respuesta => {
    
            console.log('Libro recuperado exitosamente');
            // console.log(respuesta.data);
            return respuesta.data;
    
        }).catch(err => {
            let error = { url_llamada: libroDetail.url_recuperacion_libro};
              if(err.response && err.response.data){
                error.data = err.response.data;
              }
              if(err.message){
                error.message = err.message;
              }
              return error;
        });
    

    }

    

    // console.log(libroBas64);
    if (!libroBas64 || libroBas64.error) {
        return res.status(200).json("Petición hacia " + libroDetail.url_recuperacion_libro);
    }

    return res.status(200).json({
        nombre_universidad: libroDetail.nombre_universidad,
        libro_nombre: libroDetail.libro_nombre,
        libro_base64: libroBas64,
        tema: libroDetail.tema,
    });
}

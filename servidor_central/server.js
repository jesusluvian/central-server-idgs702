const express = require('express');
const app = express();
const fs = require('fs');

const port = 8080;
// const ip = '192.168.1.85';
const ip = '192.168.43.39';

// CONEXIÓN CON LA BASE DE DATOS
const _BDDAO = require('./dao/BDDAO');
const _dbConn = require('./database/MySQLConnection');
global.mysqlConnection = {
    host: 'localhost',
    database: 'biblioteca_universal',
    user: 'root',
    password: '',
    port: 3306
};
_dbConn.getInstance_MYSQL();

// Ejecutar la creación de la BD
_BDDAO.iniciarBd();


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors({ 'Access-Control-Allow-Origin': '*' }));


// Documentación
const swaggerJsdoc = require("swagger-jsdoc"), swaggerUi = require("swagger-ui-express");
const swagger_config = require('./config/swagger_config');
const specs = swaggerJsdoc(swagger_config.config(ip, port));
app.use("/documentacion", swaggerUi.serve, swaggerUi.setup(specs));


const seguridad_controller = require('./controller/seguridad_controller');
app.post('/api/token', seguridad_controller.generar);
app.get('/api/perfil', seguridad_controller.getPerfil);
app.post('/api/actualizar-perfil', seguridad_controller.actualizarPerfil);

const libros_controller = require('./controller/libros_controller');
app.post('/api/registrar-libro', libros_controller.registrar);
app.post('/api/recuperar-libro', libros_controller.recuperarLibro);
app.post('/api/buscar-libro', libros_controller.buscarLibro);


/**
 * Método para retornar el libro indicado como ejemplo de cómo deberían devolverlo los alumnos. Recupera el libro de la carpeta "pdf"
 */
app.post('/api/recuperar-libro-universal', async function (req, res) {
    if (!req.body.universidad_libro_id) {
        return res.status(402).json({ error: 'No se proporcionó el identificador del libro' });
    }
    const pathPdf = `pdf/${req.body.universidad_libro_id}.pdf`;

    if (fs.existsSync(pathPdf)) {
        const contents = fs.readFileSync(pathPdf, { encoding: 'base64' });
        return res.status(200).json(contents);

    } else {
        return res.status(402).json({ error: `No se logró localizar el archivo ${pathPdf}` });
    }

});



app.listen(port, () => {
    console.log(`Servidor central corriendo en puerto ${port}`)
})


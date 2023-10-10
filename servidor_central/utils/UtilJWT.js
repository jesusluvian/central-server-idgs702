const jwt = require('jsonwebtoken');
let llaveEncriptacion = 'utl';
let segundosVigencia = 60 * 60;


exports.generarToken = function (datos) {
    return jwt.sign(datos, llaveEncriptacion, { expiresIn: segundosVigencia });
}


exports.verificarToken = function (req) {

    let tokenJWT = req.headers.authorization;
    if (!tokenJWT) tokenJWT = req.headers.Authorization;
    if (!tokenJWT) return null;

    tokenJWT = tokenJWT.replace('Bearer ', '');

    return jwt.verify(tokenJWT, llaveEncriptacion, (err, datos) => {
        console.log(err);
        if (err) {
            return null;
        }
        return datos;
    })
}
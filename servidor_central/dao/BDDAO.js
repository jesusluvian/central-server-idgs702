

const conn = require('./../database/MySQLConnection');


exports.iniciarBd = function () {
 
    let alumnosGrupo703 = [
        '21000160',
        '17001472',
        '21000008',
        '21000012',
        '21000029',
        '21000035',
        '21000384',
        '21000302',
        '21000027',
        '20001568',
        '20001430',
        '20000810',
        '21000435',
        '21000448',
        '21000390',
        '20001564',
        '21000406',
        '20002183',
        '20001426',
        '21000405',
        '21000011',
        '21000165',
        '21000006',
        '21000300',
    ]
 
    for(let i = 0;i<alumnosGrupo703.length; i++){
        let parametros = [alumnosGrupo703[i],alumnosGrupo703[i],alumnosGrupo703[i],alumnosGrupo703[i],alumnosGrupo703[i]]
        // conn.executeCommand('REPLACE INTO universidad (universidad_id, password, nombre_universidad, url_recuperacion_libro,grupo) VALUES (?,?,?,?,?)',parametros)
    }
 
}
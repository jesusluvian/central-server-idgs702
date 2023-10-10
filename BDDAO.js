

const conn = require('./../database/MySQLConnection');


exports.iniciarBd = function () {


    let alumnosGrupo702 = [
'21000149',
'21000485',
'20001570',
'20001675',
'21002103',
'21002096',
'21000010',
'19002628',
'21002392',
'21000455',
'21000036',
'21000151',
'20002241',
'21000388',
'18002135',
'21000005',
'21000459',
'21000445',
'20001516',
'21000370',
'21000115',
'17001718',
'18002180',
    ]


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
 
    for(let i = 0;i<alumnosGrupo702.length; i++){
        let parametros = [alumnosGrupo702[i],alumnosGrupo702[i],alumnosGrupo702[i],alumnosGrupo702[i],alumnosGrupo702[i]]
        conn.executeCommand('REPLACE INTO universidad (universidad_id, password, nombre_universidad, url_recuperacion_libro,grupo) VALUES (?,?,?,?,?)',parametros)
    }
 
}
var conexionBD = require('../Conexion/ConexionBD');
const sql = require('mssql');
const Asignaciones = require('../Modelos/RecordAcademico');

//Funciones

async function obtenerTodos()
{
    try
    {
        let conn = await sql.connect(conexionBD);
        let record = await conn.request()
                        .input('operacion', sql.Char, 'T')
                        .execute('spRecordAcademico');                        
        return record.recordset;                        
    }
    catch (error)
    {
        console.log(error);
    }
}

async function obtenerxId(id)
{
    try
    {
        let conn = await sql.connect(conexionBD);
        let record = await conn.request()
            .input('id', id)
            .input('operacion', sql.Char, 'B')
            .execute('spRecordAcademico')
        return record.recordset;
    }
    catch(error)
    {
        console.log(error);
    }
}

async function guardarRecord (RecordAcademico)
{
    try
    {
        let cnn = await sql.connect(conexionBD);
        let record = await cnn.request()
            .input('codigo', sql.NVarChar, RecordAcademico.Codigo)
            .input('fecha', sql.NVarChar, RecordAcademico.Fecha)
            .input('periodo', sql.NVarChar, RecordAcademico.Periodo)     
            .input('nota1', sql.Float, RecordAcademico.Nota1)     
            .input('nota2', sql.Float, RecordAcademico.Nota2)     
            .input('idEstudiante', sql.Int, RecordAcademico.Id_Estudiante)            
            .input('idDocente', sql.Int, RecordAcademico.Id_Docente)   
            .input('operacion', sql.Char, 'G')
            .execute('spRecordAcademico');
        return record.recordset;
    }
    catch(error)
    {
        console.log(error);
    }
}

async function actualizarRecord (RecordAcademico)
{
    try
    {
        let cnn = await sql.connect(conexionBD);
        let record = await cnn.request()
            .input('id', sql.Int, RecordAcademico.Id)
            .input('codigo', sql.NVarChar, RecordAcademico.Codigo)
            .input('fecha', sql.NVarChar, RecordAcademico.Fecha)
            .input('periodo', sql.NVarChar, RecordAcademico.Periodo)     
            .input('nota1', sql.Float, RecordAcademico.Nota1)     
            .input('nota2', sql.Float, RecordAcademico.Nota2)     
            .input('idEstudiante', sql.Int, RecordAcademico.Id_Estudiante)            
            .input('idDocente', sql.Int, RecordAcademico.Id_Docente)   
            .input('operacion', sql.Char, 'A')
            .execute('spRecordAcademico');
        return record.recordset;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function eliminarRecord (id)
{
    try
    {        
        let cnn = await sql.connect(conexionBD);
        let record = await cnn.request()
            .input('id', sql.Int, id)     
            .input('operacion', sql.Char, 'E')
            .execute('spRecordAcademico');
        return record.recordset;
    }
    catch (error)
    {
        console.log(error);
    }
}

module.exports = { obtenerTodos:obtenerTodos, obtenerxId:obtenerxId, guardarRecord:guardarRecord,
    actualizarRecord:actualizarRecord, eliminarRecord:eliminarRecord };
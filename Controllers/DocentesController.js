var conexionBD = require('../Conexion/ConexionBD');
const sql = require('mssql');
const Asignaciones = require('../Modelos/Docentes');

//Funciones

async function obtenerTodos()
{
    try
    {
        let conn = await sql.connect(conexionBD);
        let docentes = await conn.request()
                        .input('operacion', sql.Char, 'T')
                        .execute('spDocentes');                        
        return docentes.recordset;                        
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
        let docente = await conn.request()
            .input('id', id)
            .input('operacion', sql.Char, 'B')
            .execute('spDocentes')
        return docente.recordset;
    }
    catch(error)
    {
        console.log(error);
    }
}

async function guardarDocente (Docentes)
{
    try
    {
        let cnn = await sql.connect(conexionBD);
        let docente = await cnn.request()
            .input('codigo', sql.NVarChar, Docentes.Codigo)
            .input('nombres', sql.NVarChar, Docentes.Nombres)
            .input('apellidos', sql.NVarChar, Docentes.Apellidos)            
            .input('idAsignatura', sql.Int, Docentes.Id_Asignatura)            
            .input('operacion', sql.Char, 'G')
            .execute('spDocentes');
        return docente.recordset;
    }
    catch(error)
    {
        console.log(error);
    }
}

async function actualizarDocente (Docentes)
{
    try
    {
        let cnn = await sql.connect(conexionBD);
        let docente = await cnn.request()
            .input('id', sql.Int, Docentes.Id)
            .input('codigo', sql.NVarChar, Docentes.Codigo)
            .input('nombres', sql.NVarChar, Docentes.Nombres)
            .input('apellidos', sql.NVarChar, Docentes.Apellidos)            
            .input('idAsignatura', sql.Int, Docentes.Id_Asignatura)            
            .input('operacion', sql.Char, 'A')
            .execute('spDocentes');
        return docente.recordset;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function eliminarDocente (id)
{
    try
    {        
        let cnn = await sql.connect(conexionBD);
        let docente = await cnn.request()
            .input('id', sql.Int, id)     
            .input('operacion', sql.Char, 'E')
            .execute('spDocentes');
        return docente.recordset;
    }
    catch (error)
    {
        console.log(error);
    }
}

module.exports = { obtenerTodos:obtenerTodos, obtenerxId:obtenerxId, guardarDocente:guardarDocente,
    actualizarDocente:actualizarDocente, eliminarDocente:eliminarDocente };
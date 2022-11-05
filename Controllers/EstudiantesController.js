var conexionBD = require('../Conexion/ConexionBD');
const sql = require('mssql');
const Asignaciones = require('../Modelos/Estudiantes');

//Funciones

async function obtenerTodos()
{
    try
    {
        let conn = await sql.connect(conexionBD);
        let estudiantes = await conn.request()
                        .input('operacion', sql.Char, 'T')
                        .execute('spEstudiantes');                        
        return estudiantes.recordset;                        
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
        let estudiante = await conn.request()
            .input('id', id)
            .input('operacion', sql.Char, 'B')
            .execute('spEstudiantes')
        return estudiante.recordset;
    }
    catch(error)
    {
        console.log(error);
    }
}

async function guardarEstudiante (Estudiantes)
{
    try
    {
        let cnn = await sql.connect(conexionBD);
        let estudiante = await cnn.request()
            .input('codigo', sql.NVarChar, Estudiantes.Codigo)
            .input('nombres', sql.NVarChar, Estudiantes.Nombres)
            .input('apellidos', sql.NVarChar, Estudiantes.Apellidos)     
            .input('semestre', sql.NVarChar, Estudiantes.Semestre)     
            .input('carrera', sql.NVarChar, Estudiantes.Carrera)     
            .input('idAsignatura', sql.Int, Estudiantes.Id_Asignatura)            
            .input('operacion', sql.Char, 'G')
            .execute('spEstudiantes');
        return estudiante.recordset;
    }
    catch(error)
    {
        console.log(error);
    }
}

async function actualizarEstudiante (Estudiantes)
{
    try
    {
        let cnn = await sql.connect(conexionBD);
        let estudiante = await cnn.request()
            .input('id', sql.Int, Estudiantes.Id)
            .input('codigo', sql.NVarChar, Estudiantes.Codigo)
            .input('nombres', sql.NVarChar, Estudiantes.Nombres)
            .input('apellidos', sql.NVarChar, Estudiantes.Apellidos)     
            .input('semestre', sql.NVarChar, Estudiantes.Semestre)     
            .input('carrera', sql.NVarChar, Estudiantes.Carrera)     
            .input('idAsignatura', sql.Int, Estudiantes.Id_Asignatura)            
            .input('operacion', sql.Char, 'A')
            .execute('spEstudiantes');
        return estudiante.recordset;
    }
    catch (error)
    {
        console.log(error);
    }
}

async function eliminarEstudiante (id)
{
    try
    {        
        let cnn = await sql.connect(conexionBD);
        let estudiante = await cnn.request()
            .input('id', sql.Int, id)     
            .input('operacion', sql.Char, 'E')
            .execute('spEstudiantes');
        return estudiante.recordset;
    }
    catch (error)
    {
        console.log(error);
    }
}

module.exports = { obtenerTodos:obtenerTodos, obtenerxId:obtenerxId, guardarEstudiante:guardarEstudiante,
    actualizarEstudiante:actualizarEstudiante, eliminarEstudiante:eliminarEstudiante };
class RecordAcademico {
    constructor(Id, Codigo, Fecha, Periodo, Nota1, Nota2, Promedio, Id_Estudiante, Id_Docente)
    {
        this.Id = Id;
        this.Codigo = Codigo;
        this.Fecha = Fecha;
        this.Periodo = Periodo;
        this.Nota1 = Nota1;
        this.Nota2 = Nota2;
        this.Promedio = Promedio;
        this.Id_Estudiante = Id_Estudiante;
        this.Id_Docente = Id_Docente;
    }
}
module.exports = RecordAcademico;
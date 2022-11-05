USE Universidad
GO

--ASIGNATURAS
CREATE PROCEDURE spAsignaturas (@id INT = NULL, @codigo VARCHAR(20) = NULL, @nombre VARCHAR(50) = NULL, @creditos TINYINT = NULL, @operacion CHAR(1))
AS 
	BEGIN 
		  IF @operacion = 'B' 
				--BUSCAR POR ID
				SELECT Id, Codigo, Nombre, Creditos FROM Asignaturas WHERE Id = @id;
		  ELSE IF @operacion = 'T'
				--BUSCAR TODOS
				SELECT Id, Codigo, Nombre, Creditos FROM Asignaturas;
		  ELSE IF @operacion = 'G'
				--GUARDAR
				INSERT INTO Asignaturas (Codigo, Nombre, Creditos) VALUES (@codigo, @nombre, @creditos) ;
		  ELSE IF @operacion = 'A'
				--ACTUALIZAR
				UPDATE Asignaturas SET Codigo = @codigo, Nombre = @nombre, Creditos = @creditos WHERE Id = @id;
		  ELSE IF @operacion = 'E'
				--ELIMINAR
				DELETE FROM Asignaturas WHERE Id = @id;
		  ELSE
			    PRINT 'SIN OPERACION VALIDA'	  
	END
GO;

--EXEC spAsignaturas 1,'','',0, 'B' --Buscar Id
--EXEC spAsignaturas 0,'','',0, 'T' --Buscar Todos
--EXEC spAsignaturas 0,'AS3','Calculo 1', 3, 'G' --Guardar
--EXEC spAsignaturas 1,'AS6','Algebra 2', 4, 'A' -- Actualizar
--EXEC spAsignaturas 3,'','', 0, 'E' --Eliminar

--DOCENTES
ALTER PROCEDURE spDocentes (@id INT = NULL, @codigo VARCHAR(20) = NULL, @nombres VARCHAR(30) = NULL, @apellidos VARCHAR(30) = NULL, @idAsignatura INT = NULL, @operacion CHAR(1))
AS 
	BEGIN 
		  IF @operacion = 'B' 
				--BUSCAR POR ID
				SELECT doc.Id, doc.Codigo, doc.Nombres, doc.Apellidos, doc.Id_Asignatura, asig.Nombre FROM Docentes doc
				LEFT JOIN Asignaturas asig ON asig.Id = doc.Id_Asignatura
				WHERE doc.Id = @id;
		  ELSE IF @operacion = 'T'
				--BUSCAR TODOS
				SELECT doc.Id, doc.Codigo, doc.Nombres, doc.Apellidos, doc.Id_Asignatura, asig.Nombre FROM Docentes doc
				LEFT JOIN Asignaturas asig ON asig.Id = doc.Id_Asignatura;
		  ELSE IF @operacion = 'G'
				--GUARDAR
				INSERT INTO Docentes (Codigo, Nombres, Apellidos, Id_Asignatura) VALUES (@codigo, @nombres, @apellidos, @idAsignatura) ;
		  ELSE IF @operacion = 'A'
				--ACTUALIZAR
				UPDATE Docentes SET Codigo = @codigo, Nombres = @nombres, Apellidos = @apellidos, Id_Asignatura = @idAsignatura WHERE Id = @id;
		  ELSE IF @operacion = 'E'
				--ELIMINAR
				DELETE FROM Docentes WHERE Id = @id;
		  ELSE
			    PRINT 'SIN OPERACION VALIDA'	  
	END
GO
--EXEC spDocentes  1,'','','',0,'T'

--ESTUDIANTES

ALTER PROCEDURE spEstudiantes (@id INT = NULL, @codigo VARCHAR(20) = NULL, @nombres VARCHAR(30) = NULL, @apellidos VARCHAR(30) = NULL, @semestre VARCHAR(10) = NULL, @carrera VARCHAR(50) = NULL, @idAsignatura INT = NULL , @operacion CHAR(1))
AS 
	BEGIN 
		  IF @operacion = 'B' 
				--BUSCAR POR ID
				SELECT est.Id, est.Codigo, est.Nombres, est.Apellidos, est.Semestre, est.Carrera, est.Id_Asignatura, asig.Nombre FROM Estudiantes est
				LEFT JOIN Asignaturas asig ON asig.Id = est.Id_Asignatura				
				WHERE est.Id = @id;
		  ELSE IF @operacion = 'T'
				--BUSCAR TODOS
				SELECT est.Id, est.Codigo, est.Nombres, est.Apellidos, est.Semestre, est.Carrera, est.Id_Asignatura, asig.Nombre FROM Estudiantes est
				LEFT JOIN Asignaturas asig ON asig.Id = est.Id_Asignatura
		  ELSE IF @operacion = 'G'
				--GUARDAR
				INSERT INTO Estudiantes (Codigo, Nombres, Apellidos, Semestre, Carrera, Id_Asignatura) VALUES (@codigo, @nombres, @apellidos, @semestre, @carrera,  @idAsignatura) ;
		  ELSE IF @operacion = 'A'
				--ACTUALIZAR
				UPDATE Estudiantes SET Codigo = @codigo, Nombres = @nombres, Apellidos = @apellidos, Semestre = @semestre, Carrera = @carrera ,Id_Asignatura = @idAsignatura WHERE Id = @id;
		  ELSE IF @operacion = 'E'
				--ELIMINAR
				DELETE FROM Estudiantes WHERE Id = @id;
		  ELSE
			    PRINT 'SIN OPERACION VALIDA'	  
	END
GO
--EXEC spEstudiantes  1,'','','','','','', 'T'

-- RECORD ACADEMICO

CREATE PROCEDURE spRecordAcademico
(@id INT = NULL, 
@codigo VARCHAR(20) = NULL,
@fecha DATE = NULL,
@periodo VARCHAR(20) = NULL,
@nota1 DECIMAL(3,2) = NULL,
@nota2 DECIMAL(3,2) = NULL,
@idEstudiante INT = NULL,
@idDocente INT = NULL,
@operacion CHAR(1))
AS 
	BEGIN 
		  IF @operacion = 'B' 
				--BUSCAR POR ID
				SELECT ra.Id, ra.Codigo, ra.Fecha, ra.Periodo, ra.Nota1, ra.Nota2, ra.Promedio, ra.Id_Estudiante, CONCAT(est.Nombres, ' ', est.Apellidos) AS 'Nombre estudiante'
				,ra.Id_Docente, CONCAT(doc.Nombres, ' ', doc.Apellidos) AS 'Nombre docente'
				FROM RecordAcademico ra
				LEFT JOIN Estudiantes est ON est.Id = ra.Id_Estudiante
				LEFT JOIN Docentes doc ON doc.Id = ra.Id_Docente
				WHERE ra.Id = @id;
		  ELSE IF @operacion = 'T'
				--BUSCAR TODOS
				SELECT ra.Id, ra.Codigo, ra.Fecha, ra.Periodo, ra.Nota1, ra.Nota2, ra.Promedio, ra.Id_Estudiante, CONCAT(est.Nombres, ' ', est.Apellidos) AS 'Nombre estudiante'
				,ra.Id_Docente, CONCAT(doc.Nombres, ' ', doc.Apellidos) AS 'Nombre docente'
				FROM RecordAcademico ra
				LEFT JOIN Estudiantes est ON est.Id = ra.Id_Estudiante
				LEFT JOIN Docentes doc ON doc.Id = ra.Id_Docente;
		  ELSE IF @operacion = 'G'
				--GUARDAR
				INSERT INTO RecordAcademico (Codigo, Fecha, Periodo, Nota1, Nota2, Id_Estudiante, Id_Docente) VALUES (@codigo, @fecha, @periodo, @nota1, @nota2, @idEstudiante, @idDocente) ;
		  ELSE IF @operacion = 'A'
				--ACTUALIZAR
				UPDATE RecordAcademico SET Codigo = @codigo, Fecha = @fecha, Periodo = @periodo, Nota1 = @nota1, Nota2 = @nota2 ,Id_Estudiante = @idEstudiante, Id_Docente = @idDocente WHERE Id = @id;
		  ELSE IF @operacion = 'E'
				--ELIMINAR
				DELETE FROM RecordAcademico WHERE Id = @id;
		  ELSE
			    PRINT 'SIN OPERACION VALIDA'	  
	END
GO

--EXEC spRecordAcademico 0,'','','',0,0,0,0,'T'
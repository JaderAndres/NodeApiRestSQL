var asignaturasController = require('./Controllers/AsignaturasController');
var docentesController = require('./Controllers/DocentesController');
var estudiantesController = require('./Controllers/EstudiantesController');
var recordController = require('./Controllers/RecordAcademicoController');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/crud', router);

var port = process.env.port || 8090;
app.listen(port);
console.log('Ejecutando en el puerto '+ port);

router.use((request,response,next) =>{
console.log('Hora:', Date.now());
next();
});

//RUTAS

// -------- ASIGNATURAS -------- //

router.route('/asignaturas').get((request, response)=>{
    asignaturasController.obtenerTodos().then(result =>{
        response.json(result);
        console.log(result)
    })
})
 
 router.route('/asignaturas/buscar/:id').get((request, response)=>{
    asignaturasController.obtenerxId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/asignaturas/nueva').post((request, response)=>{
    let asignatura = {...request.body}
    asignaturasController.guardarAsignatura(asignatura).then(result =>{
        response.status(201).json(result);        
        console.log(result)
        console.log('La asignatura ha sido guardada')
    })
})

router.route('/asignaturas/actualizar').put((request, response)=>{
    let asignatura = {...request.body}    
    asignaturasController.actualizarAsignatura(asignatura).then(result =>{
        response.json(result)     
        console.log(result)
        console.log('La asignatura ha sido actualizada')
    })
})

router.route('/asignaturas/eliminar/:id').delete((request, response)=>{
   //let asignatura = {...request.body}   
   asignaturasController.eliminarAsignatura(request.params.id).then(result =>{
       response.json(result)         
       console.log('La asignatura ha sido eliminada')
    })
})

 // -------- DOCENTES -------- //

 router.route('/docentes').get((request, response)=>{
    docentesController.obtenerTodos().then(result =>{
        response.json(result);
        console.log(result)
    })
})
 
 router.route('/docentes/buscar/:id').get((request, response)=>{
    docentesController.obtenerxId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/docentes/nuevo').post((request, response)=>{
    let docente = {...request.body}
    docentesController.guardarDocente(docente).then(result =>{
        response.status(201).json(result);        
        console.log(result)
        console.log('El docente ha sido guardado')
    })
})

router.route('/docentes/actualizar').put((request, response)=>{
    let docente = {...request.body}    
    docentesController.actualizarDocente(docente).then(result =>{
        response.json(result)     
        console.log(result)
        console.log('El docente ha sido actualizado')
    })
})

router.route('/docentes/eliminar/:id').delete((request, response)=>{   
   docentesController.eliminarDocente(request.params.id).then(result =>{
       response.json(result)         
       console.log('El docente ha sido eliminado')
    })
})

// -------- ESTUDIANTES -------- //

router.route('/estudiantes').get((request, response)=>{
    estudiantesController.obtenerTodos().then(result =>{
        response.json(result);
        console.log(result)
    })
})
 
 router.route('/estudiantes/buscar/:id').get((request, response)=>{
    estudiantesController.obtenerxId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/estudiantes/nuevo').post((request, response)=>{
    let estudiante = {...request.body}
    estudiantesController.guardarEstudiante(estudiante).then(result =>{
        response.status(201).json(result);        
        console.log(result)
        console.log('El estudiante ha sido guardado')
    })
})

router.route('/estudiantes/actualizar').put((request, response)=>{
    let estudiante = {...request.body}    
    estudiantesController.actualizarEstudiante(estudiante).then(result =>{
        response.json(result)     
        console.log(result)
        console.log('El estudiante ha sido actualizado')
    })
})

router.route('/estudiantes/eliminar/:id').delete((request, response)=>{   
    estudiantesController.eliminarEstudiante(request.params.id).then(result =>{
       response.json(result)         
       console.log('El estudiante ha sido eliminado')
    })
})

// -------- RECORD ACADEMICO -------- //

router.route('/recordacademico').get((request, response)=>{
    recordController.obtenerTodos().then(result =>{
        response.json(result);
        console.log(result)
    })
})
 
 router.route('/recordacademico/buscar/:id').get((request, response)=>{
    recordController.obtenerxId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/recordacademico/nuevo').post((request, response)=>{
    let record = {...request.body}
    recordController.guardarRecord(record).then(result =>{
        response.status(201).json(result);        
        console.log(result)
        console.log('El record académico ha sido guardado')
    })
})

router.route('/recordacademico/actualizar').put((request, response)=>{
    let record = {...request.body}    
    recordController.actualizarRecord(record).then(result =>{
        response.json(result)     
        console.log(result)
        console.log('El record academico ha sido actualizado')
    })
})

router.route('/recordacademico/eliminar/:id').delete((request, response)=>{   
    recordController.eliminarRecord(request.params.id).then(result =>{
       response.json(result)         
       console.log('El record académico ha sido eliminado')
    })
})
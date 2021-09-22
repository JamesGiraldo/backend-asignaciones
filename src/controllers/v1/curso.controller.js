const { response } = require('express');
const Validator = require('fastest-validator');
const v = new Validator();

const models = require('../../../infrastructure/orm/sequelize/models');

/** GET */
const index = async( req, res = response) => {

    await models.Curso.findAll().then( result => {

        if ( result.length === 0 ) {
            
            res.status(200).json({
                ok: true,
                message: 'No hay registros',               
            });
          
        } else {
            res.status(200).json({
                ok: true,
                message: 'Cursos encontrados',
                cursos: result,
                cantidad: result.length
            });
        }

    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Algo salió mal.',
            error: error
        });        
    })      
}

/** SHOW */
const show = async( req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;

    await models.Curso.findByPk( id ).then( result => {
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Curso encontrado',
                curso: result
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Curso no encontrado.',                
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Algo salió mal.',
            error: error
        });        
    })      
}

/** POST TODO */
const save = async(req, res = response) => {
    /** obtener el valor del body  */        
    const cuerpo = {        
        ...req.body,      
        estudianteId: req.body.estudiante_id,
        userId: 1
    };    

    await models.Curso.create( cuerpo ).then( result =>  {
        res.status(201).json({
            ok: true,
            message: 'Curso creado exitosamente',
            curso: result
        });
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Algo salió mal.',
            error: error
        });        
    })      
}

/** PUT TODO */
const update = async(req, res = response) => {
    
    /** tomar el id de los parametros  */
    const id = req.params.id;
    
    /** obtener el valor del body  */        
    const cuerpoUpdate = {    ...req.body      };    
    const userId = 1;

    /** buscar primero el curso por medio del id */
    await models.Curso.findByPk(id).then( async (curso) => {

        if ( curso ) {         

            await curso.update( cuerpoUpdate, { where: { userId: userId } } ).then( result => {
                res.status(200).json({
                    ok: true,
                    message: 'Curso actualizado exitosamente',
                    curso: result
                });
            }).catch( error => {
                /** Si lapetición esta mal mostrar el error. */
                res.status(500).json({
                    ok: false,
                    message: 'Algo salió mal con la actualizacion del curso.',
                    error: error
                });        
            })

        } else {
             /** Si no recibe la respuesta. */
             res.status(404).json({
                ok: false,
                message: 'Curso no encontrado.',                
            });   
        }

    });

}

/** DELETE */
const destroy = async( req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;
    const userId = 1;

    await models.Curso.destroy( {where: {id: id, userId: userId } } ).then( result => {    
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Curso eliminado',                
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Curso no encontrado.',                
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Algo salió mal.',
            error: error
        });        
    })      
}

/** esportar los metodo o modulos del controlador. */
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}
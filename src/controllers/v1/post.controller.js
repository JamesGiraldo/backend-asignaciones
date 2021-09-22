const { response } = require('express');
const Validator = require('fastest-validator');
const v = new Validator();

const models = require('../../../infrastructure/orm/sequelize/models');

/** GET */
const index = async( req, res = response) => {

    await models.Post.findAll().then( result => {
        res.status(200).json({
            ok: true,
            message: 'Posts encontrados',
            posts: result,
            cantidad: result.length
        });
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** SHOW */
const show = async( req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;

    await models.Post.findByPk( id ).then( result => {
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Post encontrado',
                post: result
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Post no encontrado.',                
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** POST TODO */
const save = async(req, res = response) => {
    /** obtener el valor del body  */        
    const cuerpo = {        
        ...req.body,
        categoryId: req.body.category_id,
        userId: 1
    };    

    await models.Post.create( cuerpo ).then( result =>  {
        res.status(201).json({
            ok: true,
            message: 'Post creado exitosamente',
            post: result
        });
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** PUT TODO */
const update = async(req, res = response) => {
    
    /** tomar el id de los parametros  */
    const id = req.params.id;
    
    /** obtener el valor del body  */        
    const cuerpoUpdate = {
        ...req.body,
        categoryId: req.body.category_id        
    };    
    const userId = 1;

    await models.Post.update( cuerpoUpdate, { where: { id: id, userId: userId } } ).then( result =>  {
        if ( result ) {            
            res.status(201).json({
                ok: true,
                message: 'Post actualizado exitosamente',
                post: cuerpoUpdate
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Post no encontrado.',                
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** DELETE */
const destroy = async( req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;
    const userId = 1;

    await models.Post.destroy( {where: {id: id, userId: userId } } ).then( result => {    
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Post eliminado',                
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Post no encontrado.',                
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
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
const { response } = require('express');

const models = require('../../../infrastructure/orm/sequelize/models');

const upload = async (req, res = response) => {

    try {
        console.log(req.file)
        /** validando que exista un archivo */
        if (!req.file || Object.keys(req.file).length === 0 || req.file === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun Archivo.'
            });
        }

        res.status(201).json({
            ok: true,
            message: 'Archivo subido correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Problemas con la subida del archivo.',
            error: error
        });
    }
}

const asignar_archivo = async (req, res = response) => {

    try {
        /** tomar el id de los parametros  */
        const id = req.params.id;
        /** tomar el valor de file */
        const file = req.file;
        const filesImg = file.filename;        

        await models.User.findByPk(id).then(async (user) => {

            if (user) {
                await user.update({ imageUrl: filesImg }).then(async (result) => {
                    if (result) {
                        res.status(201).json({
                            ok: true,
                            message: 'Imagen asignada exitosamente',
                            imagen: filesImg
                        });
                    } else {
                        /** Si no recibe la respuesta. */
                        res.status(404).json({
                            ok: false,
                            message: 'No llego ninguna respuesta de la actualizacion.',
                        });
                    }
                }).catch(error => {
                    /** Si lapetición esta mal mostrar el error. */
                    res.status(500).json({
                        ok: false,
                        message: 'Problemas con la actualizacion',
                        error: error
                    });
                })

            } else {
                /** Si no recibe la respuesta. */
                res.status(404).json({
                    ok: false,
                    message: 'El id correspondiente no pertenese a un usuario encontrado.',
                });
            }
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Problemas con la peticion de asignacion de archivos.'
        })
    }

};

module.exports = {
    upload: upload,
    asignar_archivo: asignar_archivo
}
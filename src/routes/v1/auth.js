const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { signUp, login } = require('../../controllers/v1/auth.controller');
/** validacion de campos */
const { validarCampos } = require('../../middleware/validar-campos');

/** ruta principal metodo post */
router.post( '/sign-up', signUp );

/** ruta principal metodo post */
router.post( '/login', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').isLength({ min: 6 }),
        validarCampos,
    ],
    login
);



///////////////////////////////************ otra manera de validar campos  *******************////////////////////////////////

    // /** schea de campos a validar */
    // const schema = {
    //     nombre: { type: "string", optional: false, max: 150 },
    //     horario: { type: "string", optional: false, max: 100 },   
    //     fecha_inicio: { type: "string", optional: false },     
    //     fecha_fin: { type: "string", optional: false },        
    //     estudianteId: { type: "number", optional: false }        
    // }
    // /** respuesta de la validación que recibe los campos y las validaciones */
    // const validationResponse = v.validate( cuerpo , schema );

    // /** validar si es diferente a true */
    // if ( validationResponse !== true ) {
    //     return res.status(400).json({
    //         ok: false,
    //         message: 'Los campos son requeridos.',
    //         error: validationResponse
    //     })
    // }



/** exportar el modulo de ruta */
module.exports = router;
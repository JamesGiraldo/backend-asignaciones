const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { index, show, update, destroy } = require('../../controllers/v1/user.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../../middleware/check-auth');
const { validarCampos } = require('../../middleware/validar-campos');

/** ruta principal metodo get */
router.get( '/users', index );

/** ruta principal metodo get */
router.get( '/users/:id', show );

/** ruta principal metodo PUT */
router.put( '/users/:id', [
    checkAuth,
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').not().isEmpty(),
    validarCampos
], update);

/** ruta principal metodo DELETE */
router.delete( '/users/:id', checkAuth, destroy );

/** exportar el modulo de ruta */
module.exports = router;
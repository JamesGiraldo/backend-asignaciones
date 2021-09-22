const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { updatePasswrod } = require('../../controllers/v1/password.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../../middleware/check-auth');
const { validarCampos } = require('../../middleware/validar-campos');

/** ruta principal metodo PUT */
router.put( '/change-password/:id', [
    checkAuth,
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('lastPassword', 'La contraseña anterior es obligatoria').not().isEmpty(),
    validarCampos
], updatePasswrod );

/** exportar el modulo de ruta */
module.exports = router;
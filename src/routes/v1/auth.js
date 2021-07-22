const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { signUp, login } = require('../../controllers/v1/auth.controller');

/** ruta principal metodo post */
router.post( '/sign-up', signUp );

/** ruta principal metodo post */
router.post( '/login', login );

/** exportar el modulo de ruta */
module.exports = router;
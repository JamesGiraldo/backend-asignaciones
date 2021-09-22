const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { index, show, save, update, destroy } = require('../../controllers/v1/post.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../../middleware/check-auth');
const { validarCampos } = require('../../middleware/validar-campos');

/** ruta principal metodo get */
router.get( '/posts', index );

/** ruta principal metodo get */
router.get( '/posts/:id', show );

/** ruta principal metodo post */
router.post( '/posts', [
    checkAuth,
    check('title', 'El campo titulo es obligatorio').not().isEmpty(),
    check('content', 'El contenido es obligatorio').not().isEmpty(),    
    validarCampos
], save);

/** ruta principal metodo PUT */
router.put( '/posts/:id', [
    checkAuth,
    check('title', 'El campo titulo es obligatorio').not().isEmpty(),
    check('content', 'El contenido es obligatorio').not().isEmpty(),    
    validarCampos
], update );

/** ruta principal metodo DELETE */
router.delete( '/posts/:id', checkAuth, destroy );

/** exportar el modulo de ruta */
module.exports = router;
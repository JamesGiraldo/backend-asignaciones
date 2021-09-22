const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
/** metodos importados del controller presente */
const { index, show, update, destroy, save } = require('../../controllers/v1/category.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../../middleware/check-auth');
const { validarCampos } = require('../../middleware/validar-campos');

/** ruta principal metodo get */
router.get('/categories', index);

/** ruta principal metodo get */
router.get('/categories/:id', show);

/** ruta principal metodo get */
router.post('/categories', [
    checkAuth,
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    validarCampos
], save);

/** ruta principal metodo PUT */
router.put('/categories/:id', [
    checkAuth,
    check('name', 'El campo nombre es obligatorio').not().isEmpty(),
    validarCampos
], update);

/** ruta principal metodo DELETE */
router.delete('/categories/:id', checkAuth, destroy);

/** exportar el modulo de ruta */
module.exports = router;
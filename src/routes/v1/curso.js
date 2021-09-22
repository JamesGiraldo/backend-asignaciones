const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
/** metodos importados del controller presente */
const { index, show, save, update, destroy } = require('../../controllers/v1/curso.controller');
/** metodo importado del middleware, para validar toke y campos XD */
const { checkAuth } = require('../../middleware/check-auth');
const { validarCampos } = require('../../middleware/validar-campos');

/** ruta principal metodo get */
router.get('/cursos', index);

/** ruta principal metodo get */
router.get('/cursos/:id', show);

/** ruta principal metodo post */
router.post('/cursos', [
    checkAuth,
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('horario', "El campo horario es obligatorio").not().isEmpty(),
    check('fecha_inicio', "La fecha incio es obligatoria").not().isEmpty(),
    check('fecha_fin', "La fecha fin es obligatoria").not().isEmpty(),
    validarCampos
],  save);


/** ruta principal metodo PUT */
router.put('/cursos/:id', [
    checkAuth,
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('horario', "El campo horario es obligatorio").not().isEmpty(),
    check('fecha_inicio', "La fecha incio es obligatoria").not().isEmpty(),
    check('fecha_fin', "La fecha fin es obligatoria").not().isEmpty(),
    validarCampos
], update);

/** ruta principal metodo DELETE */
router.delete('/cursos/:id', checkAuth, destroy);

/** exportar el modulo de ruta */
module.exports = router;
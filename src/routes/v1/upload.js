const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { upload, asignar_archivo } = require('../../controllers/v1/upload.controller');
/** middleware */
const { ubicacion_uploads } = require('../../middleware/upload');

/** ruta principal metodo post */
router.post( '/uploads', ubicacion_uploads, upload );
router.post('/file/:id', ubicacion_uploads, asignar_archivo );
/** exportar el modulo de ruta */
module.exports = router;
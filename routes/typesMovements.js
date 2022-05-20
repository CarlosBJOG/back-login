const { Router } = require('express');
const { check } = require('express-validator');

const { getTypesMovements, 
        postTypesMovements, 
        putTypesMovements, 
        deleteTypesMovements } = require('../controllers/typesMovements');
const { typeMovementExist, isTypeMovementActive } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validarCampos');
const { tieneRole } = require('../middlewares/validarRoles');


const router = Router();

router.get('/', getTypesMovements);

router.post('/', [
        check('tipo_movimiento', 'El tipo de movimiento es requerido').not().isEmpty(),
        check('tipo_movimiento').custom( typeMovementExist ),
        validarCampos
],postTypesMovements);

router.put('/:id', [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check( 'id', 'El id es requerido' ).not().isEmpty(),
        check('id', 'El id no es un MONGO ID').isMongoId(),
        check('tipo_movimiento').custom( typeMovementExist ),
        validarCampos,
],putTypesMovements);

router.delete('/:id', [
        validarJWT,
        tieneRole('ADMIN_ROLE'),
        check( 'id', 'El id es requerido' ).not().isEmpty(),
        check('id', 'El id no es un MONGO ID').isMongoId(),
        
        validarCampos,

],deleteTypesMovements);



module.exports = router;
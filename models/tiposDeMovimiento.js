const { Schema, model } = require('mongoose');


const TypeMovementSchema = Schema({

    tipo_movimiento: {
        type: String,
        required: [true, 'El Tipo de movimiento es Obligatorio']
    },
    estado: {
        type: Boolean,
        default: true, 
        required: true,
    }


});

TypeMovementSchema.methods.toJSON = function () {

    const { __v, _id, estado, ...typesMovements } = this.toObject();

    typesMovements.uid = _id

    return typesMovements;

}


module.exports = model('TypeMovement', TypeMovementSchema);
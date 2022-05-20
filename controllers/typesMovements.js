const TypeMovement = require('../models/tiposDeMovimiento');


const getTypesMovements = async ( req, res) => {


    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    const [ total, movimientos ] = await Promise.all([
        
        TypeMovement.countDocuments(query),
        TypeMovement.find( query )
                .skip( Number( desde ) )
                .limit( Number( limite ) )

    ]);

    console.log( total, movimientos );

    res.status(200).json({
        total, 
        tipos_movimientos: movimientos
    })

}

const postTypesMovements = async (req, res) => {

    const body = req.body;

    const tipo_movimiento = body.tipo_movimiento.toUpperCase().trim();

    const typeMovement = new TypeMovement({ tipo_movimiento });
    
    await typeMovement.save();

    res.status(200).json({
        tipo_movimiento: typeMovement,
 
    })
}



const putTypesMovements = async (req, res) => {

    const { id } = req.params;
    const { estado, ...rest } = req.body;

    if( rest.tipo_movimiento ) rest.tipo_movimiento = rest.tipo_movimiento.toUpperCase();

    const movementUpdated = await TypeMovement.findByIdAndUpdate( id, rest, { new : true } );

    res.status(200).json({
        movementUpdated

    })
}


const deleteTypesMovements = async (req, res) => {

    const { id } = req.params;

    const movementDeleted = await TypeMovement.findByIdAndUpdate( id, {estado: false}, {new : true} );

    res.status(200).json({
        movementDeleted

    })
}



module.exports = {
    getTypesMovements,
    postTypesMovements,
    putTypesMovements,
    deleteTypesMovements,
}
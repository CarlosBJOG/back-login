const Usuario = require('../models/usuario');
const Role = require('../models/role');




const emailValido = async ( correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ) {
        throw new Error(`El correo ${correo} ya esta registrado en la BD`);
    } 
}

const esRoleValido = async ( rol = '') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    } 
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ) {
        throw new Error(`El Usuario con id ${id} no esta registrado en la BD`);
    } 
} 


const usuarioIsActive = async ( id = '' ) => {
    const usuario = await Usuario.findById( id )
    if( !usuario.estado ) {
        throw new Error(`El usuario con id ${id} ya esta eliminado de la BD`);
    }
}






module.exports = {
    emailValido,
    esRoleValido,
    existeUsuarioById,
    usuarioIsActive,

}
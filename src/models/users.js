//  Modelo de datos para usuarios

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//  Definición del esquema de usuario
const { Schema } = mongoose;

//  Método de encriptación de contraseñas
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//  Método de comparación de contraseñas
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

//  Modelo de datos para usuarios
const User = mongoose.model('users', userSchema);

//  Exporta el modelo de usuarios
module.exports = User;

const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', usuarioSchema);

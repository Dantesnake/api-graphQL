const Usuario = require('../models/usuario');
//validadcion de usuario
const Joi = require('@hapi/joi');
//encrptador de constraseña
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const res = require("express");

const schemaLogin = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(1024).required()
});

const schemasigup = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(8).max(255).required()
});

function users() {
    return Usuario.find({});
}

async function singUp(args) {

    const isUseNameExist = await Usuario.findOne({usuario: args.usuarioInput.usuario});
    if (isUseNameExist) {
        return 'Usuario ya registrado';

    }
    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(args.usuarioInput.contrasena, salt);

    const user = new Usuario({
        usuario:  args.usuarioInput.usuario,
        contrasena: password
    });
    try {
        const savedUser = await user.save();
        return JSON.stringify(savedUser)
    } catch (error) {
        console.log(error)
    }

}

function user(args) {
    return Usuario.findById(args.id)
}

async function login(args) {

    const user = await Usuario.findOne({usuario: args.usuarioInput.usuario});

    if (!user) return  'Usuario no encontrado';

    const validPassword = await bcrypt.compare(args.usuarioInput.contrasena, user.contrasena);
    if (!validPassword) return 'contraseña no válida'


    // create token
    const token = jwt.sign({
        username: user.username,
        id: user._id
    }, process.env.TOKEN_SECRET)

    return token;
}

function createUser(args) {
    let usuario = new Usuario(args.usuarioInput);
    return usuario.save();
}

function deleteUser(args) {
    return Usuario.findByIdAndRemove(args.id);
}

function updateUser(args) {
    return Usuario.findByIdAndUpdate(args.id, args.usuarioInput, { new: true });
}

module.exports = { user, users, login, singUp, createUser, deleteUser, updateUser }

'use strict'

const express = require('express');
const userController = require('../controllers/user.controller');
const mdAuth = require('../middlewares/authenticated');
const connectMultiparty = require('connect-multiparty');
const upload = connectMultiparty({ uploadDir: './uploads/users'})

var api = express.Router();

api.get('/prueba', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.prueba); //NA
api.post('/saveUser', userController.saveUser); //YA
api.post('/saveUserOnlyAdmin/:id', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.saveUserByAdmin);//YA 
api.post('/login', userController.login); //YA 

//con middleware
api.put('/updateUser/:id', mdAuth.ensureAuth,  userController.updateUser); //YA 
api.put('/removeUser/:id', mdAuth.ensureAuth, userController.removeUser); //YA 
api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.getUsers);

api.post('/search', [mdAuth.ensureAuth, mdAuth.ensureAuthAdmin], userController.search); //NA

api.put('/:id/uploadImage', [mdAuth.ensureAuth, upload], userController.uploadImage); //YA 
api.get('/getImage/:fileName', [upload], userController.getImage); //YA 

module.exports = api;
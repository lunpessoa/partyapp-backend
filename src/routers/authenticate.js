const express = require('express');
const routesAuth = express.Router();
const AuthController = require('../controllers/AuthController')


routesAuth.post('/register', AuthController.store);
routesAuth.post('/authenticate', AuthController.authenticate);

module.exports = routesAuth;
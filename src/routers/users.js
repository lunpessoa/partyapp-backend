const express = require('express');
const routesUser = express.Router();
const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middlewares/auth');

routesUser.use(AuthMiddleware);
routesUser.get('/', UserController.userProfile);
routesUser.get('/agenda', UserController.userSchedule);
routesUser.put('/alter/:info', UserController.updateProfile);
routesUser.put('/alter/user/endereco', UserController.updateAdress);

module.exports = routesUser;
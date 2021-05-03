const express = require('express');
const routesUserSchedule = express.Router();
const UserScheduleController = require('../controllers/UserScheduleController')
const AuthMiddleware = require('../middlewares/auth');


routesUserSchedule.use(AuthMiddleware);
routesUserSchedule.post('/agendar', UserScheduleController.store);


module.exports = routesUserSchedule;
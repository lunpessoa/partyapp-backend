const express = require('express');
const routesIndex = express.Router();
const AuthController = require('../controllers/AuthController')
const UserScheduleController = require('../controllers/UserScheduleController')


routesIndex.get('/all', AuthController.index);
routesIndex.get('/allHours', UserScheduleController.getHours);

module.exports = routesIndex;
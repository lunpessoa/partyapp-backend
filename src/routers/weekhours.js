const express = require('express');
const routeWeek = express.Router();
const WeekHoursController = require('../controllers/WeekHoursController')


routeWeek.post('/define', WeekHoursController.createHours);
routeWeek.get('/semana', WeekHoursController.getDays);
routeWeek.get('/', WeekHoursController.getHours);

module.exports = routeWeek;
require('dotenv').config();

const express = require('express');
const routesIndex = require('./routers/index');
const routesUser = require('./routers/users');
const routeWeek = require('./routers/weekhours');
const routesAuth = require('./routers/authenticate');
const routesUserSchedule = require('./routers/user_schedule');

const app = express();

app.use(express.json());
app.use('/', routesIndex);
app.use('/dias', routeWeek);
app.use('/perfil', routesUser);
app.use('/auth', routesAuth);
app.use('/agendamentos', routesUserSchedule);

app.listen(process.env.PORT || 3333, () => {
  console.log("Success Connecting")
});
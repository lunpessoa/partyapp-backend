const { UserSchedule, Users, WeekHours } = require('../models')
const { Op, Sequelize } = require ('sequelize')

module.exports ={
  async getHours (req, res){
    try{
      const data = req.query.data;
      const diaSemana = req.query.diaSemana;

      // SELECT `WeekHours`.`id_weekhours` AS `idWeekhours`,
      // `WeekHours`.`hora`,
      // `WeekHours`.`dia_semana` AS `diaSemana`
      // FROM `week_hours` AS `WeekHours`
      // LEFT OUTER JOIN `user_schedule` AS `UserSchedule` ON `WeekHours`.`id_weekhours` = `UserSchedule`.`id_weekhours`
      // AND `UserSchedule`.`data` = '2021-05-03'
      // WHERE `UserSchedule`.`id_weekhours` IS NULL
      // AND `WeekHours`.`dia_semana` = 'Segunda-Feira';

      const openHours = await WeekHours.findAll({
        attributes: ['idWeekhours', 'hora'],
        where: {
          '$UserSchedule.id_weekhours$': {
            [Op.eq]: null
          },
          diaSemana,
        },
        include: [{
          attributes: [],
          model: UserSchedule,
          on: {
            id: Sequelize.where(Sequelize.col("WeekHours.id_weekhours"), "=",Sequelize.col("UserSchedule.id_weekhours"))
          },
          where: {
            data,
          },
          required: false,
        }],
      })
      return res.send({ openHours });
    } catch (err) {
      return res.status(400).send({error: "Get hours appointment by the day Error"})
    }
  },
  async store(req, res) {
    try{
      const { idWeekhours, data } = req.body;

      const userAppoint = await UserSchedule.create({userAgenda: req.userId ,idWeekhours, data});

      const [{ diaSemana, hora }] = await WeekHours.findAll({
        attributes: ['diaSemana', 'hora'],
        where: {
          idWeekhours: userAppoint.idWeekhours,
        }
      })

      const [{ nome }] = await Users.findAll({
        attributes: ['nome'],
        where: {
          idUsu: userAppoint.userAgenda,
        }
      })

      return res.send({ user: {
        idAgenda: userAppoint.idAgenda,
        nome,
        appointment: {
          data,
          diaSemana,
          hora,
        }
      }, mensagem: "Create schedule Successful"})
    } catch (err){
      return res.status(400).send({error: "Create schedule for profile Error"})
    }
  },
}
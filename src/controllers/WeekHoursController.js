const { WeekHours } = require("../models");

module.exports = {
  async getHours(req, res){
    const days = await WeekHours.findAll();
    return res.send(days);
  },
  async getDays(req, res){
    const day = req.query.dia;
    const days = await WeekHours.findAll({
      attributes: ['idWeekhours', 'hora'],
      where: {
        diaSemana: day,
      }
    });
    return res.send({[day]: days});
  },
  async createHours(req, res) {
    try{
      const { hora, diaSemana } = req.body;
      const [hours, created] = await WeekHours.findOrCreate({
        where: { hora, diaSemana },
      });
      console.log(hora, diaSemana)
      if(!created)
        return res.send({massage: "Date and Hours already created"})

      return res.send({hours, massage: "Date and Hours successful define"})
    } catch (err) {
      return res.status(400).send({error: "Error on create Date and Hour"})
    }
  }
}
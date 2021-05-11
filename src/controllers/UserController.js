const { UserSchedule, Users, WeekHours } = require('../models');
const validation = require('../utils/regex');

module.exports = {
  async userProfile(req, res) {
    try{
      const user = await Users.findAll({
        attributes: { 
          exclude: ['senha', 'admin'] 
        },
        where: {
         idUsu: req.userId
        }
      });
      user.senha = undefined;
      return res.send(user)
    } catch (err) {
      res.status(400).send({ error: "Error on show Profile logged"})
    }
  },
  async userSchedule(req, res) {
    try{
      const agendamentos = await UserSchedule.findAll({
        attributes: {
          exclude: ['userAgenda']
        },
        include: [{
          model: WeekHours,
          attributes: {
            exclude: ['idWeekhours']
          },
        }],
        where: {
          userAgenda: req.userId
        }
      });

      return res.send({ agendamentos })

    } catch (err) {
      res.status(400).send({ error: "Error on show Profile logged"})
    }
  },
  async updateAdress(req, res){
    try{
      const userAddress = req.body;

      const updateInfo = await Users.update(userAddress, {
        where: {
          idUsu: req.userId
        }
      });

      if(updateInfo[0] === 0)
        return res.send({ message: "Address Update error" })

      return res.send({ message: 'Adress Updated'})
    } catch (err){
      res.status(400).send({ error: "Error on update Address values"})
    }
  },
  async updateProfile(req, res) {
    try {
      const params = req.params.info
      const { info } = await req.body;

      validation.map((validate) => {
        if(params === validate.nome && !validate.regex.test(info))
          throw new Error(validate.error);
      })

      if(params == "email" || params == "cpf"){
        const exist = await Users.findOne({
          attributes: [params],
          where: {
            [params]: info
          }
        }); 
        if(exist)
          return res.status(400).send({ error: "Information already used"})
      } else if(params !== "nome" && params !== "celular") {
        return res.status(401).send({ error: "Error on change"})
      }
         
      const updateInfo = await Users.update({ [params]: info }, {
        where: {
          idUsu: req.userId
        }
      });

      if(updateInfo[0] === 0)
        return res.send({ message: "Perfil Update error" })

      return res.send({ message: 'Perfil Updated'})
    } catch (err) {
      return res.status(401).send({error: err.message})
    }
  }
}
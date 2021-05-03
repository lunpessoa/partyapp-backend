const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize"); 
const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');

function generateToken (params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: "2 days",
  })
}; 

module.exports = {
  async index(req, res){
    const user = await Users.findAll();

    return res.json(user)
  },


  async store(req, res) {
    try{
      const { email , cpf,  senha } = req.body;

      const haveUsers = await Users.findOne({
        where: {
          [Op.or]: {
            email: email,
            cpf: cpf,
          }
        }
      });

      if(haveUsers)
        return res.status(400).send({error: "Previously registered data"});
      
      const passwordHash = await bcrypt.hash(senha, 10);
      
      req.body.senha = passwordHash;
      const user = await Users.create(req.body);

      user.senha = undefined;
      user.admin = undefined;

      return res.send({ user, token: generateToken({ id: user.idUsu }) });

    } catch (err) {
      return res.status(400).send({error: "Registration Failed"});
    }
  },

  async authenticate(req, res) {
    const { email, senha } = req.body;

    const user = await Users.findOne({ where: { email: email }});

    if(!user)
      return res.status(400).send({ error: 'User not found'});
    
    if(!await bcrypt.compare(senha, user.senha))
      return res.status(400).send({ error: 'Invalid Password'});

    res.send({ user: {
      idUsu: user.idUsu,
      nome: user.nome,
      email: user.email,
    }, token: generateToken({ id: user.idUsu }) });
  }
};
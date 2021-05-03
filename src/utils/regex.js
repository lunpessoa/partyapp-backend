const validation = [
  {
    nome: "email",
    regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    error: "Invalid Email",
  },
  {
    nome: "cpf",
    regex: /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
    error: "Invalid CPF",
  },
  {
    nome: "celular",
    regex: /^(?:\d{2})[9]\d{8}$/,
    error: "Invalid Cellphone Number",
  }
]

module.exports = validation;



module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    //Campos do Banco - Tabela Users
    idUsu:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    celular: {
      allowNull: false,
      type: DataTypes.STRING(11),
    },
    cpf: {
      allowNull: false,
      type: DataTypes.STRING(11),
    },
    senha: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    admin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cep: {
      allowNull: true,
      type: DataTypes.STRING(8),
    },
    rua: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    bairro: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    numero: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    complemento: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    cidade: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nomeEndereco: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'users',
    sequelize
  });

  return Users;
}
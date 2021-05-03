module.exports = (sequelize, DataTypes) => {
  const WeekHours = sequelize.define('WeekHours', {
    idWeekhours: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    hora: {
      allowNull: false,
      type: DataTypes.TIME,
    },
    diaSemana: {
      allowNull: false,
      type: DataTypes.ENUM('Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'),
    },
  }, {
    tableName: 'week_hours',
    sequelize
  });

  WeekHours.associate = models => {
    WeekHours.belongsTo(models.UserSchedule, {
      foreignKey: 'idWeekhours',
    })
  }
  
  return WeekHours
}
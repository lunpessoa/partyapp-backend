module.exports = (sequelize, DataTypes) => {
  const UserSchedule = sequelize.define('UserSchedule', {
    idAgenda: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    data: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
  }, {
    tableName: 'user_schedule',
    sequelize
  });

  UserSchedule.associate = models => {
    UserSchedule.belongsTo(models.Users, {
      foreignKey: 'userAgenda',
      onDelete: 'cascade'
    })
    UserSchedule.belongsTo(models.WeekHours, {
      foreignKey: 'idWeekhours',
    })
  }
  
  return UserSchedule;
}
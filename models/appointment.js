module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define("Appointment", {
    slot: { 
      type: DataTypes.INTEGER, 
      allowNull: true
    },
    date: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    service:{
      type:DataTypes.INTEGER,
      allowNull :true
    }
  
  });
  Appointment.associate = function(models) {
    Appointment.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
    Appointment.belongsTo(models.Employee, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return Appointment;
};

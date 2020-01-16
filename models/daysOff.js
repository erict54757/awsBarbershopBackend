module.exports = function(sequelize, DataTypes) {
    var daysOff = sequelize.define("daysOff", {
      slotBegin: { 
        type: DataTypes.INTEGER, 
        allowNull: true
      },
      slotEnd: { 
        type: DataTypes.INTEGER, 
        allowNull: true
      },
      date: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
    
    });
    daysOff.associate = function(models) {
      
      daysOff.belongsTo(models.Employee, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE',
        hooks: true
      });
    };
  
    return daysOff;
  };
  
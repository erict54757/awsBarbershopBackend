module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 2
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: 5
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        isEmail: true,
        len: [1, 100]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    // password
    account_key: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [8]
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Saturday: {
      type:DataTypes.STRING,
      defaultValue:"off"
    }, 
    SaturdayshiftStartTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    SaturdayshiftEndTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 10
    },
    Sunday: {
      type:DataTypes.STRING,
      defaultValue:"off"
    }, 
    SundayshiftStartTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      len  :1,
      defaultValue:0
    },
    SundayshiftEndTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 10
    },
    Monday: {
      type:DataTypes.STRING,
      defaultValue:"off"
    }, 
    MondayshiftStartTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    MondayshiftEndTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 10
    },
    Tuesday: {
      type:DataTypes.STRING,
      defaultValue:"off"
    }, 
    TuesdayshiftStartTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    TuesdayshiftEndTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 10
    },
    Wednesday: {
      type:DataTypes.STRING,
      defaultValue:"off"
    }, 
    WednesdayshiftStartTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 0
    },
    WednesdayshiftEndTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue:10
    },
    Thursday: {
      type:DataTypes.STRING,
      defaultValue:"off"
    }, 
    ThursdayshiftStartTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue:0
    },
    ThursdayshiftEndTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue:10
    },
    Friday: {
      type:DataTypes.STRING,
      defaultValue:"off"
    }, 
    FridayshiftStartTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue:0
    },
    FridayshiftEndTime: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue:10
    },
    
  });

  Employee.associate = function(models) {
    Employee.hasMany(models.Appointment, {});
  };

 

  Employee.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  Employee.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.account_key);
  };
  return Employee;
};

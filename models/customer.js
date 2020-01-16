module.exports = function (sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "None",
      validate: {
        len: [1, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 140]
      }
    },
    // password
    account_key: {
      type: DataTypes.STRING,
      required: false,
      defaultValue: "None",
      validate: {
        len: [4]
      }
    }
  });

  Customer.associate = function (models) {
    Customer.hasMany(models.Appointment, {});
  };

  Customer.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  Customer.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.account_key);
  };
  return Customer;
};

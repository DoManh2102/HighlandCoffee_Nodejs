'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // check định dạng email
        notNull: true,
        notEmpty: true,    // không cho phép trống
        len: [12, 30],  // độ dài từ 12-30 kí tự
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [4, 100],
        checkLen(value) {
          if (value.length >= 4 && value.length <= 100) {
            return true
          }
          else {
            throw new Error("độ dài phải từ 4-12 kí tự")
          }
        }
      }
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "user_name không được null!"
        },
        notEmpty: {
          msg: "user_name không được để trống!"
        },
        len: [4, 20],
      }
    },
    avata: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "Client"
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
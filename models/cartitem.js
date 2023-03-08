'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Cart }) {
      this.belongsTo(Cart, { foreignKey: 'cart_id' })
    }
  }
  CartItem.init({
    product_name: DataTypes.STRING,
    product_img: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    cart_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};
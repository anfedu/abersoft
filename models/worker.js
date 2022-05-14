"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Worker.belongsTo(models.Customer, {
        foreignKey: "customerId",
        as: "customer",
      });
    }
  }
  Worker.init(
    {
      customerId: DataTypes.INTEGER,
      workerId: DataTypes.STRING,
      email: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Worker",
    }
  );
  return Worker;
};

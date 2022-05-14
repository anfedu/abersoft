"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.Company, {
        as: "company",
        foreignKey: {
          name: "companyId",
        },
      });
      Customer.hasMany(models.ProjectManager, {
        as: "projectmanagers",
        foreignKey: {
          name: "customerId",
        },
      });
      Customer.hasMany(models.Worker, {
        as: "workers",
        foreignKey: {
          name: "customerId",
        },
      });
    }
  }
  Customer.init(
    {
      companyId: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};

const { DataTypes } = require("sequelize");
const sequelize = require("../config/postsql.js");
const AssetCategory = require("./assetCategory");
const Asset = sequelize.define(
  "Asset",
  {
    assetId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER, // Foreign key referencing AssetCategory
      allowNull: false,
      references: {
        model: "AssetCategory", // Referencing the table name, not the model object
        key: "id",
      },
    },
    branch: {
      type: DataTypes.ENUM("Branch1", "Branch2"),
    },
    status: {
      type: DataTypes.ENUM("in-stock", "issued", "repair", "scrapped"),
      defaultValue: "in-stock",
    },
  },
  {
    timestamps: true,
  }
);



module.exports = Asset;

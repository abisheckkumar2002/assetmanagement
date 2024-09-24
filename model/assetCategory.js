const { DataTypes } = require("sequelize");
const sequelize = require("../config/postsql.js");
const Asset = require("./asset.js");

const AssetCategory = sequelize.define(
  "AssetCategory",
  {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Active',
    },
  },
  {
    timestamps: true,
  }
);



module.exports = AssetCategory;

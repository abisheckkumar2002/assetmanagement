const { DataTypes } = require("sequelize");
const sequelize = require("../config/postsql.js"); // Correct PostgreSQL connection
const Asset = require("./asset.js");

const Repair = sequelize.define(
  "repair",
  {
    assetId: {
      type: DataTypes.INTEGER,
      references: {
        model: Asset,
        key: "id",
      },
      allowNull: false,
    },
    
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Repair;

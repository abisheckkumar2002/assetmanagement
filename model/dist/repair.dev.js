"use strict";

var _require = require("sequelize"),
    DataTypes = _require.DataTypes;

var sequelize = require("../config/postsql.js"); // Correct PostgreSQL connection


var Asset = require("./asset.js");

var Repair = sequelize.define("repair", {
  assetId: {
    type: DataTypes.INTEGER,
    references: {
      model: Asset,
      key: "id"
    },
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Active"
  }
}, {
  timestamps: true
});
module.exports = Repair;
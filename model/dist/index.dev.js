"use strict";

var Asset = require("./asset");

var AssetCategory = require("./assetCategory");

var Employee = require('./user');

var AssetStatus = require('./assetStatus');

var Repair = require('./repair.js');

AssetCategory.hasMany(Asset, {
  foreignKey: "categoryId"
});
Asset.belongsTo(AssetCategory, {
  foreignKey: "categoryId"
});
Employee.hasMany(AssetStatus, {
  foreignKey: "employeeId"
});
AssetStatus.belongsTo(Asset, {
  foreignKey: "assetId"
});
AssetStatus.belongsTo(Employee, {
  foreignKey: "employeeId"
});
Asset.hasOne(AssetStatus, {
  foreignKey: "assetId"
});
Repair.belongsTo(Asset, {
  foreignKey: "assetId"
});
Asset.hasOne(Repair, {
  foreignKey: "assetId"
}); // Export models

module.exports = {
  Asset: Asset,
  AssetCategory: AssetCategory,
  Employee: Employee,
  AssetStatus: AssetStatus,
  Repair: Repair
};
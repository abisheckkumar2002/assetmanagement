const Asset = require("./asset");
const AssetCategory = require("./assetCategory");
const Employee =require('./user')
const AssetStatus=require('./assetStatus')
const Repair =require('./repair.js')

AssetCategory.hasMany(Asset, { foreignKey: "categoryId" });
Asset.belongsTo(AssetCategory, { foreignKey: "categoryId" });
Employee.hasMany(AssetStatus, { foreignKey: "employeeId" });
AssetStatus.belongsTo(Asset, { foreignKey: "assetId" });
AssetStatus.belongsTo(Employee,{ foreignKey: "employeeId" })
Asset.hasOne(AssetStatus,{ foreignKey: "assetId" })
Repair.belongsTo(Asset, { foreignKey: "assetId" })
Asset.hasOne(Repair,{ foreignKey: "assetId" })

// Export models
module.exports = {
  Asset,
  AssetCategory,
  Employee,
  AssetStatus,
  Repair
};

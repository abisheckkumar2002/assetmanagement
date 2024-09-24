const { DataTypes } = require("sequelize");
const sequelize = require("../config/postsql.js"); // Correct PostgreSQL connection
const Asset = require("./asset.js");
const Employee = require("./user.js");

const AssetStatus = sequelize.define(
  "AssetStatus",
  {
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Employee,
        key: "id",
      },
      allowNull: false,
    },

    assetId: {
      type: DataTypes.INTEGER,
      references: {
        model: Asset,
        key: "id",
      },
      allowNull: false,
    },

    issueDate: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },


    // returnDate: DataTypes.DATE,
  },
  {
    timestamps: true,
    tableName: "AssetStatus",
  }
);

AssetStatus.associate = () => {
  //becuase the circular dependencies avoidance
  AssetStatus.belongsTo(Asset, { foreignKey: "assetId" });
  AssetStatus.belongsTo(Employee,{ foreignKey: "employeeId" })
};

module.exports = AssetStatus;

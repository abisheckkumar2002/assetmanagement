const { DataTypes } = require("sequelize");
const sequelize = require("../config/postsql.js"); // Correct PostgreSQL connection
const AssetStatus =require('./assetStatus.js')

const Employee = sequelize.define(
  "employee",
  {
   
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    EmpId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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


Employee.associate = () => {
  //becuase the circular dependencies avoidance
  Employee.hasMany(AssetStatus, { foreignKey: "employeeId" });

};


module.exports = Employee;


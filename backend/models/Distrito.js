const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Distrito = sequelize.define("Distrito", {
  coddis: {
    type: DataTypes.CHAR(3),
    primaryKey: true,
    allowNull: false
  },
  nomdis: {
    type: DataTypes.STRING(35),
    allowNull: false
  }
}, {
  tableName: "Distrito",
  timestamps: false
});

module.exports = Distrito;

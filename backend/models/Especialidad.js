const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Especialidad = sequelize.define("Especialidad", {
  codesp: {
    type: DataTypes.CHAR(3),
    primaryKey: true,
    allowNull: false,
  },
  nomesp: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  costo: {
    type: DataTypes.DECIMAL(8,2)
  }
}, {
  tableName: "Especialidad",
  timestamps: false
});

module.exports = Especialidad;

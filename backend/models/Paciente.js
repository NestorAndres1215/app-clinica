const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Distrito = require("./Distrito");

const Paciente = sequelize.define("Paciente", {
  codpac: {
    type: DataTypes.CHAR(6),
    primaryKey: true,
    allowNull: false
  },
  nompac: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  dnipac: {
    type: DataTypes.CHAR(8)
  },
  tel_cel: {
    type: DataTypes.STRING(10)
  },
  dirpac: {
    type: DataTypes.STRING(50)
  },
  coddis: {
    type: DataTypes.CHAR(3),
    references: {
      model: Distrito,
      key: "coddis"
    }
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: "Pacientes",
  timestamps: false
});

Paciente.belongsTo(Distrito, { foreignKey: "coddis" });

module.exports = Paciente;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Especialidad = require("./Especialidad");
const Distrito = require("./Distrito");

const Medico = sequelize.define("Medico", {
  codmed: {
    type: DataTypes.CHAR(5),
    primaryKey: true,
    allowNull: false
  },
  codesp: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    references: {
      model: Especialidad,
      key: "codesp"
    }
  },
  nommed: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  anio_colegio: {
    type: DataTypes.INTEGER
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
  tableName: "Medicos",
  timestamps: false
});

// Relaciones
Medico.belongsTo(Especialidad, { foreignKey: "codesp" });
Medico.belongsTo(Distrito, { foreignKey: "coddis" });

module.exports = Medico;

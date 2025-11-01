const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Medico = require("./Medico");
const Paciente = require("./Paciente");

const Cita = sequelize.define("Cita", {
  nrocita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codmed: {
    type: DataTypes.CHAR(5),
    references: {
      model: Medico,
      key: "codmed"
    }
  },
  codpac: {
    type: DataTypes.CHAR(6),
    references: {
      model: Paciente,
      key: "codpac"
    }
  },
  tipo: {
    type: DataTypes.INTEGER
  },
  pago: {
    type: DataTypes.DECIMAL(8,2)
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  descrip: {
    type: DataTypes.STRING(400)
  }
}, {
  tableName: "Citas",
  timestamps: false
});

// Relaciones
Cita.belongsTo(Medico, { foreignKey: "codmed" });
Cita.belongsTo(Paciente, { foreignKey: "codpac" });

module.exports = Cita;

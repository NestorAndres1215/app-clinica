const sequelize = require("../config/db");

const Especialidad = require("./Especialidad");
const Distrito = require("./Distrito");
const Medico = require("./Medico");
const Paciente = require("./Paciente");
const Cita = require("./Cita");

// Aquí puedes sincronizar todas las tablas si quieres
// sequelize.sync({ alter: true })
//   .then(() => console.log("Tablas sincronizadas"))
//   .catch(err => console.log(err));

module.exports = {
  sequelize,
  Especialidad,
  Distrito,
  Medico,
  Paciente,
  Cita
};

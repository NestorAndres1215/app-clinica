const { Paciente } = require("../models");

const getAll = async () => await Paciente.findAll();
const getById = async (codpac) => await Paciente.findByPk(codpac);
const create = async (data) => await Paciente.create(data);
const update = async (codpac, data) => {
  const p = await Paciente.findByPk(codpac);
  if(!p) throw new Error("Paciente no encontrado");
  return await p.update(data);
};
const remove = async (codpac) => {
  const p = await Paciente.findByPk(codpac);
  if(!p) throw new Error("Paciente no encontrado");
  return await p.destroy();
};

module.exports = { getAll, getById, create, update, remove };

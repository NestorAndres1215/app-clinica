const { Medico } = require("../models");

const getAll = async () => await Medico.findAll();
const getById = async (codmed) => await Medico.findByPk(codmed);
const create = async (data) => await Medico.create(data);
const update = async (codmed, data) => {
  const m = await Medico.findByPk(codmed);
  if(!m) throw new Error("Medico no encontrado");
  return await m.update(data);
};
const remove = async (codmed) => {
  const m = await Medico.findByPk(codmed);
  if(!m) throw new Error("Medico no encontrado");
  return await m.destroy();
};

module.exports = { getAll, getById, create, update, remove };

const { Especialidad } = require("../models");

const getAll = async () => {
  return await Especialidad.findAll();
};

const getById = async (codesp) => {
  return await Especialidad.findByPk(codesp);
};

const create = async (data) => {
  return await Especialidad.create(data);
};

const update = async (codesp, data) => {
  const esp = await Especialidad.findByPk(codesp);
  if (!esp) throw new Error("Especialidad no encontrada");
  return await esp.update(data);
};

const remove = async (codesp) => {
  const esp = await Especialidad.findByPk(codesp);
  if (!esp) throw new Error("Especialidad no encontrada");
  return await esp.destroy();
};

module.exports = { getAll, getById, create, update, remove };

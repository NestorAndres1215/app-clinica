const { Cita } = require("../models");

const getAll = async () => await Cita.findAll();
const getById = async (nrocita) => await Cita.findByPk(nrocita);
const create = async (data) => await Cita.create(data);
const update = async (nrocita, data) => {
  const c = await Cita.findByPk(nrocita);
  if(!c) throw new Error("Cita no encontrada");
  return await c.update(data);
};
const remove = async (nrocita) => {
  const c = await Cita.findByPk(nrocita);
  if(!c) throw new Error("Cita no encontrada");
  return await c.destroy();
};

module.exports = { getAll, getById, create, update, remove };

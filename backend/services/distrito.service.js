const { Distrito } = require("../models");

const getAll = async () => await Distrito.findAll();
const getById = async (coddis) => await Distrito.findByPk(coddis);
const create = async (data) => await Distrito.create(data);
const update = async (coddis, data) => {
  const d = await Distrito.findByPk(coddis);
  if(!d) throw new Error("Distrito no encontrado");
  return await d.update(data);
};
const remove = async (coddis) => {
  const d = await Distrito.findByPk(coddis);
  if(!d) throw new Error("Distrito no encontrado");
  return await d.destroy();
};

module.exports = { getAll, getById, create, update, remove };

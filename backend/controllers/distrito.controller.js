const DistritoService = require("../services/distrito.service");

const getAllDistritos = async (req, res) => {
  try {
    const data = await DistritoService.getAll();
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const getDistritoById = async (req, res) => {
  try {
    const data = await DistritoService.getById(req.params.coddis);
    if(!data) return res.status(404).json({ message: "No encontrado" });
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const createDistrito = async (req, res) => {
  try {
    const data = await DistritoService.create(req.body);
    res.status(201).json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDistrito = async (req, res) => {
  try {
    const data = await DistritoService.update(req.params.coddis, req.body);
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDistrito = async (req, res) => {
  try {
    await DistritoService.remove(req.params.coddis);
    res.json({ message: "Eliminado correctamente" });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDistritos,
  getDistritoById,
  createDistrito,
  updateDistrito,
  deleteDistrito
};

const EspecialidadService = require("../services/especialidad.service");

const getAllEspecialidades = async (req,res) => {
  try {
    const data = await EspecialidadService.getAll();
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const getEspecialidadById = async (req,res) => {
  try {
    const data = await EspecialidadService.getById(req.params.codesp);
    if(!data) return res.status(404).json({ message: "No encontrada" });
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const createEspecialidad = async (req,res) => {
  try {
    const data = await EspecialidadService.create(req.body);
    res.status(201).json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEspecialidad = async (req,res) => {
  try {
    const data = await EspecialidadService.update(req.params.codesp, req.body);
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEspecialidad = async (req,res) => {
  try {
    await EspecialidadService.remove(req.params.codesp);
    res.json({ message: "Eliminada correctamente" });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllEspecialidades,
  getEspecialidadById,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad
};

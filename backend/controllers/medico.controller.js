const MedicoService = require("../services/medico.service");

const getAllMedicos = async (req,res) => {
  try {
    const data = await MedicoService.getAll();
    res.json(data);
  } catch(err){ res.status(500).json({ error: err.message }) }
};

const getMedicoById = async (req,res) => {
  try {
    const data = await MedicoService.getById(req.params.codmed);
    if(!data) return res.status(404).json({ message: "No encontrado" });
    res.json(data);
  } catch(err){ res.status(500).json({ error: err.message }) }
};

const createMedico = async (req,res) => {
  try {
    const data = await MedicoService.create(req.body);
    res.status(201).json(data);
  } catch(err){ res.status(500).json({ error: err.message }) }
};

const updateMedico = async (req,res) => {
  try {
    const data = await MedicoService.update(req.params.codmed, req.body);
    res.json(data);
  } catch(err){ res.status(500).json({ error: err.message }) }
};

const deleteMedico = async (req,res) => {
  try {
    await MedicoService.remove(req.params.codmed);
    res.json({ message: "Eliminado correctamente" });
  } catch(err){ res.status(500).json({ error: err.message }) }
};

module.exports = { getAllMedicos, getMedicoById, createMedico, updateMedico, deleteMedico };

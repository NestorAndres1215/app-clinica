const PacienteService = require("../services/paciente.service");

const getAllPacientes = async (req,res) => {
  try { const data = await PacienteService.getAll(); res.json(data); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

const getPacienteById = async (req,res) => {
  try {
    const data = await PacienteService.getById(req.params.codpac);
    if(!data) return res.status(404).json({ message: "No encontrado" });
    res.json(data);
  } catch(err){ res.status(500).json({ error: err.message }); }
};

const createPaciente = async (req,res) => {
  try { const data = await PacienteService.create(req.body); res.status(201).json(data); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

const updatePaciente = async (req,res) => {
  try { const data = await PacienteService.update(req.params.codpac, req.body); res.json(data); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

const deletePaciente = async (req,res) => {
  try { await PacienteService.remove(req.params.codpac); res.json({ message: "Eliminado correctamente" }); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

module.exports = { getAllPacientes, getPacienteById, createPaciente, updatePaciente, deletePaciente };

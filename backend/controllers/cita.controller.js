const CitaService = require("../services/cita.service");

const getAllCitas = async (req,res) => {
  try { const data = await CitaService.getAll(); res.json(data); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

const getCitaById = async (req,res) => {
  try {
    const data = await CitaService.getById(req.params.nrocita);
    if(!data) return res.status(404).json({ message: "No encontrada" });
    res.json(data);
  } catch(err){ res.status(500).json({ error: err.message }); }
};

const createCita = async (req,res) => {
  try { const data = await CitaService.create(req.body); res.status(201).json(data); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

const updateCita = async (req,res) => {
  try { const data = await CitaService.update(req.params.nrocita, req.body); res.json(data); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

const deleteCita = async (req,res) => {
  try { await CitaService.remove(req.params.nrocita); res.json({ message: "Eliminada correctamente" }); }
  catch(err){ res.status(500).json({ error: err.message }); }
};

module.exports = { getAllCitas, getCitaById, createCita, updateCita, deleteCita };

import axios from "axios";

const API_URL = "http://localhost:3000/api/pacientes";

export const getPacientes = () => axios.get(API_URL);
export const getPacienteById = (codpac) => axios.get(`${API_URL}/${codpac}`);
export const createPaciente = (data) => axios.post(API_URL, data);
export const updatePaciente = (codpac, data) => axios.put(`${API_URL}/${codpac}`, data);
export const deletePaciente = (codpac) => axios.delete(`${API_URL}/${codpac}`);

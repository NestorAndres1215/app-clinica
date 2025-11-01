import axios from "axios";

const API_URL = "http://localhost:3000/api/medicos";

export const getMedicos = () => axios.get(API_URL);
export const getMedicoById = (codmed) => axios.get(`${API_URL}/${codmed}`);
export const createMedico = (data) => axios.post(API_URL, data);
export const updateMedico = (codmed, data) => axios.put(`${API_URL}/${codmed}`, data);
export const deleteMedico = (codmed) => axios.delete(`${API_URL}/${codmed}`);

import axios from "axios";

const API_URL = "http://localhost:3000/api/especialidades";

export const getEspecialidades = () => axios.get(API_URL);
export const getEspecialidadById = (codesp) => axios.get(`${API_URL}/${codesp}`);
export const createEspecialidad = (data) => axios.post(API_URL, data);
export const updateEspecialidad = (codesp, data) => axios.put(`${API_URL}/${codesp}`, data);
export const deleteEspecialidad = (codesp) => axios.delete(`${API_URL}/${codesp}`);

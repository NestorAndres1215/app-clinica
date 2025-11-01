import axios from "axios";

const API_URL = "http://localhost:3000/api/citas";

export const getCitas = () => axios.get(API_URL);
export const getCitaById = (nrocita) => axios.get(`${API_URL}/${nrocita}`);
export const createCita = (data) => axios.post(API_URL, data);
export const updateCita = (nrocita, data) => axios.put(`${API_URL}/${nrocita}`, data);
export const deleteCita = (nrocita) => axios.delete(`${API_URL}/${nrocita}`);

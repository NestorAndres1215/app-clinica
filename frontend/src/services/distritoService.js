import axios from "axios";

const API_URL = "http://localhost:3000/api/distritos";

export const getDistritos = () => axios.get(API_URL);
export const getDistritoById = (coddis) => axios.get(`${API_URL}/${coddis}`);
export const createDistrito = (data) => axios.post(API_URL, data);
export const updateDistrito = (coddis, data) => axios.put(`${API_URL}/${coddis}`, data);
export const deleteDistrito = (coddis) => axios.delete(`${API_URL}/${coddis}`);

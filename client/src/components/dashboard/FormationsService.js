import axios from 'axios';

const API_URL = 'http://localhost:3001/formation';

const getAll = () => {
  return axios.get(API_URL);
};

const create = data => {
  return axios.post(API_URL, data);
};

const update = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const remove = id => {
  return axios.delete(`${API_URL}/${id}`);
};

const removeAll = () => {
  return axios.delete(API_URL);
};

const findByNom = nom => {
  return axios.get(`${API_URL}?nom=${nom}`);
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
  findByNom,
};

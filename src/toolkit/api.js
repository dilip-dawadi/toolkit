import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

// fetch Food
export const getFoods = () => API.get(`/food`)
export const createaFood = (formData) => API.post(`/food`, formData);
export const updateaFood = (id, formData) => API.patch(`/food/${id}`, formData);
export const deleteaFood = (id) => API.delete(`/food/delete/${id}`)
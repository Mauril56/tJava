// src/services/ApiService.js
import axios from "axios";

const baseUrl = "http://192.168.11.93:8080/api"; // URL de base de donné

const ApiService = {
  login: (username, password) => {
    return axios.post(`${baseUrl}/login`, { username, password });
  },

  getUsers: () => {
    return axios.get(`${baseUrl}/users`);
  },
};

export default ApiService;

/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class ClubService {
  getAllClubs() {
    return axios.get(`${API_URL}clubs`, { headers: authHeader() });
  }

  createClub(name, city) {
    return axios.post(`${API_URL}clubs`, {
      name,
      city,
    }, { headers: authHeader() });
  }

  deleteClub(id) {
    return axios.delete(`${API_URL}clubs/${id}`, { headers: authHeader() });
  }
}

export default new ClubService();

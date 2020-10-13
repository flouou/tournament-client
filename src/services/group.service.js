/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class GroupService {
  getAllGroups() {
    return axios.get(`${API_URL}groups`, { headers: authHeader() });
  }

  createGroup(name, classId, clubId) {
    return axios.post(`${API_URL}groups`, {
      name,
      classification: { id: classId },
      club: { id: clubId },
    }, { headers: authHeader() });
  }
}

export default new GroupService();

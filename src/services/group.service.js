/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL;

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

  updateTime(groupId, time) {
    return axios.post(`${API_URL}groups/${groupId}/time`, {
      time,
    }, { headers: authHeader() });
  }

  updateRating(groupId, ratings) {
    return axios.post(`${API_URL}groups/${groupId}/rating`, {
      ratings,
    }, { headers: authHeader() });
  }
}

export default new GroupService();

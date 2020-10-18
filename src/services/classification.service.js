/* eslint-disable class-methods-use-this */
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL;

class ClassificationService {
  getAllClassifications() {
    return axios.get(`${API_URL}classifications`, { headers: authHeader() });
  }

  addClassification(name, description) {
    return axios.post(`${API_URL}classifications`, {
      name,
      description,
    }, { headers: authHeader() });
  }
}

export default new ClassificationService();

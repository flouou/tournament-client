import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class AuthService {
  // eslint-disable-next-line class-methods-use-this
  async login(user) {
    return axios.post(`${API_URL}login`, {
      username: user.username,
      password: user.password,
    }).then((response) => {
      if (response.data.Authorization) {
        localStorage.setItem('user', response.data.Authorization);
      }
      console.log('authmodule', response);
      return response;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();

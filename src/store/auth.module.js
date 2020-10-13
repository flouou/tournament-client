/* eslint-disable import/prefer-default-export */
import AuthService from '../services/auth.service';

const userToken = localStorage.getItem('user');
const initialState = userToken
  ? { status: { loggedIn: true }, user: userToken }
  : { status: { loggedIn: false }, user: null };

export default {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (token) => {
          console.log(token);
          commit('loginSuccess', token);
          return Promise.resolve(token);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        },
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
  },
};

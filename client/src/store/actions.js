import api from '../api';

export default {
  AUTH_REQUEST: ({ commit }, user) => {
    return new Promise(async (resolve, reject) => {
      commit('AUTH_REQUEST');
      try {
        const { token } = await api.authenticate(user);
        commit('AUTH_SUCCESS', token);
        resolve(token);
      } catch (error) {
        commit('AUTH_ERROR', error);
        reject(error);
      }
    });
  },

  AUTH_LOGOUT: ({ commit }) => {
    return new Promise((resolve) => {
      commit('AUTH_LOGOUT');
      api.logout();
      resolve();
    });
  },
};

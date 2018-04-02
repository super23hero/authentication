export default {
  LOGIN: ({ commit }, { login, password }) => {
    // TODO: autenticar
    console.log(login, password)
    commit('SET_AUTHENTICATED', true);
  }
};

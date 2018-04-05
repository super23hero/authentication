export default {
  AUTH_REQUEST: (state) => {
    state.status = 'loading';
  },
  AUTH_SUCCESS: (state, token) => {
    state.status = 'success';
    state.token = token;
  },
  AUTH_ERROR: (state) => {
    state.status = 'error';
  },
  AUTH_LOGOUT: (state) => {
    state.token = '';
  },
};

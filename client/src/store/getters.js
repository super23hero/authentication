export default {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
};

import axios from 'axios';
import store from 'store';

const instance = axios.create({
  baseURL: 'http://localhost:3000/v1',
});

const token = store.get('user-token');
if (token) instance.defaults.headers.common.Authorization = token;
console.log(token);

instance
  .interceptors
  .response
  .use(undefined, error => new Promise(() => {
    if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
      store.dispatch('AUTH_LOGOUT');
    }
    throw error;
  }));

export default {
  authenticate: user => instance
    .post('/auth', user)
    .then((response) => {
      store.set('user-token', response.data.token);
      instance.defaults.headers.common.Authorization = response.data.token;
      return response.data;
    })
    .catch((error) => {
      store.remove('user-token');
      throw Error(error);
    }),

  logout: () => {
    store.remove('user-token');
    delete instance.defaults.headers.common.Authorization;
  },
}

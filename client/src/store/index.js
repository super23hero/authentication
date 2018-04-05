import Vue from 'vue';
import Vuex from 'vuex';
import store from 'store';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    children: [],
    token: store.get('user-token') || '',
    status: '',
  },
  actions,
  mutations,
  getters,
});

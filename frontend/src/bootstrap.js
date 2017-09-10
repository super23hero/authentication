import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import _ from 'lodash'

window.Vue = Vue;
Vue.use(VueRouter);
window.axios = axios;
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};
window._ = _;

window.API_URL = 'http://localhost:3000/v1/';

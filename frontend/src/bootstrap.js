import Vue from 'vue'
import VueRouter from 'vue-router'
import axiosLib from 'axios'
import _ from 'lodash'

window.Vue = Vue;
Vue.use(VueRouter);
window._ = _;

window.API_URL = 'http://localhost:3000/v1/';
window.axios = axiosLib.create({
  baseURL: API_URL
});

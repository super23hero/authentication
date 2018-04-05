import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Admin from '@/admin/Admin';
import Login from '@/admin/views/Login';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }

  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }

  next('/login');
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
  ],
});

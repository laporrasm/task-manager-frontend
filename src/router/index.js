import Vue from 'vue';
import VueRouter from 'vue-router';

import Account from '../views/Account.vue';
import Completed from '../views/Completed.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Tasks from '../views/Tasks.vue';
import ToDo from '../views/ToDo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        redirect: '/tasks',
      },
      {
        path: '/tasks',
        component: Tasks,
        children: [
          {
            path: '',
            name: 'To Do',
            component: ToDo,
          },
          {
            path: 'completed',
            name: 'Completed',
            component: Completed,
          },
        ],
      },
      {
        path: '/account',
        name: 'Account',
        component: Account,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) return next();
    next('/login');
  }
  return next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('token')) return next('/');
  }
  return next();
});

export default router;

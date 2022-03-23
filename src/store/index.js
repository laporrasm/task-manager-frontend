import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import tasks from './modules/tasks';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: [],
  },
  mutations: {
    addAlert(state, alert) {
      state.alerts.unshift(alert);
    },

    removeAlert(state, index) {
      state.alerts.splice(index, 1);
    },
  },
  modules: {
    auth,
    tasks,
    user,
  },
});

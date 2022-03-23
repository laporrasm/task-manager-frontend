import Vue from 'vue';

import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import {
  uniUser,
  uniCheck,
  uniCheckSquare,
  uniEllipsisH,
  uniEditAlt,
  uniTrashAlt,
  uniUpload,
  uniAngleDown,
  uniAngleLeft,
  uniSignOutAlt,
  uniTimes,
} from 'vue-unicons/dist/icons';

import App from './App.vue';
import router from './router';
import store from './store';

import titleMixin from './mixins/titleMixin';

import './validation';
import './styles.scss';

Unicon.add([
  uniUser,
  uniCheck,
  uniCheckSquare,
  uniEllipsisH,
  uniEditAlt,
  uniTrashAlt,
  uniUpload,
  uniAngleDown,
  uniAngleLeft,
  uniSignOutAlt,
  uniTimes,
]);

Vue.use(Unicon);

Vue.mixin(titleMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

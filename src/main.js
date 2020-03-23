
import Vue from 'vue';

import 'promise-polyfill';

import router from './router';
import store from './store';

import AppCatalog from '@/AppCatalog.vue';
import AppFilterBar from '@/AppFilterBar.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(AppCatalog),
}).$mount('#catalog');

new Vue({
  router,
  store,
  render: h => h(AppFilterBar),
}).$mount('#filter');

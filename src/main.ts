import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './firebase';
import i18n from './plugins/i18n';

import '@/assets/scss/typography.scss';
import '@/assets/scss/main.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

store.dispatch('init');
store.dispatch('fetchAllQuotes');

import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/bootstrap.min.css';

Vue.config.productionTip = false;

library.add(faCheck, faTimes, faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
  ...required,
  message: 'This field is required',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

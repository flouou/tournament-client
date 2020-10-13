import Vue from 'vue';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);

extend('required', {
  ...required,
  message: 'This field is required',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

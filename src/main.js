import Vue from 'vue'
import router from "./router";
import App from './App.vue';
import VueSwal from 'vue-swal';

import { createProvider } from './vue-apollo'
Vue.use(VueSwal)

Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
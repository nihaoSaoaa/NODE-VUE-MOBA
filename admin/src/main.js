import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import http from './http'
import { upload } from './common/mixin'

Vue.prototype.$http = http
Vue.mixin(upload);

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

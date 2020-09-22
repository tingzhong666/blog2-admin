import Vue from 'vue'
import './plugins/element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'

Vue.config.productionTip = false

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

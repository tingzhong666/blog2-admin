import Vue from 'vue'
import './plugins/element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

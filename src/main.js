import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate/src";
import './assets/styles.css'

Vue.use(Vuelidate)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  validations: {},
  render: h => h(App),
}).$mount('#app')

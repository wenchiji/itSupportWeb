import Vue from 'vue'
import './plugins/axios'
import axios from './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
import * as echarts from 'echarts';
import moment from 'moment'
// import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(axios);
// Vue.use(VCharts)
Vue.use(require('vue-moment'));
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.moment = moment

window.jQuery = $;
window.$ = $;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern);
})
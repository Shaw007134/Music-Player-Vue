import 'commons/style/index.scss';
import 'babel-polyfill';
import fastclick from 'fastclick';
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import store from './store'

fastclick.attach(document.body);
// Vue.config.productionTip = false;
Vue.use(VueLazyLoad,{
  loading: require('commons/images/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  render: h => h(App),
  store,
  router,
});

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import * as m3 from './module/m3';

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

new Vue({
  render: (h) => h(App),
}).$mount('#app');

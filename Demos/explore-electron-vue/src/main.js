import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import store from './store';

Vue.use(ElementUI);

const electron = window.require('electron');
const { remote } = electron;
const fs = window.require('electron').remote.require('fs');

Vue.config.productionTip = false;

const basePath = `${remote.app.getPath('userData')}/data`;
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

Vue.prototype.fs = fs;
Vue.prototype.basePath = basePath;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

/**
 * main.ts
 *
 * vue-cli-service serve 시에 사용하는 진입점.
 *
 * web-component build 시에는 src/wcBuildApp.vue 를 진입점으로 잡고
 * vue-cli-service build 를 진행한다.
 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// build-test
// import WcApp from './wcBuildApp.vue';

Vue.config.productionTip = false;

// web-component를 호출하는 container element를 찾기 위한
// host interface 설정
declare global {
  export interface INode extends Node {
    host?: any;
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

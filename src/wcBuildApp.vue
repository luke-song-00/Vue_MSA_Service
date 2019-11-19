<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import App from './App.vue';

import VueRouter from 'vue-router';
import { routes } from './router';
import store from './store';

Vue.config.productionTip = false;

// route mode - abstract 버전 router 사용
const router = new VueRouter({
  mode: 'abstract',
  routes,
});

@Component({
  name: 'wc-app',
  router,
  store,
})
export default class WcApp extends App {
  protected mounted() {
    // abstract router 관련 적용
    this.$router.push('/');

    // web-component 호출한 container 에 mounted event emit
    // service 에서는 App component를 보내고
    // container 에선 해당 component 를 받아
    // $parent 와 $globalStore, $globalRouter 등을 연결한다.
    setTimeout(() => {
      this.$emit('mounted', this);
    }, 0);
  }
}
</script>

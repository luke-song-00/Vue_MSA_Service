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


/**
 * WcApp 은 src/App.vue 를 extends 해서 만든다.
 * 기본적으로 App.vue 에서 동작하던 걸 모두 수행 하고,
 * web component 로 동작할 때 추가적으로 필요한 부분들을
 * mounted 에 넣고 실행시킨다.
 *
 * extends 할 때 component 통째로 extends 하기 때문에
 * App.vue 에 묶여있는 template, css 도 같이 들어온다. --> ...? 원래 됐었나...?
 * 따라서, wcBuildApp.vue 에선 별도의 template, css 태그를 작성할 필요가 없다.
 *
 * main.ts 를 거치지 않기 때문에,
 * main.ts에서 수행하던 것들을 추가로 넣어줘야 한다.
 * (router 설정, store 설정 등등);
 *
 * typescript 관련 declare 설정은... 일단 보류
 */
@Component({
  name: 'wc-app',
  router,
  store,
})
export default class WcApp extends App {
  /**
   * web component 를 호출한 element;
   * shadowRoot.host --> chrome 57 / ios 10.1 이상에서 동작
   */
  public get wcHost() {
    const parentNode = this.$el.parentNode as INode;  // shadow-root
    if (parentNode.host) {
      return parentNode.host;
    }
    return null;
  }

  protected mounted() {
    // abstract router 관련 적용
    this.$router.push('/');

    // web-component 호출한 container 에 mounted event emit
    // service 에서는 App component를 보내고
    // container 에선 해당 component 를 받아
    // $parent 와 $globalStore, $globalRouter 등을 연결한다.
    setTimeout(() => {
      this.$emit('mounted', this);

      /** for-test
       * webComponent 로 빌드 된 이후
       * service App 의 component 를 확인 할 수 있다.
       */
      window.serviceApp = this;
    }, 0);
  }
}
</script>

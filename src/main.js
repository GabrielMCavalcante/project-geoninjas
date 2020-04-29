import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase';
import store from './store/store.js';
import VueChatScroll from 'vue-chat-scroll';

Vue.config.productionTip = false
Vue.use(VueChatScroll);
let app = null;

Vue.filter('unslugify', value => {
    value = value.split('-');
    for(let i = 0; i < value.length; i++) {
      value[i] = value[i].charAt(0).toUpperCase() + value[i].slice(1);
    }
    return value.join(' ');
  }
)

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>',
      store
    });
  }
});

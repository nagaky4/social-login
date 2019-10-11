import Vue from "vue";
import App from "./App.vue";
import firebase from 'firebase';
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueRouter from 'vue-router';
import { config } from './helpers/firebaseConfig';
import "./sass/index.scss";

Vue.config.productionTip = false;
Vue.use(VueRouter);
new Vue({
  router,
  store,
  vuetify,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user);
      if(user) {
        this.$router.push('/home').catch(err => {console.log(err)});
      } else {
        this.$router.push('/login').catch(err => {console.log(err)});
      }
     });
  },
  el: '#app',
  render: h => h(App)
});
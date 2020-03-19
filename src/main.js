import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebase";

import "@/assets/css/global.css";

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch("detectarUsuario", { email: user.email, uid: user.uid });
  } else {
    store.dispatch("detectarUsuario", null);
  }
  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount("#app");
});

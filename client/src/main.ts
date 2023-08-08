import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import Notifications from "vue-notification";

Vue.config.productionTip = false;

const customAxios = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5050/api/v1",
});



Vue.use(VueAxios, customAxios);
Vue.use(Notifications);


new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

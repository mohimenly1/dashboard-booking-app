/**
=========================================================
* Vue Soft UI Dashboard - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

import "./assets/css/theme.min.css";
import "./assets/css/user-rtl.min.css";
import "./assets/css/user.min.css";






import SoftUIDashboard from "./soft-ui-dashboard";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/es/components/message/style/css'
const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(ElementPlus, { size: 'small', zIndex: 3000 })
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
store.dispatch('initializeAuth'); 
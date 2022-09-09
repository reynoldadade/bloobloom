import { createApp } from "vue";
import routes from "./router/index";
import "./style.scss";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

// instantiate your routes
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
// mount your app

const app = createApp(App);

// plugins

// pinia as a plugin
app.use(pinia);
// attach your router to your app
app.use(router);

//mount your app
app.mount("#app");

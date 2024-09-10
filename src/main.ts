import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import App from "./App.vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component);
app.use(ElementPlus);
app.use(createPinia());
app.mount("#app");

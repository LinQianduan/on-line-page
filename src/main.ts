import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// svg icons
import "virtual:svg-icons-register";

import '@/styles/index.scss'
// pinia store
import pinia from "@/stores/index";

import router from '@/routers/index'
// vue i18n
import I18n from "@/languages/index";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(I18n).use(pinia).use(ElementPlus).mount('#app');

import './assets/main.css'
import { createApp } from 'vue'
import {ref} from "vue";
import App from './App.vue'
import Vant from 'vant';
import * as VueRouter from 'vue-router'
import routes from "./config/route.js";
 const app = createApp(App);
 app.use(Vant);
 app.use(ref);

//路由的两种方式，history模式和hash方式
const router = VueRouter.createRouter({
  history: VueRouter.createMemoryHistory(),
  routes,//'routes: routes’的缩写
})
app.use(router)
//挂载
app.mount('#app')
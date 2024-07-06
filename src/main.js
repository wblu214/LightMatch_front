import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {Button, Icon, Tabbar, TabbarItem, Toast} from 'vant';

 const app = createApp(App);
 app.use(Button);
 app.use(Icon);
 app.use(Toast);
 app.use(Tabbar);
 app.use(TabbarItem);
//挂载
 app.mount('#app')

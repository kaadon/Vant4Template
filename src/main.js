import {createApp} from 'vue'
import 'vant/lib/index.css';
import '@/styles/vant-theme.css';

import App from './App.vue'
import vant from 'vant';
import {Lazyload} from "vant";
import router from './router'
import pinia from './stores'
const app = createApp(App);

app.use(vant);
app.use(Lazyload);
app.use(pinia);
app.use(router);
app.mount('#app')



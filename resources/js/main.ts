import {createApp} from 'vue';
import 'assets/scss/style.scss';
import App from './App.vue';
import 'uno.css';

const app = createApp(App);

import router from './router';
app.use(router);

app.mount('#app');

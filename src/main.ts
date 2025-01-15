import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

import 'bootstrap-icons/font/bootstrap-icons.css';

// Importer vos styles personnalisés
import './assets/main.css';


// Créer et configurer l'application Vue
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');



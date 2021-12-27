// Une partie de la logique de l'application, partagée ensuite par les différents composants
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
// import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'

// Ajout d'axios avant le montage pour son bon fonctionnement
createApp(App)
.use(store)
.use(VueAxios, axios)
.mount('#app');


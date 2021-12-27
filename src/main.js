import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Montage de l'application avec router & vuex
createApp(App).use(store).use(router).mount('#app')

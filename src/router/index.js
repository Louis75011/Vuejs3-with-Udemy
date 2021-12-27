import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Basket from '../views/Basket.vue'

// Chemins de notre routeur
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

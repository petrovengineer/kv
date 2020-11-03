import { createRouter, createWebHistory } from 'vue-router'
import Resources from '../views/Resources.vue'
import CashWastes from '../views/CashWastes.vue'
import Pyers from '../views/Payers.vue'
import Tranches from '../views/Tranches.vue'
import Users from '../views/Users.vue'
import Wastes from '../views/Wastes.vue'

const routes = [
  {
    path: '/',
    name: 'Resources',
    component: Resources
  },
  {
    path: '/cashwastes',
    name: 'CashWastes',
    component: CashWastes
  },
  {
    path: '/payers',
    name: 'Payers',
    component: Pyers
  },
  {
    path: '/tranches',
    name: 'Tranches',
    component: Tranches
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/wastes',
    name: 'Wastes',
    component: Wastes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

import cursosRoutes from './cursosRouter'
import disciplinasRoutes from './disciplinasRouter'
import DocentesRoutes from './docentesRouter'
import AbonarRoutes from './abonarRouter'
import AtividadesRoutes from './atividadesRouter'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },

    ...DocentesRoutes,
    ...cursosRoutes,
    ...disciplinasRoutes,
    ...AbonarRoutes,
    ...AtividadesRoutes,
  ],
})

export default router

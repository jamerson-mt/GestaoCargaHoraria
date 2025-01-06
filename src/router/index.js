// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

import cursosRoutes from './cursos'
import disciplinasRoutes from './disciplinas'
import DocentesRoutes from './docentes'


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
  ],
})

export default router

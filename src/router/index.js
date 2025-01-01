import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import DocentesView from '../views/DocentesView.vue'
import DisciplinasView from '../views/DisciplinasView.vue'
import OutrosView from '../views/OutrosView.vue'
import PlanilhasView from '../views/DashboardView.vue'

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
    {
      path: '/docentes',
      name: 'docentes',
      component: DocentesView,
    },
    {
      path: '/disciplinas',
      name: 'disciplinas',
      component: DisciplinasView,
    },
    {
      path: '/outros',
      name: 'outros',
      component: OutrosView,
    },
    {
      path: '/planilhas',
      name: 'planilhas',
      component: PlanilhasView,
    },
  ],
})

export default router

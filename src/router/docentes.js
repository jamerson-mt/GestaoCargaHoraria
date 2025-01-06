// src/router/docentes.js
import DocentesView from '../views/DocentesView.vue'
import DocenteOneView from '../views/DocenteOneView.vue'

export default [
  {
    path: '/docentes',
    name: 'docentes',
    component: DocentesView,
  },
  {
    path: '/docentes/:id',
    name: 'docente',
    component: DocenteOneView,
  },
]

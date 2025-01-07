// src/router/docentes.js
import DocentesView from '../views/DocentesView.vue'
import DocenteOneView from '../views/DocenteOneView.vue'
import ContainerDocente from '@/components/Docentes/ContainerDocente.vue'

export default [
  {
    path: '/docentes',
    name: 'docentes',
    component: DocentesView,
  },
  {
    path: '/docentes/all',
    name: 'lista docentes',
    component: ContainerDocente,
  },
  {
    path: '/docentes/:id',
    name: 'docente',
    component: DocenteOneView,
  }
]

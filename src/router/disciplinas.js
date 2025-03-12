// src/router/disciplinas.js
import DisciplinasView from '../views/DisciplinasView.vue'
import CriarDisciplina from '../components/Disciplinas/CriarDisciplina.vue'

export default [
  {
    path: '/disciplinas',
    name: 'disciplinas',
    component: DisciplinasView,
  },
  {
    path: '/disciplinas/criar',
    name: 'disciplinas',
    component: CriarDisciplina
  }
]

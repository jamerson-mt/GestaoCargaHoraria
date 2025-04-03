// src/router/disciplinas.js
import DisciplinasView from '../views/DisciplinasView.vue'
import CriarDisciplina from '../components/Disciplinas/CriarDisciplina.vue'
import EditarDisciplina from '../components/Disciplinas/EditarDisciplina.vue'

export default [
  {
    path: '/disciplinas',
    name: 'disciplinas',
    component: DisciplinasView,
  },
  {
    path: '/disciplina/criar',
    name: 'disciplinascriar',
    component: CriarDisciplina
  },
  {
    path: '/disciplina/edit/:id',
    name: 'disciplinaseditar',
    component: EditarDisciplina
  }
]

// src/router/cursos.js
import AuthView from '../views/AuthView.vue'

export default [
  {
    path: '/auth/login',
    name: 'authUser',
    component: AuthView,
  },
  {
    path: '/auth/register',
    name: 'authRegister',
    component: AuthView,
  }
]

import { createRouter, createWebHistory } from 'vue-router'
import Inicio from "../views/ClientesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ //Aca van todas las rutas
    {
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/nuevo-cliente',
      name: 'nuevo-cliente',
      component: () => import('../views/NuevoClienteView.vue')
    }
  ]
})

export default router

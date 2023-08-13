import { createRouter, createWebHistory } from 'vue-router'
import Inicio from "../views/ClientesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [ //Aca van todas las rutas
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      props: { titulo: 'Listado de Clientes'}
    },
    {
      path: '/nuevo-cliente',
      name: 'nuevo-cliente',
      component: () => import('../views/NuevoClienteView.vue'),
      props: { titulo: 'Agregar Cliente'}
    },
    {
      path: '/editar-cliente/:id',
      name: 'editar-cliente',
      component: () => import('../views/EditarClienteView.vue'),
      props: { titulo: 'Editar Cliente'}
    }
  ]
})

export default router

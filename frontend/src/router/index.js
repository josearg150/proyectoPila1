import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddLibroView from '../views/AddLibro.vue'
import LibroView from '../views/LibroDetalle.vue'
import EditLibroView from '../views/EditLibro.vue'
import Login from '../views/Login.vue'
import RegistroView from '../views/Registro.vue'
import CalificarView from '../views/Calificar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/agregar-libro',
    name: 'add-libro',
    component: AddLibroView,
  },
  {
    path: '/libro/:id',
    name: 'libro',
    component: LibroView,
  },
  {
    path: '/editar-libro/:id',
    name: 'edit-libro',
    component: EditLibroView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/registro',
    name: 'register',
    component: RegistroView,
  },
  {
    path: '/acercade',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/calificar',
    name: 'calificar',
    component: CalificarView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

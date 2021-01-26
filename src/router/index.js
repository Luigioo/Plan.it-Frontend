import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('../views/Add.vue')
  },
  {
    path: '/find',
    name: 'Find',
    component: () => import('../views/Find.vue')
  },
  {
    path: '/delete',
    name: 'Delete',
    component: () => import('../views/Delete.vue')
  },
  {
    path: '/testground',
    name: 'Test',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router

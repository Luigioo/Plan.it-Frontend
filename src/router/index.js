import Vue from 'vue'
import VueRouter from 'vue-router'
import { isLoggedIn } from '../scripts/security'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.name!=="Login" && !isLoggedIn()){
    next({name:"Login"});
  }else{
    next();
  }
})

export default router

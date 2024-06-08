import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Books from '@/views/Books.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Books',
    component: Books
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

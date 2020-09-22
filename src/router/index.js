import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/intro',
    component: () => import('@/views/intro.vue')
  },
  {
    path: '/set',
    component: () => import('@/views/set.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/about.vue')
  },
  {
    path: '/list',
    component: () => import('@/views/list.vue')
  },
  {
    path: '/tag',
    component: () => import('@/views/tag.vue')
  },
  {
    path: '/news',
    component: () => import('@/views/news.vue')
  },
  {
    path: '/links',
    component: () => import('@/views/links.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

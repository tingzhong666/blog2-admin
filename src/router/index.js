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
    component: () => import('@/views/intro')
  },
  {
    path: '/set',
    component: () => import('@/views/set')
  },
  {
    path: '/about',
    component: () => import('@/views/about')
  },
  {
    path: '/list',
    component: () => import('@/views/list')
  },
  {
    path: '/tag',
    component: () => import('@/views/tag')
  },
  {
    path: '/news',
    component: () => import('@/views/news')
  },
  {
    path: '/links',
    component: () => import('@/views/links')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

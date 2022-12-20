import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        keepAlive: true // 该路由会被缓存
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/MobileWallpaper',
      name: 'MobileWallpaper',
      component: () => import('../views/MobileWallpaper.vue'),
      meta: {
        keepAlive: true // 该路由会被缓存
      }
    },
    {
      path: '/RandomJoke',
      name: 'RandomJoke',
      component: () => import('../views/RandomJoke.vue'),
      meta: {
        keepAlive: true // 该路由会被缓存
      }
    }
  ]
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/HanfuNews',
      name: 'HanfuNews',
      component: () => import('../views/HanfuNews.vue'),
      meta: {
        keepAlive: true // 该路由会被缓存
      }
    },
    {
      path: '/MomentsCopywriting',
      name: 'MomentsCopywriting',
      component: () => import('../views/MomentsCopywriting.vue'),
      meta: {
        keepAlive: true // 该路由会被缓存
      }
    },
    {
      path: '/HotNews',
      name: 'HotNews',
      component: () => import('../views/HotNews.vue'),
      meta: {
        keepAlive: true // 该路由会被缓存
      }
    },
    {
      path: '/TenWhy',
      name: 'TenWhy',
      component: () => import('../views/TenWhy.vue'),
      meta: {
        keepAlive: true // 该路由会被缓存
      }
    }
  ]
})

export default router

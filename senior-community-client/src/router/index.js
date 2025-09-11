import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: 'service-mall',
          name: 'service-mall',
          component: () => import('../views/ServiceMall.vue')
        },
        {
          path: 'activity-center',
          name: 'activity-center',
          component: () => import('../views/ActivityCenter.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/User.vue')
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 如果路由需要认证
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录
    if (!userStore.isLoggedIn) {
      // 未登录，跳转到登录页
      next('/login')
      return
    }
  }
  
  // 如果已登录用户访问登录页，重定向到首页
  if (to.name === 'login' && userStore.isLoggedIn) {
    next('/home')
    return
  }
  
  next()
})

export default router

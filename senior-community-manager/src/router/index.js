import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录页面',
        // 登录页面不需要权限
        requiresAuth: false
      },
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/manager',
      name: 'manager',
      meta: {
        title: '管理页面',
        requiresAuth: true
      },
      component: () => import('@/views/Manager.vue'),
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          meta: {
            title: '系统首页',
            requiresAuth: true
          },
          component: () => import('@/views/Homepage.vue'),
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            title: '用户管理',
            requiresAuth: true
          },
          component: () => import('@/views/User.vue'),
        },
        {
          path: 'employee',
          name: 'employee',
          meta: {
            title: '员工管理',
            requiresAuth: true
          },
          component: () => import('@/views/Employee.vue'),
        },
        {
          path: 'service-trend',
          name: 'serviceTrend',
          meta: {
            title: '服务需求趋势',
            requiresAuth: true
          },
          component: () => import('@/views/ServiceTrend.vue'),
        },
        {
          path: 'activity-participation',
          name: 'activityParticipation',
          meta: {
            title: '活动参与度',
            requiresAuth: true
          },
          component: () => import('@/views/ActivityParticipation.vue'),
        },
        {
          path: 'user-feedback',
          name: 'userFeedback',
          meta: {
            title: '用户反馈分析',
            requiresAuth: true
          },
          component: () => import('@/views/UserFeedback.vue'),
        },
      ]
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '404 not found',
        requiresAuth: false
      },
      component: () => import('@/views/404.vue'),
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

// 路由守卫实现权限控制
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  
  // 检查是否需要登录权限
  if (to.meta.requiresAuth) {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    
    // 如果有token，则允许访问
    if (token) {
      next()
    } else {
      // 没有token，重定向到登录页
      next({ name: 'login' })
    }
  } else {
    // 不需要权限的页面直接放行
    next()
  }
})

export default router

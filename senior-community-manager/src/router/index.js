import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/manager',
      name: 'manager',
      meta: {
        title: '管理页面',
      },
      component: () => import('@/views/Manager.vue'),
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          meta: {
            title: '系统首页',
          },
          component: () => import('@/views/Homepage.vue'),
        },
        {
          path: 'data',
          name: 'data',
          meta: {
            title: '数据统计',
          },
          component: () => import('@/views/Data.vue'),
        },
      ]
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '404 not found',
      },
      component: () => import('@/views/404.vue'),
    },
    {
      path: '/',
      redirect: '/manager/homepage',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router

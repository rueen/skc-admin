import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/task',
      },
      {
        path: '/task',
        name: 'TaskList',
        component: () => import('@/views/task/TaskList.vue'),
        meta: { title: '任务管理' },
      },
      {
        path: '/task/detail/:id',
        name: 'TaskDetail',
        component: () => import('@/views/task/TaskDetail.vue'),
        meta: { title: '任务详情' },
      },
      {
        path: '/enrollment',
        name: 'EnrollmentList',
        component: () => import('@/views/enrollment/EnrollmentList.vue'),
        meta: { title: '报名管理' },
      },
      {
        path: '/member',
        name: 'MemberList',
        component: () => import('@/views/member/MemberList.vue'),
        meta: { title: '会员管理' },
      },
      {
        path: '/finance',
        name: 'FinanceList',
        component: () => import('@/views/finance/FinanceList.vue'),
        meta: { title: '金融管理' },
      },
      {
        path: '/platform',
        name: 'PlatformList',
        component: () => import('@/views/platform/PlatformList.vue'),
        meta: { title: '平台渠道管理' },
      },
      {
        path: '/group',
        name: 'GroupList',
        component: () => import('@/views/group/GroupList.vue'),
        meta: { title: '群管理' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userStore.checkAuth()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }
  }
  
  if (to.path === '/login' && userStore.checkAuth()) {
    next('/')
    return
  }
  
  next()
})

export default router 
import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { RoutesType } from 'types'
const modules = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: RoutesType[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export const constantRoutes:RoutesType[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/system/login/index.vue'),
    name:'Login',
    hidden: true
  },
  {
    // path不写404防止刷新页面出出现location not found错误
    path: '/:path(.*)*',
    name:"PageNotFound",
    component: () => import('@/views/system/error-page/pageNotFound.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/system/error-page/pageNoAuth.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/test',
    children: [
      {
        path: 'test',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Test',
        meta: { title: '测试页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/system/profile/index.vue'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]
// export const asyncRoutes = [...constantRoutes, ...routeModuleList, pageNotFoundRoute]
export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
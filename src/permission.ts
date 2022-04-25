import { router,constantRoutes } from './router'
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/getPageTitle'
import { usePermissionStore } from '@/store/permission'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList:string[] = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to:RouteLocationNormalized, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title as string)
  if (localStorage.getItem('token')){
    if (to.path == '/login'){
      next({path:'/'})
    }else{
      const permissionStore = usePermissionStore()
      if(constantRoutes.length!==permissionStore.routes.length){
        next()
      }else{
        try {
          const accessedRoutes:RouteRecordRaw[] = await permissionStore.generateRoutes()
          /* vue-router4.x remove addRoutes ,use forEach and adRoute */
          for(let k of accessedRoutes){
            router.addRoute(k)
          }
          /* add 404 after addRoute to fix dynamic route refresh to 404 */
          router.addRoute({ path: '/:path(.*)*', redirect: '/404' })
          if (to.name === 'PageNotFound') {
            // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
            next({ path: to.fullPath, replace: true, query: to.query })
          } else {
            const redirectPath = (from.query.redirect || to.path) as string
            const redirect = decodeURIComponent(redirectPath) as string
            if(to.path===redirect){
              next()
            }else{
              const nextData = { path: redirect } as RouteLocationNormalized
              next(nextData);
            }
            // next()
          }
        } catch (error) {
          await window.acp.us.clearToken()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  }else{
    if(whiteList.includes(to.path)){
      next()
    }else{
      next(`/login?redirect=${to.path}`)
    }
  }
})


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

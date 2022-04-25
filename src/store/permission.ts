import { defineStore } from 'pinia'
import { RoutesType,menuType } from 'types'
import { constantRoutes } from '@/router'
import { handleTree } from '@/utils/index'
import Layout from '@/layout/index.vue'
interface Permission {
    routes:RoutesType[],
    addRoutes: RoutesType[],
}
// 懒加载组件
const dynamicViewsModules = import.meta.glob('../views/**/*.{vue,tsx}')
function generateAsyncRoutes(addRoutes:RoutesType[],routes:menuType[]){
  routes.forEach((k:menuType,i:number)=>{
    if(!k.webUrl){
      addRoutes.push({
        path:`/${k.param1}`,
        component: Layout,
        redirect:`/${k.param1}`,
        // name: k.param1,
        meta:{
          title: k.alias,
          icon: k.icon,
        },
        children: k.children&&k.children.length>0 ? [] : undefined
      })
    }else{
      const cmpList = Object.keys(dynamicViewsModules)
      const matchIndex = Object.keys(dynamicViewsModules).map(e=>e.replace('../views','')).indexOf(k.param2)
      const matchKey = cmpList[matchIndex]
      addRoutes.push({
        path:k.webUrl.replace('{prefix}/#/',''),
        component: matchKey ? dynamicViewsModules[`../views${k.param2}`] : () => import(`@/views/dashboard/index.vue`),
        name: k.param1,
        meta:{
          title: k.alias,
          icon: k.icon,
          noCache: !!k.param3
        },
        children: k.children&&k.children.length>0 ? [] : undefined
      })
    }
    if(k.children&&k.children.length>0){
      generateAsyncRoutes(addRoutes[i].children as RoutesType[],k.children)
    }
  })
}
export const usePermissionStore = defineStore({
  id: 'Permission', // id必填，且需要唯一
  state: ():Permission => {
    return {
      routes:constantRoutes,
      addRoutes: [],
    }
  },
  getters:{
    getRoutes():RoutesType[]{
      return this.routes
    },
    getAddRoute():RoutesType[]{
      return this.addRoutes
    }
  },
  actions:{
    setAddRoute(routes:RoutesType[]){
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    generateRoutes():Promise<[]> {
      return new Promise(async resolve => {
        let accessedRoutes:[] = []
        const menus:[] = []
        const routes = handleTree(menus,'id','parent')
        generateAsyncRoutes(accessedRoutes,routes)
        this.setAddRoute(accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})
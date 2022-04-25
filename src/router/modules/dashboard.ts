import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
const dashboard:RouteRecordRaw = {
    path:'/',
    component:Layout,
    redirect:'/dashboard',
    children:[
        {
            path:'/dashboard',
            name:'Dashboard',
            component:()=>import('@/views/dashboard/index.vue'),
            meta:{
                title:'首页',
                icon:''
            },
        }
    ]
}

export default dashboard
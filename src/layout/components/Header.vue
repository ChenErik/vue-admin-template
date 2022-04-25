<template>
    <Hamburger class="hamburger-container" :is-active="appStore.sidebar.opened" @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="avatar-wrapper">
                <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
                <CaretBottom class="el-icon-caret-bottom" />
            </div>
            <template #dropdown>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>首页</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup lang="ts">
import { CaretBottom } from '@element-plus/icons-vue'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import { useAppStore } from '@/store/app'
import { useRouter,useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
const appStore = useAppStore()
const toggleSideBar = ():void => {
    appStore.toogleSidebar()
}
const logout = async ():Promise<void>=>{
    // await window.acp.us.clearToken()
    localStorage.removeItem('token')
    $router.push(`/login?redirect=${$route.fullPath}`)
    window.location.reload()
}
</script>

<script lang="ts">
export default{
    name:'Header'
}
</script>

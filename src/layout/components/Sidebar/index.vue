<template>
  <HeaderLogo :collapse="!appStore.sidebar.opened" />
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="!appStore.sidebar.opened"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="true"
      active-text-color="#409EFF"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import HeaderLogo from './Logo.vue'
import { usePermissionStore } from '@/store/permission'
import { useAppStore } from '@/store/app'
const routes = computed(()=>usePermissionStore().getRoutes)
const appStore = useAppStore()
const activeMenu = computed(() => {
    const $route = useRoute()
    const { meta,path } = $route
    if(meta.activeMenu){
        return meta.activeMenu as string
    }
    return path
})
</script>
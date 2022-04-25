<template>
    <el-container :class="classObj">
        <el-aside class="sidebar-container has-logo">
            <Sidebar />
        </el-aside>
      <el-container>
        <el-header class="fixed-header">
            <div class="navbar">
                <Header />
            </div>
          <TagsView />
        </el-header>
        <el-scrollbar>
            <el-main class="container">
                    <router-view>
                        <template #default="{ Component, route }">
                            <transition name="fade-slide" mode="out-in" appear>
                                <keep-alive :include="cachedViews">
                                    <component :is="Component" :key="route.fullPath" />
                                </keep-alive>
                            </transition>
                        </template>
                    </router-view>
            </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar/index.vue'
import TagsView from './components/TagsView/index.vue'
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import { useTagsViewStore } from '@/store/tagsView'
const tagsViewStore = useTagsViewStore()
const cachedViews = computed(()=> tagsViewStore.getCachedTabList)
const appStore = useAppStore()
const classObj = computed(()=>({
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
}))
window.onresize = () => {
    appStore.setViewHeight()
}
</script>
<style lang="scss">
.container{
    min-height: calc(100vh - 84px);
    background-color: #fff;
    position: relative;
    margin-top: 84px!important;
}
.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 210px);
    transition: width 0.28s;
    padding: 0!important;
    height: 50px!important;
}
.hideSidebar .fixed-header {
    width: calc(100% - 54px)
}
</style>
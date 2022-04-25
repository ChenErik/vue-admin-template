<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref,watch,onMounted } from 'vue'
import { compile } from 'path-to-regexp'
import { useRoute,useRouter,RouteLocationMatched,RouteLocationRaw } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
const levelList = ref<RouteLocationMatched[]>([])
const getBreadcrumb = ():void => {
  let matched:any = $route.matched.filter(item => item.meta && item.meta.title)
  const first:RouteLocationMatched = matched[0]
  if(!isDashboard(first)){
    matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
  }
  levelList.value = matched.filter((item:RouteLocationMatched) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
const isDashboard = (route:RouteLocationMatched):boolean => {
  const name:string = route && route.name as string
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const pathCompile = (path:string):string => {
  const { params } = $route
  var toPath = compile(path)
  return toPath(params)
}
const handleLink = (item:RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    $router.push(redirect as RouteLocationRaw)
    return
  }
  $router.push(pathCompile(path))
}
onMounted(() => {
  getBreadcrumb()
})
watch($route,(route)=>{
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

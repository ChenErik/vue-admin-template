<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)"/> -->
          <el-icon><svg-icon :icon-class="onlyOneChild.meta.icon ? onlyOneChild.meta.icon : ''" /></el-icon>
          <template #title>
            {{onlyOneChild.meta.title}}
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon><svg-icon :icon-class="item.meta && item.meta.icon ? item.meta.icon : ''" /></el-icon>
        <span>{{ item.meta &&item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
export default {
  name:'SidebarItem',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
import AppLink from './Link.vue'
import { RoutesType } from 'types'
interface Props {
  item:RoutesType,
  isNest?:boolean,
  basePath?:string
}
const props = withDefaults(defineProps<Props>(), {
    isNest:false,
    basePath:''
})
const onlyOneChild = ref<RoutesType>({
  path:'1'
})
const hasOneShowingChild = (children:RoutesType[]=[],parent:RoutesType): boolean => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })
  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}
const resolvePath = (routePath:string):string => {
  if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
} 
</script>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue'
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import path from 'path-browserify'
import type { RoutesType, TagType } from 'types'
import ScrollPane from './ScrollPane.vue'
import { usePermissionStore } from '@/store/permission'
import { useTagsViewStore } from '@/store/tagsView'
const $route = useRoute()
const $router = useRouter()
const routes = usePermissionStore().routes
const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.getTabList)
const tagsViewContainer = ref<any>(null)
const scrollPane = ref<any>(null)
provide('parentTag', () => tagsViewContainer.value)
const visible = ref<boolean>(false)
const top = ref<number>(0)
const left = ref<number>(0)
const selectedTag = ref<object>({})
const affixTags = ref<[]>([])
const isActive = (route: RoutesType): boolean => {
  return route.path === $route.path
}
const isAffix = (tag: any): boolean => {
  return tag.meta && tag.meta.affix
}
const filterAffixTags = (routes: RoutesType[], basePath = '/'): any => {
  let tags: TagType[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1)
        tags = [...tags, ...tempTags]
    }
  })
  return tags
}
const initTags = (): void => {
  const at = affixTags.value = filterAffixTags(routes)
  for (const tag of at) {
    // Must have tag name
    if (tag.name)
      tagsViewStore.addVisitedView(tag)
  }
}
const addTags = (): boolean => {
  const { name } = $route
  if (name)
    tagsViewStore.addView($route)

  return false
}
const moveToCurrentTag = () => {
  const tags = tagsViewContainer.value.__vueParentComponent.ctx.$refs.tag
  nextTick(() => {
    for (const tag of tags) {
      if (tag.to.path === $route.path) {
        scrollPane.value.moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== $route.fullPath)
          tagsViewStore.updateVisitedView($route)

        break
      }
    }
  })
}
const closeMenu = () => {
  visible.value = false
}
const handleScroll = () => {
  closeMenu()
}
const refreshSelectedTag = async (view: any) => {
  await tagsViewStore.delCachedView(view)
  const { fullPath } = view
  await nextTick()
  $router.replace({
    path: `/redirect${fullPath}`,
  })
}
const toLastView = (visitedView: TagType[], view: TagType): void => {
  const latestView = visitedView.slice(-1)[0]
  if (latestView) {
    $router.push(latestView.fullPath)
  }
  else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      $router.replace({ path: `/redirect${view.fullPath}` })
    }
    else {
      $router.push('/')
    }
  }
}
const closeSelectedTag = async (view: any): Promise<void> => {
  const { visitedViews } = await tagsViewStore.delView(view)
  if (isActive(view))
    toLastView(visitedViews, view)
}
const closeOthersTags = async (): Promise<void> => {
  $router.push(selectedTag.value)
  await tagsViewStore.delAllViews(selectedTag.value)
  moveToCurrentTag()
}
const closeAllTags = async (view: any): Promise<void> => {
  const { visitedViews } = await tagsViewStore.delAllViews()
  if (affixTags.value.some((tag: TagType) => tag.path === view.path))
    return

  toLastView(visitedViews, view)
}
const openMenu = (tag: TagType, e: MouseEvent): void => {
  const menuMinWidth = 105
  const offsetLeft = tagsViewContainer.value.getBoundingClientRect().left // container margin left
  const offsetWidth = tagsViewContainer.value.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const mleft = e.clientX - offsetLeft + 15 // 15: margin right

  if (mleft > maxLeft)
    left.value = maxLeft
  else
    left.value = mleft

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}
watch($route, () => {
  addTags()
  moveToCurrentTag()
})
watch(visible, (value) => {
  if (value)
    document.body.addEventListener('click', closeMenu)
  else
    document.body.removeEventListener('click', closeMenu)
})
onMounted(() => {
  initTags()
  addTags()
})
</script>

<template>
  <div id="tags-view-container" ref="tagsViewContainer" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <el-icon v-if="!isAffix(tag)" class="el-icon-close" :size="10" @click.prevent.stop="closeSelectedTag(tag)">
          <Close />
        </el-icon>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: `${left}px`, top: `${top}px` }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        刷新页面
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">
        关闭其他
      </li>
      <li @click="closeAllTags(selectedTag)">
        全部关闭
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

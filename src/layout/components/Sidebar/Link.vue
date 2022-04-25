<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'
interface Props {
  to:string
}
const props = defineProps<Props>()
const isExternaled = computed(()=>isExternal(props.to))
const type = computed(()=>{
  if(isExternaled.value){
    return 'a'
  }else{
    return 'router-link'
  }
})
const linkProps = (to:RouteLocationRaw) => {
  if (isExternaled.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
</script>

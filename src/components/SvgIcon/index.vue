<template>
  <!-- 在 Vue 3 的虚拟 DOM 中，事件监听器现在只是以 on 为前缀的 attribute，这样它就成为了 $attrs 对象的一部分，因此 $listeners 被移除了 -->
  <div v-if="isExternaled" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script lang="ts">
export default {
  name:'SvgIcon'
}
</script>
<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
import { computed } from 'vue' 
interface Props {
  iconClass:string,
  className?:string,
}
const props = withDefaults(defineProps<Props>(), {
    className:'',
})
const isExternaled = computed(()=> isExternal(props.iconClass))
const iconName = computed(()=>`#icon-${props.iconClass}`)
const svgClass = computed(()=>{
  if (props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})
const styleExternalIcon = computed(()=>({
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
}))
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>

<script lang="ts" setup>
interface Props {
    num:number
    color:string
    strokeWidth:number
    duration:number
}
withDefaults(defineProps<Props>(),{
    num:3,
    color:'#f5222d',
    strokeWidth:5,
    duration: 3
})
const formatDuration = (duration:number):string|number => {
  return duration === 0 ? 0 : `${duration}s`
}
</script>

<template>
  <svg viewBox="0 0 100 100">
    <circle v-for="(item, index) in num" :key="item" cx="50" cy="50" r="45" :stroke="color" :stroke-width="strokeWidth" fill-opacity="0">
      <animate id="ani1" attributeName="r" :begin="(duration / num) * index" from="0" to="45" :dur="formatDuration(duration)" repeatCount="indefinite" />
      <animate attributeName="opacity" :begin="(duration / num) * index" from="1" to="0" :dur="formatDuration(duration)" repeatCount="indefinite" />
    </circle>
  </svg>
</template>

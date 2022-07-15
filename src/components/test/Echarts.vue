<script lang="ts" setup>
import { markRaw, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import useEchartSize from './resize'
const props = defineProps({
  height: {
    type: String,
    default: '100%',
  },
  width: {
    type: String,
    default: '100%',
  },
  echarsOption: {
    type: Object,
    default: () => ({}),
  },
})
const chartRef = ref(null)
const charts = ref<any>(null)
/* mixins */
useEchartSize(charts)
function initChart() {
  charts.value.setOption(props.echarsOption)
  return charts.value
}
watch(() => props.echarsOption, (n, o) => {
  initChart()
}, { deep: true })
onMounted(() => {
  charts.value = markRaw(echarts.init(chartRef.value, 'auto', { renderer: 'canvas' }))
  initChart()
})
</script>

<script>
export default {
  name: 'HmiChart',
}
</script>

<template>
  <div ref="chartRef" :style="{ width, height }" />
</template>

<!-- <script setup>
import { ref, watch } from 'vue'
import HmiChars from '../../packages/charts/src/Echarts'
const props = defineProps({
  realTimeData: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: '',
  },
})
const option = ref({
  title: {
    text: props.title,
  },
  legend: {
    show: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '11%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisTick: {
      alignWithLabel: true,
    },
    data: [],
  },
  yAxis:
    {
      type: 'value',
      axisLine: {
        show: true,
      },
    },
  series: [
    {
      name: '实时数据',
      type: 'line',
      data: [],
    },
  ],
})
watch(() => props.realTimeData, (n) => {
  console.log(n)
  if (n.xAxis) {
    if (option.value.xAxis.data.length > 10) {
      option.value.xAxis.data.push(n.xAxis)
      option.value.xAxis.data.shift()
      option.value.series[0].data.push(n.value)
      option.value.series[0].data.shift()
    }
    else {
      option.value.xAxis.data.push(n.xAxis)
      option.value.series[0].data.push(n.value)
    }
  }
})
</script>

<template>
  <HmiChars :echars-option="option" />
</template> -->

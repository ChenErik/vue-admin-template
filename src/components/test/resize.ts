// import { nextTick, onActivated, onBeforeMount, onDeactivated, onMounted } from 'vue'
// import type * as echarts from 'echarts'
// import { debounce } from '@/utils/index'
// export default function useEchartSize(chart: echarts.EChart) {
//   const chartObserver: ResizeObserver | null = null
//   let resizeHandler: any = null
//   function resize() {
//     chart.value && chart.value.resize({
//       animation: {
//         duration: 500,
//         easing: 'quadraticIn',
//       },
//     })
//   }
//   function initListener() {
//     resizeHandler = debounce(resize, 100)
//     const chartObserver = new ResizeObserver(resizeHandler)
//     chartObserver.observe(chart.value._dom)
//   }
//   function destroyListener() {
//     chartObserver && chartObserver?.unobserve(chart.value._dom)
//     resizeHandler = null
//   }
//   onMounted(async () => {
//     await nextTick()
//     initListener()
//   })
//   onActivated(() => {
//     if (!resizeHandler.value)
//       initListener()
//   })
//   onBeforeMount(() => {
//     destroyListener()
//   })
//   onDeactivated(() => {
//     destroyListener()
//   })
// }

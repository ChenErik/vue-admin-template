import { nextTick, onActivated, onBeforeMount, onDeactivated, onMounted } from 'vue'
import { debounce } from '../../../utils'

export default function useEchartSize(chart) {
  const chartObserver = null
  let resizeHandler = null
  function resize() {
    chart.value && chart.value.resize({
      animation: {
        duration: 500,
        easing: 'quadraticIn',
      },
    })
  }
  function initListener() {
    resizeHandler = debounce(resize, 100)
    const chartObserver = new ResizeObserver(resizeHandler)
    chartObserver.observe(chart.value._dom)
  }
  function destroyListener() {
    chartObserver && chartObserver.unobserve(chart.value._dom)
    resizeHandler = null
  }
  onMounted(async () => {
    await nextTick()
    initListener()
  })
  onActivated(() => {
    if (!resizeHandler.value)
      initListener()
  })
  onBeforeMount(() => {
    destroyListener()
  })
  onDeactivated(() => {
    destroyListener()
  })
}

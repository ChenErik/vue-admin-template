<script lang="ts" setup name="Dashboard">
import { ref } from 'vue'
import { getExcelData } from '../../../mock/excelData'
// import RippleSpread from '@/components/RippleSpread/index.vue'
import useExportToExcel from '@/hook/useExportToExcel'
const downloadProcess = ref(0)
const exportCsv = async () => {
  console.time()
  const data = await getExcelData(10000 * 20)
  try {
    await useExportToExcel(data, 2000, (process) => {
      downloadProcess.value = process
    })
  }
  catch (e) {
    console.log(e)
  }
  console.timeEnd()
}
</script>

<template>
  <div class="dashboard" style="resize: both;">
    <!-- {{ $route.meta.title }} -->
    <!-- <el-input v-model="input" placeholder="Please input" /> -->
    <!-- <div style="width:500px;height:500px">
      <RippleSpread :num="8" />
    </div> -->
    <button @click="exportCsv">
      导出CSV表格
    </button>
    <el-progress :percentage="downloadProcess" :status="downloadProcess === 100 ? 'success' : ''" />
  </div>
</template>

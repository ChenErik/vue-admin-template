<!-- <script setup>
import { ref } from 'vue'
import charts from './charts'
const datas = ref([])
setInterval(() => {
  for (let i = 0; i < 6; i++) {
    datas.value[i] = {
      xAxis: new Date().getTime(),
      value: Math.random() * 100,
      title: `标题${i}`,
    }
  }
}, 1000)
</script>

<template>
  <div class="test-linechart">
    <charts v-for="item, index in datas" :key="index" :real-time-data="item" :title="item.title" />
  </div>
</template>

<style lang="scss" scoped>
.test-linechart{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: 300px 300px;
}
</style> -->

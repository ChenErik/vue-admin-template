<template>
    <div class="dashboard" style="resize: both;">
        {{ $route.meta.title }}
        <!-- <el-input v-model="input" placeholder="Please input" /> -->
        <div style="width:500px;height:500px">
            <RippleSpread :num="8" />
        </div>
    </div>
</template>
<script lang="ts" setup name="Dashboard">
import RippleSpread from '@/components/RippleSpread/index.vue'
</script>
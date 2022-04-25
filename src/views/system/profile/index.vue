<template>
    <div class="profile">
        profile
        <el-input v-model="input" placeholder="Please input" />
    </div>
</template>
<script lang="ts">
export default {
    name:'Profile'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
const input = ref<string>('')
</script>
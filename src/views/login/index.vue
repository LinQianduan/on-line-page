<template>
  <div style="width: 100%; height: 100%; background-color: #fff;">
    <el-button type="primary" size="default" @click="modelValue = true">button</el-button>
    
    <MDialog 
      width="1200px"
      v-model="modelValue"
      v-model:fullScreen="fullScreen"
      :before-close="handleClose"
      :close-on-click-modal="false"
		  draggable
    >
      <span>This is a message</span>
    </MDialog>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import MDialog from '@/components/MDialog/index.vue'

let modelValue = ref<boolean>(false)
let fullScreen = ref<boolean>(false)

const handleClose = (done: () => void) => {
  modelValue.value = false
}
</script>
<style scoped lang='scss'>
</style>
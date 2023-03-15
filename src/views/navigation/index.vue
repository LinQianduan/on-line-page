<template>
	<div class="navigation">
		<el-button size="default" @click="handleClick">打开</el-button>
		<DialogUserSelect ref="dialogUserSelectRef"></DialogUserSelect>
	</div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import DialogUserSelect from './DialogUserSelect.vue'
let dialogUserSelectRef = ref()
const handleClick = () => {
	// console.log(listPublishingRef.value.open)
	dialogUserSelectRef.value.open('add')
}
</script>
<style scoped lang='scss'>
.navigation {
	width: 100%;
	height: 100%;
}
</style>
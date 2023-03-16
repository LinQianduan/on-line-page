<template>
	<div class="navigation">
		<!-- <el-button size="default" @click="handleClick">打开</el-button> -->
		<div class="card">
			<ListPublishing></ListPublishing>
		</div>
		<!-- <DialogUserSelect ref="dialogUserSelectRef"></DialogUserSelect> -->
	</div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import DialogUserSelect from './DialogUserSelect.vue'
import ListPublishing from './ListPublishing.vue'
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
	box-sizing: border-box;
	.card {
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 1200px;
		box-sizing: border-box;
		border-radius: 6px;
		min-height: 100%;
		background-color: #fff;
	}
}
</style>
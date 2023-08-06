<template>
	<m-dialog
		v-model:modelValue="modelValue"
		v-model:fullScreen="fullScreen"
		draggable
		:before-close="handleClose"
		:close-on-click-modal="false"
	>
		<span>This is a message323</span>
	</m-dialog>
</template>

<script setup lang="ts">
import MDialog from '@/components/MDialog/index.vue'
import { ref, reactive, toRefs } from "vue";
const state = reactive({
	width: '1200px',
	modelValue: true,
	fullScreen: false
})
const {width, modelValue, fullScreen} = toRefs(state)
const props = defineProps({
	onClose: {
		type: Function,
		default: () => {}
	}
})
const handleClose = () => {
	console.log(29)
	modelValue.value = false
	props.onClose()
}
</script>

<style lang="scss" scoped>

</style>
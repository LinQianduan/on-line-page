<template>
	<div class="app-wrapper">
		<div class="sidebar-container">
			<Sidebar class="sidebar" />
		</div>
		<AppMain />
	</div>
</template>
<script setup lang='ts'>
import AppMain from './AppMain.vue'
import Sidebar from './Sidebar.vue'
import { ref, reactive } from 'vue'
</script>
<style scoped lang='scss'>
.app-wrapper {
	position: relative;
	height: 100%;
	width: 100%;
	.sidebar-container {
		box-sizing: border-box;
		width: 100%;
		height: 116px;
		padding: 16px 0;
		.sidebar {
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 1300px;
			height: 100%;
		}
	}
}
</style>
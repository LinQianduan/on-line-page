<template>
	<div class="link-container">
		<div class="sidebar-logo">
			<img src="@/assets/img/2.jpg" alt="">
		</div>
		<div class="navigation">
			<router-link active-class="active-link" to="/home/index">Home</router-link>
			<router-link active-class="active-link" to="/home/info">Info</router-link>
			<router-link active-class="active-link" to="/home/navigation">Navigation</router-link>
		</div>
		<div class="controls"></div>

	</div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
</script>
<style scoped lang='scss'>
.link-container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	// justify-content: space-between;
	.sidebar-logo {
		width: 84px;
		height: 100%;
		// background-color: #fff;
		img {
			object-fit: cover;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 4px solid #231b2f;
		}
	}
	.navigation {
		display: flex;
		align-items: center;
		padding: 0 20px;
		a {
			display: inline-block;
			cursor: pointer;
			margin-right: 4px;
			text-decoration: none;
			font-size: 16px;
			padding: 5px 10px;
			border-radius: 5px;
			color: white;
			transition: all 0.4s;
		}
		.active-link {
			background-color: #212121;
			transition: all 0.4s;
		}
	}
	.controls {
		width: 200px;
		height: 100%;
		margin-left: auto;
	}

}
</style>
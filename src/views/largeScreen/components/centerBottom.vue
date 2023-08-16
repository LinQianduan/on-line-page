<template>
	<div class="center-bottom">
		<div class="data1 data-item">
			<div class="qiu">
					<span>70%</span>
			</div>
			<span class="text">折扣率</span>
		</div>
		<div class="data2 data-item">
			<div class="qiu">
					<span>70%</span>
			</div>
			<span class="text">售罄率</span>
		</div>
		<div class="data3 data-item">
			<div class="qiu">
					<span>86%</span>
			</div>
			<span class="text">完成率</span>
		</div>
		<div class="data4 data-item">
			<div class="qiu">
					<span>73%</span>
			</div>
			<span class="text">同比</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as echarts from "echarts";
const mainRef = ref<HTMLElement | null>(null);
const initChart = () => {
};

defineExpose({
  initChart
});
</script>

<style lang="scss" scoped>
.center-bottom {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-evenly;
	.data-item {
		width: 130px;
		height: 130px;
		color: #fff;
		text-align: center;
		box-sizing: border-box;
		font-size: 14px;
		.qiu {
			position: relative;
			margin: auto;
			margin-top: 1.8em;
			width: 4em;
			height: 4em;
			display: table;
			span {
				display: inline-block;
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 4em;
			}
			&::before {
				content: '';
				display: block;
				width: 4em;
				height: 4em;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border-radius: 50%;
				border: 3px solid rgba(255, 255, 255, 0.5);
				animation: scale 2s linear infinite;
			}
		}
		.text {
			display: inline-block;
			margin-top: .5em;
		}
		
	}
	.data1 {
		background: url('@/assets/img/di01.png') no-repeat bottom center;
		background-size: contain;
	}
	.data2 {
		background: url('@/assets/img/di02.png') no-repeat bottom center;
		background-size: contain;
	}
	.data3 {
		background: url('@/assets/img/di03.png') no-repeat bottom center;
		background-size: contain;
	}
	.data4 {
		background: url('@/assets/img/di04.png') no-repeat bottom center;
		background-size: contain;
	}
	.data1 .qiu {
		background: url('@/assets/img/cicle01.png') no-repeat center;
  	background-size: 100%;
	}
	.data2 .qiu {
		background: url('@/assets/img/cicle02.png') no-repeat center;
  	background-size: 100%;
	}
	.data3 .qiu {
		background: url('@/assets/img/cicle03.png') no-repeat center;
  	background-size: 100%;
	}
	.data4 .qiu {
		background: url('@/assets/img/cicle04.png') no-repeat center;
  	background-size: 100%;
	}
	@keyframes scale {
		0% {
			transform: translate(-50%, -50%) scale(0.9);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.5);
			opacity: 0;
		}
	}
}
</style>

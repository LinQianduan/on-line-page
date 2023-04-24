<template>
  <div class="trip-sort">
		<div class="screen-top-header flex-l">
			<span class="header-title">今日出行排行</span>
			<dv-decoration-3 class="dv-dec-3" />
		</div>
		<div class="chart">

			<dv-scroll-ranking-board :color="['#006ced', '#56e3c2']" class="dv-scr-rank-board" :config="state.rankList" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
const state = reactive({
	rankList: {
		data: [
			{
					name: '武汉市',
					value: 1210
			},
			{
					name: '北京',
					value: 1655
			},
			{
					name: '上海',
					value: 1788
			},
			{
					name: '深圳',
					value: 2100
			},
			{
					name: '广州',
					value: 1577
			},
			{
					name: '成都',
					value: 1625
			},
			{
					name: '厦门',
					value: 857
			},
			{
					name: '郑州',
					value: 1322
			},
			{
					name: '长沙',
					value: 1122
			},
			{
					name: '南昌',
					value: 899
			}
		],
		carousel: 'single',
		unit: '人'
	}
})
const initChart = () => {
};

defineExpose({
  initChart,
});
</script>

<style lang="scss" scoped>
.trip-sort {
	width: 100%;
	height: 100%;
	position: relative;
	.screen-top-header {
		height: 26px;
		padding-left: 10px;
		.header-title {
			color: #fff;
			font-size: 14px;
		}
		.dv-dec-3 {
			width: 50px;
			height: 20px;
			margin-left: 10px;
		}
	}
	.chart {
		width: 100%;
		height: calc(100% - 25px);
		position: relative;
	}
	.dv-scr-rank-board {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -54%);
		width: 96%;
		height: 160px;
	}
}
.flex-l {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
}
</style>

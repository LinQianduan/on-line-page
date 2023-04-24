<template>
  <div class="trip-sort">
		<div class="screen-top-header flex-l">
			<span class="header-title">今日出行排行</span>
			<dv-decoration-3 class="dv-dec-3" />
		</div>
		<div class="chart">
      <dv-scroll-board class="dv-scr-board" :config="config" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
const config = reactive({
    header: ['品牌', '销量', '环比'],
    data: [
        ['理想ONE', '11496', "<span class='scr-up'>↑22%</span>"],
        ['哪吒V', '7884', "<span class='scr-down'>↓13%</span>"],
        ['零跑TO3', '5724', "<span class='scr-up'>↑32%</span>"],
        ['问界M5', '5033', "<span class='scr-up'>↑34%</span>"],
        ['零跑C11', '4345', "<span class='scr-up'>↑25%</span>"],
        ['小鹏P7', '4224', "<span class='scr-up'>↑13%</span>"],
        ['小鹏P5', '3686', "<span class='scr-up'>↑24%</span>"],
        ['哪吒U', '3125', "<span class='scr-down'>↓16%</span>"],
        ['蔚来ES6', '2936', "<span class='scr-down'>↓23%</span>"],
        ['小鹏G3', '2221', "<span class='scr-up'>↑45%</span>"]
    ],
    rowNum: 5, //表格行数
    headerHeight: 35,
    headerBGC: 'rgba(16,54,87,0.2)', //表头
    oddRowBGC: 'rgba(16,54,87,0.9)', //奇数行
    evenRowBGC: 'rgba(16,54,87,0.2)', //偶数行
    index: true,
    columnWidth: [50],
    align: ['center']
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
		padding: 0px 10px;
		box-sizing: border-box;
		// position: relative;
	}
	.dv-scr-board {
		width: 100%;
		height: 168px;
	}
}
.flex-l {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
}
</style>

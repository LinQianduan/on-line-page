<template>
  <div class="trip-sort">
    <div class="screen-top-header flex-l">
      <span class="header-title">车辆出行高峰时间（万）</span>
      <dv-decoration-3 class="dv-dec-3" />
    </div>
    <div class="chart" ref="mainRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import * as echarts from "echarts";
const state = reactive({
	leiData: ['0-5时', '6-11时', '12-17时', '18-23时'],
	data1: [
		{ time: "0时", value: 710 },
		{ time: "1时", value: 312 },
		{ time: "2时", value: 321 },
		{ time: "3时", value: 754 },
		{ time: "4时", value: 500 },
		{ time: "5时", value: 830 },
	],
	data2: [
		{ time: "6时", value: 710 },
		{ time: "7时", value: 521 },
		{ time: "8时", value: 504 },
		{ time: "9时", value: 660 },
		{ time: "10时", value: 530 },
		{ time: "11时", value: 410 }
	],
	data3: [
		{ time: "12时", value: 864 },
		{ time: "13时", value: 575 },
		{ time: "14时", value: 586 },
		{ time: "15时", value: 758 },
		{ time: "16时", value: 654 },
		{ time: "17时", value: 695 },
	],
	data4: [
		{ time: "18时", value: 588 },
		{ time: "19时", value: 453 },
		{ time: "20时", value: 477 },
		{ time: "21时", value: 365 },
		{ time: "22时", value: 567 },
		{ time: "23时", value: 437 }
	]
});
const mainRef = ref<HTMLElement | null>(null);
let myChart: any = null;
let option: any = null;
const initChart = () => {
  myChart = echarts.init(mainRef.value as HTMLElement);
  option = {
		textStyle: {
      color: "white",
    },
		timeline: {
			data: state.leiData,//第一个数据空白很重要
			axisType: 'category',
			length: 15,
			left: 15,
			right: 10,
			bottom: -5,
			show: true,
			autoPlay: true,
			playInterval: 1500,
			lineStyle: {
				color: "#00ffff"
			},
			controlStyle: {
				color: "#00ffff"
			}
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "3%",
      top: "8%",
      bottom: 30,
      containLabel: true,
    },
    color: ["#a4d8cc", "#25f3e6"],
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },

    calculable: true,
		xAxis: {
      name: "X 标题",
      type: "category",
      axisLabel: {
        fontSize: 12,
        rotate: 45,
        interval: "auto",
      },
      showMaxLabel: true,
      axisLine: {
        show: true,
        symbol: ["none", "none"],
        lineStyle: {
          color: "#57617B"
        },
      },
      axisTick: {
        show: true,
        // 设置颜色
        lineStyle: {
          color: "#57617B"
        },
      },
    },
		yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 12,
        lineHeight: 30,
      },
      axisLine: {
          show: true,
          symbol: ["none", "none"],
          lineStyle: {
            color: "#57617B"
          },
      },
      // 显示刻度
      axisTick: {
        show: true,
      },
      splitLine: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    series: [
      {
        // name:'简易程序案件数',
        type: "line",
        areaStyle: {
          normal: {
            type: "default",
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              0.8,
              [
                {
                  offset: 0,
                  color: "rgba(14, 92, 210, 0.2)",
                },
                {
                  offset: 1,
                  color: "#0089ff",
                },
              ],
              false
            ),
          },
        },
        smooth: true,
				lineStyle: {
          normal: {
            color: "#00ffff"
          }
        },
        itemStyle: {
          normal: {
						areaStyle: { type: "default" },
						color: "#00ffff"
					},
        }
      },
    ],
		options: [
			{
				xAxis: {
					data: state.data1.map((item: any) => item.time)
				},
				series: [
					{
						data: state.data1.map((item: any) => item.value)
					}
				]
			},
			{
				xAxis: {
					data: state.data2.map((item: any) => item.time)
				},
				series: [
					{
						data: state.data2.map((item: any) => item.value)
					}
				]
			},
			{
				xAxis: {
					data: state.data3.map((item: any) => item.time)
				},
				series: [
					{
						data: state.data3.map((item: any) => item.value)
					}
				]
			},
			{
				xAxis: {
					data: state.data4.map((item: any) => item.time)
				},
				series: [
					{
						data: state.data4.map((item: any) => item.value)
					}
				]
			}
		]
  };
  myChart.setOption(option);
  return myChart;
};

onMounted(() => {
	nextTick(() => {
		if(myChart) {
			myChart.on("showTip", (params: any) => {
				myChart.setOption({
					timeline: {
						autoPlay: false
					}
				});
			})
			myChart.on("hideTip", (params: any) => {
				myChart.setOption({
					timeline: {
						autoPlay: true
					}
				});
			})
		}
	})

});


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

<template>
  <div class="trip-sort">
    <div class="screen-top-header flex-l">
      <span class="header-title">车型分类</span>
      <dv-decoration-3 class="dv-dec-3" />
    </div>
    <div class="chart" ref="mainRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import * as echarts from "echarts";
const state = reactive({
  leiData: ["0-5时", "6-11时", "12-17时", "18-23时"],
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
    { time: "11时", value: 410 },
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
    { time: "23时", value: 437 },
  ],
});
const mainRef = ref<HTMLElement | null>(null);
const initChart = () => {
  const myChart = echarts.init(mainRef.value as HTMLElement);
  let option = {
		textStyle: {
      color: "white",
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}  <br/>{c}辆",
    },
    legend: {
      x: "center",
      y: "2%",
      data: ["车型一", "车型二", "车型三", "车型四", "车型五"],
      icon: "circle",
      textStyle: {
        color: "#fff",
      },
    },
    calculable: true,
    series: [
      {
        name: "车型",
        type: "pie",
        //起始角度，支持范围[0, 360]
        startAngle: 0,
        //饼图的半径，数组的第一项是内半径，第二项是外半径
        radius: [41, 110],
        //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
        center: ["50%", "20%"],
        //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
        // 'radius' 面积展现数据的百分比，半径展现数据的大小。
        //  'area' 所有扇区面积相同，仅通过半径展现数据大小
        roseType: "area",
        //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            formatter: "{c}辆",
          },
          emphasis: {
            show: true,
          },
        },
        labelLine: {
          normal: {
            show: true,
            length2: 1,
          },
          emphasis: {
            show: true,
          },
        },
        data: [
          {
            value: 600,
            name: "车型一",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: "rgba(0, 255, 255, 1)"
									},
									{
										offset: 0.5,
										color: "rgba(0, 255, 255, 0.5)"
									},
									{
										offset: 1,
										color: "rgba(0, 255, 255, 1)"
									}
								]),
								shadowBlur: 20,
								shadowColor: "rgba(0, 255, 255, 1)"
              },
            },
          },
          {
            value: 1100,
            name: "车型二",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: "rgba(0, 207, 255, 1)"
									},
									{
										offset: 0.5,
										color: "rgba(0, 207, 255, 0.5)"
									},
									{
										offset: 1,
										color: "rgba(0, 207, 255, 1)"
									}
								]),
								shadowBlur: 20,
								shadowColor: "rgba(0, 207, 255, 1)"
              },
            },
          },
          {
            value: 1200,
            name: "车型三",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: "rgba(0, 108, 237, 1)"
									},
									{
										offset: 0.5,
										color: "rgba(0, 108, 237, 0.5)"
									},
									{
										offset: 1,
										color: "rgba(0, 108, 237, 1)"
									}
								]),
								shadowBlur: 20,
								shadowColor: "rgba(0, 108, 237, 1)"
              },
            },
          },
          {
            value: 1300,
            name: "车型四",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: "rgba(255, 224, 0, 1)"
									},
									{
										offset: 0.5,
										color: "rgba(255, 224, 0, 0.5)"
									},
									{
										offset: 1,
										color: "rgba(255, 224, 0, 1)"
									}
								]),
								shadowBlur: 20,
								shadowColor: "rgba(255, 224, 0, 1)"
              },
            },
          },
          {
            value: 1400,
            name: "车型五",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: "rgba(255, 91, 0, 1)"
									},
									{
										offset: 0.3,
										color: "rgba(255, 91, 0, 0.6)"
									},
									{
										offset: 1,
										color: "rgba(255, 91, 0, 1)"
									}
								]),
								shadowBlur: 20,
								shadowColor: "rgba(255, 91, 0, 1)"
              },
            },
          },

          {
            value: 0,
            name: "",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: "",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: "",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: "",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
          {
            value: 0,
            name: "",
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        ],
      },
    ],
  };
  myChart.setOption(option);
  return myChart;
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

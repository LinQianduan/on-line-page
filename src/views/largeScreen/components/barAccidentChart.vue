<template>
  <dv-decoration-8
    class="decoration-8"
    :color="['#0788b3', '#0788b3']"
    :reverse="true"
    style="width: 300px; height: 50px"
  />
  <div class="bar-accident" ref="mainRef"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as echarts from "echarts";
const mainRef = ref<HTMLElement | null>(null);
const initChart = () => {
  const myChart = echarts.init(mainRef.value as HTMLElement);
  let option = {
    textStyle: {
      color: "#333333",
    },
    legend: {
      show: true,
    },
    tooltip: {
      show: true,
      trigger: "item",
      axisPointer: {
        type: "line",
      },
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 0,
      padding: 5,
      textStyle: {
        color: "#fff",
        fontSize: 14,
      },
    },
		grid: {
			top: 10,
			bottom: 25,
			left: 100,
		},
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: [
      {
        show: true,
        type: "category",
        data: ["肇事逃逸", "单方事故", "车辆相撞", "行人被撞", "车辆剐蹭"],
        axisLine: {
          show: false,
          lineStyle: {},
        },
        axisTick: {
          show: false,
          lineStyle: {},
        },
        axisLabel: {
          show: true,
          fontSize: 16,
          color: "rgba(255, 255, 255, 1)",
        },
      },
      {
        show: true,
        data: [40, 50, 200, 140, 120],
        axisLine: {
          show: false,
          lineStyle: {},
        },
        axisTick: {
          show: false,
          lineStyle: {},
        },
        axisLabel: {
          show: true,
          fontSize: 16,
          color: function (value: any) {
            if (value === "200") {
              return "#ffe000";
            }
            return "#089CF6";
          },
        },
      },
    ],
    series: [
      {
        name: "",
        type: "bar",
        yAxisIndex: 0,
        data: [40, 50, 200, 140, 120],
        barCategoryGap: 50,
        barWidth: 6,
        itemStyle: {
          color: function (params: any) {
            if (params.data === 200) {
              return "#ffe000";
            }
            return "#089CF6";
          },
        },
      },
      {
        name: "",
        type: "bar",
        yAxisIndex: 1,
        barCategoryGap: 20,
        barWidth: 15,
        data: [250, 250, 250, 250, 250],
        itemStyle: {
          color: "none",
          barBorderRadius: 2,
          borderColor: "#089CF6",
          borderWidth: 0.5,
        },
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
.bar-accident {
  width: 100%;
  height: 100%;
}
.decoration-8 {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>

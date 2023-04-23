<template>
  <dv-decoration-8
    class="decoration-8"
    :color="['#0788b3', '#0788b3']"
    style="width: 300px; height: 50px"
  />
  <div class="bar-accident" ref="mainRef"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as echarts from "echarts";
const mainRef = ref<HTMLElement | null>(null);
let option = ref<any>(null)
let myChart = null
const initChart = () => {
  myChart = echarts.init(mainRef.value as HTMLElement);
  option.value = {
    textStyle: {
      color: "#ffffff",
    },
    xAxis: {
      name: "X 标题",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      axisLabel: {
        fontSize: 14,
        rotate: 45,
        interval: "auto",
      },
      showMaxLabel: true,
      axisLine: {
        show: true,
        symbol: ["none", "none"],
        lineStyle: {
          color: "#fff",
        },
      },
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      name: "Y 标题",
      type: "value",
      axisLabel: {
        formatter: "{value}",
        fontSize: 16,
        lineHeight: 30,
      },
      axisLine: {
        show: true,
        symbol: ["none", "none"]
      },
      // 显示刻度
      axisTick: {
        show: true,
      },
    },
    // 框选工具
    brush: {
      toolbox: ["rect", "polygon", "clear"],
      xAxisIndex: 0,
      throttleType: "debounce",
      //开启选中延迟后调用回调延迟
      throttleDelay: 600,
      //选中延迟后调用回调延迟时间
			textStyle: {
				color: '#ffffff' // 修改文字颜色为白色
			},
			title: {
				rect: '矩形选择',
				polygon: '圈选',
				lineX: '横向选择',
				lineY: '纵向选择',
				keep: '保持选择',
				clear: '清除选择'
			}
    },
    legend: {
      top: 25,
      right: "center",
      type: "plain",
			textStyle: {
				color: '#fff'
			}
    },
    grid: {
      bottom: 50,
      // 距底部距离
      left: 30,
      right: 60,
      containLabel: true,
      // 为ture才会生效以上的设置
    },
		tooltip: {
      show: true,
      trigger: "axis",
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
    series: [
      {
        name: "更新率",
        data: [
          {
            id: 1,
            value: 95,
          },
          {
            id: 2,
            value: 200,
          },
          {
            id: 3,
            value: 229,
          },
          {
            id: 4,
            value: 123,
          },
          {
            id: 5,
            value: 187,
          },
          {
            id: 6,
            value: 194,
          },
          {
            id: 7,
            value: 78,
          },
        ],
        type: "line",
        color: "#FFA826",
        showSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 6,
      },
      {
        name: "利用率",
        data: [
          {
            id: 8,
            value: 199,
          },
          {
            id: 9,
            value: 167,
          },
          {
            id: 10,
            value: 178,
          },
          {
            id: 11,
            value: 130,
          },
          {
            id: 12,
            value: 98,
          },
          {
            id: 13,
            value: 244,
          },
          {
            id: 14,
            value: 156,
          },
        ],
        type: "line",
        color: "#4DC772",
        showSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 6,
      },
    ],
  };
  myChart.setOption(option.value);
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
  left: 0;
}
</style>

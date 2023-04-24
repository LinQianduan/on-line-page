<template>
  <dv-decoration-8
    class="decoration-8"
    :color="['#0788b3', '#0788b3']"
    style="width: 300px; height: 50px"
  />
  <div class="bar-accident" ref="mainRef"></div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
type State = {
  pixelSeries: any[]
}
const state = reactive<State>({
  pixelSeries: []
})
const mainRef = ref<HTMLElement | null>(null);
let option: any = null
let myChart: any = null;
const initChart = () => {
  myChart = echarts.init(mainRef.value as HTMLElement);
  option = {
    textStyle: {
      color: "white",
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
          color: "#ccc",
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
          symbol: ["none", "none"],
          lineStyle: {
              color: "#ccc",
          },
      },
      // 显示刻度
      axisTick: {
        show: true,
      },
    },
    
    toolbox: {
      show: true,
      showTitle: true,
      iconStyle: {
        color: '#fff',
        borderColor: '#fff'
      },
      feature: {
        brush: {
          type: ["rect", "polygon", "clear"],
          title: {
            rect: '矩形选择',
            polygon: '圈选',
            lineX: '横向选择',
            lineY: '纵向选择',
            keep: '保持选择',
            clear: '清除选择'
          }
        }
      }
    },
    // 框选工具
    brush: {
      toolbox: ["rect", "polygon", "clear"],
      xAxisIndex: 0,
      throttleType: "debounce",
      //开启选中延迟后调用回调延迟
      // throttleDelay: 100,
      //选中延迟后调用回调延迟时间
			textStyle: {
				color: '#ffffff' // 修改文字颜色为白色
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
        symbol: "emptyCircle",
        symbolSize: 8,
        color: '#ffe000',
        lineStyle: {
          normal: {
            color: "#ffe000"
          }
        },
        itemStyle: {
          normal: {
            color: "#ffe000"
          }
        }
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
        symbol: "emptyCircle",
        symbolSize: 8,
        color: '#00ffff',
        lineStyle: {
          normal: {
            color: "#00ffff"
          }
        },
        itemStyle: {
          normal: {
            color: "#00ffff"
          }
        }
      },
    ],
  };
  myChart.setOption(option);
  state.pixelSeries = getConvertToPixel(option.series);
  myChart.on('brushSelected', renderBrushed)
  return myChart;
};
window.addEventListener("resize", () => {
  myChart.resize();
  // 窗口尺寸发生变化时重新获取每个点的像素坐标
  state.pixelSeries = getConvertToPixel(option.series);
});

const getConvertToPixel = (series: any[]) => {
  const results = series.map((v, seriesIndex: number) => {
    const dataPxel = v.data.map((m: any, dataIndex: number) => {
      // 坐标点转像素坐标
      const position = myChart.convertToPixel('grid', [dataIndex, m.value]);
      return {
        id: m.id,
        data: m.value,
        xPxel: position[0],
        yPxel: position[1],
        seriesIndex: seriesIndex,
        dataIndex: dataIndex,
      };
    });
    return {
      ...v,
      dataPxel,
    };
  });
  return results;
};

function renderBrushed(params: any) {
  let brushList: any[] = [];
  if (params.batch.length < 1 || params.batch[0].areas.length < 1) {
    brushDotColor(brushList)
    return;
  }
  const range = params.batch[0].areas[0].range;
  state.pixelSeries.map((v) => {
    v.dataPxel.forEach((m: any) => {
      try {
        let seriesIndex = m.seriesIndex;
        let dataIndex = m.dataIndex;
        const point = [m.xPxel, m.yPxel]
        let flag = false
        if (params.batch[0].areas[0].brushType == 'rect') {
          flag = isPointInRect(point, range)
        }
        if (params.batch[0].areas[0].brushType == 'polygon') {
          flag = isPointInPolygon(point, range)
        }
        if (flag) {
          brushList.push(({
            id: m.id, seriesIndex: seriesIndex, dataIndex: dataIndex,
          }))
        }
      } catch (e) {
        console.info(JSON.stringify(e));
      }

    });
  });
  console.log(brushList, "选中的数据");
  brushDotColor(brushList)
};
// 判断像素点是否在矩形范围内
function isPointInRect(point: any, rect: any) {
  let x = point[0], y = point[1];
  let x1 = rect[0][0], y1 = rect[1][0], x2 = rect[0][1], y2 = rect[1][1];
  return x >= x1 && x <= x2 && y >= y1 && y <= y2;
};
// 断像素点是否在polygon圈选范围内
function isPointInPolygon(point: any, polygon: any) {
  let count = 0;
  for (let i = 0, len = polygon.length; i < len; i++) {
    let p1 = polygon[i];
    let p2 = polygon[(i + 1) % len];
    if (point[1] > Math.min(p1[1], p2[1]) && point[1] <= Math.max(p1[1], p2[1])) {
      let x = (point[1] - p1[1]) * (p2[0] - p1[0]) / (p2[1] - p1[1]) + p1[0];
      if (x > point[0]) {
        count++;
      }
    }
  }
  return count % 2 == 1;
};
// 变色选中的点变色
function brushDotColor(list: any) {
	const copySeries = option.series.map((seriesItem: any, seriesInx: number) => {
		return {
			...seriesItem,
			itemStyle: {
				color: (params: any) => {
					const index = list.findIndex((m: any) => m.seriesIndex == params.seriesIndex && m.dataIndex == params.dataIndex)
					if(index != -1) {
						return 'crimson'
					} else {
						return params.color
					}
				}
			}
		}
	})
	myChart.setOption({ series: copySeries });
}

defineExpose({
  initChart
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

<template>
  <div class="clock" id="clock">
		<Flipper ref="flipperHour1" />
		<Flipper ref="flipperHour2" />
		<em>:</em>
		<Flipper ref="flipperMinute1" />
		<Flipper ref="flipperMinute2" />
		<em>:</em>
		<Flipper ref="flipperSecond1" />
		<Flipper ref="flipperSecond2" />
  </div>
</template>
<script setup lang="ts" name="Clock">
import { ref, reactive, onMounted, nextTick, onBeforeUnmount } from "vue";
import Flipper from './Flipper.vue'
import { parseTime } from '@/utils/index'

let timer: any = ref(null)
let flipObjs: any = reactive({ arr: [] })
let flipperHour1 = ref(null)
let flipperHour2 = ref(null)
let flipperMinute1 = ref(null)
let flipperMinute2 = ref(null)
let flipperSecond1 = ref(null)
let flipperSecond2 = ref(null)

// 初始化数字
const init = () => {
  let now = new Date()
  let nowTimeStr = parseTime(new Date(now.getTime()), '{hh}{ii}{ss}')
   for (let i = 0; i < flipObjs.arr.length; i++) { 
		if(flipObjs.arr[i].value?.setFront) flipObjs.arr[i].value.setFront(nowTimeStr[i])
     
   }
}

// 开始计时
const run = () => {
  timer.value = setInterval(() => {
    // 获取当前时间
    let now = new Date()
    let nowTimeStr = parseTime(new Date(now.getTime() - 1000), '{hh}{ii}{ss}')
    let nextTimeStr = parseTime(now, '{hh}{ii}{ss}')
    for (let i = 0; i < flipObjs.arr.length; i++) {
      if (nowTimeStr[i] == nextTimeStr[i] && nowTimeStr[i] == flipObjs.arr[i].value.frontText) {
        continue
      }
      nextTick(() => {
				if(flipObjs.arr[i].value?.flipDown) {
					flipObjs.arr[i].value.flipDown(
						nowTimeStr[i], 
						nextTimeStr[i]
					)
				}
				
			})
    }
  }, 1000)
}
onMounted(() => {
	nextTick(() => {
		flipObjs.arr = [
			flipperHour1,
			flipperHour2,
			flipperMinute1,
			flipperMinute2,
			flipperSecond1,
			flipperSecond2
		]
		init()
		run()
		
	})
})

onBeforeUnmount(() => {
	clearInterval(timer.value)
})

</script>
<style scoped lang="scss">
.clock {
	width: 100%;
	height: 100%;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	em {
		display: inline-block;
		line-height: 50px;
		font-size: 38px;
		font-style: normal;
    font-family: 'UnidreamLED' !important;
		vertical-align: top;
	}
}
</style>

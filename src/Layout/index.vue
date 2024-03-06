<template>
	<div class="app-wrapper">
		<!-- 背景图片 -->
		<div class="bg-all">
      <img id="bg" :src="store.bgImage || background5" />
      <div class="cover"></div>
    </div>
    <div class="bg-col">
      <div class="col-left" ref="colLeftRef"></div>
      <div class="col-right" ref="colRightRef"></div>
    </div>
		<div class="sidebar-container">
			<Sidebar class="sidebar" />
		</div>
		<AppMain />
    <Dia ref="diaRef" v-if="showDia" />
	</div>
</template>
<script setup lang='ts'>
import AppMain from './AppMain.vue'
import Sidebar from './Sidebar.vue'
import { ref, reactive, onMounted, nextTick } from 'vue'
import Dia from '@/components/Dia.vue'
import background5 from '@/assets/image/background5.webp'
import { GlobalStore } from '@/stores'
import { gsap, TimelineMax } from 'gsap';
const store = GlobalStore()
const colLeftRef = ref(null);
const colRightRef = ref(null);
const diaRef = ref(null);
const showDia = ref(true);
onMounted(() => {
  const animation1 = gsap.to(colLeftRef.value, {
    left: "-100%",
    duration: 1.5,
    display: "none",
    ease: 'power1.inOut'
  })
  const animation2 = gsap.to(colRightRef.value, {
    right: "-100%",
    duration: 1.5,
    display: "none",
    ease: 'power1.inOut'
  })
  const tl = new TimelineMax();
  tl.add(animation1, 0);
  tl.add(animation2, 0);
  tl.from(diaRef.value.$el, {
    duration: 1,
    opacity: 0.1,
    y: -200,
    scale: 0.3,
    ease: "elastic.out(1, 0.85)" // 使用弹簧缓动效果
  });

})
</script>
<style scoped lang='scss'>
.app-wrapper {
	position: relative;
	height: 100%;
	width: 100%;
	/*背景*/
  .bg-all {
    z-index: -1;
    position: absolute;
    top: calc(0px + 0px);
    left: 0;
    width: 100%;
    height: calc(100vh - 0px);
    transition: 0.25s;
    #bg {
      transform: scale(1.1);
      animation: filterDim 1s ease-in-out both;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      object-fit: cover;
      transition: opacity 1s, transform 0.25s, filter 0.25s;
      backface-visibility: hidden;
    }
    @keyframes filterDim {
      0% {
        filter: blur(10px);
      }
      100% {
        filter: blur(0px);
      }
    }

    img.error {
      display: none;
    }
    .cover {
      opacity: 1;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.5) 100%
        ),
        radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
      transition: all 1.5s ease 0s;
    }
  }
  .bg-col {
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    .col-left {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 100vh;
      background-color: #4b4b4b;
      z-index: 999;
      opacity: 0.9;
      // animation: leftMove 1s ease-in-out both;
    }
    .col-right {
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      z-index: 999;
      height: 100vh;
      background-color: #4b4b4b;
      opacity: 0.9;
      // animation: rightMove 1s ease-in-out both;
    }
    @keyframes leftMove {
      0% {
        left: 0;
      }
      30% {
        left: 0;
      }
      100% {
        left: -100%;
        display: none;
      }
    }
    @keyframes rightMove {
      0% {
        right: 0;
      }
      30% {
        right: 0;
      }
      100% {
        right: -100%;
        display: none;
      }
    }
  }
	.sidebar-container {
		box-sizing: border-box;
		width: 100%;
		height: 116px;
		padding: 16px 0;
		.sidebar {
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 1300px;
			height: 100%;
		}
	}
}
</style>
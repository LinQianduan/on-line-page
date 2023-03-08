<template>
  <!-- 背景图片 -->
  <div class="app">
    <div id="my-progress"></div>
    <div class="bg-all">
      <img id="bg" :src="background5" />
      <div class="cover"></div>
    </div>
    <div class="bg-col">
      <div class="col-left"></div>
      <div class="col-right"></div>
    </div>
    <div id="app">
      <router-view />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import background5 from '@/assets/image/background5.webp'
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
</script>

<style scoped lang="scss">
.app {
  background: rgb(0 0 0 / 25%);
  box-sizing: border-box;
	position: relative;
  width: 100%;
	height: 100%;
	overflow: hidden;
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
      animation: leftMove 1s ease-in-out both;
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
      animation: rightMove 1s ease-in-out both;
    }
    @keyframes leftMove {
      0% {
        width: 50%;
      }
      30% {
        width: 50%;
      }
      100% {
        width: 0;
        display: none;
      }
    }
    @keyframes rightMove {
      0% {
        width: 50%;
      }
      30% {
        width: 50%;
      }
      100% {
        width: 0;
        display: none;
      }
    }
  }

  .sidebar-container {
    width: 1300px;
    height: 80px;
    margin: 0 auto;
  }
  #app {
    height: 100%;
  }
}

</style>
<style>
#my-progress {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  width: 120px;
  height: 6px;
  z-index: 200;
  border-radius: 10px;
  overflow: hidden;
}
</style>

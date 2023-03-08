<template>
  <!-- 背景图片 -->
  <div class="app">
    <div id="my-progress"></div>

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
  // background: rgb(0 0 0 / 25%);
  // background: linear-gradient(130deg, rgb(36, 198, 220), rgb(84, 51, 255) 41.07%, rgb(255, 0, 153) 76.05%);
  box-sizing: border-box;
	position: relative;
  width: 100%;
	height: 100%;
	overflow: hidden;
  

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

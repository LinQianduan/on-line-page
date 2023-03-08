<template>
	<section class="app-main">
		<router-view v-slot="{ Component, route }" :key="route.path">
			<transition appear name="fade-transform" mode="out-in">
				<component :is="Component" :key="route.path" />
			</transition>
		</router-view>
	</section>
</template>
<script setup lang='ts' name='AppMain'>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style scoped lang='scss'>
.app-main {
  position: relative;
	width: 100%;
	height: calc(100vh - 116px);
	overflow-y: overlay;
	
	&::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 12px;
    background:rgba($color: #a8a8a8, $alpha: 0.5);
    &:hover {
      background:rgba($color: #a8a8a8, $alpha: 0.8);
    }
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: transparent;
    background: transparent;
    border-radius:12px;
  }
}
</style>
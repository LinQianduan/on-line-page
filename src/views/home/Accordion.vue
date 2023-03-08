<template>
	<div class="accordion">
		<div 
			v-for="item in phtotOptions" 
			:key="item.id"
			class="list" 
			:class="activeId === item.id ? 'active' : ''"
			@mouseenter="handleEenter(item.id)"
		>
      <div class="hide">
				<div class="icon-btn" @click.stop="handleMoreClick(item.id)">
					<SvgIcon name="more3" :iconStyle="{ width: '16px', height: '16px' }" />
				</div>
      	<el-image @click="initialIndex = item.id - 1" :preview-src-list.stop="phtotOptions.map(item => item.src)" :initial-index="initialIndex" class="img" :src="item.src" fit="cover" />
      </div>
    </div>
	</div>
	<MDialog 
    width="1200px"
    v-model="modelValue"
    v-model:fullScreen="fullScreen"
    :before-close="handleClose"
    :close-on-click-modal="false"
	  draggable
		>
		<!-- bg-color="#212121" -->
    <span>This is a message</span>
  </MDialog>
</template>
<script setup lang='ts'>
import SvgIcon from '@/components/SvgIcon/index.vue'
import MDialog from '@/components/MDialog/index.vue'
import { ref, reactive } from 'vue'
import image1 from '@/assets/img/1.webp'
import image2 from '@/assets/img/2.jpg'
import image3 from '@/assets/img/3.png'
import image4 from '@/assets/img/4.jpg'
import image5 from '@/assets/img/5.jpg'
interface PhtotOptions {
	describe: string
	src: string,
	id: number
}
const phtotOptions = ref<Array<PhtotOptions>>([
	{ describe: '文字描述', src: image1, id: 1 },
	{ describe: '文字描述', src: image2, id: 2 },
	{ describe: '文字描述', src: image3, id: 3 },
	{ describe: '文字描述', src: image4, id: 4 },
	{ describe: '文字描述', src: image5, id: 5 },
])
const initialIndex = ref<number>(0)

const activeId = ref<Number>(1)
const handleEenter = (type: number) => {
	activeId.value = type
}

const handleMoreClick = (id: number) => {
	modelValue.value = true
}

let modelValue = ref<boolean>(false)
let fullScreen = ref<boolean>(false)

const handleClose = (done: () => void) => {
  modelValue.value = false
}
</script>
<style scoped lang='scss'>
.accordion {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	user-select:none;
	.list {
		border-radius: 6px;
		margin: 0 3px;
		flex: 12;
		overflow: hidden;
		// cursor: pointer;
		transition: all .8s ease-out;
		.hide {
			width: 100%;
			height: 100%;
			position: relative;
			.icon-btn {
				position: absolute;
				width: 20px;
				height: 20px;
				left: 4px;
				top: 8px;
				z-index: 10;
				cursor: pointer;
			}
			.img {
				width: 100%;
				height: 100%;
				object-position: left 50%;
			}
		}
		&:first-child {
			margin-left: 0;
		}
		&:last-child {
			margin-right: 0;
		}
	}
	.active {
		flex: 52;
		transition: all .8s ease-out;
	}
}
</style>
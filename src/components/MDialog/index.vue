<template>
  <div class="m-dialog">
    <el-dialog v-bind="$attrs" :fullscreen="fullScreen" :show-close="false">
			<template #header="{ close, titleId, titleClass }">
				<div class="d-dialog-header" :id="titleId" :class="titleClass">
					<div class="d-dialog-tool cu-p is-win">
						<span title="放大/缩小"  v-if="props.showFullScreen && props.fullScreen !== undefined" @click.stop="isFullscreen">
							<SvgIcon name="fullScreen" v-if="!props.fullScreen" :iconStyle="{ width: '14px', height: '14px'}" />
							<SvgIcon name="fullscreen-exit-fill" v-else :iconStyle="{ width: '14px', height: '14px'}" />
						</span>
						<span title="关闭" @click.stop="close">
							<SvgIcon name="close" :iconStyle="{ width: '16px', height: '16px'}" />
						</span>
					</div>
					<div class="d-dialog-title">{{ title }}</div>
				</div>
			</template>
			<template v-for="(value, name) in $slots" #[name]="slotData">
				<slot :name="name" v-bind="slotData || {}"></slot>
			</template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onUpdated } from "vue";
import SvgIcon from '@/components/SvgIcon/index.vue'

interface Props {
	fullScreen?: boolean;
	showFullScreen?: boolean; // 是否显示全屏按钮
	bgColor?: string; // 背景颜色
	title?: string;
}
interface Emits {
  (e: "confirm"): void;
  (e: "cancel"): void;
	(e: "handleClose"): void;
	(e: "update:fullScreen", val: boolean): void;
	(e: "update:modelValue", val: boolean): void;
}
const emits = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
	fullScreen: false,
	showFullScreen: true,
	bgColor: "#fff",
	title: ''
});

const fullScreen = ref<boolean>(false)
onUpdated(() => {
  if (props.fullScreen !== undefined) {
    fullScreen.value = props.fullScreen
  }
})

// 全屏切换
function isFullscreen() {
	fullScreen.value = !fullScreen.value
  if (props.fullScreen !== undefined) {
    emits('update:fullScreen', fullScreen.value)
  }
}
</script>
<style scoped lang="scss">
.m-dialog {
	:deep(.el-dialog) {
		border-radius: 6px;
		overflow: hidden;
		background-color: v-bind(bgColor);
	}
  :deep(.el-dialog__header) {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;
    height: 10px;
    padding: 0;
		margin-right: 0px;
    text-align: center;
  }
  :deep(.el-dialog__body) {
    box-sizing: border-box;
    overflow: hidden;
    min-height: 300px;
		padding: 0;
    transform: translateZ(0);
  }
	.d-dialog-header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 5px;
    text-align: center;
    color: #222;
    z-index: 9;
		.d-dialog-title {
			text-align: center;
			color: #222;
		}
		.d-dialog-tool {
			color: #222;
			overflow: hidden;
			position: absolute;
			text-align: center;
			font-size: 14px;
			span {
				transition: .2s;
			}
		}
		.is-win {
			top: 0;
  		right: 0;
			span {
				float: left;
				line-height: 26px;
				width: 40px;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 26px;
				&:hover {
					background-color: #a2a2a2;
    			color: #333;
				}
				&:last-child:hover {
					background-color: #e81123;
    			color: #fff;
				}
			}
		}
  }
	.cu-p {
		cursor: pointer;
	}
}
</style>

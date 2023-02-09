<template>
  <div class="m-dialog">
    <el-dialog v-model="visible" v-bind="$attrs" :draggable="props.draggable" :fullscreen="fullScreen" :show-close="false">
			<div class="d-dialog-header">
				<div class="d-dialog-tool cu-p is-win">
					<span title="放大/缩小"  v-if="props.showFullScreen && props.fullScreen !== undefined" @click.stop="isFullscreen">
						<SvgIcon name="fullScreen" v-if="!props.fullScreen" :iconStyle="{ width: '14px', height: '14px'}" />
						<SvgIcon name="fullscreen-exit-fill" v-else :iconStyle="{ width: '14px', height: '14px'}" />
					</span>
					<span title="关闭" @click.stop="handleClose">
						<SvgIcon name="close" :iconStyle="{ width: '16px', height: '16px'}" />
					</span>
				</div>
				<div class="d-dialog-title">title</div>
			</div>

      <slot name="default"></slot>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onUpdated } from "vue";
import SvgIcon from '@/components/SvgIcon/index.vue'

interface Props {
  modelValue: boolean;
	draggable?: boolean;
	fullScreen?: boolean;
	showFullScreen?: boolean; // 是否显示全屏按钮
	bgColor?: string; // 背景颜色
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
  modelValue: false,
	draggable: false,
	fullScreen: false,
	showFullScreen: true,
	bgColor: "#fff"
});

// 关闭弹窗
function handleClose() {
	visible.value = false
	emits('update:modelValue', false)
}

const visible = ref<boolean>(props.modelValue as boolean)
const fullScreen = ref<boolean>(false)
onUpdated(() => {
  visible.value = props.modelValue
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
    left: 100px;
    top: 0;
    right: 100px;
    z-index: 10;
    height: 10px;
    padding: 0;
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

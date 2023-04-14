<template>
  <div class="flip" :class="isFlipping ? 'go' : ''">
    <div class="card1 card-item">{{ backText }}</div>
    <div class="card2 card-item">{{ backText }}</div>
    <div class="card3 card-item">{{ frontText }}</div>
    <div class="card4 card-item">{{ frontText }}</div>
  </div>
</template>
<script setup lang="ts" name="Flipper">
import { ref, reactive, unref } from "vue";
export interface Props {
  frontText?:  number | string
  backText?: number | string
	duration?: number
  width?: number | string
  height?: number | string
}
const props = withDefaults(defineProps<Props>(), {
	frontText: 0, // 前牌文字
  backText: 1, // 后牌文字
  duration: 600,
  width: "34px",
  height: "50px"
})

let width = ref<number | string>(props.width);
let height = ref<number | string>(props.height);

let frontText = ref<number | string>(props.frontText);
let backText = ref<number | string>(props.backText);
let isFlipping = ref<boolean>(false);

const flipDown = (front: number | string, back: number | string) => {
  if (isFlipping.value) return;
	frontText.value = front
  backText.value = back
  // 将翻转态设置为true
  isFlipping.value = true;
  // 翻转结束后，恢复状态
  setTimeout(function () {
    // 将翻转态设置为false
    isFlipping.value = false;
    // 更新当前文字
    frontText.value = back;
  }, props.duration);
};
// 设置前牌文字
const setFront = (text: number | string) => {
	frontText.value = text
};
// 设置后牌文字
const setBack = (text: number | string) => {
	backText.value = text
}
defineExpose({
  flipDown,
  setFront,
  setBack,
  frontText
});
</script>
<style scoped lang="scss">
.flip {
    position: relative;
    width: v-bind(width);
    height: v-bind(height);
		margin: 2px;
    .card-item {
      background-color: #fff;
      position: absolute;
      width: 100%;
      height: calc(50% - 1px);
      left: 0;
      top: 0;
      color: #1e1e1e;
      letter-spacing: 2px;
      font-family: 'UnidreamLED' !important;
      text-align: center;
      overflow: hidden;
      border-radius: 4px;
      font-size: calc(v-bind(height) / 5 * 4);
      transition: 2s;
    }
    .card1 {
      line-height: v-bind(height);
      z-index: 1;
      transform-origin: center calc(100% + 1px);
      backface-visibility: hidden;
      transform: rotateX(0);
    }
    .card2 {
      top: calc(50% + 1px);
      z-index: 2;
      line-height: 0px;
      transform-origin: center calc(0% + 1px);
      backface-visibility: hidden;
      transform: rotateX(180deg);
    }
    .card3 {
      line-height: v-bind(height);
      transform-origin: center calc(100% + 1px);
      backface-visibility: hidden;
      z-index: 2;
      transform: rotateX(0deg);
    }
    .card4 {
      z-index: 1;
      top: calc(50% + 1px);
      line-height: 0;
      transform-origin: center calc(0% + 1px);
      backface-visibility: hidden;
      transform: rotateX(0);
    }
    &.go .card2 {
      animation: frontFlipDown 0.6s ease-in-out both;
    }
    &.go .card3 {
      animation: backFlipDown 0.6s ease-in-out both;
    }

    @keyframes frontFlipDown {
      0% {
        transform: rotateX(180deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    }

    @keyframes backFlipDown {
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(180deg);
      }
    }
}
</style>

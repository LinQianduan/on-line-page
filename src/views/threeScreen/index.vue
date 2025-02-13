<template>
  <div class="model-container" ref="modelContainerDom">
    <div class="three-parent" ref="containerDom"></div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
// @ts-ignore
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";

import { onMounted, ref, reactive, toRefs } from "vue";
type State = {
  renderer: THREE.WebGLRenderer | null;
  canvasDom: HTMLCanvasElement | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  controls: OrbitControls | null;
  light: THREE.DirectionalLight | null;
  mainGroup: THREE.Group | null;
  outlinePass: OutlinePass | null;
  composer: EffectComposer | null;
};
const state = reactive<State>({
  renderer: null,
  canvasDom: null,
  scene: null,
  camera: null,
  controls: null,
  light: null,
  mainGroup: null,
  outlinePass: null,
  composer: null,
});
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
// 使用 toRefs 来保持响应性
const { renderer, canvasDom, scene, camera, controls, light } = toRefs(state);
const containerDom = ref<HTMLDivElement | null>(null); // 容器
onMounted(() => {
  initRenderer();
});
function initRenderer() {
  const dom = containerDom.value as HTMLDivElement;

  const width = dom.clientWidth;
  const height = dom.clientHeight;
  const aspect = width / height; // 窗口宽高比
  // 初始化渲染器
  state.renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true, // 启用透明背景
    preserveDrawingBuffer: true, // 保留图形缓冲区
  });
  state.canvasDom = state.renderer.domElement;
  state.scene = new THREE.Scene();
  state.camera = new THREE.PerspectiveCamera(60, aspect, 0.01, 1000000);
  state.camera.position.set(10, 10, 10);
  state.camera.lookAt(0, 0, 0);

  // 设置渲染器尺寸
  state.controls = new OrbitControls(state.camera, state.canvasDom);
  // 设置渲染器大小
  state.renderer.setSize(width, height);
  // 将渲染器的 DOM 元素添加到 Vue 组件的 DOM 中
  dom.appendChild(state.canvasDom);
  // 创建灯光
  state.light = new THREE.DirectionalLight(0xffffff, 1.5);
  // 设置一个斜着的位置
  state.light.position.set(10, 10, 10);
  state.scene.add(state.light);

  // 创建主节点，所有节点都挂载到主节点上，方便后续操作
  let mainGroup = new THREE.Group();
  mainGroup.name = "mainGroup";
  state.scene.add(mainGroup);
  state.mainGroup = mainGroup;

  const gridHelperXZ = new THREE.GridHelper(100, 10);
  state.scene.add(gridHelperXZ);

  //后期处理效果器
  const composer = new EffectComposer(state.renderer);
  //渲染通道
  const renderPass = new RenderPass(state.scene, state.camera);
  //将渲染通道加入效果器
  composer.addPass(renderPass);
  //描边效果
  let outlinePass = new OutlinePass(
    new THREE.Vector2(width, height),
    state.scene,
    state.camera
  );
  //发光颜色
  outlinePass.visibleEdgeColor.set("#FFFF00");
  //被其它物体挡住部分的颜色
  outlinePass.hiddenEdgeColor.set("#FFFF00");
  //边缘辉光大小
  outlinePass.edgeGlow = 0.0;
  //默认是flase，改成true后仅显示边框
  outlinePass.usePatternTexture = false;
  //发光厚度
  outlinePass.edgeThickness = 1.0;
  //发光强度
  outlinePass.edgeStrength = 6.0;
  //能改变光的宽度，建议默认不动
  outlinePass.downSampleRatio = 1;
  //边缘闪烁，默认为0无闪烁，数值越小，闪的越快
  outlinePass.pulsePeriod = 0;
  state.outlinePass = outlinePass;
  composer.addPass(outlinePass);
  //不加的话外部模型没贴图
  const outputPass = new OutputPass();
  composer.addPass(outputPass);
  state.renderer.setPixelRatio(window.devicePixelRatio); // 更新渲染器的像素比例
  const pixelRatio = state.renderer.getPixelRatio();
  // 抗锯齿
  const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
  composer.addPass(smaaPass);
  state.composer = composer;
  render();
}
// 调整渲染器大小
function resize(renderer: THREE.WebGLRenderer) {
  const width = containerDom.value!.clientWidth;
  const height = containerDom.value!.clientHeight;
  const needResize =
    state.canvasDom!.width !== width || state.canvasDom!.height !== height;
  if (needResize) {
    renderer.setSize(width, height, true); // 更新渲染器的大小
    state.composer!.setSize(width, height); // 更新 composer 的大小
  }
  return needResize;
}
function render() {
  if (!state.renderer) return;
  if (resize(state.renderer)) {
    const clientWidth = containerDom.value!.clientWidth;
    const clientHeight = containerDom.value!.clientHeight;
    const aspect = clientWidth / clientHeight;
    state.camera!.aspect = aspect;
    state.camera!.updateProjectionMatrix();
    requestAnimationFrame(render);
    state.controls!.update();
    state.composer!.render();
    // 将方向光的位置设置为相机的位置
    // state.light!.position.copy(state.camera!.position);
    // state.light!.updateMatrixWorld(true);
  }
}
</script>

<style lang="scss" scoped>
.model-container {
  width: 100%;
  height: 100%;
  position: relative;
  .three-parent {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>

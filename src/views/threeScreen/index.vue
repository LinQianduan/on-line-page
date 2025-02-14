<template>
  <div class="model-container" ref="modelContainerDom">
    <div class="btn-top">
      <el-button type="primary" size="mini" @click="loadModel"
        >加载模型</el-button
      >
    </div>
    <div class="three-parent" ref="containerDom"></div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
// @ts-ignore
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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
const state: State = {
  renderer: null,
  canvasDom: null,
  scene: null,
  camera: null,
  controls: null,
  light: null,
  mainGroup: null,
  outlinePass: null,
  composer: null,
};
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
const containerDom = ref<HTMLDivElement | null>(null); // 容器
onMounted(async () => {
  initRenderer();
  await loadCar();
});
// 初始化
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
    state.composer?.setSize(width, height); // 更新 composer 的大小
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
    state.camera?.updateProjectionMatrix();
  }
  requestAnimationFrame(render);
  state.controls?.update();
  state.composer?.render();
}
function loadModel() {
  // 动态创建 input 元素
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".glb"; // 限制文件类型为 .js
  fileInput.style.display = "none"; // 隐藏 input 元素
  // 监听文件选择事件
  fileInput.addEventListener("change", function (event: any) {
    const file = event.target.files[0]; // 获取用户选择的文件
    console.log(file, "file");

    const reader = new FileReader(); // 创建 FileReader 对象

    // 文件读取成功时的回调
    reader.onload = function (e: any) {
      const data = reader.result as unknown as string | ArrayBuffer;
      const loader = new GLTFLoader();
      loader.parse(
        data,
        "",
        (gltf) => {
          const object = gltf.scene;
          // 计算包围盒
          const box = new THREE.Box3().setFromObject(object);
          const size = new THREE.Vector3();
          box.getSize(size); // 获取包围盒尺寸
          // 找出 X 和 Z 轴的最大尺寸
          const maxDimension = Math.max(size.x, size.z);
          // 计算缩放比例，使最大尺寸为 10 米
          const scale = 10 / maxDimension;
          object.scale.set(scale, scale, scale);
          object.position.set(0, 0, 0);
          // 设置模型位置为原点
          box.getCenter(object.position).multiplyScalar(-1);
          state.mainGroup?.add(object);
          state.controls?.update();
        },
        (error) => {
          console.error("GLB模型加载错误:", error);
        }
      );
    };

    // 文件读取失败时的回调
    reader.onerror = function () {};

    reader.readAsArrayBuffer(file); // 以 ArrayBuffer 的形式读取文件
  });
  // 触发文件选择对话框
  document.body.appendChild(fileInput); // 将 input 添加到文档中
  fileInput.click(); // 模拟点击
  document.body.removeChild(fileInput); // 移除 input 元素
}
async function loadCar() {
  const object = (await getRemoteModel("/model/car.glb")) as any;
  // 计算包围盒
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size); // 获取包围盒尺寸
  // 找出 X 和 Z 轴的最大尺寸
  const maxDimension = Math.max(size.x, size.z);
  // 计算缩放比例，使最大尺寸为 10 米
  const scale = 10 / maxDimension;
  object.scale.set(scale, scale, scale);
  object.position.set(0, 0, 0);
  // 设置模型位置为原点
  box.getCenter(object.position).multiplyScalar(-1);
  state.mainGroup?.add(object);
  state.controls?.update();
}
// 加载模型
function getRemoteModel(path: string, isLocal: boolean = false) {
  return new Promise((resolve, reject) => {
    axios
      .get(path, {
        responseType: "blob",
      })
      .then((res) => {
        let reader = new FileReader();

        reader.onload = () => {
          const data = reader.result as unknown as ArrayBuffer | string;
          const loader = new GLTFLoader();
          const geometry = loader.parse(
            data,
            "",
            (gltf) => {
              const object = gltf.scene;
              resolve(object);
            },
            (error) => {
              reject(new Error("加载模型错误"));
            }
          );
        };

        reader.onerror = () => {
          // 如果 FileReader 发生错误，拒绝 Promise
          reject(new Error("加载模型错误"));
        };

        // 开始读取文件
        reader.readAsArrayBuffer(res.data);
      })
      .catch((err) => {
        // 如果 HTTP 请求失败，拒绝 Promise
        reject(err);
      });
  });
}
</script>

<style lang="scss" scoped>
.model-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
  .btn-top {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
  }
  .three-parent {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>

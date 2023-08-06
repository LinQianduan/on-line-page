import { App } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $create: (args: any) => void; // 为全局方法添加类型声明
    // 在这里添加其他全局属性的类型声明
  }
}
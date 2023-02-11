
import { defineComponent } from 'vue'
import MDialog from '@/components/MDialog/index.vue'
import { ref } from "vue";
import styles from './index.module.scss'
export default defineComponent({ // 传入组件配置
  components: {
    MDialog
  },
  setup () {
    const width = ref<string>('1200px')
    let modelValue = ref<boolean>(false)
    let fullScreen = ref<boolean>(false)
    function handleClose (done: () => void) {
      modelValue.value = false
    }
    function handleClick () {
      modelValue.value = true
    }
    console.log(styles, 20);
    
    const render = () => {
      return <>
        <div class={styles.title}>开发中。。。</div>
        <el-button type="default" style="margin-left: 40px;" onClick={ handleClick }>点击弹窗</el-button>
        <m-dialog
          width={ width.value }
          v-model:modelValue = { modelValue.value }
          v-model:fullScreen = { fullScreen.value }
          draggable = { true }
          onHandleClose = { handleClose }
          close-on-click-modal={ false }
        >
          <span>This is a message</span>
        </m-dialog>
      </>
    }
    return render
  }
})
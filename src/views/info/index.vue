<script lang="tsx">
import { defineComponent, getCurrentInstance } from 'vue'
import MDialog from '@/components/MDialog/index.vue'
import { ref } from "vue";
import styles from './index.module.scss'
import { createComponent } from "@/utils/createComponent"
import InfoDialog from "./infoDialog.vue"
export default defineComponent({ // 传入组件配置
  components: {
    MDialog
  },
  
  setup() {
    function handleClose (done: () => void) {
    }
    const instance = getCurrentInstance()
    
    function handleClick () {
      instance?.proxy?.$create({
        component: InfoDialog
      })
      
    }
    const sidebarStyle = {
      borderRight: '1px solid #ddd',
      background: '#f5f5f5'
    };
    const render = () => {
      return <>
        <div class={sidebarStyle} style={sidebarStyle}>开发中。。。</div>
        <el-button type="default" style="margin-left: 40px;" onClick={ handleClick }>点击弹窗</el-button>
      </>
    }
    return render
  }
})
</script>
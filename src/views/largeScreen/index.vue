<script lang="tsx">
import { ref, reactive, defineComponent, onMounted } from "vue";
import './index.scss'
import ksh from '@/assets/image/ksh33.png'
import { useRouter } from 'vue-router'
import ChinaMapChart from './components/chinaMapChart.vue'
export default defineComponent({
  components: {
    ChinaMapChart
  },
  setup() {
    const router = useRouter()
    const chinaMapChartRef = ref<InstanceType<typeof ChinaMapChart> | null>(null);
    onMounted(() => {
      (chinaMapChartRef.value as any)?.initChart();
    })
    const back = () => {
      router.go(-1)
    };
    const render = () => {
      return (
        <>
          <div class='large-box'>
            <div class="parent">
              <div class="dataScreen-header">
                <div class="header-lf">
                  <span class="header-screening" onClick={back}>返 回</span>
                </div>
                <div class="header-ct">
                  <div class="header-ct-title">
                    <span>智慧旅游可视化大数据展示平台</span>
                    <div class="header-ct-warning">平台高峰预警信息（2条）</div>
                  </div>
                </div>
                <div class="header-rg">
                  <span class="header-screening">返 回</span>
                </div>
              </div>
              <div class="div5 visual_bd">
              </div>
              <div class="div6 visual_bd"> </div>
              <div class="div7">
                <div class='visual_title'>
                  <span>交通流量</span>
                  <img src={ksh}></img>
                </div>
              </div>
              <div class="div8 visual_bd_center">
                <ChinaMapChart ref={chinaMapChartRef}></ChinaMapChart>
              </div>
              <div class="div9 visual_bd">
                <div class="box10"></div>
              </div>
              <div class="div10 visual_bd"> </div>
              <div class="div11 visual_bd"> </div>
              <div class="div12">
                <div class='visual_title'>
                  <span>交通流量</span>
                  <img src={ksh}></img>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };
    return render
  },
});
</script>
